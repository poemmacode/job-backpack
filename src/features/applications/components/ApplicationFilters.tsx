'use client';

interface ApplicationFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  counts: Record<string, number>;
}

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'interested', label: 'Interested' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
];

export function ApplicationFilters({
  selectedStatus,
  onStatusChange,
  counts,
}: ApplicationFiltersProps) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap gap-2">
      {statusOptions.map((option) => {
        const count = option.value ? counts[option.value] || 0 : total;
        return (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label} ({count})
          </button>
        );
      })}
    </div>
  );
}
