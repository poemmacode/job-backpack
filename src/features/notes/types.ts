import type { Note } from '@prisma/client';

export type { Note };
export type NoteType = 'general' | 'interview' | 'follow-up' | 'feedback' | 'contact';

export interface NoteWithType extends Note {
  type: NoteType;
}

export const NOTE_TYPES: { value: NoteType; label: string; color: string }[] = [
  { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-700' },
  { value: 'interview', label: 'Interview', color: 'bg-blue-100 text-blue-700' },
  { value: 'follow-up', label: 'Follow-up', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'feedback', label: 'Feedback', color: 'bg-green-100 text-green-700' },
  { value: 'contact', label: 'Contact', color: 'bg-purple-100 text-purple-700' },
];
