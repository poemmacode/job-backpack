import type { Application, Job } from '@prisma/client';

export type ApplicationWithJob = Application & { job: Job };

export type ApplicationStatus =
  | 'interested'
  | 'applied'
  | 'interview'
  | 'offer'
  | 'accepted'
  | 'rejected'
  | 'ghosted'
  | 'withdrawn';

export interface ApplicationMetrics {
  total: number;
  byStatus: Record<string, number>;
  responseRate: number;
  staleCount: number;
}
