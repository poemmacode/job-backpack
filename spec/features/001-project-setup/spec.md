# 001 - Project Setup

## Descripción

Inicializar el proyecto con toda la infraestructura técnica según `tech-stack.md` y `architecture.md`.

## ¿Por qué?

Sin esto no se puede empezar a desarrollar ninguna feature. Es la base de todo.

## Criterios de Aceptación

- [ ] Next.js inicializado con App Router
- [ ] TypeScript configurado
- [ ] TailwindCSS funcionando
- [ ] Prisma configurado con Supabase PostgreSQL
- [ ] Supabase Auth configurado
- [ ] Supabase Storage configurado
- [ ] ESLint + Prettier configurados según coding-standards.md
- [ ] Estructura de carpetas según architecture.md:
  ```
  src/
  ├── app/
  ├── features/
  ├── components/
  ├── hooks/
  ├── lib/
  ├── server/
  ├── prisma/
  ├── types/
  └── utils/
  ```
- [ ] Script de development funciona (`npm run dev`)
- [ ] Script de build funciona (`npm run build`)
- [ ] Script de tests funciona (`npm run test`)
- [ ] .env.example con variables necesarias documentadas
- [ ] README.md con instrucciones de setup
