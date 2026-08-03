'use client';

import { SavedOpportunity } from '../types/saved-opportunities';
import { SavedOpportunityCard } from './SavedOpportunityCard';

interface SavedOpportunityListProps {
  opportunities: SavedOpportunity[];
  onDelete: (id: string) => void;
  onConvert: (id: string) => void;
  onPriorityChange: (id: string, priority: string) => void;
  isLoading: boolean;
}

export function SavedOpportunityList({
  opportunities,
  onDelete,
  onConvert,
  onPriorityChange,
  isLoading,
}: SavedOpportunityListProps) {
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No saved opportunities
        </h3>
        <p className="text-gray-500">
          Save jobs from the scraper or job listings to review later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {opportunities.map((opportunity) => (
        <SavedOpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          onDelete={onDelete}
          onConvert={onConvert}
          onPriorityChange={onPriorityChange}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
