# 015 - User Profile - Plan

## Data Flow

```
Server Component (page.tsx)
  └── getUserProfile(userId)
       ├── user data (name, email, avatarUrl, createdAt)
       ├── job count
       ├── application count
       └── recruiter count
            └── Pass to Client Components
```

## Components

### Server Component (page.tsx)

Fetches user data and stats:

```typescript
const user = await getUser();
const [jobCount, applicationCount, recruiterCount] = await Promise.all([
  getJobCount(user.id),
  getApplicationCount(user.id),
  getRecruiterCount(user.id),
]);
```

### Client Components

- `ProfileHeader` - Avatar, name, email, member since
- `ProfileForm` - Edit name form
- `PasswordForm` - Change password form
- `ProfileStats` - Account statistics cards

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Profile                                                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │  ┌─────┐                                                ││
│  │  │  JS │  John Smith                                    ││
│  │  └─────┘  john@example.com                              ││
│  │          Member since Jan 2024                          ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │    12 Jobs      │ │   8 Applications│ │   3 Recruiters  ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐ ┌──────────────────────────┐  │
│  │   Personal Information   │ │    Change Password       │  │
│  │                          │ │                          │  │
│  │   Name: [________]       │ │   Current: [________]    │  │
│  │   Email: john@example.com│ │   New: [________]        │  │
│  │                          │ │   Confirm: [________]    │  │
│  │   [Save Changes]         │ │   [Update Password]      │  │
│  └──────────────────────────┘ └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Files to Create/Modify

### Create

- `src/app/dashboard/profile/page.tsx`
- `src/features/profile/components/ProfileHeader.tsx`
- `src/features/profile/components/ProfileForm.tsx`
- `src/features/profile/components/PasswordForm.tsx`
- `src/features/profile/components/ProfileStats.tsx`
- `src/features/profile/actions/profile.ts`
- `src/features/profile/types.ts`
- `src/features/profile/index.ts`

### Modify

- `src/features/auth/repositories/users.ts` - Add getUserProfile, updateUser
- `src/components/Navbar.tsx` - Add Profile link

## Server Actions

### Profile Actions

```typescript
// Update user name
export async function updateProfileAction(data: { name: string })

// Change password (via Supabase)
export async function changePasswordAction(data: { currentPassword: string; newPassword: string })
```

## Database Queries

### getUserProfile

```typescript
export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      createdAt: true,
    },
  });
  return user;
}
```

### updateUser

```typescript
export async function updateUser(userId: string, data: { name?: string; avatarUrl?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}
```
