# 022 - Analytics Dashboard - Plan

## Data Flow

```
Server Component (page.tsx)
  └── getAnalyticsData(userId, dateRange)
       ├── applications by period (trend)
       ├── funnel conversion rates
       ├── top companies
       ├── top skills
       ├── avg time per stage
       └── previous period comparison
            └── Pass to Client Components
```

## Components

### Server Component (page.tsx)

Fetches all analytics data and passes to client components:

```typescript
const [analytics, previousAnalytics] = await Promise.all([
  getAnalyticsData(userId, dateRange),
  getAnalyticsData(userId, previousDateRange),
]);
```

### Client Components

- `AnalyticsFilters.tsx` - Date range selector (week, month, 3m, 6m, year)
- `TrendChart.tsx` - Line chart showing applications over time
- `FunnelChart.tsx` - Funnel visualization (applied → screening → interview → offer)
- `TopCompanies.tsx` - Top 5 companies by application count
- `TopSkills.tsx` - Most in-demand skills extracted from job titles
- `StageTime.tsx` - Average days per stage
- `ComparisonCard.tsx` - Period comparison indicator (up/down percentage)

### Repository

- `analytics.ts` - Queries for aggregated analytics data

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Analytics                          [Week] [Month] [3m] [6m]│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Trend Chart (Applications over time)       ││
│  │  ████                                                    ││
│  │      ████                                                ││
│  │          ████                                            ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐ ┌──────────────────────────┐  │
│  │    Funnel Conversion     │ │    Stage Time            │  │
│  │                          │ │                          │  │
│  │  Applied (12)     100%   │ │  Applied → Screening: 2d │  │
│  │  ↓                      │ │  Screening → Interview: 5d│  │
│  │  Screening (8)     67%   │ │  Interview → Offer: 7d   │  │
│  │  ↓                      │ │                          │  │
│  │  Interview (4)     33%   │ │  Avg total: 14 days      │  │
│  │  ↓                      │ │                          │  │
│  │  Offer (1)          8%   │ │                          │  │
│  └──────────────────────────┘ └──────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐ ┌──────────────────────────┐  │
│  │    Top Companies         │ │    Top Skills            │  │
│  │    1. Google (3)         │ │    1. React (8)          │  │
│  │    2. Meta (2)           │ │    2. TypeScript (6)     │  │
│  │    3. Amazon (2)         │ │    3. Node.js (5)        │  │
│  │    4. Startup X (1)      │ │    4. AWS (4)            │  │
│  │    5. Company Y (1)      │ │    5. Python (3)         │  │
│  └──────────────────────────┘ └──────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Comparison with previous period                           │
│  Applications: +25% ↑  │  Interview Rate: +5% ↑           │
│  Response Time: -2 days ↓                                  │
└─────────────────────────────────────────────────────────────┘
```

## Files to Modify/Create

### Create

- `src/app/analytics/page.tsx` - Analytics page (Server Component)
- `src/features/analytics/components/AnalyticsPageClient.tsx` - Client wrapper
- `src/features/analytics/components/AnalyticsFilters.tsx` - Date range filters
- `src/features/analytics/components/TrendChart.tsx` - Trend line chart
- `src/features/analytics/components/FunnelChart.tsx` - Conversion funnel
- `src/features/analytics/components/TopCompanies.tsx` - Top companies list
- `src/features/analytics/components/TopSkills.tsx` - Top skills list
- `src/features/analytics/components/StageTime.tsx` - Average time per stage
- `src/features/analytics/components/ComparisonCard.tsx` - Period comparison
- `src/features/analytics/repositories/analytics.ts` - Analytics queries
- `src/features/analytics/types/analytics.ts` - TypeScript types
- `src/features/analytics/utils/date-range.ts` - Date range helpers

## Database Queries

### getApplicationsByPeriod

```typescript
export async function getApplicationsByPeriod(
  userId: string,
  startDate: Date,
  endDate: Date,
  groupBy: 'day' | 'week' | 'month'
) {
  // Group applications by period using Prisma's groupBy
  // Return array of { period: string, count: number }
}
```

### getFunnelData

```typescript
export async function getFunnelData(userId: string, startDate: Date, endDate: Date) {
  const statusCounts = await prisma.application.groupBy({
    by: ['status'],
    where: {
      userId,
      createdAt: { gte: startDate, lte: endDate },
    },
    _count: true,
  });

  // Calculate funnel: applied → screening → interview → offer
  // Return { applied, screening, interview, offer, rates }
}
```

### getTopCompanies

```typescript
export async function getTopCompanies(userId: string, limit: number = 5) {
  // Join applications with jobs to get company names
  // Group by company, count, order by count desc
  // Return top N companies
}
```

### getTopSkills

```typescript
export async function getTopSkills(userId: string, limit: number = 5) {
  // Get all job titles the user applied to
  // Extract keywords/skills using simple matching
  // Count occurrences and return top N
}
```

### getStageTimeAverages

```typescript
export async function getStageTimeAverages(userId: string) {
  // Calculate average days between status transitions
  // Use application timeline/notes timestamps
  // Return { appliedToScreening, screeningToInterview, interviewToOffer }
}
```
