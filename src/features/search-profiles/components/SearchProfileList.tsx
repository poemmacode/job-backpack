'use client';

import { SearchProfile } from '../types/search-profiles';
import { SearchProfileCard } from './SearchProfileCard';

interface SearchProfileListProps {
  profiles: SearchProfile[];
  onEdit: (profile: SearchProfile) => void;
  onDelete: (profile: SearchProfile) => void;
  onSetDefault: (id: string) => void;
  isLoading: boolean;
}

export function SearchProfileList({
  profiles,
  onEdit,
  onDelete,
  onSetDefault,
  isLoading,
}: SearchProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No search profiles yet</h3>
        <p className="text-gray-500 mb-4">
          Create your first profile to organize your job search preferences
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map((profile) => (
        <SearchProfileCard
          key={profile.id}
          profile={profile}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
