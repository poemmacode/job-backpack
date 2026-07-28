# 001 - Project Setup - Plan

## Enfoque Técnico

### 1. Inicialización de Next.js

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Esto crea la estructura base con App Router, TypeScript, TailwindCSS y ESLint.

### 2. Configuración de Prettier

Instalar y configurar Prettier para mantener consistencia de formato.

### 3. Prisma + Supabase PostgreSQL

```bash
npm install prisma --save-dev
npx prisma init
```

Configurar `prisma/schema.prisma` con la conexión a Supabase PostgreSQL.

### 4. Supabase Client

```bash
npm install @supabase/supabase-js
```

Crear `src/lib/supabase.ts` con el cliente configurado.

### 5. Supabase Auth

Configurar middleware de Next.js para manejar sesiones de Supabase Auth.

### 6. Supabase Storage

Configurar el cliente de Storage para manejo de archivos (CVs, cover letters).

### 7. Estructura de Carpetas

Crear la estructura según `architecture.md`:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── features/
├── components/
├── hooks/
├── lib/
│   └── supabase.ts
├── server/
├── prisma/
│   └── schema.prisma
├── types/
└── utils/
```

### 8. Variables de Entorno

Crear `.env.example` con:

```
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
```

### 9. Scripts npm

Configurar en `package.json`:

- `dev`: desarrollo local
- `build`: build de producción
- `start`: iniciar en producción
- `test`: ejecutar tests con Vitest
- `lint`: ejecutar ESLint
- `format`: ejecutar Prettier

## Decisiones Técnicas

- **Supabase en vez de DB propia**: reduce tiempo de setup, incluye Auth y Storage gratis
- **Prisma como ORM**: type-safe, migrations automáticas, buena integración con Supabase
- **App Router**: server components por defecto, mejor performance
- **Vitest en vez de Jest**: más rápido, mejor integración con TypeScript

## Dependencias

### Producción

- `next`
- `react`
- `react-dom`
- `@supabase/supabase-js`

### Desarrollo

- `typescript`
- `@types/react`
- `@types/node`
- `prisma`
- `@prisma/client`
- `eslint`
- `eslint-config-next`
- `prettier`
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
