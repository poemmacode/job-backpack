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
      title: data.title,
      company: data.company,
      location: data.location || null,
      url: data.url || null,
      salary: data.salary || null,
      notes: data.notes || null,
      englishRequired: data.englishRequired || false,
      englishLevel: data.englishLevel || null,
      employmentType: data.employmentType || null,
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
      title: data.title,
      company: data.company,
      location: data.location || null,
      url: data.url || null,
      salary: data.salary || null,
      notes: data.notes || null,
      englishRequired: data.englishRequired || false,
      englishLevel: data.englishLevel || null,
      employmentType: data.employmentType || null,
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
