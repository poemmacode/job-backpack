import Link from 'next/link';
import { ACTIVITY_TYPE_CONFIG } from '../types';
import type { Activity, ActivityType } from '../types';

interface ActivityItemProps {
  activity: Activity;
  isLast?: boolean;
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function ActivityItem({ activity, isLast = false }: ActivityItemProps) {
  const config = ACTIVITY_TYPE_CONFIG[activity.type as ActivityType];

  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200" />
      )}

      {/* Icon */}
      <div
        className={`relative z-10 w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-lg">{config.icon}</span>
      </div>

      {/* Content */}
      <Link
        href={activity.href}
        className="flex-1 pb-8 group"
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 group-hover:border-gray-300 transition-colors">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${config.color}`}>
                {activity.title}
              </p>
              <p className="text-sm text-gray-600 mt-0.5 truncate">
                {activity.description}
              </p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {getTimeAgo(activity.timestamp)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
