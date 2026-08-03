'use client';

import { useState } from 'react';
import { SavedOpportunity } from '../types/saved-opportunities';
import { SavedOpportunityList } from './SavedOpportunityList';
import { PriorityFilter } from './PriorityFilter';
import {
  deleteOpportunity,
  convertToJobAction,
  setPriorityAction,
} from '../actions/saved-opportunities';
import { useRouter } from 'next/navigation';

interface SavedOpportunitiesPageClientProps {
  initialOpportunities: SavedOpportunity[];
}

export function SavedOpportunitiesPageClient({
  initialOpportunities,
}: SavedOpportunitiesPageClientProps) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const filtered =
    filter === 'all'
      ? opportunities
      : opportunities.filter((o) => o.priority === filter);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteOpportunity(id);
      setOpportunities(opportunities.filter((o) => o.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvert = async (id: string) => {
    setIsLoading(true);
    try {
      await convertToJobAction(id);
      setOpportunities(opportunities.filter((o) => o.id !== id));
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriorityChange = async (id: string, priority: string) => {
    setIsLoading(true);
    try {
      await setPriorityAction(id, priority);
      setOpportunities(
        opportunities.map((o) => (o.id === id ? { ...o, priority } : o))
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Opportunities</h1>
          <p className="text-gray-600 mt-1">
            {opportunities.length} opportunit{opportunities.length === 1 ? 'y' : 'ies'} saved
          </p>
        </div>
      </div>

      <PriorityFilter selected={filter} onChange={setFilter} />

      <SavedOpportunityList
        opportunities={filtered}
        onDelete={handleDelete}
        onConvert={handleConvert}
        onPriorityChange={handlePriorityChange}
        isLoading={isLoading}
      />
    </>
  );
}
