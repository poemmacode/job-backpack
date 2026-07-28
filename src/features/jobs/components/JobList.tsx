import type { Job } from '@/generated/prisma/client';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No jobs yet</p>
        <p className="text-gray-400 mt-2">Create your first job to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
