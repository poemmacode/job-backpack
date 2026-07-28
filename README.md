# Job Backpack

App web para ayudar a profesionales de tecnología a organizar y dar seguimiento a sus postulaciones de empleo.

## Stack

- **Frontend**: Next.js (App Router), React, TypeScript, TailwindCSS
- **Backend**: Node.js, Next.js Route Handlers, TypeScript
- **Database**: Supabase PostgreSQL
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint, Prettier
- **Deployment**: Vercel

## Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Copia `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

### 3. Base de datos

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Comandos

| Comando          | Descripción            |
| ---------------- | ---------------------- |
| `npm run dev`    | Desarrollo local       |
| `npm run build`  | Build de producción    |
| `npm run start`  | Iniciar en producción  |
| `npm run test`   | Ejecutar tests         |
| `npm run lint`   | Ejecutar ESLint        |
| `npm run format` | Formatear con Prettier |

## Estructura

```
src/
├── app/            # App Router pages y layouts
├── features/       # Feature-based modules
├── components/     # Componentes compartidos
├── hooks/          # Custom hooks
├── lib/            # Utilidades y clientes (Supabase, Prisma)
├── server/         # Server-side logic
├── prisma/         # Schema de Prisma
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Arquitectura

Sigue la arquitectura feature-based modular descrita en `spec/constitution/architecture.md`.

**Request Flow:**

```
UI → Server Action / API Route → Service → Repository → Prisma → Supabase PostgreSQL
```
