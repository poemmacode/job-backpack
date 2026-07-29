# 013 - Recruiters - Plan

## Database Schema

### Recruiter Model

```prisma
model Recruiter {
  id           String        @id @default(uuid())
  name         String
  email        String?
  phone        String?
  company      String?
  linkedIn     String?
  notes        String?
  userId       String
  user         User          @relation(fields: [userId], references: [id])
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  applications ApplicationRecruiter[]

  @@index([userId])
  @@index([email])
}
```

### ApplicationRecruiter Model (junction table)

```prisma
model ApplicationRecruiter {
  id             String      @id @default(uuid())
  applicationId  String
  recruiterId    String
  role           String?     // "recruiter", "hiring_manager", "referral", etc.
  application    Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  recruiter      Recruiter   @relation(fields: [recruiterId], references: [id], onDelete: Cascade)
  createdAt      DateTime    @default(now())

  @@unique([applicationId, recruiterId])
  @@index([applicationId])
  @@index([recruiterId])
}
```

### Application Model Update

Add relation to Application:

```prisma
model Application {
  // ... existing fields
  recruiters ApplicationRecruiter[]
}
```

### User Model Update

Add relation to User:

```prisma
model User {
  // ... existing fields
  recruiters Recruiter[]
}
```

## Directory Structure

```
src/features/recruiters/
├── index.ts
├── types.ts
├── repositories/
│   └── recruiters.ts
├── actions/
│   └── recruiters.ts
└── components/
    ├── RecruiterForm.tsx
    ├── RecruiterCard.tsx
    ├── RecruiterList.tsx
    ├── RecruiterSection.tsx
    ├── RecruiterBadge.tsx
    └── AssociateRecruiterDialog.tsx
```

## Pages

- `/dashboard/recruiters` - Lista de todos los reclutadores
- `/dashboard/applications/[id]` - Sección de reclutadores en detalle

## Server Actions

### Recruiter CRUD

- `getRecruitersAction()` - Obtener todos los reclutadores del usuario
- `getRecruiterAction(id)` - Obtener un reclutador por ID
- `createRecruiterAction(data)` - Crear reclutador nuevo
- `updateRecruiterAction(id, data)` - Actualizar reclutador
- `deleteRecruiterAction(id)` - Eliminar reclutador

### Association Actions

- `getRecruitersByApplicationAction(applicationId)` - Obtener reclutadores de una aplicación
- `associateRecruiterAction(applicationId, recruiterId, role?)` - Asociar reclutador a aplicación
- `disassociateRecruiterAction(applicationId, recruiterId)` - Desasociar reclutador

### Search

- `searchRecruitersAction(query)` - Buscar reclutadores por nombre o empresa

## Components

### RecruiterForm

- Formulario para crear/editar reclutador
- Campos: name (required), email, phone, company, linkedIn, notes
- Validación con Zod

### RecruiterCard

- Tarjeta para mostrar reclutador en lista
- Muestra: nombre, empresa, email
- Acciones: editar, eliminar

### RecruiterList

- Lista de reclutadores con búsqueda
- Filtro por empresa (opcional)

### RecruiterSection

- Sección en página de detalle de aplicación
- Muestra reclutadores asociados
- Botón para asociar nuevo reclutador

### RecruiterBadge

- Badge pequeño para mostrar reclutador en cards
- Solo muestra nombre y empresa

### AssociateRecruiterDialog

- Dialog modal para asociar reclutador a aplicación
- Lista de reclutadores disponibles
- Campo opcional de rol

## UI/UX

### Recruiters Page

```
┌─────────────────────────────────────────────┐
│ Recruiters                            [+ Add]│
├─────────────────────────────────────────────┤
│ 🔍 Search recruiters...                     │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 👤 John Smith                           │ │
│ │ TechCorp • john@techcorp.com            │ │
│ │ LinkedIn: linkedin.com/in/johnsmith     │ │
│ │                           [Edit][Delete]│ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ 👤 Sarah Johnson                        │ │
│ │ StartupXYZ • sarah@startupxyz.com       │ │
│ │                           [Edit][Delete]│ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Application Detail - Recruiters Section

```
┌─────────────────────────────────────────────┐
│ Recruiters (2)              [+ Associate]   │
├─────────────────────────────────────────────┤
│ 👤 John Smith - Recruiter                   │
│    TechCorp                     [Remove]    │
│                                              │
│ 👤 Sarah Johnson - Hiring Manager           │
│    StartupXYZ                   [Remove]    │
└─────────────────────────────────────────────┘
```
