'use client';

import { useState } from 'react';
import { saveOpportunity } from '../actions/saved-opportunities';

interface SaveButtonProps {
  title: string;
  company: string;
  location?: string | null;
  url?: string | null;
  salary?: string | null;
  source?: string | null;
  variant?: 'icon' | 'full';
}

export function SaveButton({
  title,
  company,
  location,
  url,
  salary,
  source,
  variant = 'icon',
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved || isLoading) return;

    setIsLoading(true);
    try {
      await saveOpportunity({
        title,
        company,
        location,
        url,
        salary,
        source,
        priority: 'normal',
      });
      setIsSaved(true);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSaved) {
    return variant === 'icon' ? (
      <span className="text-green-600 text-sm" title="Saved">
        ✓
      </span>
    ) : (
      <span className="text-green-600 text-sm font-medium">Saved</span>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="text-gray-400 hover:text-yellow-500 transition-colors disabled:opacity-50"
        title="Save for later"
      >
        {isLoading ? '...' : '☆'}
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className="text-sm text-gray-600 hover:text-yellow-600 font-medium disabled:opacity-50"
    >
      {isLoading ? 'Saving...' : 'Save for Later'}
    </button>
  );
}
