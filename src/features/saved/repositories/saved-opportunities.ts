import { prisma } from '@/lib/prisma';
import { SavedOpportunityInput } from '../schemas/saved-opportunities';

export async function getSavedOpportunities(userId: string) {
  return prisma.savedOpportunity.findMany({
    where: { userId },
    orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
  });
}

export async function getSavedOpportunity(id: string, userId: string) {
  return prisma.savedOpportunity.findFirst({
    where: { id, userId },
  });
}

export async function createSavedOpportunity(
  userId: string,
  data: SavedOpportunityInput
) {
  return prisma.savedOpportunity.create({
    data: {
      title: data.title,
      company: data.company,
      location: data.location || null,
      url: data.url || null,
      salary: data.salary || null,
      notes: data.notes || null,
      priority: data.priority || 'normal',
      source: data.source || null,
      userId,
    },
  });
}

export async function updateSavedOpportunity(
  id: string,
  userId: string,
  data: SavedOpportunityInput
) {
  const opportunity = await prisma.savedOpportunity.findFirst({
    where: { id, userId },
  });

  if (!opportunity) {
    throw new Error('Saved opportunity not found');
  }

  return prisma.savedOpportunity.update({
    where: { id },
    data: {
      title: data.title,
      company: data.company,
      location: data.location || null,
      url: data.url || null,
      salary: data.salary || null,
      notes: data.notes || null,
      priority: data.priority || 'normal',
    },
  });
}

export async function deleteSavedOpportunity(id: string, userId: string) {
  const opportunity = await prisma.savedOpportunity.findFirst({
    where: { id, userId },
  });

  if (!opportunity) {
    throw new Error('Saved opportunity not found');
  }

  return prisma.savedOpportunity.delete({
    where: { id },
  });
}

export async function convertToJob(id: string, userId: string) {
  const opportunity = await prisma.savedOpportunity.findFirst({
    where: { id, userId },
  });

  if (!opportunity) {
    throw new Error('Saved opportunity not found');
  }

  const job = await prisma.job.create({
    data: {
      title: opportunity.title,
      company: opportunity.company,
      location: opportunity.location,
      url: opportunity.url,
      salary: opportunity.salary,
      notes: opportunity.notes
        ? `${opportunity.notes}\n\nImported from Saved Opportunities`
        : 'Imported from Saved Opportunities',
      userId,
    },
  });

  await prisma.savedOpportunity.delete({
    where: { id },
  });

  return job;
}

export async function setPriority(
  id: string,
  userId: string,
  priority: string
) {
  const opportunity = await prisma.savedOpportunity.findFirst({
    where: { id, userId },
  });

  if (!opportunity) {
    throw new Error('Saved opportunity not found');
  }

  return prisma.savedOpportunity.update({
    where: { id },
    data: { priority },
  });
}
