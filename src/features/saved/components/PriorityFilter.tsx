'use client';

interface PriorityFilterProps {
  selected: string;
  onChange: (filter: string) => void;
}

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High Priority' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low Priority' },
];

export function PriorityFilter({ selected, onChange }: PriorityFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
