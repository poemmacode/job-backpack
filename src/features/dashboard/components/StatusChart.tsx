'use client';

import type { ApplicationStatus } from '@/features/applications/types';

interface StatusChartProps {
  byStatus: Record<string, number>;
}

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  interested: 'bg-gray-500',
  applied: 'bg-blue-500',
  interview: 'bg-yellow-500',
  offer: 'bg-green-500',
  accepted: 'bg-emerald-600',
  rejected: 'bg-red-500',
  ghosted: 'bg-gray-400',
  withdrawn: 'bg-orange-500',
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  interested: 'Interested',
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  accepted: 'Accepted',
  rejected: 'Rejected',
  ghosted: 'Ghosted',
  withdrawn: 'Withdrawn',
};

export function StatusChart({ byStatus }: StatusChartProps) {
  const maxCount = Math.max(...Object.values(byStatus), 1);

  const allStatuses: ApplicationStatus[] = [
    'interested',
    'applied',
    'interview',
    'offer',
    'accepted',
    'rejected',
    'ghosted',
    'withdrawn',
  ];

  const activeStatuses = allStatuses.filter((s) => (byStatus[s] || 0) > 0);

  if (activeStatuses.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Status Distribution</h3>
        <p className="text-gray-500 text-sm">No applications yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Status Distribution</h3>
      <div className="space-y-3">
        {activeStatuses.map((status) => {
          const count = byStatus[status] || 0;
          const percentage = (count / maxCount) * 100;

          return (
            <div key={status}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700">{STATUS_LABELS[status]}</span>
                <span className="font-medium text-gray-900">{count}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${STATUS_COLORS[status]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
