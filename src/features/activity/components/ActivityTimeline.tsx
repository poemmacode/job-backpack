'use client';

import { useState, useTransition } from 'react';
import { getActivitiesAction } from '../actions/activities';
import { ActivityItem } from './ActivityItem';
import { ActivityFilters } from './ActivityFilters';
import type { Activity, ActivityType } from '../types';

interface ActivityTimelineProps {
  initialActivities: Activity[];
  initialHasMore: boolean;
}

export function ActivityTimeline({ initialActivities, initialHasMore }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState<ActivityType | 'all'>('all');
  const [isPending, startTransition] = useTransition();

  function handleTypeChange(type: ActivityType | 'all') {
    setSelectedType(type);
    setPage(1);
    startTransition(async () => {
      const result = await getActivitiesAction({ type, page: 1 });
      if (result.data) {
        setActivities(result.data);
        setHasMore(result.pagination.hasMore);
      }
    });
  }

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    startTransition(async () => {
      const result = await getActivitiesAction({ type: selectedType, page: nextPage });
      if (result.data) {
        setActivities((prev) => [...prev, ...result.data]);
        setHasMore(result.pagination.hasMore);
      }
    });
  }

  if (activities.length === 0 && !isPending) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No activity yet. Start by adding a job!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ActivityFilters selectedType={selectedType} onTypeChange={handleTypeChange} />

      <div className="relative">
        {isPending && activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            {isPending ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
