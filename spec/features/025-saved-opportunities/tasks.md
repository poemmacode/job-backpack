# 025 - Saved Opportunities - Tasks

## Database

- [x] 1.1 Agregar modelo SavedOpportunity a schema.prisma
- [x] 1.2 Ejecutar prisma db push
- [x] 1.3 Verificar migración exitosa

## Types & Schemas

- [x] 2.1 Crear types/saved-opportunities.ts
- [x] 2.2 Crear schemas/saved-opportunities.ts con Zod

## Repository

- [x] 3.1 Crear saved-opportunities.ts repository
- [x] 3.2 Implementar getSavedOpportunities(userId)
- [x] 3.3 Implementar getSavedOpportunity(id, userId)
- [x] 3.4 Implementar createSavedOpportunity(userId, data)
- [x] 3.5 Implementar updateSavedOpportunity(id, userId, data)
- [x] 3.6 Implementar deleteSavedOpportunity(id, userId)
- [x] 3.7 Implementar convertToJob(id, userId)

## Server Actions

- [x] 4.1 Crear actions/saved-opportunities.ts
- [x] 4.2 Implementar saveOpportunity action
- [x] 4.3 Implementar updateOpportunity action
- [x] 4.4 Implementar deleteOpportunity action
- [x] 4.5 Implementar convertToJob action
- [x] 4.6 Implementar setPriority action

## Components

- [x] 5.1 Crear SavedOpportunitiesPageClient.tsx
- [x] 5.2 Crear SavedOpportunityList.tsx
- [x] 5.3 Crear SavedOpportunityCard.tsx
- [x] 5.4 Crear SaveButton.tsx (reutilizable)
- [x] 5.5 Crear PriorityFilter.tsx

## Page

- [x] 6.1 Crear page.tsx en dashboard/saved/
- [x] 6.2 Integrar Server Component con Suspense
- [x] 6.3 Agregar loading skeleton

## Integration

- [x] 7.1 Agregar SaveButton a ScraperResultCard
- [x] 7.2 Agregar SaveButton a JobCard (opcional)

## Navigation

- [x] 8.1 Agregar link a saved en Navbar (desktop + mobile)

## Styling

- [x] 9.1 Layout responsive
- [x] 9.2 Cards con prioridad visual
- [x] 9.3 Empty states
- [x] 9.4 Estados de carga y error

## Testing

- [x] 10.1 Verificar CRUD funcional
- [x] 10.2 Verificar conversión a Job
- [x] 10.3 Verificar filtros por prioridad
- [x] 10.4 Verificar responsive design

## Documentation

- [x] 11.1 Actualizar roadmap.md
