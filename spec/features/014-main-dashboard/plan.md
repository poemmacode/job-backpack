# 014 - Main Dashboard - Plan

## Data Flow

```
Server Component (page.tsx)
  └── getApplicationMetrics(userId)
       ├── total jobs
       ├── total applications
       ├── applications by status
       ├── response rate (interviews / total)
       └── stale applications (> 14 days)
            └── Pass to Client Components
```

## Components

### Server Component (page.tsx)

Fetches all data and passes to client components:

```typescript
const metrics = await getApplicationMetrics(userId);
const recentApps = await getRecentApplications(userId, 5);
const staleApps = await getStaleApplications(userId, 14);
```

### Client Components

- `MetricCard` - Reusable metric display (existing)
- `StatusChart` - Horizontal bar chart by status (existing)
- `StaleAlert` - Applications needing attention (existing)
- `RecentActivity` - Recent application updates (existing)
- `QuickActions` - Links to common actions (new)
- `ResponseRate` - Interview conversion rate (new)

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard                                    Welcome back │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │  Total  │ │   Apps  │ │Interview│ │ Offers  │          │
│  │  Jobs   │ │   Sent  │ │   ing   │ │Received │          │
│  │    12   │ │    8    │ │    3    │ │    1    │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐ ┌──────────────────────────┐ │
│  │   Status Distribution    │ │    Response Rate         │ │
│  │   ████████ Applied (5)   │ │         37.5%            │ │
│  │   █████ Interview (3)    │ │    3 interviews / 8 apps │ │
│  │   ██ Offer (1)           │ │                          │ │
│  └──────────────────────────┘ └──────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐ ┌──────────────────────────┐ │
│  │    Needs Attention       │ │    Recent Activity       │ │
│  │    ⚠️ Job A (21 days)    │ │    ✓ Job X - 2h ago     │ │
│  │    ⚠️ Job B (18 days)    │ │    ✓ Job Y - 1d ago     │ │
│  └──────────────────────────┘ └──────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Quick Actions                                             │
│  [+ Add Job] [View Jobs] [Applications] [Kanban]          │
└─────────────────────────────────────────────────────────────┘
```

## Files to Modify/Create

### Modify

- `src/app/dashboard/page.tsx` - Enhance with new components
- `src/features/applications/repositories/applications.ts` - Add getApplicationMetrics

### Create

- `src/features/dashboard/components/QuickActions.tsx`
- `src/features/dashboard/components/ResponseRate.tsx`
- `src/features/dashboard/components/DashboardPageClient.tsx`

## Database Queries

### getApplicationMetrics

```typescript
export async function getApplicationMetrics(userId: string) {
  const [totalJobs, totalApps, byStatus, staleApps] = await Promise.all([
    prisma.job.count({ where: { userId } }),
    prisma.application.count({ where: { userId } }),
    prisma.application.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    }),
    prisma.application.count({
      where: {
        userId,
        createdAt: { lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
        status: { notIn: ['interview', 'offer', 'accepted', 'rejected'] },
      },
    }),
  ]);

  const interviewCount = byStatus.find(s => s.status === 'interview')?._count || 0;
  const responseRate = totalApps > 0 ? Math.round((interviewCount / totalApps) * 100) : 0;

  return {
    totalJobs,
    totalApplications: totalApps,
    byStatus: byStatus.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as Record<string, number>),
    staleCount: staleApps,
    responseRate,
  };
}
```
