import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import {
  getApplicationMetrics,
  getStaleApplications,
  getRecentApplications,
} from '@/features/applications/repositories/applications';
import { MetricCard } from '@/features/dashboard/components/MetricCard';
import { StatusChart } from '@/features/dashboard/components/StatusChart';
import { StaleAlert } from '@/features/dashboard/components/StaleAlert';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';

export default async function ApplicationDashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const [metrics, stale, recent] = await Promise.all([
    getApplicationMetrics(user.id),
    getStaleApplications(user.id),
    getRecentApplications(user.id),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Application Dashboard</h1>
        <p className="mt-2 text-gray-700">Overview of your job application progress</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total Applications" value={metrics.total} color="text-blue-600" />
          <MetricCard
            title="Interviews"
            value={metrics.byStatus['interview'] || 0}
            color="text-yellow-600"
          />
          <MetricCard
            title="Response Rate"
            value={`${metrics.responseRate}%`}
            color="text-green-600"
          />
          <MetricCard
            title="Needs Attention"
            value={metrics.staleCount}
            color="text-red-600"
            subtitle=">14 days without response"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusChart byStatus={metrics.byStatus} />
          <StaleAlert applications={stale} />
        </div>

        <div className="mt-8">
          <RecentActivity applications={recent} />
        </div>
      </div>
    </div>
  );
}
