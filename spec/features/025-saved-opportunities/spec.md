# 025 - Saved Opportunities - Specification

## Overview

Lista de favoritos o wishlist donde los usuarios pueden guardar vacantes interesantes para revisarlas después, sin importarlas como Jobs completos. Funciona como un "bookmarks" de oportunidades laborales.

## Goals

- Permitir guardar vacantes interesantes rápidamente
- Mantener una lista separada de Jobs activos
- Facilitar la revisión posterior de oportunidades
- Permitir convertir una oportunidad guardada en Job cuando esté listo
- Organizar con notas y prioridades

## User Stories

1. Como usuario, quiero guardar una vacante interesante para después
2. Como usuario, quiero ver todas mis oportunidades guardadas
3. Como usuario, quiero agregar notas a una oportunidad guardada
4. Como usuario, quiero marcar una oportunidad como prioridad
5. Como usuario, quiero eliminar oportunidades que ya no me interesan
6. Como usuario, quiero convertir una oportunidad guardada en Job
7. Como usuario, quiero ver cuándo guardé cada oportunidad
8. Como usuario, quiero filtrar por prioridad o fecha

## Scope

### Incluido

- Modelo SavedOpportunity en Prisma
- CRUD completo (crear, leer, actualizar, eliminar)
- Campos: título, empresa, ubicación, URL, salario, notas, prioridad
- Botón "Save" en Job Cards y resultados del scraper
- Lista de oportunidades guardadas
- Filtros por prioridad
- Convertir a Job
- Responsive design

### No incluido

- Sync con bookmark del navegador
- Compartir oportunidades
- Importación masiva
- Alertas de oportunidades guardadas
- Integración con calendario

## Acceptance Criteria

- [ ] Modelo SavedOpportunity creado en Prisma
- [ ] Migration ejecutada correctamente
- [ ] Botón "Save" funciona en Job Cards
- [ ] Botón "Save" funciona en resultados del scraper
- [ ] Lista muestra todas las oportunidades guardadas
- [ ] Filtros por prioridad funcionan
- [ ] Notas se pueden agregar y editar
- [ ] Conversión a Job funcional
- [ ] Eliminación con confirmación
- [ ] Responsive en mobile y desktop

## Technical Notes

- Requiere migración de Prisma para nuevo modelo
- SavedOpportunity tiene relación 1:1 con User
- Reutilizar componentes existentes de Job Cards
- Integrar con scraper para botón de guardado
- Seguir patrón de features existentes
