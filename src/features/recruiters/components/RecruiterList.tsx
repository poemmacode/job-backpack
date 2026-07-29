'use client';

import { useState } from 'react';
import { RecruiterCard } from './RecruiterCard';
import type { Recruiter } from '../types';

interface RecruiterListProps {
  recruiters: Recruiter[];
}

export function RecruiterList({ recruiters }: RecruiterListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecruiters = recruiters.filter((recruiter) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      recruiter.name.toLowerCase().includes(query) ||
      recruiter.company?.toLowerCase().includes(query) ||
      recruiter.email?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recruiters..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {filteredRecruiters.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchQuery ? 'No recruiters found matching your search.' : 'No recruiters yet.'}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRecruiters.map((recruiter) => (
            <RecruiterCard key={recruiter.id} recruiter={recruiter} />
          ))}
        </div>
      )}
    </div>
  );
}
