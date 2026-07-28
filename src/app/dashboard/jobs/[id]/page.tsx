import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect, notFound } from 'next/navigation';
import { getJob } from '@/features/jobs/repositories/jobs';
import { JobDetail } from '@/features/jobs';
import { hasApplication } from '@/features/applications/repositories/applications';

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const [job, userHasApplied] = await Promise.all([
    getJob(id, user.id),
    hasApplication(id, user.id),
  ]);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JobDetail job={job} hasApplied={userHasApplied} />
      </div>
    </div>
  );
}
