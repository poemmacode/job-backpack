# 004 - Job CRUD - Tasks

## Prisma Schema

- [x] Actualizar `prisma/schema.prisma` con modelo Job
- [x] Ejecutar `npx prisma db push` para sincronizar schema
- [x] Ejecutar `npx prisma generate` para generar cliente

## Estructura

- [x] Crear `src/features/jobs/` con subcarpetas
- [x] Crear `src/features/jobs/index.ts`
- [x] Crear `src/features/jobs/types.ts`
- [x] Crear `src/lib/prisma.ts` (cliente Prisma)

## Schemas (Zod)

- [x] Crear `src/features/jobs/schemas/jobs.ts` con validación de create/update

## Repositorio

- [x] Crear `src/features/jobs/repositories/jobs.ts`
  - `getJobs(userId)`
  - `getJob(id, userId)`
  - `createJob(data, userId)`
  - `updateJob(id, data, userId)`
  - `deleteJob(id, userId)`

## Server Actions

- [x] Crear `src/features/jobs/actions/jobs.ts`
  - `createJobAction(formData)`
  - `updateJobAction(id, formData)`
  - `deleteJobAction(id)`

## Componentes

- [x] Crear `src/features/jobs/components/JobForm.tsx`
- [x] Crear `src/features/jobs/components/JobCard.tsx`
- [x] Crear `src/features/jobs/components/JobList.tsx`
- [x] Crear `src/features/jobs/components/JobDetail.tsx`
- [x] Crear `src/features/jobs/components/DeleteJobButton.tsx`

## Páginas

- [x] Crear `src/app/dashboard/jobs/page.tsx` (listar)
- [x] Crear `src/app/dashboard/jobs/new/page.tsx` (crear)
- [x] Crear `src/app/dashboard/jobs/[id]/page.tsx` (detalle)
- [x] Crear `src/app/dashboard/jobs/[id]/edit/page.tsx` (editar)
- [x] Actualizar `src/app/dashboard/page.tsx` con link a jobs

## Verificación

- [x] `npm run build` pasa
- [x] `npm run lint` pasa
- [x] `npm run format:check` pasa
