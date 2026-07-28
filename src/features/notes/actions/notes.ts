'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser } from '@/features/auth/hooks/useAuth';
import { getApplication } from '@/features/applications/repositories/applications';
import {
  getNotesByApplication as getNotesByApplicationRepo,
  getNotesByType as getNotesByTypeRepo,
  searchNotes as searchNotesRepo,
  createNote as createNoteRepo,
  updateNote as updateNoteRepo,
  deleteNote as deleteNoteRepo,
} from '../repositories/notes';

const VALID_NOTE_TYPES = ['general', 'interview', 'follow-up', 'feedback', 'contact'];

export async function createNoteAction(applicationId: string, content: string, type: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  if (!VALID_NOTE_TYPES.includes(type)) {
    return { error: 'Invalid note type' };
  }

  await createNoteRepo(applicationId, content, type);
  revalidatePath('/dashboard/applications/[id]');
}

export async function updateNoteAction(id: string, content: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  await updateNoteRepo(id, content);
  revalidatePath('/dashboard/applications/[id]');
}

export async function deleteNoteAction(id: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  await deleteNoteRepo(id);
  revalidatePath('/dashboard/applications/[id]');
}

export async function getNotesByApplicationAction(applicationId: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  const notes = await getNotesByApplicationRepo(applicationId);
  return { data: notes };
}

export async function getNotesByTypeAction(applicationId: string, type: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  const notes = await getNotesByTypeRepo(applicationId, type);
  return { data: notes };
}

export async function searchNotesAction(applicationId: string, query: string) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const application = await getApplication(applicationId, user.id);
  if (!application) {
    return { error: 'Application not found' };
  }

  const notes = await searchNotesRepo(applicationId, query);
  return { data: notes };
}
