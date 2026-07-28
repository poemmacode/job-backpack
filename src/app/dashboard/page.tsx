import Link from 'next/link';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/Button';
import { getJobs } from '@/features/jobs/repositories/jobs';
import { getApplicationCounts } from '@/features/applications/repositories/applications';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const [jobs, counts] = await Promise.all([getJobs(user.id), getApplicationCounts(user.id)]);

  const totalApplications = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-700">Welcome back, {user.email}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Total Jobs</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">{jobs.length}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">{totalApplications}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Interviews</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{counts.interview || 0}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Offers</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">{counts.offer || 0}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/dashboard/jobs/new" className="block">
                <Button variant="primary" size="sm" className="w-full">
                  Add New Job
                </Button>
              </Link>
              <Link href="/dashboard/jobs" className="block">
                <Button variant="secondary" size="sm" className="w-full">
                  View All Jobs
                </Button>
              </Link>
              <Link href="/dashboard/applications" className="block">
                <Button variant="secondary" size="sm" className="w-full">
                  View Applications
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Jobs</h2>
            {jobs.length === 0 ? (
              <p className="text-gray-600">No jobs yet</p>
            ) : (
              <ul className="space-y-2">
                {jobs.slice(0, 3).map((job) => (
                  <li key={job.id}>
                    <Link
                      href={`/dashboard/jobs/${job.id}`}
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      {job.title} - {job.company}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
