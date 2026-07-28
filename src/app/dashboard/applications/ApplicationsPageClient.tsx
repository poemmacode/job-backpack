'use client';

import { useState } from 'react';
import type { Application, Job } from '@prisma/client';
import { ApplicationList } from '@/features/applications/components/ApplicationList';
import { ApplicationFilters } from '@/features/applications/components/ApplicationFilters';

interface ApplicationsPageClientProps {
  applications: (Application & { job: Job })[];
  counts: Record<string, number>;
}

export function ApplicationsPageClient({ applications, counts }: ApplicationsPageClientProps) {
  const [statusFilter, setStatusFilter] = useState('');

  const filteredApplications = statusFilter
    ? applications.filter((app) => app.status === statusFilter)
    : applications;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

        <div className="mb-6">
          <ApplicationFilters
            selectedStatus={statusFilter}
            onStatusChange={setStatusFilter}
            counts={counts}
          />
        </div>

        <ApplicationList applications={filteredApplications} hasFilters={!!statusFilter} />
      </div>
    </div>
  );
}
