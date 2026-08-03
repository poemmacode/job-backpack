# 025 - Saved Opportunities - Plan

## Data Model

```prisma
model SavedOpportunity {
  id          String   @id @default(uuid())
  title       String
  company     String
  location    String?
  url         String?
  salary      String?
  notes       String?
  priority    String   @default("normal") // "low", "normal", "high"
  source      String?  // "scraper", "manual", etc.
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([priority])
}
```

## Data Flow

```
Server Component (page.tsx)
  └── getSavedOpportunities(userId)
       └── Pass to Client Components

Server Actions
  ├── saveOpportunity(data)
  ├── updateOpportunity(id, data)
  ├── deleteOpportunity(id)
  ├── convertToJob(id)
  └── setPriority(id, priority)
```

## Components

### Server Component (page.tsx)

Fetches all saved opportunities:

```typescript
const opportunities = await getSavedOpportunities(user.id);
```

### Client Components

- `SavedOpportunitiesPageClient.tsx` - Wrapper with state management
- `SavedOpportunityList.tsx` - Grid/list of saved opportunities
- `SavedOpportunityCard.tsx` - Individual card display
- `SaveButton.tsx` - Reusable save button for other features
- `PriorityFilter.tsx` - Filter by priority

### Repository

- `saved-opportunities.ts` - CRUD operations

### Actions

- `saved-opportunities.ts` - Server Actions with validation

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Saved Opportunities              [All] [High] [Normal] [Low]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │  ⭐ Senior Dev  │  │  📌 Frontend    │                   │
│  │  TechCorp       │  │  StartupX       │                   │
│  │  Remote         │  │  US             │                   │
│  │  $120-150k      │  │  $90-110k       │                   │
│  │  Notes: ...     │  │  Notes: ...     │                   │
│  │  Saved 2d ago   │  │  Saved 5d ago   │                   │
│  │  [View] [Convert] [Delete]           │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  ┌─────────────────┐                                        │
│  │  📌 Backend     │                                        │
│  │  BigCo          │                                        │
│  │  NYC            │                                        │
│  │  [View] [Convert] [Delete]           │                   │
│  └─────────────────┘                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Files to Modify/Create

### Migration

- Create Prisma migration for SavedOpportunity model

### Modify

- `prisma/schema.prisma` - Add SavedOpportunity model
- `src/features/scraper/components/ScraperResultCard.tsx` - Add Save button
- `src/features/jobs/components/JobCard.tsx` - Add Save button (optional)

### Create

- `src/app/dashboard/saved/page.tsx` - Main page
- `src/features/saved/components/SavedOpportunitiesPageClient.tsx`
- `src/features/saved/components/SavedOpportunityList.tsx`
- `src/features/saved/components/SavedOpportunityCard.tsx`
- `src/features/saved/components/SaveButton.tsx`
- `src/features/saved/components/PriorityFilter.tsx`
- `src/features/saved/repositories/saved-opportunities.ts`
- `src/features/saved/actions/saved-opportunities.ts`
- `src/features/saved/types/saved-opportunities.ts`

## Validation Schema

```typescript
import { z } from 'zod';

export const savedOpportunitySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  company: z.string().min(1, 'Company is required').max(200),
  location: z.string().max(200).optional().nullable(),
  url: z.string().url().optional().nullable(),
  salary: z.string().max(100).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  source: z.string().max(50).optional().nullable(),
});
```
