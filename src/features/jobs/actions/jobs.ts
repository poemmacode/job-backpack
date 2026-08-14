'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser } from '@/features/auth/hooks/useAuth';
import { createJob, updateJob, deleteJob } from '../repositories/jobs';
import { createJobSchema, updateJobSchema } from '../schemas/jobs';

export async function createJobAction(formData: FormData) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const validatedFields = createJobSchema.safeParse({
    title: formData.get('title'),
    company: formData.get('company'),
    location: formData.get('location'),
    url: formData.get('url'),
    salary: formData.get('salary'),
    notes: formData.get('notes'),
    englishRequired: formData.get('englishRequired') === 'on',
    englishLevel: formData.get('englishLevel'),
    employmentType: formData.get('employmentType'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await createJob(validatedFields.data, user.id);
  redirect('/dashboard/jobs');
}

export async function updateJobAction(id: string, formData: FormData) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const validatedFields = updateJobSchema.safeParse({
    title: formData.get('title'),
    company: formData.get('company'),
    location: formData.get('location'),
    url: formData.get('url'),
    salary: formData.get('salary'),
    notes: formData.get('notes'),
    englishRequired: formData.get('englishRequired') === 'on',
    englishLevel: formData.get('englishLevel'),
    employmentType: formData.get('employmentType'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await updateJob(id, validatedFields.data, user.id);
  redirect(`/dashboard/jobs/${id}`);
}

export async function deleteJobAction(id: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  await deleteJob(id, user.id);
  revalidatePath('/dashboard/jobs');
}
