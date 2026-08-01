'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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
}

export function AnalyticsPageClient({
  initialData,
  initialRange,
}: AnalyticsPageClientProps) {
  const router = useRouter();

  const handleRangeChange = (range: DateRange) => {
    router.push(`/dashboard/analytics?range=${range}`);
  };

  return (
    <>
      <AnalyticsFilters selected={initialRange} onChange={handleRangeChange} />

      <div className="mt-6">
        <TrendChart data={initialData.trend} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <FunnelChart data={initialData.funnel} />
        <StageTime times={initialData.stageTimes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopCompanies companies={initialData.topCompanies} />
        <TopSkills skills={initialData.topSkills} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <ComparisonCard
          label="Applications"
          comparison={initialData.comparisons.applications}
        />
        <ComparisonCard
          label="Interview Rate"
          comparison={initialData.comparisons.interviewRate}
          suffix="%"
        />
        <ComparisonCard
          label="Avg Response Time"
          comparison={initialData.comparisons.responseTime}
          suffix=" days"
        />
      </div>
    </>
  );
}
