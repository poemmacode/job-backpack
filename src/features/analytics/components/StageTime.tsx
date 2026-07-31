'use client';

import { StageTime as StageTimeType } from '../types/analytics';

interface StageTimeProps {
  times: StageTimeType[];
}

export function StageTime({ times }: StageTimeProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Average Time per Stage</h3>

      {times.length === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <div className="space-y-4">
          {times.map((item) => (
            <div key={item.stage}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{item.stage}</span>
                <span className="font-medium text-gray-900">
                  {item.avgDays > 0 ? `${item.avgDays} days` : 'N/A'}
                </span>
              </div>
              {item.avgDays > 0 && (
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min((item.avgDays / 30) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
