import { prisma } from '@/lib/prisma';
import type { CreateJobInput, UpdateJobInput } from '../schemas/jobs';

export async function getJobs(userId: string) {
  return prisma.job.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getJob(id: string, userId: string) {
  return prisma.job.findFirst({
    where: { id, userId },
  });
}

export async function createJob(data: CreateJobInput, userId: string) {
  return prisma.job.create({
    data: {
      ...data,
      url: data.url || null,
      userId,
    },
  });
}

export async function updateJob(id: string, data: UpdateJobInput, userId: string) {
  const job = await prisma.job.findFirst({
    where: { id, userId },
  });

  if (!job) {
    throw new Error('Job not found');
  }

  return prisma.job.update({
    where: { id },
    data: {
      ...data,
      url: data.url || null,
    },
  });
}

export async function deleteJob(id: string, userId: string) {
  const job = await prisma.job.findFirst({
    where: { id, userId },
  });

  if (!job) {
    throw new Error('Job not found');
  }

  return prisma.job.delete({
    where: { id },
  });
}

export async function getJobCount(userId: string) {
  return prisma.job.count({
    where: { userId },
  });
}
