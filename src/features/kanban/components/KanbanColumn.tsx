'use client';

import { useDroppable } from '@dnd-kit/core';
import { KanbanCard } from './KanbanCard';
import type { KanbanColumn as KanbanColumnType } from '../types';

interface KanbanColumnProps {
  column: KanbanColumnType;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      className={`flex flex-col min-w-[280px] max-w-[320px] rounded-xl border-2 ${column.color} ${column.bgColor} ${
        isOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
      }`}
    >
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <span className="text-sm font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full">
            {column.applications.length}
          </span>
        </div>
      </div>

      <div ref={setNodeRef} className="p-2 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
        <div className="space-y-2">
          {column.applications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">No applications</div>
          ) : (
            column.applications.map((app) => <KanbanCard key={app.id} application={app} />)
          )}
        </div>
      </div>
    </div>
  );
}
