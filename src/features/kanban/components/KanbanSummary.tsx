'use client';

interface KanbanSummaryProps {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export function KanbanSummary({ total, applied, interview, offer, rejected }: KanbanSummaryProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-gray-600">Applied: {applied}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="text-gray-600">Interview: {interview}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-gray-600">Offer: {offer}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-gray-600">Rejected: {rejected}</span>
      </div>
      <div className="ml-auto text-gray-500">Total: {total}</div>
    </div>
  );
}
