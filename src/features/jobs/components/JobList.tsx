import type { Job } from '@prisma/client';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[];
  totalCount: number;
  hasFilters: boolean;
}

export function JobList({ jobs, totalCount, hasFilters }: JobListProps) {
  if (jobs.length === 0 && hasFilters) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No jobs match your filters</p>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No jobs yet</p>
        <p className="text-gray-400 mt-2">Create your first job to get started</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Showing {jobs.length} of {totalCount} jobs
      </p>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
