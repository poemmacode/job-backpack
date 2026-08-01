# 023 - Search Profiles - Plan

## Data Model

```prisma
model SearchProfile {
  id              String   @id @default(uuid())
  name            String
  isDefault       Boolean  @default(false)
  locations       String[] // Array de ubicaciones
  workType        String?  // "remote", "hybrid", "onsite"
  salaryMin       Int?
  salaryMax       Int?
  skills          String[] // Array de skills/tecnologías
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  userId          String
  user            User     @relation(fields: [userId], references: [id])

  @@index([userId])
}
```

## Data Flow

```
Server Component (page.tsx)
  └── getSearchProfiles(userId)
       └── Pass to Client Components

Server Actions
  ├── createSearchProfile(userId, data)
  ├── updateSearchProfile(id, userId, data)
  ├── deleteSearchProfile(id, userId)
  └── setActiveProfile(id, userId)
```

## Components

### Server Component (page.tsx)

Fetches all profiles and passes to client:

```typescript
const profiles = await getSearchProfiles(user.id);
```

### Client Components

- `SearchProfilesPageClient.tsx` - Wrapper with state management
- `SearchProfileList.tsx` - Grid/list of profile cards
- `SearchProfileCard.tsx` - Individual profile display
- `SearchProfileForm.tsx` - Create/edit form (modal or inline)
- `DeleteProfileDialog.tsx` - Confirmation dialog

### Repository

- `search-profiles.ts` - CRUD operations

### Actions

- `search-profiles.ts` - Server Actions with Zod validation

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Search Profiles                          [+ New Profile]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │  🎯 Remote Dev  │  │  🏢 Local Jobs  │                   │
│  │  ─────────────  │  │  ─────────────  │                   │
│  │  📍 Remote      │  │  📍 San Francisco│                  │
│  │  💼 Remote      │  │  💼 Onsite      │                   │
│  │  💰 $80-120k    │  │  💰 $100-150k   │                   │
│  │  🛠 React,Node  │  │  🛠 Python,Go   │                   │
│  │  ★ Active       │  │                 │                   │
│  │  [Edit] [Delete]│  │  [Edit] [Delete]│                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  ┌─────────────────┐                                        │
│  │  📱 Mobile Dev  │                                        │
│  │  ─────────────  │                                        │
│  │  📍 Remote      │                                        │
│  │  💼 Remote      │                                        │
│  │  💰 $90-130k    │                                        │
│  │  🛠 React Native│                                        │
│  │  [Edit] [Delete]│                                        │
│  └─────────────────┘                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Form Layout (Modal)

```
┌─────────────────────────────────────────────┐
│  Create Search Profile                 [X]  │
├─────────────────────────────────────────────┤
│                                             │
│  Name *                                     │
│  ┌─────────────────────────────────────┐    │
│  │ Remote Backend Developer            │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Locations (comma separated)                │
│  ┌─────────────────────────────────────┐    │
│  │ Remote, US, Europe                  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Work Type                                  │
│  ○ Remote  ○ Hybrid  ○ Onsite  ○ Any       │
│                                             │
│  Salary Range                               │
│  ┌──────────┐  ┌──────────┐                │
│  │ Min      │  │ Max      │                │
│  └──────────┘  └──────────┘                │
│                                             │
│  Skills (comma separated)                   │
│  ┌─────────────────────────────────────┐    │
│  │ React, Node.js, TypeScript, AWS     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Notes                                      │
│  ┌─────────────────────────────────────┐    │
│  │ Prefer startups, flexible hours     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [Cancel]                    [Save Profile] │
└─────────────────────────────────────────────┘
```

## Files to Modify/Create

### Migration

- Create Prisma migration for SearchProfile model

### Modify

- `prisma/schema.prisma` - Add SearchProfile model
- `src/features/profile/components/ProfileForm.tsx` - Add link to search profiles (optional)

### Create

- `src/app/dashboard/search-profiles/page.tsx` - Main page
- `src/features/search-profiles/components/SearchProfilesPageClient.tsx`
- `src/features/search-profiles/components/SearchProfileList.tsx`
- `src/features/search-profiles/components/SearchProfileCard.tsx`
- `src/features/search-profiles/components/SearchProfileForm.tsx`
- `src/features/search-profiles/components/DeleteProfileDialog.tsx`
- `src/features/search-profiles/repositories/search-profiles.ts`
- `src/features/search-profiles/actions/search-profiles.ts`
- `src/features/search-profiles/schemas/search-profiles.ts`
- `src/features/search-profiles/types/search-profiles.ts`

## Validation Schema

```typescript
import { z } from 'zod';

export const searchProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  locations: z.array(z.string()).optional().default([]),
  workType: z.enum(['remote', 'hybrid', 'onsite', 'any']).optional(),
  salaryMin: z.number().int().positive().optional().nullable(),
  salaryMax: z.number().int().positive().optional().nullable(),
  skills: z.array(z.string()).optional().default([]),
  notes: z.string().max(500).optional().nullable(),
});
```
