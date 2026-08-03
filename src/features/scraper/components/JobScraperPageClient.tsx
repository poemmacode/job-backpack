'use client';

import { useState } from 'react';
import { ScraperSource, JobResult } from '../types/scraper';
import { ScraperSearchForm } from './ScraperSearchForm';
import { ScraperResults } from './ScraperResults';
import { searchJobs, importJobs } from '../actions/scraper';

export function JobScraperPageClient() {
  const [results, setResults] = useState<JobResult[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [importedCount, setImportedCount] = useState<number | null>(null);

  const handleSearch = async (source: ScraperSource, query: string, location: string) => {
    setIsLoading(true);
    setError('');
    setResults([]);
    setSelectedJobs(new Set());
    setImportedCount(null);

    try {
      const data = await searchJobs(source, query, location);
      setResults(data.jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSelect = (index: number) => {
    setSelectedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedJobs.size === results.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(results.map((_, i) => i)));
    }
  };

  const handleImport = async () => {
    const jobsToImport = Array.from(selectedJobs).map((i) => results[i]);
    if (jobsToImport.length === 0) return;

    setIsLoading(true);
    try {
      const result = await importJobs(jobsToImport);
      setImportedCount(result.imported);
      setSelectedJobs(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Scraper</h1>
        <p className="text-gray-600 mt-1">
          Search and import jobs from external sources
        </p>
      </div>

      <ScraperSearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {importedCount !== null && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Successfully imported {importedCount} job{importedCount !== 1 ? 's' : ''}
        </div>
      )}

      {results.length > 0 && (
        <ScraperResults
          results={results}
          selectedJobs={selectedJobs}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onImport={handleImport}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
