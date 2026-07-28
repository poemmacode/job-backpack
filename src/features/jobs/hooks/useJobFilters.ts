'use client';

import { useState, useMemo } from 'react';
import type { Job } from '@/generated/prisma/client';
import { filterJobs, getUniqueCompanies, getUniqueLocations } from '../utils/filterJobs';
import type { JobFilters } from '../utils/filterJobs';

const initialFilters: JobFilters = {
  searchQuery: '',
  company: '',
  location: '',
  dateRange: 'all',
};

export function useJobFilters(jobs: Job[]) {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const filteredJobs = useMemo(() => filterJobs(jobs, filters), [jobs, filters]);

  const companies = useMemo(() => getUniqueCompanies(jobs), [jobs]);
  const locations = useMemo(() => getUniqueLocations(jobs), [jobs]);

  const updateFilter = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.company !== '' ||
    filters.location !== '' ||
    filters.dateRange !== 'all';

  return {
    filters,
    filteredJobs,
    companies,
    locations,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  };
}
