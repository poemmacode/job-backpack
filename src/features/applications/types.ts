import type { Application, Job } from '@prisma/client';

export type ApplicationWithJob = Application & { job: Job };
