import { Suspense } from 'react';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getAnalyticsData } from '@/features/analytics/repositories/analytics';
import { AnalyticsPageClient } from '@/features/analytics/components/AnalyticsPageClient';
import { DateRange } from '@/features/analytics/types/analytics';

function AnalyticsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-2" />
        </div>
        <div className="flex gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-64 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-48 animate-pulse" />
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-48 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

async function AnalyticsContent({ range }: { range: DateRange }) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const data = await getAnalyticsData(user.id, range);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Insights from your job search</p>
        </div>

        <AnalyticsPageClient
          initialData={data}
          initialRange={range}
          onRangeChange={() => {}}
        />
      </div>
    </div>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const range = (params.range as DateRange) || 'month';

  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsContent range={range} />
    </Suspense>
  );
}
