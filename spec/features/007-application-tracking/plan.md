# 007 - Application Tracking - Plan

## Enfoque Técnico

### Prisma Schema

```prisma
model Application {
  id        String   @id @default(uuid())
  status    String   @default("interested")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  jobId     String
  job       Job      @relation(fields: [jobId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  @@unique([jobId, userId])
  @@index([userId])
  @@index([status])
}
```

### Estructura

```
src/features/applications/
├── components/
│   ├── ApplicationCard.tsx
│   ├── ApplicationList.tsx
│   ├── ApplicationFilters.tsx
│   ├── StatusBadge.tsx
│   └── ApplyButton.tsx
├── actions/
│   └── applications.ts
├── repositories/
│   └── applications.ts
├── types.ts
└── index.ts

src/app/dashboard/applications/
├── page.tsx (list)
```

### Estados y Colores

- `interested` → gray
- `applied` → blue
- `interview` → yellow
- `offer` → green
- `rejected` → red

### Server Actions

- `createApplication(jobId)` - crear application desde job
- `updateApplicationStatus(id, status)` - cambiar estado
- `deleteApplication(id)` - eliminar application

### Repositorio

- `getApplications(userId)` - listar applications del usuario
- `getApplication(id, userId)` - obtener una application
- `createApplication(jobId, userId)` - crear application
- `updateApplicationStatus(id, status, userId)` - actualizar estado
- `deleteApplication(id, userId)` - eliminar application
- `getApplicationCounts(userId)` - contar por estado

## Decisiones Técnicas

- **Unique constraint**: un usuario solo puede tener una application por job
- **Status como string**: más simple que enum para Prisma + PostgreSQL
- **Contadores en dashboard**: métricas rápidas para el usuario
