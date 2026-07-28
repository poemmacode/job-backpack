interface StatusHistoryProps {
  createdAt: Date;
  updatedAt: Date;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return formatDate(date);
}

export function StatusHistory({ createdAt, updatedAt }: StatusHistoryProps) {
  const hasBeenUpdated = new Date(updatedAt).getTime() > new Date(createdAt).getTime() + 1000;

  return (
    <div className="text-sm text-gray-600 space-y-1">
      <p>
        <span className="text-gray-500">Applied:</span> {formatDate(createdAt)}
      </p>
      {hasBeenUpdated && (
        <p>
          <span className="text-gray-500">Last updated:</span> {formatDate(updatedAt)} (
          {getTimeAgo(updatedAt)})
        </p>
      )}
    </div>
  );
}
