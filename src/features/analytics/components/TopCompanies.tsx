'use client';

import { TopCompany } from '../types/analytics';

interface TopCompaniesProps {
  companies: TopCompany[];
}

export function TopCompanies({ companies }: TopCompaniesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Top Companies</h3>

      {companies.length === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <div className="space-y-3">
          {companies.map((item, index) => (
            <div key={item.company} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-400 w-5">{index + 1}</span>
                <span className="text-sm text-gray-700">{item.company}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
