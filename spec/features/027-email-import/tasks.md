# 027 - Email Import / Parsing - Tasks

## Database

- [ ] 1.1 Agregar modelo ImportedEmail a prisma/schema.prisma
- [ ] 1.2 Ejecutar prisma db push
- [ ] 1.3 Generar tipos de Prisma

## Email Ingestion API

- [ ] 2.1 Crear POST /api/emails/ingest/route.ts
- [ ] 2.2 Crear POST /api/emails/upload/route.ts
- [ ] 2.3 Crear GET /api/emails/history/route.ts
- [ ] 2.4 Agregar CORS para ingest endpoint
- [ ] 2.5 Excluir del middleware auth

## Parsers

- [ ] 3.1 Crear src/features/emails/lib/extractors.ts
- [ ] 3.2 Crear parsers/linkedin.ts
- [ ] 3.3 Crear parsers/indeed.ts
- [ ] 3.4 Crear parsers/generic.ts
- [ ] 3.5 Crear parsers/index.ts (factory)
- [ ] 3.6 Instalar dependencia mailparser

## UI - Upload Page

- [ ] 4.1 Crear /dashboard/import/page.tsx
- [ ] 4.2 Crear EmailUpload.tsx
- [ ] 4.3 Crear EmailPreview.tsx
- [ ] 4.4 Crear EmailHistory.tsx
- [ ] 4.5 Agregar ruta al Sidebar

## Testing

- [ ] 5.1 Test parser LinkedIn
- [ ] 5.2 Test parser Indeed
- [ ] 5.3 Test parser Genérico
- [ ] 5.4 Test upload endpoint
- [ ] 5.5 Test ingest endpoint

## Documentation

- [ ] 6.1 Actualizar roadmap.md
