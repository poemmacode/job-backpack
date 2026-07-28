'use client';

import type { JobFilters as JobFiltersType } from '../utils/filterJobs';

interface JobFiltersProps {
  filters: JobFiltersType;
  companies: string[];
  locations: string[];
  onFilterChange: <K extends keyof JobFiltersType>(key: K, value: JobFiltersType[K]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function JobFilters({
  filters,
  companies,
  locations,
  onFilterChange,
  onClear,
  hasActiveFilters,
}: JobFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select
        value={filters.company}
        onChange={(e) => onFilterChange('company', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Companies</option>
        {companies.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>

      <select
        value={filters.location}
        onChange={(e) => onFilterChange('location', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select
        value={filters.dateRange}
        onChange={(e) => onFilterChange('dateRange', e.target.value as JobFiltersType['dateRange'])}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Time</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
      </select>

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
