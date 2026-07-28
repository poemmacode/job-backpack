import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getApplication } from '@/features/applications/repositories/applications';
import { StatusBadge } from '@/features/applications/components/StatusBadge';
import { StatusUpdateButton } from '@/features/applications/components/StatusUpdateButton';
import { StatusHistory } from '@/features/applications/components/StatusHistory';
import { DeleteApplicationButton } from './DeleteApplicationButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const { id } = await params;
  const application = await getApplication(id, user.id);

  if (!application) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link
            href="/dashboard/applications"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Applications
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{application.job.title}</h1>
              <p className="text-gray-600 mt-1">{application.job.company}</p>
            </div>
            <StatusBadge status={application.status} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {application.job.location && (
              <div>
                <span className="text-gray-500">Location</span>
                <p className="text-gray-900">{application.job.location}</p>
              </div>
            )}
            {application.job.salary && (
              <div>
                <span className="text-gray-500">Salary</span>
                <p className="text-gray-900">{application.job.salary}</p>
              </div>
            )}
            {application.job.url && (
              <div className="col-span-2">
                <span className="text-gray-500">URL</span>
                <p>
                  <a
                    href={application.job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {application.job.url}
                  </a>
                </p>
              </div>
            )}
          </div>

          {application.job.notes && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{application.job.notes}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <StatusHistory createdAt={application.createdAt} updatedAt={application.updatedAt} />
          </div>

          <div className="mt-6 flex gap-3">
            <StatusUpdateButton
              applicationId={application.id}
              currentStatus={application.status}
              userId={user.id}
            />
            <DeleteApplicationButton applicationId={application.id} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
