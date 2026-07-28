# 004 - Job CRUD - Plan

## Enfoque Técnico

### Estructura

```
src/features/jobs/
├── components/
│   ├── JobForm.tsx
│   ├── JobCard.tsx
│   ├── JobList.tsx
│   ├── JobDetail.tsx
│   └── DeleteJobButton.tsx
├── actions/
│   └── jobs.ts
├── schemas/
│   └── jobs.ts
├── repositories/
│   └── jobs.ts
├── types.ts
└── index.ts

src/app/
├── dashboard/
│   └── page.tsx (update - show job list)
├── dashboard/jobs/
│   ├── page.tsx (list)
│   ├── new/page.tsx (create)
│   ├── [id]/
│   │   ├── page.tsx (detail)
│   │   └── edit/page.tsx (edit)
```

### Prisma Schema

```prisma
model Job {
  id        String   @id @default(uuid())
  title     String
  company   String
  location  String?
  url       String?
  salary    String?
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  @@index([userId])
}
```

### Repositorio

Capa de acceso a datos con Prisma:

- `getJobs(userId)` - listar vacantes del usuario
- `getJob(id, userId)` - obtener una vacante
- `createJob(data, userId)` - crear vacante
- `updateJob(id, data, userId)` - actualizar vacante
- `deleteJob(id, userId)` - eliminar vacante

### Server Actions

- `createJob(formData)` - crear vacante
- `updateJob(id, formData)` - actualizar vacante
- `deleteJob(id)` - eliminar vacante

### Validación

Zod schema para Job:

- title: required, min 1
- company: required, min 1
- location: optional
- url: optional, URL valid
- salary: optional
- notes: optional

## Decisiones Técnicas

- **Repositorio separado**: sigue la arquitectura de architecture.md
- **User ID del server**: obtener del auth, no del client
- **Server Actions**: más simple que API routes para formularios
- **Optimistic updates**: futuro, por ahora reload completo
