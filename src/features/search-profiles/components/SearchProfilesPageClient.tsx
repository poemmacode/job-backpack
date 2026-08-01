'use client';

import { useState } from 'react';
import { SearchProfile } from '../types/search-profiles';
import { SearchProfileList } from './SearchProfileList';
import { SearchProfileForm } from './SearchProfileForm';
import { DeleteProfileDialog } from './DeleteProfileDialog';
import { createProfile, updateProfile, deleteProfile, setAsDefault } from '../actions/search-profiles';

interface SearchProfilesPageClientProps {
  initialProfiles: SearchProfile[];
}

export function SearchProfilesPageClient({ initialProfiles }: SearchProfilesPageClientProps) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<SearchProfile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<SearchProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = () => {
    setEditingProfile(null);
    setIsFormOpen(true);
  };

  const handleEdit = (profile: SearchProfile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: Parameters<typeof createProfile>[0]) => {
    setIsLoading(true);
    try {
      if (editingProfile) {
        const updated = await updateProfile(editingProfile.id, data);
        setProfiles(profiles.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await createProfile(data);
        setProfiles([created, ...profiles]);
      }
      setIsFormOpen(false);
      setEditingProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (profile: SearchProfile) => {
    setDeletingProfile(profile);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProfile) return;
    setIsLoading(true);
    try {
      await deleteProfile(deletingProfile.id);
      setProfiles(profiles.filter((p) => p.id !== deletingProfile.id));
      setDeletingProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    setIsLoading(true);
    try {
      await setAsDefault(id);
      setProfiles(
        profiles.map((p) => ({
          ...p,
          isDefault: p.id === id,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Search Profiles</h1>
          <p className="text-gray-600 mt-1">Define your job search preferences</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + New Profile
        </button>
      </div>

      <SearchProfileList
        profiles={profiles}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onSetDefault={handleSetDefault}
        isLoading={isLoading}
      />

      {isFormOpen && (
        <SearchProfileForm
          profile={editingProfile}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProfile(null);
          }}
          isLoading={isLoading}
        />
      )}

      {deletingProfile && (
        <DeleteProfileDialog
          profileName={deletingProfile.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingProfile(null)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
