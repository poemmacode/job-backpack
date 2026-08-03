'use client';

import { JobResult } from '../types/scraper';
import { ScraperResultCard } from './ScraperResultCard';

interface ScraperResultsProps {
  results: JobResult[];
  selectedJobs: Set<number>;
  onToggleSelect: (index: number) => void;
  onSelectAll: () => void;
  onImport: () => void;
  isLoading: boolean;
}

export function ScraperResults({
  results,
  selectedJobs,
  onToggleSelect,
  onSelectAll,
  onImport,
  isLoading,
}: ScraperResultsProps) {
  const allSelected = selectedJobs.size === results.length;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Results ({results.length} found)
          </h2>
          <button
            onClick={onSelectAll}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <button
          onClick={onImport}
          disabled={selectedJobs.size === 0 || isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Import Selected ({selectedJobs.size})
        </button>
      </div>

      <div className="space-y-3">
        {results.map((job, index) => (
          <ScraperResultCard
            key={index}
            job={job}
            isSelected={selectedJobs.has(index)}
            onToggle={() => onToggleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}
