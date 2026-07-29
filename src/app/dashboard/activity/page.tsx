import { Suspense } from 'react';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getActivities } from '@/features/activity/repositories/activities';
import { ActivityTimeline } from '@/features/activity/components/ActivityTimeline';

function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function ActivityContent() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const activities = await getActivities(user.id, {
    limit: 20,
    offset: 0,
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Activity Timeline</h1>
        <p className="text-gray-600 mb-8">Your recent activity across all applications</p>

        <ActivityTimeline
          initialActivities={activities}
          initialHasMore={activities.length >= 20}
        />
      </div>
    </div>
  );
}

export default function ActivityPage() {
  return (
    <Suspense fallback={<ActivitySkeleton />}>
      <ActivityContent />
    </Suspense>
  );
}
