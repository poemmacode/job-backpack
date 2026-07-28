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

export async function getStaleApplications(userId: string, days = 14) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return prisma.application.findMany({
    where: {
      userId,
      createdAt: { lt: cutoff },
      status: { notIn: ['interview', 'offer', 'accepted', 'rejected'] },
    },
    include: { job: true },
    orderBy: { createdAt: 'asc' },
  });
}

export async function getRecentApplications(userId: string, limit = 5) {
  return prisma.application.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getApplicationMetrics(userId: string) {
  const [counts, stale, all] = await Promise.all([
    prisma.application.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    }),
    prisma.application.count({
      where: {
        userId,
        createdAt: { lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
        status: { notIn: ['interview', 'offer', 'accepted', 'rejected'] },
      },
    }),
    prisma.application.findMany({
      where: { userId },
      select: { status: true },
    }),
  ]);

  const byStatus = counts.reduce(
    (acc, item) => {
      acc[item.status] = item._count;
      return acc;
    },
    {} as Record<string, number>
  );

  const total = all.length;
  const interviewCount = byStatus['interview'] || 0;
  const responseRate = total > 0 ? Math.round((interviewCount / total) * 100) : 0;

  return {
    total,
    byStatus,
    responseRate,
    staleCount: stale,
  };
}

const TRANSITIONS: Record<string, string[]> = {
  interested: ['applied', 'withdrawn'],
  applied: ['interview', 'rejected', 'withdrawn'],
  interview: ['offer', 'rejected', 'withdrawn'],
  offer: ['accepted', 'rejected', 'withdrawn'],
  accepted: [],
  rejected: ['applied'],
  ghosted: ['applied'],
  withdrawn: ['applied'],
};

export function getValidTransitions(currentStatus: string): string[] {
  return TRANSITIONS[currentStatus] || [];
}
