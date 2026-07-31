export type DateRange = 'week' | 'month' | '3months' | '6months' | 'year';

export interface TrendPoint {
  period: string;
  count: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  rate: number;
}

export interface FunnelData {
  applied: number;
  screening: number;
  interview: number;
  offer: number;
  rates: {
    appliedToScreening: number;
    screeningToInterview: number;
    interviewToOffer: number;
    overall: number;
  };
}

export interface TopCompany {
  company: string;
  count: number;
}

export interface TopSkill {
  skill: string;
  count: number;
}

export interface StageTime {
  stage: string;
  avgDays: number;
}

export interface PeriodComparison {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  direction: 'up' | 'down' | 'same';
}

export interface AnalyticsData {
  trend: TrendPoint[];
  funnel: FunnelData;
  topCompanies: TopCompany[];
  topSkills: TopSkill[];
  stageTimes: StageTime[];
  comparisons: {
    applications: PeriodComparison;
    interviewRate: PeriodComparison;
    responseTime: PeriodComparison;
  };
}
