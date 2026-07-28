import { prisma } from '@/lib/prisma';

export async function getApplications(userId: string) {
  return prisma.application.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getApplication(id: string, userId: string) {
  return prisma.application.findFirst({
    where: { id, userId },
    include: { job: true },
  });
}

export async function createApplication(jobId: string, userId: string) {
  return prisma.application.create({
    data: {
      jobId,
      userId,
      status: 'interested',
    },
    include: { job: true },
  });
}

export async function updateApplicationStatus(id: string, status: string, userId: string) {
  const application = await prisma.application.findFirst({
    where: { id, userId },
  });

  if (!application) {
    throw new Error('Application not found');
  }

  return prisma.application.update({
    where: { id },
    data: { status },
    include: { job: true },
  });
}

export async function deleteApplication(id: string, userId: string) {
  const application = await prisma.application.findFirst({
    where: { id, userId },
  });

  if (!application) {
    throw new Error('Application not found');
  }

  return prisma.application.delete({
    where: { id },
  });
}

export async function getApplicationCounts(userId: string) {
  const counts = await prisma.application.groupBy({
    by: ['status'],
    where: { userId },
    _count: true,
  });

  return counts.reduce(
    (acc, item) => {
      acc[item.status] = item._count;
      return acc;
    },
    {} as Record<string, number>
  );
}

export async function hasApplication(jobId: string, userId: string) {
  const application = await prisma.application.findFirst({
    where: { jobId, userId },
  });
  return !!application;
}
