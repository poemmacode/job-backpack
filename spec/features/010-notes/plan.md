# 010 - Notes - Plan

## Architecture

### Prisma Schema

```prisma
model Note {
  id            String   @id @default(uuid())
  content       String
  type          String   @default("general")
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([applicationId])
  @@index([type])
}
```

### Data Layer

```
src/features/notes/
├── repositories/notes.ts
├── actions/notes.ts
├── components/
│   ├── NoteForm.tsx
│   ├── NoteCard.tsx
│   ├── NoteList.tsx
│   └── NoteFilters.tsx
├── types.ts
└── index.ts
```

### Server Actions

```typescript
// src/features/notes/actions/notes.ts
createNoteAction(applicationId: string, content: string, type: string)
updateNoteAction(id: string, content: string, userId: string)
deleteNoteAction(id: string, userId: string)
```

## Data Flow

```
ApplicationDetailPage
  └── NoteSection (Client)
        ├── NoteFilters (type filter)
        ├── NoteForm (create)
        └── NoteList
              └── NoteCard (edit/delete)
```

## Design

### NoteSection en Application Detail

```
┌─────────────────────────────────────────┐
│ Notes (3)                     [Filter ▼] │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ [Select type...]                   │ │
│ │ [Write your note...]        [Add]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Interview - Google                  │ │
│ │ Great conversation with hiring     │ │
│ │ manager. They use React + Go.      │ │
│ │                         [Edit] [×] │ │
│ │ 2 hours ago                        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Follow-up                          │ │
│ │ Sent thank you email.              │ │
│ │                         [Edit] [×] │ │
│ │ 1 day ago                          │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Note Types

- general (gray)
- interview (blue)
- follow-up (yellow)
- feedback (green)
- contact (purple)

## Testing

- Verificar CRUD de notas
- Verificar filtros por tipo
- Verificar búsqueda
- Verificar que solo usuario dueño puede CRUD
