'use client';

import Link from 'next/link';
import type { Job } from '@prisma/client';
import { Button } from '@/components/Button';
import { JobSearchBar } from '@/features/jobs/components/JobSearchBar';
import { JobFilters } from '@/features/jobs/components/JobFilters';
import { JobList } from '@/features/jobs/components/JobList';
import { useJobFilters } from '@/features/jobs/hooks/useJobFilters';

interface JobsPageClientProps {
  jobs: Job[];
}

export function JobsPageClient({ jobs }: JobsPageClientProps) {
  const {
    filters,
    filteredJobs,
    companies,
    locations,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  } = useJobFilters(jobs);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
          <Link href="/dashboard/jobs/new">
            <Button>Add Job</Button>
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          <JobSearchBar
            value={filters.searchQuery}
            onChange={(value) => updateFilter('searchQuery', value)}
          />
          <JobFilters
            filters={filters}
            companies={companies}
            locations={locations}
            onFilterChange={updateFilter}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <JobList jobs={filteredJobs} totalCount={jobs.length} hasFilters={hasActiveFilters} />
      </div>
    </div>
  );
}
