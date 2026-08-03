'use client';

import { JobResult } from '../types/scraper';

interface ScraperResultCardProps {
  job: JobResult;
  isSelected: boolean;
  onToggle: () => void;
}

const SOURCE_COLORS: Record<string, string> = {
  indeed: 'bg-blue-100 text-blue-700',
  glassdoor: 'bg-green-100 text-green-700',
};

export function ScraperResultCard({ job, isSelected, onToggle }: ScraperResultCardProps) {
  return (
    <div
      className={`bg-white rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                SOURCE_COLORS[job.source] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {job.source}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">{job.company}</p>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            {job.location && <span>📍 {job.location}</span>}
            {job.salary && <span>💰 {job.salary}</span>}
          </div>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
        >
          View →
        </a>
      </div>
    </div>
  );
}
