'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '../hooks/useDebounce';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { searchGlobalAction } from '../actions/search';
import { SearchResults } from './SearchResults';
import type { SearchResults as SearchResultsType, SearchResult } from '../types';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultsType>({
    jobs: [],
    applications: [],
    notes: [],
    recruiters: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 300);

  const flattenResults = useCallback(() => {
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
  }, [results]);

  const handleSelect = useCallback(
    (index: number) => {
      const items = flattenResults();
      if (items[index]) {
        router.push(items[index].href);
        setQuery('');
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [flattenResults, router]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    inputRef.current?.blur();
  }, []);

  const totalResults =
    results.jobs.length +
    results.applications.length +
    results.notes.length +
    results.recruiters.length;

  const { selectedIndex, handleKeyDown, resetIndex } = useKeyboardNavigation({
    itemCount: totalResults,
    onSelect: handleSelect,
    onClose: handleClose,
  });

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      return;
    }

    let cancelled = false;

    searchGlobalAction(debouncedQuery).then((res) => {
      if (!cancelled) {
        setResults(res);
        setIsLoading(false);
        setIsOpen(true);
        resetIndex();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, resetIndex]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length >= 2) {
      setIsLoading(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (query.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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

      {isOpen && (
        <SearchResults
          results={results}
          isLoading={isLoading}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          onHover={resetIndex}
        />
      )}
    </div>
  );
}
