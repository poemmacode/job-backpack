# 007 - Application Tracking - Tasks

## Prisma Schema

- [x] Actualizar `prisma/schema.prisma` con modelo Application
- [x] Actualizar modelo Job con relación a Application
- [x] Ejecutar `npx prisma db push`

## Estructura

- [x] Crear `src/features/applications/` con subcarpetas
- [x] Crear `src/features/applications/index.ts`
- [x] Crear `src/features/applications/types.ts`

## Repositorio

- [x] Crear `src/features/applications/repositories/applications.ts`

## Server Actions

- [x] Crear `src/features/applications/actions/applications.ts`

## Componentes

- [x] Crear `src/features/applications/components/StatusBadge.tsx`
- [x] Crear `src/features/applications/components/ApplyButton.tsx`
- [x] Crear `src/features/applications/components/ApplicationCard.tsx`
- [x] Crear `src/features/applications/components/ApplicationList.tsx`
- [x] Crear `src/features/applications/components/ApplicationFilters.tsx`

## Páginas

- [x] Crear `src/app/dashboard/applications/page.tsx`

## Integración

- [x] Agregar ApplyButton en JobDetail
- [x] Actualizar Dashboard con count de Applications
- [x] Actualizar Navbar con link a Applications

## Verificación

- [x] `npm run build` pasa
- [x] `npm run lint` pasa
- [x] `npm run format:check` pasa
