import { prisma } from '@/lib/prisma';

export async function getRecruiters(userId: string) {
  return prisma.recruiter.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getRecruiter(id: string, userId: string) {
  return prisma.recruiter.findFirst({
    where: { id, userId },
  });
}

export async function createRecruiter(
  userId: string,
  data: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    linkedIn?: string;
    notes?: string;
  }
) {
  return prisma.recruiter.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function updateRecruiter(
  id: string,
  userId: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    linkedIn?: string;
    notes?: string;
  }
) {
  const recruiter = await prisma.recruiter.findFirst({
    where: { id, userId },
  });

  if (!recruiter) {
    throw new Error('Recruiter not found');
  }

  return prisma.recruiter.update({
    where: { id },
    data,
  });
}

export async function deleteRecruiter(id: string, userId: string) {
  const recruiter = await prisma.recruiter.findFirst({
    where: { id, userId },
  });

  if (!recruiter) {
    throw new Error('Recruiter not found');
  }

  return prisma.recruiter.delete({
    where: { id },
  });
}

export async function getRecruitersByApplication(applicationId: string) {
  return prisma.applicationRecruiter.findMany({
    where: { applicationId },
    include: {
      recruiter: true,
      application: {
        include: {
          job: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getApplicationsByRecruiter(recruiterId: string) {
  return prisma.applicationRecruiter.findMany({
    where: { recruiterId },
    include: {
      application: {
        include: {
          job: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function associateRecruiter(
  applicationId: string,
  recruiterId: string,
  role?: string
) {
  return prisma.applicationRecruiter.create({
    data: {
      applicationId,
      recruiterId,
      role,
    },
  });
}

export async function disassociateRecruiter(applicationId: string, recruiterId: string) {
  return prisma.applicationRecruiter.deleteMany({
    where: {
      applicationId,
      recruiterId,
    },
  });
}

export async function searchRecruiters(userId: string, query: string) {
  return prisma.recruiter.findMany({
    where: {
      userId,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { company: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
}
