'use client';

import { PeriodComparison } from '../types/analytics';

interface ComparisonCardProps {
  label: string;
  comparison: PeriodComparison;
  suffix?: string;
}

export function ComparisonCard({ label, comparison, suffix = '' }: ComparisonCardProps) {
  const { changePercent, direction } = comparison;

  const directionIcon = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  const directionColor =
    direction === 'up'
      ? 'text-green-600'
      : direction === 'down'
        ? 'text-red-600'
        : 'text-gray-500';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {comparison.current}{suffix}
      </p>
      <p className={`text-xs mt-1 ${directionColor}`}>
        {directionIcon} {Math.abs(changePercent)}% vs previous period
      </p>
    </div>
  );
}
