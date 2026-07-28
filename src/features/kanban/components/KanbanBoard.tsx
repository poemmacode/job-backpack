'use client';

import { useState, useTransition } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { KanbanSummary } from './KanbanSummary';
import { updateApplicationStatusAction } from '@/features/applications/actions/applications';
import {
  KANBAN_COLUMNS,
  type ApplicationWithJob,
  type KanbanColumn as KanbanColumnType,
  type KanbanStatus,
} from '../types';

interface KanbanBoardProps {
  applications: ApplicationWithJob[];
}

export function KanbanBoard({ applications }: KanbanBoardProps) {
  const [columns, setColumns] = useState<KanbanColumnType[]>(() =>
    KANBAN_COLUMNS.map((col) => ({
      ...col,
      applications: applications.filter((app) => app.status === col.id),
    }))
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const activeApplication = activeId
    ? columns.flatMap((col) => col.applications).find((app) => app.id === activeId)
    : null;

  const summary = {
    total: applications.length,
    applied: columns.find((c) => c.id === 'applied')?.applications.length || 0,
    interview: columns.find((c) => c.id === 'interview')?.applications.length || 0,
    offer: columns.find((c) => c.id === 'offer')?.applications.length || 0,
    rejected: columns.find((c) => c.id === 'rejected')?.applications.length || 0,
  };

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeApp = columns
      .flatMap((col) => col.applications)
      .find((app) => app.id === String(active.id));

    if (!activeApp) return;

    const targetColumnId = String(over.id) as KanbanStatus;

    if (!KANBAN_COLUMNS.some((col) => col.id === targetColumnId)) {
      const targetColumn = columns.find((col) =>
        col.applications.some((app) => app.id === String(over.id))
      );
      if (targetColumn) {
        moveApplication(activeApp, targetColumn.id);
      }
      return;
    }

    if (activeApp.status !== targetColumnId) {
      moveApplication(activeApp, targetColumnId);
    }
  }

  function moveApplication(app: ApplicationWithJob, newStatus: KanbanStatus) {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        applications:
          col.id === newStatus
            ? [...col.applications, { ...app, status: newStatus }]
            : col.applications.filter((a) => a.id !== app.id),
      }))
    );

    startTransition(async () => {
      await updateApplicationStatusAction(app.id, newStatus);
    });
  }

  return (
    <div className="space-y-4">
      <KanbanSummary {...summary} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>

        <DragOverlay>
          {activeApplication ? (
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg opacity-90 w-[260px]">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                {activeApplication.job.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">{activeApplication.job.company}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
