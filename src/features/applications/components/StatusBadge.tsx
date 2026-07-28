const statusConfig: Record<string, { label: string; color: string }> = {
  interested: { label: 'Interested', color: 'bg-gray-100 text-gray-800' },
  applied: { label: 'Applied', color: 'bg-blue-100 text-blue-800' },
  interview: { label: 'Interview', color: 'bg-yellow-100 text-yellow-800' },
  offer: { label: 'Offer', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.interested;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

export const STATUS_OPTIONS = Object.entries(statusConfig).map(([value, { label }]) => ({
  value,
  label,
}));
