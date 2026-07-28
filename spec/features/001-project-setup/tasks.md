# 001 - Project Setup - Tasks

## Inicialización

- [x] Ejecutar `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [x] Verificar que `npm run dev` funciona
- [x] Verificar que `npm run build` funciona

## Prettier

- [x] Instalar prettier: `npm install -D prettier`
- [x] Crear `.prettierrc` con configuración del proyecto
- [x] Crear `.prettierignore`

## Prisma

- [x] Instalar prisma: `npm install -D prisma`
- [x] Ejecutar `npx prisma init`
- [x] Configurar `prisma/schema.prisma` con modelo básico de User
- [x] Configurar `DATABASE_URL` en `.env.example`

## Supabase

- [x] Instalar: `npm install @supabase/supabase-js`
- [x] Crear `src/lib/supabase.ts` con cliente configurado
- [x] Crear `src/lib/supabase-browser.ts` para client components
- [x] Crear `src/lib/supabase-server.ts` para server components
- [x] Agregar variables de entorno a `.env.example`

## Supabase Auth

- [ ] Crear middleware para manejar sesiones
- [ ] Configurar protección de rutas básicas

## Supabase Storage

- [ ] Configurar cliente de Storage
- [ ] Crear tipos para buckets

## Estructura de Carpetas

- [x] Crear `src/features/` (vacía)
- [x] Crear `src/components/` (vacía)
- [x] Crear `src/hooks/` (vacía)
- [x] Crear `src/server/` (vacía)
- [x] Crear `src/types/` (vacía)
- [x] Crear `src/utils/` (vacía)

## Configuración

- [x] Crear `.env.example` con todas las variables documentadas
- [x] Verificar que ESLint funciona: `npm run lint`
- [x] Verificar que Prettier funciona: `npx prettier --check .`

## Tests

- [x] Instalar Vitest: `npm install -D vitest @vitejs/plugin-react`
- [x] Configurar `vitest.config.ts`
- [x] Instalar React Testing Library: `npm install -D @testing-library/react @testing-library/jest-dom`
- [x] Crear test básico de ejemplo
- [x] Verificar que `npm run test` funciona

## Documentación

- [x] Crear README.md con instrucciones de setup
- [x] Documentar estructura del proyecto
- [x] Documentar variables de entorno requeridas

## Verificación Final

- [x] `npm run dev` funciona
- [x] `npm run build` funciona sin errores
- [x] `npm run lint` pasa
- [x] `npm run test` pasa
- [x] `npx prettier --check .` pasa
