# 012 - Kanban Board - Specification

## Overview

Vista tipo tablero Kanban para gestionar visualmente las aplicaciones de empleo, permitiendo al usuario mover aplicaciones entre columnas de estado mediante drag and drop.

## Goals

- Visualizar aplicaciones en columnas por estado
- Mover aplicaciones entre columnas con drag and drop
- Vista rápida del progreso de búsqueda de empleo
- Conteo de aplicaciones por columna

## User Stories

1. Como usuario, quiero ver mis aplicaciones organizadas por estado
2. Como usuario, quiero mover una aplicación a otro estado arrastrándola
3. Como usuario, quiero ver cuántas aplicaciones tengo en cada columna
4. Como usuario, quiero ver un resumen rápido de mi progreso

## Scope

### Incluido

- Tablero Kanban con columnas por estado
- Drag and drop entre columnas
- Tarjetas con información básica (título, empresa, fecha)
- Conteo por columna
- Actualización optimista de estado

### No incluido

- Drag and drop dentro de la misma columna (reordenar)
- Múltiples tableros
- Filtros avanzados en el tablero
- Columnas personalizadas

## Acceptance Criteria

- [ ] Tablero muestra columnas: Applied, Interview, Offer, Rejected
- [ ] Tarjetas muestran título, empresa, fecha
- [ ] Drag and drop funciona entre columnas
- [ ] Estado se actualiza al soltar tarjeta
- [ ] Conteo se actualiza automáticamente
- [ ] Responsive en tablet y desktop

## Technical Notes

- Usar @dnd-kit para drag and drop
- Reutilizar datos de applications existentes
- Crear componente KanbanBoard
- Actualizar estado via server action
- Optimistic updates para UX fluida
