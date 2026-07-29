'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getUser } from '@/features/auth/hooks/useAuth';
import { getApplication } from '@/features/applications/repositories/applications';
import {
  getRecruiters as getRecruitersRepo,
  getRecruiter as getRecruiterRepo,
  createRecruiter as createRecruiterRepo,
  updateRecruiter as updateRecruiterRepo,
  deleteRecruiter as deleteRecruiterRepo,
  getRecruitersByApplication as getRecruitersByApplicationRepo,
  getApplicationsByRecruiter as getApplicationsByRecruiterRepo,
  associateRecruiter as associateRecruiterRepo,
  disassociateRecruiter as disassociateRecruiterRepo,
  searchRecruiters as searchRecruitersRepo,
} from '../repositories/recruiters';
import { RECRUITER_ROLES } from '../types';

const createRecruiterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  linkedIn: z.string().url('Invalid URL').optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
});

const updateRecruiterSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  linkedIn: z.string().url('Invalid URL').optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
});

export async function getRecruitersAction() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const recruiters = await getRecruitersRepo(user.id);
  return { data: recruiters };
}

export async function getRecruiterAction(id: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const recruiter = await getRecruiterRepo(id, user.id);
  if (!recruiter) {
    return { error: 'Recruiter not found' };
  }

  return { data: recruiter };
}

export async function createRecruiterAction(data: {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  linkedIn?: string;
  notes?: string;
}) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const validated = createRecruiterSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { name, email, phone, company, linkedIn, notes } = validated.data;
  const recruiter = await createRecruiterRepo(user.id, {
    name,
    email: email || undefined,
    phone: phone || undefined,
    company: company || undefined,
    linkedIn: linkedIn || undefined,
    notes: notes || undefined,
  });

  revalidatePath('/dashboard/recruiters');
  return { data: recruiter };
}

export async function updateRecruiterAction(
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    linkedIn?: string;
    notes?: string;
  }
) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const validated = updateRecruiterSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const recruiter = await updateRecruiterRepo(id, user.id, validated.data);
  revalidatePath('/dashboard/recruiters');
  revalidatePath(`/dashboard/recruiters/${id}`);
  return { data: recruiter };
}

export async function deleteRecruiterAction(id: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  await deleteRecruiterRepo(id, user.id);
  revalidatePath('/dashboard/recruiters');
  return { success: true };
}

export async function getRecruitersByApplicationAction(applicationId: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  const recruiters = await getRecruitersByApplicationRepo(applicationId);
  return { data: recruiters };
}

export async function getApplicationsByRecruiterAction(recruiterId: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const recruiter = await getRecruiterRepo(recruiterId, user.id);
  if (!recruiter) {
    return { error: 'Recruiter not found' };
  }

  const applications = await getApplicationsByRecruiterRepo(recruiterId);
  return { data: applications };
}

export async function associateRecruiterAction(
  applicationId: string,
  recruiterId: string,
  role?: string
) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  const recruiter = await getRecruiterRepo(recruiterId, user.id);
  if (!recruiter) {
    return { error: 'Recruiter not found' };
  }

  if (role && !RECRUITER_ROLES.includes(role as typeof RECRUITER_ROLES[number])) {
    return { error: 'Invalid role' };
  }

  const association = await associateRecruiterRepo(applicationId, recruiterId, role);
  revalidatePath(`/dashboard/applications/${applicationId}`);
  return { data: association };
}

export async function disassociateRecruiterAction(applicationId: string, recruiterId: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  await disassociateRecruiterRepo(applicationId, recruiterId);
  revalidatePath(`/dashboard/applications/${applicationId}`);
  return { success: true };
}

export async function searchRecruitersAction(query: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const recruiters = await searchRecruitersRepo(user.id, query);
  return { data: recruiters };
}
