'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/features/auth/hooks/useAuth';
import { getActivities, getTotalActivities } from '../repositories/activities';
import type { GetActivitiesOptions } from '../types';

export async function getActivitiesAction(
  options: Omit<GetActivitiesOptions, 'limit' | 'offset'> & { page?: number }
) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const page = options.page || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const [activities, totalCount] = await Promise.all([
    getActivities(user.id, {
      limit,
      offset,
      type: options.type,
    }),
    getTotalActivities(user.id),
  ]);

  return {
    data: activities,
    pagination: {
      page,
      limit,
      totalCount,
      hasMore: offset + limit < totalCount,
    },
  };
}
