'use client';

import { ACTIVITY_TYPE_CONFIG } from '../types';
import type { ActivityType } from '../types';

interface ActivityFiltersProps {
  selectedType: ActivityType | 'all';
  onTypeChange: (type: ActivityType | 'all') => void;
}

const FILTER_OPTIONS: Array<{ value: ActivityType | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'status_change', label: 'Status' },
  { value: 'note_created', label: 'Notes' },
  { value: 'attachment_uploaded', label: 'Attachments' },
  { value: 'recruiter_associated', label: 'Recruiters' },
  { value: 'job_created', label: 'Jobs' },
];

export function ActivityFilters({ selectedType, onTypeChange }: ActivityFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => {
        const isSelected = selectedType === option.value;
        const config = option.value !== 'all' ? ACTIVITY_TYPE_CONFIG[option.value] : null;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onTypeChange(option.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              isSelected
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {config && <span className="mr-1">{config.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
