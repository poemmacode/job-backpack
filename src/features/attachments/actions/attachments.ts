'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser } from '@/features/auth/hooks/useAuth';
import { getApplication } from '@/features/applications/repositories/applications';
import { createClient } from '@/lib/supabase-server';
import {
  createAttachment as createAttachmentRepo,
  deleteAttachment as deleteAttachmentRepo,
} from '../repositories/attachments';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../types';

export async function uploadAttachment(applicationId: string, formData: FormData) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  const file = formData.get('file') as File;
  if (!file) {
    return { error: 'No file provided' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: 'File size must be less than 10MB' };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { error: 'File type not allowed. Allowed: PDF, DOC, DOCX, JPG, PNG' };
  }

  const supabase = await createClient();
  const fileName = `${applicationId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage.from('attachments').upload(fileName, file);

  if (uploadError) {
    return { error: 'Failed to upload file' };
  }

  const { data: urlData } = supabase.storage.from('attachments').getPublicUrl(fileName);
  const publicUrl = urlData.publicUrl;

  await createAttachmentRepo(applicationId, file.name, publicUrl, file.size, file.type);

  revalidatePath('/dashboard/applications/[id]');
}

export async function deleteAttachmentAction(id: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const supabase = await createClient();
  const { data: attachment } = await supabase.storage.from('attachments').list();

  // Find and delete from storage
  const file = attachment?.find((f) => f.name.includes(id));
  if (file) {
    await supabase.storage.from('attachments').remove([file.name]);
  }

  await deleteAttachmentRepo(id);
  revalidatePath('/dashboard/applications/[id]');
}
