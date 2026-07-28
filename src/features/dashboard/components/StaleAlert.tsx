import Link from 'next/link';
import type { ApplicationWithJob } from '@/features/applications/types';

interface StaleAlertProps {
  applications: ApplicationWithJob[];
}

function getDaysSince(date: Date) {
  return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
}

export function StaleAlert({ applications }: StaleAlertProps) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Needs Attention</h3>
        <p className="text-gray-500 text-sm">No stale applications</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Needs Attention ({applications.length})
      </h3>
      <ul className="space-y-3">
        {applications.map((app) => (
          <li key={app.id}>
            <Link
              href={`/dashboard/jobs/${app.jobId}`}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{app.job.title}</p>
                <p className="text-xs text-gray-600">{app.job.company}</p>
              </div>
              <span className="text-xs font-medium text-red-600">
                {getDaysSince(app.createdAt)} days
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
