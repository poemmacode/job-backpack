'use client';

import { NoteCard } from './NoteCard';
import type { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  onNoteUpdated: () => void;
  onNoteDeleted: () => void;
}

export function NoteList({ notes, onNoteUpdated, onNoteDeleted }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No notes yet. Add your first note above.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onNoteUpdated={onNoteUpdated}
          onNoteDeleted={onNoteDeleted}
        />
      ))}
    </div>
  );
}
