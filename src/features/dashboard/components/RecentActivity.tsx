import Link from 'next/link';
import { StatusBadge } from '@/features/applications/components/StatusBadge';
import type { ApplicationWithJob } from '@/features/applications/types';

interface RecentActivityProps {
  applications: ApplicationWithJob[];
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function RecentActivity({ applications }: RecentActivityProps) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Recent Activity</h3>
        <p className="text-gray-500 text-sm">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Recent Activity</h3>
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
              <div className="flex items-center gap-2">
                <StatusBadge status={app.status} />
                <span className="text-xs text-gray-500">{getTimeAgo(app.createdAt)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
