'use server';

import { getUser } from '@/features/auth/hooks/useAuth';
import { searchProfileSchema, SearchProfileInput } from '../schemas/search-profiles';
import {
  createSearchProfile,
  updateSearchProfile,
  deleteSearchProfile,
  setDefaultProfile,
} from '../repositories/search-profiles';

export async function createProfile(data: SearchProfileInput) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = searchProfileSchema.parse(data);
  return createSearchProfile(user.id, validated);
}

export async function updateProfile(id: string, data: SearchProfileInput) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = searchProfileSchema.parse(data);
  return updateSearchProfile(id, user.id, validated);
}

export async function deleteProfile(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return deleteSearchProfile(id, user.id);
}

export async function setAsDefault(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return setDefaultProfile(id, user.id);
}
