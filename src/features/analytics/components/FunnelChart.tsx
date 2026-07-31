'use client';

import { FunnelData } from '../types/analytics';

interface FunnelChartProps {
  data: FunnelData;
}

const STAGES = [
  { key: 'applied' as const, label: 'Applied', color: 'bg-blue-500' },
  { key: 'screening' as const, label: 'Screening', color: 'bg-yellow-500' },
  { key: 'interview' as const, label: 'Interview', color: 'bg-purple-500' },
  { key: 'offer' as const, label: 'Offer', color: 'bg-green-500' },
];

export function FunnelChart({ data }: FunnelChartProps) {
  const maxValue = Math.max(data.applied, 1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Conversion Funnel</h3>

      <div className="space-y-3">
        {STAGES.map((stage) => {
          const value = data[stage.key];
          const width = maxValue > 0 ? (value / maxValue) * 100 : 0;

          return (
            <div key={stage.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{stage.label}</span>
                <span className="text-gray-500">{value}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className={`${stage.color} h-3 rounded-full transition-all`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Overall conversion</span>
          <span className="font-medium text-gray-900">{data.rates.overall}%</span>
        </div>
      </div>
    </div>
  );
}
