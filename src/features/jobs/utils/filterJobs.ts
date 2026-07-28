import type { Job } from '@/generated/prisma/client';

export interface JobFilters {
  searchQuery: string;
  company: string;
  location: string;
  dateRange: 'all' | 'week' | 'month';
}

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  let filtered = [...jobs];

  // Search by title
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (job) => job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query)
    );
  }

  // Filter by company
  if (filters.company) {
    filtered = filtered.filter((job) => job.company === filters.company);
  }

  // Filter by location
  if (filters.location) {
    filtered = filtered.filter((job) => job.location === filters.location);
  }

  // Filter by date range
  if (filters.dateRange !== 'all') {
    const now = new Date();
    const cutoff = new Date();

    if (filters.dateRange === 'week') {
      cutoff.setDate(now.getDate() - 7);
    } else if (filters.dateRange === 'month') {
      cutoff.setMonth(now.getMonth() - 1);
    }

    filtered = filtered.filter((job) => new Date(job.createdAt) >= cutoff);
  }

  return filtered;
}

export function getUniqueCompanies(jobs: Job[]): string[] {
  const companies = jobs.map((job) => job.company);
  return [...new Set(companies)].sort();
}

export function getUniqueLocations(jobs: Job[]): string[] {
  const locations = jobs.map((job) => job.location).filter((loc): loc is string => loc !== null);
  return [...new Set(locations)].sort();
}
