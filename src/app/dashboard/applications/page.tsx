import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import {
  getApplications,
  getApplicationCounts,
} from '@/features/applications/repositories/applications';
import { ApplicationsPageClient } from './ApplicationsPageClient';

export default async function ApplicationsPage() {
  const user = await getUser();
  if (!user) redirect('/login');

  const [applications, counts] = await Promise.all([
    getApplications(user.id),
    getApplicationCounts(user.id),
  ]);

  return <ApplicationsPageClient applications={applications} counts={counts} />;
}
