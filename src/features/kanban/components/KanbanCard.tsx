'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';
import type { ApplicationWithJob } from '../types';

interface KanbanCardProps {
  application: ApplicationWithJob;
}

function formatDate(date: Date) {
  const now = Date.now();
  const seconds = Math.floor((now - new Date(date).getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function KanbanCard({ application }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: application.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white border border-gray-200 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <Link href={`/dashboard/applications/${application.id}`}>
        <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-1">
          {application.job.title}
        </h4>
        <p className="text-xs text-gray-600 mt-1">{application.job.company}</p>
        <p className="text-xs text-gray-500 mt-2">{formatDate(application.createdAt)}</p>
      </Link>
    </div>
  );
}
