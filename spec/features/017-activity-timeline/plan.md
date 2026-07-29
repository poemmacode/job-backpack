# 017 - Activity Timeline - Plan

## Data Strategy

No crear modelo separado de Activity. En su lugar, derivar actividades de las tablas existentes:

```
Activities derived from:
  - Application (createdAt, updatedAt for status changes)
  - Note (createdAt)
  - Attachment (createdAt)
  - Recruiter (createdAt for associations)
  - Job (createdAt)
```

## Components

### Server Component (page.tsx)

Fetches initial activities:

```typescript
const activities = await getActivities(userId, { limit: 20, offset: 0 });
```

### Client Components

- `ActivityTimeline` - Container for timeline
- `ActivityItem` - Individual activity item
- `ActivityFilters` - Filter by activity type
- `LoadMoreButton` - Pagination trigger

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Activity Timeline                                           │
├─────────────────────────────────────────────────────────────┤
│  Filter: [All] [Status] [Notes] [Attachments] [Recruiters] │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │  📋 Status changed to "Applied"                         ││
│  │  Frontend Developer at TechCorp                         ││
│  │  2 hours ago                                      [→]  ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │  📝 Note added                                          ││
│  │  "Had phone screening with recruiter"                   ││
│  │  Backend Engineer at StartupXYZ                  [→]   ││
│  │  5 hours ago                                            ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │  📎 Attachment uploaded                                 ││
│  │  resume_john_smith.pdf                                  ││
│  │  Frontend Developer at TechCorp                  [→]   ││
│  │  Yesterday                                              ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │  👤 Recruiter associated                                ││
│  │  John Smith - TechCorp                                  ││
│  │  Frontend Developer at TechCorp                  [→]   ││
│  │  2 days ago                                             ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│                    [Load More]                               │
└─────────────────────────────────────────────────────────────┘
```

## Files to Create/Modify

### Create

- `src/features/activity/types.ts`
- `src/features/activity/repositories/activities.ts`
- `src/features/activity/actions/activities.ts`
- `src/features/activity/components/ActivityTimeline.tsx`
- `src/features/activity/components/ActivityItem.tsx`
- `src/features/activity/components/ActivityFilters.tsx`
- `src/features/activity/index.ts`
- `src/app/dashboard/activity/page.tsx`

### Modify

- `src/components/Navbar.tsx` - Add Activity link

## Server Actions

### getActivities

```typescript
export async function getActivities(
  userId: string,
  options: { limit: number; offset: number; type?: string }
) {
  const activities: Activity[] = [];

  // Get application status changes (use updatedAt)
  const applications = await prisma.application.findMany({
    where: { userId },
    select: {
      id: true,
      status: true,
      updatedAt: true,
      job: { select: { title: true, company: true } },
    },
    orderBy: { updatedAt: 'desc' },
    take: options.limit,
  });

  // Get notes
  const notes = await prisma.note.findMany({
    where: { application: { userId } },
    select: {
      id: true,
      content: true,
      createdAt: true,
      application: {
        select: {
          id: true,
          job: { select: { title: true, company: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: options.limit,
  });

  // Get attachments
  const attachments = await prisma.attachment.findMany({
    where: { application: { userId } },
    select: {
      id: true,
      name: true,
      createdAt: true,
      application: {
        select: {
          id: true,
          job: { select: { title: true, company: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: options.limit,
  });

  // Merge and sort by date
  return mergeAndSort(activities);
}
```

## Activity Types

```typescript
type ActivityType = 
  | 'status_change'
  | 'note_created'
  | 'attachment_uploaded'
  | 'recruiter_associated'
  | 'job_created';

interface Activity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  description: string;
  details?: string;
  applicationId?: string;
  jobId?: string;
  metadata?: Record<string, unknown>;
}
```
