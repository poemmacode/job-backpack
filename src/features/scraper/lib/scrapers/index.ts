import { ScraperSource, JobResult } from '../../types/scraper';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
};

const lastRequestTime: Record<string, number> = {};
const RATE_LIMIT_MS = 1500;

async function rateLimit(source: string): Promise<void> {
  const now = Date.now();
  const last = lastRequestTime[source] || 0;
  const wait = RATE_LIMIT_MS - (now - last);

  if (wait > 0) {
    await new Promise((resolve) => setTimeout(resolve, wait));
  }

  lastRequestTime[source] = Date.now();
}

export async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  throw new Error('Max retries exceeded');
}

export async function scrapeJobs(
  source: ScraperSource,
  query: string,
  location: string
): Promise<JobResult[]> {
  await rateLimit(source);

  switch (source) {
    case 'indeed':
      return scrapeIndeed(query, location);
    case 'glassdoor':
      return scrapeGlassdoor(query, location);
    default:
      throw new Error(`Unknown source: ${source}`);
  }
}

async function scrapeIndeed(
  query: string,
  location: string
): Promise<JobResult[]> {
  const encodedQuery = encodeURIComponent(query);
  const encodedLocation = encodeURIComponent(location);
  const url = `https://www.indeed.com/jobs?q=${encodedQuery}&l=${encodedLocation}&sort=date`;

  const html = await fetchWithRetry(url);
  return parseIndeedHtml(html);
}

function parseIndeedHtml(html: string): JobResult[] {
  const jobs: JobResult[] = [];

  const jobCardRegex =
    /<div[^>]*class="[^"]*job_seen_beacon[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
  const titleRegex = /<h2[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/;
  const companyRegex = /<span[^>]*data-testid="company-name"[^>]*>([\s\S]*?)<\/span>/;
  const locationRegex = /<div[^>]*data-testid="text-location"[^>]*>([\s\S]*?)<\/div>/;
  const salaryRegex = /<div[^>]*class="[^"]*salary-snippet[^"]*"[^>]*>([\s\S]*?)<\/div>/;

  const cardMatches = html.match(jobCardRegex) || [];

  for (const card of cardMatches.slice(0, 15)) {
    const titleMatch = card.match(titleRegex);
    const companyMatch = card.match(companyRegex);
    const locationMatch = card.match(locationRegex);
    const salaryMatch = card.match(salaryRegex);

    if (titleMatch && companyMatch) {
      const rawUrl = titleMatch[1];
      const href = rawUrl.startsWith('http')
        ? rawUrl
        : `https://www.indeed.com${rawUrl}`;

      jobs.push({
        title: cleanHtml(titleMatch[2]),
        company: cleanHtml(companyMatch[1]),
        location: locationMatch ? cleanHtml(locationMatch[1]) : null,
        url: href,
        source: 'indeed',
        salary: salaryMatch ? cleanHtml(salaryMatch[1]) : null,
      });
    }
  }

  return jobs;
}

async function scrapeGlassdoor(
  query: string,
  location: string
): Promise<JobResult[]> {
  const encodedQuery = encodeURIComponent(query);
  const encodedLocation = encodeURIComponent(location);
  const url = `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodedQuery}&locT=&locId=&locKeyword=${encodedLocation}`;

  const html = await fetchWithRetry(url);
  return parseGlassdoorHtml(html);
}

function parseGlassdoorHtml(html: string): JobResult[] {
  const jobs: JobResult[] = [];

  const jobCardRegex =
    /<li[^>]*class="[^"]*JobsList_jobListItem[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
  const titleRegex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/;
  const companyRegex = /<div[^>]*class="[^"]*job-listing-company[^"]*"[^>]*>([\s\S]*?)<\/div>/;
  const locationRegex = /<div[^>]*class="[^"]*job-listing-location[^"]*"[^>]*>([\s纺]*?)<\/div>/;
  const salaryRegex = /<div[^>]*class="[^"]*job-listing-salary[^"]*"[^>]*>([\s\S]*?)<\/div>/;

  const cardMatches = html.match(jobCardRegex) || [];

  for (const card of cardMatches.slice(0, 15)) {
    const titleMatch = card.match(titleRegex);
    const companyMatch = card.match(companyRegex);
    const locationMatch = card.match(locationRegex);
    const salaryMatch = card.match(salaryRegex);

    if (titleMatch && companyMatch) {
      const rawUrl = titleMatch[1];
      const href = rawUrl.startsWith('http')
        ? rawUrl
        : `https://www.glassdoor.com${rawUrl}`;

      jobs.push({
        title: cleanHtml(titleMatch[2]),
        company: cleanHtml(companyMatch[1]),
        location: locationMatch ? cleanHtml(locationMatch[1]) : null,
        url: href,
        source: 'glassdoor',
        salary: salaryMatch ? cleanHtml(salaryMatch[1]) : null,
      });
    }
  }

  return jobs;
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}
