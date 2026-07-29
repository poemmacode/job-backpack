'use client';

import type { SearchResult, SearchResultType } from '../types';

interface SearchResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

const TYPE_ICONS: Record<SearchResultType, string> = {
  job: '💼',
  application: '📋',
  note: '📝',
  recruiter: '👤',
};

const TYPE_COLORS: Record<SearchResultType, string> = {
  job: 'text-blue-600',
  application: 'text-purple-600',
  note: 'text-yellow-600',
  recruiter: 'text-green-600',
};

export function SearchResultItem({
  result,
  isSelected,
  onSelect,
  onHover,
}: SearchResultItemProps) {
  return (
    <a
      href={result.href}
      onClick={(e) => {
        e.preventDefault();
        onSelect();
      }}
      onMouseEnter={onHover}
      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <span className="text-lg">{TYPE_ICONS[result.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
        <p className={`text-xs ${TYPE_COLORS[result.type]}`}>{result.subtitle}</p>
      </div>
    </a>
  );
}
