# 023 - Search Profiles - Tasks

## Database

- [x] 1.1 Agregar modelo SearchProfile a schema.prisma
- [x] 1.2 Ejecutar prisma db push
- [x] 1.3 Verificar migración exitosa

## Types & Schemas

- [x] 2.1 Crear types/search-profiles.ts
- [x] 2.2 Crear schemas/search-profiles.ts con Zod

## Repository

- [x] 3.1 Crear search-profiles.ts repository
- [x] 3.2 Implementar getSearchProfiles(userId)
- [x] 3.3 Implementar getSearchProfile(id, userId)
- [x] 3.4 Implementar createSearchProfile(userId, data)
- [x] 3.5 Implementar updateSearchProfile(id, userId, data)
- [x] 3.6 Implementar deleteSearchProfile(id, userId)

## Server Actions

- [x] 4.1 Crear actions/search-profiles.ts
- [x] 4.2 Implementar createAction con validación Zod
- [x] 4.3 Implementar updateAction con validación Zod
- [x] 4.4 Implementar deleteAction con confirmación
- [x] 4.5 Implementar setActiveAction

## Components

- [x] 5.1 Crear SearchProfilesPageClient.tsx
- [x] 5.2 Crear SearchProfileList.tsx
- [x] 5.3 Crear SearchProfileCard.tsx
- [x] 5.4 Crear SearchProfileForm.tsx (modal)
- [x] 5.5 Crear DeleteProfileDialog.tsx

## Page

- [x] 6.1 Crear page.tsx en dashboard/search-profiles/
- [x] 6.2 Integrar Server Component con Suspense
- [x] 6.3 Agregar loading skeleton

## Styling

- [x] 7.1 Layout responsive (1 col mobile, 2-3 col desktop)
- [x] 7.2 Cards con hover effects
- [x] 7.3 Modal con overlay
- [x] 7.4 Empty state para nuevos usuarios
- [x] 7.5 Indicador de perfil activo

## Navigation

- [x] 8.1 Agregar link a search-profiles en Navbar (desktop + mobile)

## Testing

- [x] 9.1 Verificar CRUD funcional
- [x] 9.2 Verificar validación de formulario
- [x] 9.3 Verificar eliminación con confirmación
- [x] 9.4 Verificar responsive design

## Documentation

- [x] 10.1 Actualizar roadmap.md - Marcar feature 023 como completado
