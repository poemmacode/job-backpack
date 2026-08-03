'use server';

import { getUser } from '@/features/auth/hooks/useAuth';
import { savedOpportunitySchema, SavedOpportunityInput } from '../schemas/saved-opportunities';
import {
  createSavedOpportunity,
  updateSavedOpportunity,
  deleteSavedOpportunity,
  convertToJob,
  setPriority,
} from '../repositories/saved-opportunities';

export async function saveOpportunity(data: SavedOpportunityInput) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = savedOpportunitySchema.parse(data);
  return createSavedOpportunity(user.id, validated);
}

export async function updateOpportunity(id: string, data: SavedOpportunityInput) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = savedOpportunitySchema.parse(data);
  return updateSavedOpportunity(id, user.id, validated);
}

export async function deleteOpportunity(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return deleteSavedOpportunity(id, user.id);
}

export async function convertToJobAction(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return convertToJob(id, user.id);
}

export async function setPriorityAction(id: string, priority: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return setPriority(id, user.id, priority);
}
