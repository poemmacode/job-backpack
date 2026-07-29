# 013 - Recruiters - Tasks

## Database

- [x] 1.1 Crear modelo Recruiter en schema.prisma
- [x] 1.2 Crear modelo ApplicationRecruiter en schema.prisma
- [x] 1.3 Actualizar modelo Application con relación a recruiters
- [x] 1.4 Actualizar modelo User con relación a recruiters
- [x] 1.5 Generar migración de Prisma
- [x] 1.6 Ejecutar migración en base de datos

## Types

- [x] 2.1 Crear types.ts con interfaces Recruiter, RecruiterWithRelations, AssociateRecruiterData
- [x] 2.2 Actualizar types.ts de applications si es necesario

## Repositories

- [x] 3.1 Crear repositories/recruiters.ts con funciones CRUD
- [x] 3.2 Implementar getRecruiters(userId)
- [x] 3.3 Implementar getRecruiter(id, userId)
- [x] 3.4 Implementar createRecruiter(data, userId)
- [x] 3.5 Implementar updateRecruiter(id, data, userId)
- [x] 3.6 Implementar deleteRecruiter(id, userId)
- [x] 3.7 Implementar getRecruitersByApplication(applicationId)
- [x] 3.8 Implementar associateRecruiter(applicationId, recruiterId, role?)
- [x] 3.9 Implementar disassociateRecruiter(applicationId, recruiterId)
- [x] 3.10 Implementar searchRecruiters(userId, query)

## Actions

- [x] 4.1 Crear actions/recruiters.ts con server actions
- [x] 4.2 Implementar getRecruitersAction
- [x] 4.3 Implementar getRecruiterAction
- [x] 4.4 Implementar createRecruiterAction con validación Zod
- [x] 4.5 Implementar updateRecruiterAction con validación Zod
- [x] 4.6 Implementar deleteRecruiterAction
- [x] 4.7 Implementar getRecruitersByApplicationAction
- [x] 4.8 Implementar associateRecruiterAction
- [x] 4.9 Implementar disassociateRecruiterAction
- [x] 4.10 Implementar searchRecruitersAction

## Components - Recruiter Management

- [x] 5.1 Crear RecruiterForm.tsx (crear/editar reclutador)
- [x] 5.2 Crear RecruiterCard.tsx (tarjeta de reclutador)
- [x] 5.3 Crear RecruiterList.tsx (lista con búsqueda)
- [x] 5.4 Crear index.ts con exports

## Components - Application Integration

- [x] 6.1 Crear RecruiterBadge.tsx (badge pequeño)
- [x] 6.2 Crear RecruiterSection.tsx (sección en detalle de aplicación)
- [x] 6.3 Crear AssociateRecruiterDialog.tsx (modal para asociar)
- [x] 6.4 Actualizar index.ts con exports de componentes de aplicación

## Pages

- [x] 7.1 Crear página /dashboard/recruiters/page.tsx
- [x] 7.2 Integrar RecruiterSection en página de detalle de aplicación

## Testing

- [ ] 8.1 Test de repositories (CRUD y asociaciones)
- [ ] 8.2 Test de server actions
- [ ] 8.3 Test de componentes UI

## Documentation

- [x] 9.1 Actualizar README si es necesario
- [x] 9.2 Marcar feature como completada en roadmap.md
