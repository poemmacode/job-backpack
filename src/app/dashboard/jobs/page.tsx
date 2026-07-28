import Link from 'next/link';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getJobs } from '@/features/jobs/repositories/jobs';
import { JobList } from '@/features/jobs';
import { Button } from '@/components/Button';

export default async function JobsPage() {
  const user = await getUser();
  if (!user) redirect('/login');

  const jobs = await getJobs(user.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
          <Link href="/dashboard/jobs/new">
            <Button>Add Job</Button>
          </Link>
        </div>
        <JobList jobs={jobs} />
      </div>
    </div>
  );
}
