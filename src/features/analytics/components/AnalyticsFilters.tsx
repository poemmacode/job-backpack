'use client';

import { DateRange } from '../types/analytics';

interface AnalyticsFiltersProps {
  selected: DateRange;
  onChange: (range: DateRange) => void;
}

const OPTIONS: { value: DateRange; label: string }[] = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: '3months', label: '3 Months' },
  { value: '6months', label: '6 Months' },
  { value: 'year', label: 'Year' },
];

export function AnalyticsFilters({ selected, onChange }: AnalyticsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
