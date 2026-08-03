# 024 - Job Scraper - Plan

## Architecture

```
UI (SearchForm)
  │
  ├── Source Selector (Indeed | Glassdoor)
  ├── Search Input (keywords)
  ├── Location Input
  └── Search Profile Selector (optional)
        │
        ▼
Server Action (searchJobs)
  │
  ├── validateInput
  ├── checkRateLimit
  ├── scrapeSource(source, query, location)
  │     ├── fetchWithRetry
  │     └── parseResults(html)
  ├── deduplicateResults
  └── return JobResult[]
        │
        ▼
UI (SearchResults)
  │
  ├── Result List (checkboxes)
  ├── Import Button
  └── importJobs(selectedJobs)
        │
        ▼
Server Action (importJobs)
  │
  ├── checkDuplicates
  ├── createJobs
  └── return imported count
```

## Data Model

No new models needed. Uses existing Job model:

```typescript
interface JobResult {
  title: string;
  company: string;
  location: string | null;
  url: string;
  source: 'indeed' | 'glassdoor';
  salary?: string | null;
}
```

## Scraper Strategy

### Indeed

```
URL: https://www.indeed.com/jobs?q={query}&l={location}
Headers: User-Agent, Accept, Accept-Language
Parse: .jobsearch-ResultsList → .result → title, company, location, link
```

### Glassdoor

```
URL: https://www.glassdoor.com/Job/jobs.htm?sc.keyword={query}&locT=&locId=&locKeyword={location}
Headers: User-Agent, Accept, Accept-Language
Parse: .JobsList_jobListItem → title, company, location, link
```

## Components

### Server Actions

- `searchJobs(source, query, location)` - Execute search
- `importJobs(jobs)` - Import selected jobs

### Client Components

- `JobScraperPageClient.tsx` - Main page wrapper
- `ScraperSearchForm.tsx` - Search form with source selector
- `ScraperResults.tsx` - Results list with selection
- `ScraperResultCard.tsx` - Individual result display
- `ScraperHistory.tsx` - Recent searches

### Scrapers (lib)

- `scrapers/indeed.ts` - Indeed scraper
- `scrapers/glassdoor.ts` - Glassdoor scraper
- `scrapers/base.ts` - Base scraper interface

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Job Scraper                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Source: [Indeed ▼]  Query: [React Developer    ]          │
│  Location: [Remote       ]  Profile: [Remote Dev ▼]        │
│  [Search]                                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Results (12 found)                          [Import Selected]│
│                                                             │
│  ☑  React Developer - TechCorp    │ Remote  │ Indeed       │
│  ☑  Senior React Dev - StartupX   │ US      │ Indeed       │
│  ☐  React Engineer - BigCo        │ NYC     │ Glassdoor    │
│  ☑  Frontend React - AgencyY      │ Europe  │ Glassdoor    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Recent Searches                                            │
│  • "Node.js" in Remote - 2 hours ago (8 results)           │
│  • "Python" in US - 1 day ago (15 results)                 │
└─────────────────────────────────────────────────────────────┘
```

## Files to Modify/Create

### Create

- `src/app/dashboard/scraper/page.tsx` - Main page
- `src/features/scraper/components/JobScraperPageClient.tsx`
- `src/features/scraper/components/ScraperSearchForm.tsx`
- `src/features/scraper/components/ScraperResults.tsx`
- `src/features/scraper/components/ScraperResultCard.tsx`
- `src/features/scraper/actions/scraper.ts` - Server Actions
- `src/features/scraper/lib/scrapers/indeed.ts`
- `src/features/scraper/lib/scrapers/glassdoor.ts`
- `src/features/scraper/lib/scrapers/base.ts`
- `src/features/scraper/types/scraper.ts`
- `src/features/scraper/utils/dedup.ts`

### Modify

- `src/components/Navbar.tsx` - Add Scraper link

## Rate Limiting

```typescript
const RATE_LIMIT = {
  maxRequests: 1,
  windowMs: 1000, // 1 second between requests
};

const lastRequestTime: Record<string, number> = {};

async function rateLimit(source: string) {
  const now = Date.now();
  const last = lastRequestTime[source] || 0;
  const wait = RATE_LIMIT.windowMs - (now - last);
  
  if (wait > 0) {
    await new Promise(resolve => setTimeout(resolve, wait));
  }
  
  lastRequestTime[source] = Date.now();
}
```

## Deduplication

```typescript
function deduplicateResults(results: JobResult[], existingJobs: Job[]): JobResult[] {
  const existing = new Set(
    existingJobs.map(j => `${j.title.toLowerCase()}|${j.company.toLowerCase()}`)
  );
  
  return results.filter(r => {
    const key = `${r.title.toLowerCase()}|${r.company.toLowerCase()}`;
    return !existing.has(key);
  });
}
```
