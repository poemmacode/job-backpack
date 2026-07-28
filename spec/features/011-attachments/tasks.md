# 011 - Attachments - Tasks

## Prisma Schema

- [x] Agregar modelo Attachment a schema.prisma
- [x] Ejecutar `npx prisma db push`

## Supabase Storage

- [x] Crear script SQL para bucket 'attachments'
- [x] Documentar políticas de acceso

## Estructura

- [x] Crear `src/features/attachments/` con subcarpetas
- [x] Crear `src/features/attachments/types.ts`
- [x] Crear `src/features/attachments/index.ts`

## Repositorio

- [x] Crear `src/features/attachments/repositories/attachments.ts`

## Server Actions

- [x] Crear `src/features/attachments/actions/attachments.ts`

## Componentes

- [x] Crear `src/features/attachments/components/AttachmentForm.tsx`
- [x] Crear `src/features/attachments/components/AttachmentCard.tsx`
- [x] Crear `src/features/attachments/components/AttachmentList.tsx`
- [x] Crear `src/features/attachments/components/AttachmentSection.tsx`

## Integración

- [x] Actualizar página de detalle de application con AttachmentSection

## Verificación

- [x] `npm run build` pasa
- [x] `npm run lint` pasa
- [x] `npm run format:check` pasa
