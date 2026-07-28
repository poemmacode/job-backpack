'use client';

import { useState, useCallback, useEffect, useTransition } from 'react';
import { getNotesByApplication, getNotesByType, searchNotes } from '../repositories/notes';
import { NoteForm } from './NoteForm';
import { NoteList } from './NoteList';
import { NoteFilters } from './NoteFilters';
import type { Note, NoteType } from '../types';

interface NoteSectionProps {
  applicationId: string;
  initialNotes: Note[];
}

export function NoteSection({ applicationId, initialNotes }: NoteSectionProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedType, setSelectedType] = useState<NoteType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const fetchNotes = useCallback(async () => {
    let fetchedNotes: Note[];

    if (searchQuery) {
      fetchedNotes = await searchNotes(applicationId, searchQuery);
    } else if (selectedType !== 'all') {
      fetchedNotes = await getNotesByType(applicationId, selectedType);
    } else {
      fetchedNotes = await getNotesByApplication(applicationId);
    }

    setNotes(fetchedNotes);
  }, [applicationId, selectedType, searchQuery]);

  useEffect(() => {
    startTransition(async () => {
      await fetchNotes();
    });
  }, [fetchNotes]);

  function handleNoteCreated() {
    fetchNotes();
  }

  function handleNoteUpdated() {
    fetchNotes();
  }

  function handleNoteDeleted() {
    fetchNotes();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notes ({notes.length})</h3>
      </div>

      <NoteForm applicationId={applicationId} onNoteCreated={handleNoteCreated} />

      <NoteFilters
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {isPending ? (
        <div className="text-center py-8 text-gray-500 text-sm">Loading notes...</div>
      ) : (
        <NoteList
          notes={notes}
          onNoteUpdated={handleNoteUpdated}
          onNoteDeleted={handleNoteDeleted}
        />
      )}
    </div>
  );
}
