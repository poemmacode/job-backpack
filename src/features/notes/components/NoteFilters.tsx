'use client';

import { NOTE_TYPES, type NoteType } from '../types';

interface NoteFiltersProps {
  selectedType: NoteType | 'all';
  onTypeChange: (type: NoteType | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function NoteFilters({
  selectedType,
  onTypeChange,
  searchQuery,
  onSearchChange,
}: NoteFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => onTypeChange('all')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            selectedType === 'all'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {NOTE_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onTypeChange(type.value)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedType === type.value
                ? type.color
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:w-64 text-gray-900 placeholder-gray-500"
      />
    </div>
  );
}
