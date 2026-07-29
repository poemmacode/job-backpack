import { Suspense } from 'react';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getJobCount } from '@/features/jobs/repositories/jobs';
import {
  getApplicationMetrics,
  getRecentApplications,
  getStaleApplications,
} from '@/features/applications/repositories/applications';
import { DashboardPageClient } from '@/features/dashboard/components/DashboardPageClient';

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-2" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function DashboardContent() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const [totalJobs, metrics, recentApplications, staleApplications] = await Promise.all([
    getJobCount(user.id),
    getApplicationMetrics(user.id),
    getRecentApplications(user.id, 5),
    getStaleApplications(user.id, 14),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.email}</p>
        </div>

        <DashboardPageClient
          metrics={{
            totalJobs,
            totalApplications: metrics.total,
            byStatus: metrics.byStatus,
            responseRate: metrics.responseRate,
            staleCount: metrics.staleCount,
          }}
          recentApplications={recentApplications}
          staleApplications={staleApplications}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
