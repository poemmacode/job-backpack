'use client';

import { TrendPoint } from '../types/analytics';

interface TrendChartProps {
  data: TrendPoint[];
}

export function TrendChart({ data }: TrendChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Applications Over Time</h3>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <div className="flex items-end gap-1 h-48">
          {data.map((point, index) => {
            const height = maxCount > 0 ? (point.count / maxCount) * 100 : 0;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-xs text-gray-500">{point.count}</span>
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
                <span className="text-xs text-gray-400 truncate w-full text-center">
                  {point.period}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
