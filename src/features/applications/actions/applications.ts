'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser } from '@/features/auth/hooks/useAuth';
import {
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from '../repositories/applications';

const VALID_STATUSES = ['interested', 'applied', 'interview', 'offer', 'rejected'];

export async function createApplicationAction(jobId: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  await createApplication(jobId, user.id);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
}

export async function updateApplicationStatusAction(id: string, status: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  if (!VALID_STATUSES.includes(status)) {
    return { error: 'Invalid status' };
  }

  await updateApplicationStatus(id, status, user.id);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
}

export async function deleteApplicationAction(id: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  await deleteApplication(id, user.id);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/applications');
}
