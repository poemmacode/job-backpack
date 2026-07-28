'use client';

import type { Application, Job } from '@prisma/client';
import { ApplicationCard } from './ApplicationCard';

interface ApplicationListProps {
  applications: (Application & { job: Job })[];
  hasFilters: boolean;
}

export function ApplicationList({ applications, hasFilters }: ApplicationListProps) {
  if (applications.length === 0 && hasFilters) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No applications match your filters</p>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No applications yet</p>
        <p className="text-gray-500 mt-2">Apply to a job to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
}
