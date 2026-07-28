import type { Application, Job } from '@prisma/client';

export type ApplicationWithJob = Application & { job: Job };

export type KanbanStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface KanbanColumn {
  id: KanbanStatus;
  title: string;
  color: string;
  bgColor: string;
  applications: ApplicationWithJob[];
}

export const KANBAN_COLUMNS: Omit<KanbanColumn, 'applications'>[] = [
  {
    id: 'applied',
    title: 'Applied',
    color: 'border-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'interview',
    title: 'Interview',
    color: 'border-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'offer',
    title: 'Offer',
    color: 'border-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 'rejected',
    title: 'Rejected',
    color: 'border-red-500',
    bgColor: 'bg-red-50',
  },
];
