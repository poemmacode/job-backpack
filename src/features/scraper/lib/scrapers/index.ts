import { ApifyClient } from 'apify-client';
import { ScraperSource, JobResult } from '../../types/scraper';

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

const ACTORS: Record<ScraperSource, string> = {
  indeed: 'misceres/indeed-scraper',
  glassdoor: 'misceres/glassdoor-scraper',
};

const lastRequestTime: Record<string, number> = {};
const RATE_LIMIT_MS = 5000;

async function rateLimit(source: string): Promise<void> {
  const now = Date.now();
  const last = lastRequestTime[source] || 0;
  const wait = RATE_LIMIT_MS - (now - last);

  if (wait > 0) {
    await new Promise((resolve) => setTimeout(resolve, wait));
  }

  lastRequestTime[source] = Date.now();
}

export async function scrapeJobs(
  source: ScraperSource,
  query: string,
  location: string
): Promise<JobResult[]> {
  if (!process.env.APIFY_API_TOKEN) {
    throw new Error('Apify API token not configured. Add APIFY_API_TOKEN to .env');
  }

  await rateLimit(source);

  const actorId = ACTORS[source];
  if (!actorId) {
    throw new Error(`Unknown source: ${source}`);
  }

  const input: Record<string, unknown> = {
    position: query,
    maxItems: 20,
  };

  if (location && location.toLowerCase() !== 'remote') {
    input.country = 'US';
    input.location = location;
  }

  try {
    const run = await client.actor(actorId).call(input, {
      waitSecs: 30,
    });

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return items.map((item: Record<string, unknown>) =>
      normalizeJob(item, source)
    );
  } catch (error) {
    console.error(`Apify actor ${actorId} failed:`, error);
    throw new Error(`Failed to fetch jobs from ${source}. Please try again.`);
  }
}

function normalizeJob(item: Record<string, unknown>, source: ScraperSource): JobResult {
  const title = (item.title || item.position || item.jobTitle || '') as string;
  const company = (item.company || item.companyName || item.employer || 'Unknown') as string;
  const location = (item.location || item.jobLocation || null) as string | null;
  const url = (item.url || item.link || item.jobUrl || item.applyUrl || '') as string;
  const salary = (item.salary || item.salaryRange || null) as string | null;

  return {
    title: title.trim() || 'Untitled Position',
    company: company.trim(),
    location: location?.trim() || null,
    url: url.startsWith('http') ? url : '',
    source,
    salary: salary?.trim() || null,
  };
}
