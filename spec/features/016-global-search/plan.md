# 016 - Global Search - Plan

## Data Flow

```
User types in search input
  └── Debounce (300ms)
       └── searchGlobalAction(query)
            ├── Search Jobs (title, company)
            ├── Search Applications (company, status)
            ├── Search Notes (content)
            └── Search Recruiters (name, company)
                 └── Return categorized results
                      └── Display in dropdown
```

## Components

### Client Components

- `SearchInput` - Input con icono de búsqueda
- `SearchResults` - Dropdown con resultados categorizados
- `SearchResultItem` - Item individual con icono y navegación
- `useDebounce` - Hook para debounce
- `useKeyboardNavigation` - Hook para navegación con teclado

### Server Actions

- `searchGlobalAction(query)` - Busca en todas las entidades

## Page Layout

### Navbar Search

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Job Backpack    [Jobs] [Apps] [Kanban] [🔍 Search___] │
└─────────────────────────────────────────────────────────────┘
```

### Search Results Dropdown

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 search term...                                          │
├─────────────────────────────────────────────────────────────┤
│  Jobs (2)                                                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 💼 Frontend Developer - TechCorp                        ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 💼 Backend Engineer - StartupXYZ                        ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Applications (1)                                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 📋 TechCorp - applied                                   ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Recruiters (1)                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 👤 John Smith - TechCorp                                ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Files to Create/Modify

### Create

- `src/features/search/components/SearchInput.tsx`
- `src/features/search/components/SearchResults.tsx`
- `src/features/search/components/SearchResultItem.tsx`
- `src/features/search/hooks/useDebounce.ts`
- `src/features/search/hooks/useKeyboardNavigation.ts`
- `src/features/search/actions/search.ts`
- `src/features/search/types.ts`
- `src/features/search/index.ts`

### Modify

- `src/components/Navbar.tsx` - Add search input

## Server Actions

### searchGlobalAction

```typescript
export async function searchGlobalAction(query: string) {
  const user = await getUser();
  if (!user) redirect('/login');

  const [jobs, applications, notes, recruiters] = await Promise.all([
    prisma.job.findMany({
      where: {
        userId: user.id,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { company: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
    }),
    prisma.application.findMany({
      where: {
        userId: user.id,
        OR: [
          { job: { company: { contains: query, mode: 'insensitive' } } },
          { status: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { job: true },
      take: 5,
    }),
    prisma.note.findMany({
      where: {
        application: { userId: user.id },
        content: { contains: query, mode: 'insensitive' },
      },
      include: { application: { include: { job: true } } },
      take: 5,
    }),
    prisma.recruiter.findMany({
      where: {
        userId: user.id,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { company: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
    }),
  ]);

  return { jobs, applications, notes, recruiters };
}
```

## Hooks

### useDebounce

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### useKeyboardNavigation

```typescript
export function useKeyboardNavigation(
  itemCount: number,
  onSelect: (index: number) => void,
  onClose: () => void
) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % itemCount);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) onSelect(selectedIndex);
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  return { selectedIndex, handleKeyDown, setSelectedIndex };
}
```
