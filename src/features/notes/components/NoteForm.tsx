'use client';

import { useState, useTransition } from 'react';
import { createNoteAction } from '../actions/notes';
import { NOTE_TYPES, type NoteType } from '../types';

interface NoteFormProps {
  applicationId: string;
  onNoteCreated: () => void;
}

export function NoteForm({ applicationId, onNoteCreated }: NoteFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<NoteType>('general');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    startTransition(async () => {
      await createNoteAction(applicationId, content.trim(), type);
      setContent('');
      setType('general');
      onNoteCreated();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <div className="flex gap-2 mb-3">
        {NOTE_TYPES.map((noteType) => (
          <button
            key={noteType.value}
            type="button"
            onClick={() => setType(noteType.value)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              type === noteType.value
                ? noteType.color
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {noteType.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows={2}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed self-end"
        >
          {isPending ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
}
