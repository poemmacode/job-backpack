'use client';

import { SearchResultItem } from './SearchResultItem';
import type { SearchResults as SearchResultsType, SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResultsType;
  isLoading: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
}

function flattenResults(results: SearchResultsType): SearchResult[] {
  const items: SearchResult[] = [];

  results.jobs.forEach((job) => {
    items.push({
      id: job.id,
      type: 'job',
      title: job.title,
      subtitle: job.company,
      href: `/dashboard/jobs/${job.id}`,
    });
  });

  results.applications.forEach((app) => {
    items.push({
      id: app.id,
      type: 'application',
      title: app.job.company,
      subtitle: app.status,
      href: `/dashboard/applications/${app.id}`,
    });
  });

  results.notes.forEach((note) => {
    items.push({
      id: note.id,
      type: 'note',
      title: note.content.slice(0, 50) + (note.content.length > 50 ? '...' : ''),
      subtitle: `${note.application.job.company} - ${note.type}`,
      href: `/dashboard/applications/${note.application.id}`,
    });
  });

  results.recruiters.forEach((recruiter) => {
    items.push({
      id: recruiter.id,
      type: 'recruiter',
      title: recruiter.name,
      subtitle: recruiter.company || recruiter.email || '',
      href: '/dashboard/recruiters',
    });
  });

  return items;
}

function getTotalCount(results: SearchResultsType): number {
  return (
    results.jobs.length +
    results.applications.length +
    results.notes.length +
    results.recruiters.length
  );
}

export function SearchResults({
  results,
  isLoading,
  selectedIndex,
  onSelect,
  onHover,
}: SearchResultsProps) {
  const flatResults = flattenResults(results);
  const totalCount = getTotalCount(results);

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
      </div>
    );
  }

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {results.jobs.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase">
              Jobs ({results.jobs.length})
            </span>
          </div>
          {results.jobs.map((job) => {
            const index = flatResults.findIndex((r) => r.id === job.id && r.type === 'job');
            return (
              <SearchResultItem
                key={job.id}
                result={flatResults[index]}
                isSelected={selectedIndex === index}
                onSelect={() => onSelect(index)}
                onHover={() => onHover(index)}
              />
            );
          })}
        </div>
      )}

      {results.applications.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase">
              Applications ({results.applications.length})
            </span>
          </div>
          {results.applications.map((app) => {
            const index = flatResults.findIndex(
              (r) => r.id === app.id && r.type === 'application'
            );
            return (
              <SearchResultItem
                key={app.id}
                result={flatResults[index]}
                isSelected={selectedIndex === index}
                onSelect={() => onSelect(index)}
                onHover={() => onHover(index)}
              />
            );
          })}
        </div>
      )}

      {results.notes.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase">
              Notes ({results.notes.length})
            </span>
          </div>
          {results.notes.map((note) => {
            const index = flatResults.findIndex((r) => r.id === note.id && r.type === 'note');
            return (
              <SearchResultItem
                key={note.id}
                result={flatResults[index]}
                isSelected={selectedIndex === index}
                onSelect={() => onSelect(index)}
                onHover={() => onHover(index)}
              />
            );
          })}
        </div>
      )}

      {results.recruiters.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase">
              Recruiters ({results.recruiters.length})
            </span>
          </div>
          {results.recruiters.map((recruiter) => {
            const index = flatResults.findIndex(
              (r) => r.id === recruiter.id && r.type === 'recruiter'
            );
            return (
              <SearchResultItem
                key={recruiter.id}
                result={flatResults[index]}
                isSelected={selectedIndex === index}
                onSelect={() => onSelect(index)}
                onHover={() => onHover(index)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
