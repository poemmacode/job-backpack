'use client';

import { SavedOpportunity } from '../types/saved-opportunities';

interface SavedOpportunityCardProps {
  opportunity: SavedOpportunity;
  onDelete: (id: string) => void;
  onConvert: (id: string) => void;
  onPriorityChange: (id: string, priority: string) => void;
  isLoading: boolean;
}

const PRIORITY_CONFIG = {
  high: { label: 'High', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  normal: { label: 'Normal', color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400' },
  low: { label: 'Low', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
};

export function SavedOpportunityCard({
  opportunity,
  onDelete,
  onConvert,
  onPriorityChange,
  isLoading,
}: SavedOpportunityCardProps) {
  const priorityConfig =
    PRIORITY_CONFIG[opportunity.priority as keyof typeof PRIORITY_CONFIG] ||
    PRIORITY_CONFIG.normal;

  const timeAgo = getTimeAgo(opportunity.createdAt);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${priorityConfig.dot}`}
          />
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityConfig.color}`}
          >
            {priorityConfig.label}
          </span>
        </div>

        <select
          value={opportunity.priority}
          onChange={(e) => onPriorityChange(opportunity.id, e.target.value)}
          className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">{opportunity.title}</h3>
      <p className="text-sm text-gray-600">{opportunity.company}</p>

      <div className="mt-3 space-y-1 text-xs text-gray-500">
        {opportunity.location && <div>📍 {opportunity.location}</div>}
        {opportunity.salary && <div>💰 {opportunity.salary}</div>}
        {opportunity.notes && (
          <div className="mt-2 text-gray-600 line-clamp-2">{opportunity.notes}</div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">{timeAgo}</span>

        <div className="flex items-center gap-2">
          {opportunity.url && (
            <a
              href={opportunity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              View
            </a>
          )}
          <button
            onClick={() => onConvert(opportunity.id)}
            disabled={isLoading}
            className="text-xs text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
          >
            Convert to Job
          </button>
          <button
            onClick={() => onDelete(opportunity.id)}
            disabled={isLoading}
            className="text-xs text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}
