'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase-server';
import { getUser } from '@/features/auth/hooks/useAuth';
import { updateUser } from '@/features/auth/repositories/users';

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export async function updateProfileAction(data: { name: string }) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const validated = updateProfileSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  await updateUser(user.id, { name: validated.data.name });
  revalidatePath('/dashboard/profile');
  revalidatePath('/dashboard');
  return { success: 'Profile updated successfully' };
}

export async function changePasswordAction(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const validated = changePasswordSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: validated.data.newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: 'Password updated successfully' };
}
