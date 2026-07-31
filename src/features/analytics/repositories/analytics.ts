import { prisma } from '@/lib/prisma';
import {
  TrendPoint,
  FunnelData,
  TopCompany,
  TopSkill,
  StageTime,
  PeriodComparison,
  AnalyticsData,
} from '../types/analytics';
import { getDateRange, getGroupByInterval, formatDateByInterval } from '../utils/date-range';
import { DateRange } from '../types/analytics';

export async function getApplicationsByPeriod(
  userId: string,
  startDate: Date,
  endDate: Date,
  interval: 'day' | 'week' | 'month'
): Promise<TrendPoint[]> {
  const applications = await prisma.application.findMany({
    where: {
      userId,
      createdAt: { gte: startDate, lte: endDate },
    },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  const grouped: Record<string, number> = {};

  applications.forEach((app) => {
    const key = formatDateByInterval(app.createdAt, interval);
    grouped[key] = (grouped[key] || 0) + 1;
  });

  const result: TrendPoint[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const key = formatDateByInterval(current, interval);
    result.push({ period: key, count: grouped[key] || 0 });

    if (interval === 'day') {
      current.setDate(current.getDate() + 1);
    } else if (interval === 'week') {
      current.setDate(current.getDate() + 7);
    } else {
      current.setMonth(current.getMonth() + 1);
    }
  }

  return result;
}

export async function getFunnelData(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<FunnelData> {
  const statusCounts = await prisma.application.groupBy({
    by: ['status'],
    where: {
      userId,
      createdAt: { gte: startDate, lte: endDate },
    },
    _count: true,
  });

  const counts = statusCounts.reduce(
    (acc, item) => {
      acc[item.status] = item._count;
      return acc;
    },
    {} as Record<string, number>
  );

  const applied = (counts['applied'] || 0) + (counts['interested'] || 0);
  const screening = counts['screening'] || 0;
  const interview = counts['interview'] || 0;
  const offer = counts['offer'] || 0;

  const rates = {
    appliedToScreening: applied > 0 ? Math.round((screening / applied) * 100) : 0,
    screeningToInterview: screening > 0 ? Math.round((interview / screening) * 100) : 0,
    interviewToOffer: interview > 0 ? Math.round((offer / interview) * 100) : 0,
    overall: applied > 0 ? Math.round((offer / applied) * 100) : 0,
  };

  return { applied, screening, interview, offer, rates };
}

export async function getTopCompanies(
  userId: string,
  limit: number = 5
): Promise<TopCompany[]> {
  const results = await prisma.application.groupBy({
    by: ['jobId'],
    where: { userId },
    _count: true,
  });

  const jobIds = results.map((r) => r.jobId);
  const jobs = await prisma.job.findMany({
    where: { id: { in: jobIds } },
    select: { id: true, company: true },
  });

  const jobCompanyMap = new Map(jobs.map((j) => [j.id, j.company]));
  const companyCounts: Record<string, number> = {};

  results.forEach((r) => {
    const company = jobCompanyMap.get(r.jobId) || 'Unknown';
    companyCounts[company] = (companyCounts[company] || 0) + r._count;
  });

  return Object.entries(companyCounts)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

const SKILL_KEYWORDS = [
  'react', 'vue', 'angular', 'svelte', 'nextjs', 'next.js',
  'node', 'nodejs', 'node.js', 'express', 'fastify',
  'typescript', 'javascript', 'python', 'java', 'go', 'golang', 'rust', 'ruby',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s',
  'postgresql', 'postgres', 'mysql', 'mongodb', 'redis',
  'graphql', 'rest', 'api',
  'sql', 'nosql',
  'html', 'css', 'tailwind', 'sass',
  'git', 'ci/cd', 'devops',
  'react native', 'flutter', 'swift', 'kotlin',
  'machine learning', 'ml', 'ai', 'data science',
  'agile', 'scrum',
];

export async function getTopSkills(
  userId: string,
  limit: number = 5
): Promise<TopSkill[]> {
  const applications = await prisma.application.findMany({
    where: { userId },
    include: { job: { select: { title: true } } },
  });

  const skillCounts: Record<string, number> = {};

  applications.forEach((app) => {
    const title = app.job.title.toLowerCase();
    SKILL_KEYWORDS.forEach((skill) => {
      if (title.includes(skill.toLowerCase())) {
        const normalized = skill.toUpperCase();
        skillCounts[normalized] = (skillCounts[normalized] || 0) + 1;
      }
    });
  });

  return Object.entries(skillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getStageTimeAverages(userId: string): Promise<StageTime[]> {
  const applications = await prisma.application.findMany({
    where: { userId },
    include: {
      notes: {
        select: { type: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  const stageDurations: Record<string, number[]> = {
    'Applied → Screening': [],
    'Screening → Interview': [],
    'Interview → Offer': [],
  };

  applications.forEach((app) => {
    const notes = app.notes;
    if (notes.length < 2) return;

    for (let i = 0; i < notes.length - 1; i++) {
      const current = notes[i];
      const next = notes[i + 1];
      const daysDiff =
        (next.createdAt.getTime() - current.createdAt.getTime()) / (1000 * 60 * 60 * 24);

      if (current.type === 'applied' && next.type === 'screening') {
        stageDurations['Applied → Screening'].push(daysDiff);
      } else if (current.type === 'screening' && next.type === 'interview') {
        stageDurations['Screening → Interview'].push(daysDiff);
      } else if (current.type === 'interview' && next.type === 'offer') {
        stageDurations['Interview → Offer'].push(daysDiff);
      }
    }
  });

  return Object.entries(stageDurations).map(([stage, durations]) => ({
    stage,
    avgDays:
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : 0,
  }));
}

export async function getPeriodComparison(
  userId: string,
  currentValue: number,
  previousValue: number
): Promise<PeriodComparison> {
  const change = currentValue - previousValue;
  const changePercent = previousValue > 0 ? Math.round((change / previousValue) * 100) : 0;

  return {
    current: currentValue,
    previous: previousValue,
    change,
    changePercent,
    direction: change > 0 ? 'up' : change < 0 ? 'down' : 'same',
  };
}

export async function getAnalyticsData(
  userId: string,
  dateRange: DateRange
): Promise<AnalyticsData> {
  const { start, end } = getDateRange(dateRange);
  const interval = getGroupByInterval(dateRange);

  const [trend, funnel, topCompanies, topSkills, stageTimes] = await Promise.all([
    getApplicationsByPeriod(userId, start, end, interval),
    getFunnelData(userId, start, end),
    getTopCompanies(userId, 5),
    getTopSkills(userId, 5),
    getStageTimeAverages(userId),
  ]);

  const totalApps = funnel.applied + funnel.screening + funnel.interview + funnel.offer;
  const interviewRate = totalApps > 0 ? Math.round((funnel.interview / totalApps) * 100) : 0;
  const avgResponseTime =
    stageTimes.length > 0
      ? Math.round(stageTimes.reduce((a, b) => a + b.avgDays, 0) / stageTimes.length)
      : 0;

  return {
    trend,
    funnel,
    topCompanies,
    topSkills,
    stageTimes,
    comparisons: {
      applications: await getPeriodComparison(userId, totalApps, 0),
      interviewRate: await getPeriodComparison(userId, interviewRate, 0),
      responseTime: await getPeriodComparison(userId, avgResponseTime, 0),
    },
  };
}
