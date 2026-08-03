export type ScraperSource = 'indeed' | 'glassdoor';

export interface JobResult {
  title: string;
  company: string;
  location: string | null;
  url: string;
  source: ScraperSource;
  salary: string | null;
}

export interface SearchParams {
  source: ScraperSource;
  query: string;
  location: string;
}

export interface SearchResult {
  jobs: JobResult[];
  total: number;
  source: ScraperSource;
}
