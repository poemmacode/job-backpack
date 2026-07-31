'use client';

import { useState } from 'react';
import { DateRange } from '../types/analytics';
import { AnalyticsFilters } from './AnalyticsFilters';
import { TrendChart } from './TrendChart';
import { FunnelChart } from './FunnelChart';
import { TopCompanies } from './TopCompanies';
import { TopSkills } from './TopSkills';
import { StageTime } from './StageTime';
import { ComparisonCard } from './ComparisonCard';
import type { AnalyticsData } from '../types/analytics';

interface AnalyticsPageClientProps {
  initialData: AnalyticsData;
  initialRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function AnalyticsPageClient({
  initialData,
  initialRange,
  onRangeChange,
}: AnalyticsPageClientProps) {
  const [data] = useState(initialData);

  return (
    <>
      <AnalyticsFilters selected={initialRange} onChange={onRangeChange} />

      <div className="mt-6">
        <TrendChart data={data.trend} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <FunnelChart data={data.funnel} />
        <StageTime times={data.stageTimes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopCompanies companies={data.topCompanies} />
        <TopSkills skills={data.topSkills} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <ComparisonCard
          label="Applications"
          comparison={data.comparisons.applications}
        />
        <ComparisonCard
          label="Interview Rate"
          comparison={data.comparisons.interviewRate}
          suffix="%"
        />
        <ComparisonCard
          label="Avg Response Time"
          comparison={data.comparisons.responseTime}
          suffix=" days"
        />
      </div>
    </>
  );
}
