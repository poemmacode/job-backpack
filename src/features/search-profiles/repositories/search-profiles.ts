import { prisma } from '@/lib/prisma';
import { SearchProfileInput } from '../schemas/search-profiles';

export async function getSearchProfiles(userId: string) {
  return prisma.searchProfile.findMany({
    where: { userId },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });
}

export async function getSearchProfile(id: string, userId: string) {
  return prisma.searchProfile.findFirst({
    where: { id, userId },
  });
}

export async function createSearchProfile(userId: string, data: SearchProfileInput) {
  return prisma.searchProfile.create({
    data: {
      name: data.name,
      locations: data.locations || [],
      workType: data.workType || null,
      salaryMin: data.salaryMin || null,
      salaryMax: data.salaryMax || null,
      skills: data.skills || [],
      notes: data.notes || null,
      userId,
    },
  });
}

export async function updateSearchProfile(id: string, userId: string, data: SearchProfileInput) {
  const profile = await prisma.searchProfile.findFirst({
    where: { id, userId },
  });

  if (!profile) {
    throw new Error('Search profile not found');
  }

  return prisma.searchProfile.update({
    where: { id },
    data: {
      name: data.name,
      locations: data.locations || [],
      workType: data.workType || null,
      salaryMin: data.salaryMin || null,
      salaryMax: data.salaryMax || null,
      skills: data.skills || [],
      notes: data.notes || null,
    },
  });
}

export async function deleteSearchProfile(id: string, userId: string) {
  const profile = await prisma.searchProfile.findFirst({
    where: { id, userId },
  });

  if (!profile) {
    throw new Error('Search profile not found');
  }

  return prisma.searchProfile.delete({
    where: { id },
  });
}

export async function setDefaultProfile(id: string, userId: string) {
  const profile = await prisma.searchProfile.findFirst({
    where: { id, userId },
  });

  if (!profile) {
    throw new Error('Search profile not found');
  }

  await prisma.searchProfile.updateMany({
    where: { userId },
    data: { isDefault: false },
  });

  return prisma.searchProfile.update({
    where: { id },
    data: { isDefault: true },
  });
}
