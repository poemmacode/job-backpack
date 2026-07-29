'use client';

import { MetricCard } from './MetricCard';
import { StatusChart } from './StatusChart';
import { ResponseRate } from './ResponseRate';
import { StaleAlert } from './StaleAlert';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import type { ApplicationWithJob } from '@/features/applications/types';

interface DashboardPageClientProps {
  metrics: {
    totalJobs: number;
    totalApplications: number;
    byStatus: Record<string, number>;
    responseRate: number;
    staleCount: number;
  };
  recentApplications: ApplicationWithJob[];
  staleApplications: ApplicationWithJob[];
}

export function DashboardPageClient({
  metrics,
  recentApplications,
  staleApplications,
}: DashboardPageClientProps) {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Jobs"
          value={metrics.totalJobs}
          color="text-blue-600"
        />
        <MetricCard
          title="Applications"
          value={metrics.totalApplications}
          color="text-purple-600"
        />
        <MetricCard
          title="Interviews"
          value={metrics.byStatus['interview'] || 0}
          color="text-yellow-600"
        />
        <MetricCard
          title="Offers"
          value={metrics.byStatus['offer'] || 0}
          color="text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <StatusChart byStatus={metrics.byStatus} />
        <ResponseRate
          rate={metrics.responseRate}
          interviewCount={metrics.byStatus['interview'] || 0}
          totalApplications={metrics.totalApplications}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <StaleAlert applications={staleApplications} />
        <RecentActivity applications={recentApplications} />
      </div>

      <div className="mt-6">
        <QuickActions />
      </div>
    </>
  );
}
