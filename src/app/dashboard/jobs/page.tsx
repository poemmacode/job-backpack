import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getJobs } from '@/features/jobs/repositories/jobs';
import { JobsPageClient } from './JobsPageClient';

export default async function JobsPage() {
  const user = await getUser();
  if (!user) redirect('/login');

  const jobs = await getJobs(user.id);

  return <JobsPageClient jobs={jobs} />;
}
