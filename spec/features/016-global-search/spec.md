# 016 - Global Search - Specification

## Overview

Barra de búsqueda global que permite al usuario buscar a través de todos sus datos (jobs, applications, notes, recruiters) desde cualquier página del dashboard.

## Goals

- Búsqueda rápida y unificada across todos los datos
- Resultados categorizados por tipo
- Navegación directa al resultado seleccionado
- Búsqueda en tiempo real con debounce
- Accesible desde cualquier página del dashboard

## User Stories

1. Como usuario, quiero buscar jobs por título o empresa
2. Como usuario, quiero buscar applications por empresa o estado
3. Como usuario, quiero buscar notes por contenido
4. Como usuario, quiero buscar recruiters por nombre o empresa
5. Como usuario, quiero ver resultados categorizados
6. Como usuario, quiero navegar directamente al resultado

## Scope

### Incluido

- Barra de búsqueda en el Navbar
- Búsqueda de jobs (título, empresa)
- Búsqueda de applications (empresa, estado)
- Búsqueda de notes (contenido)
- Búsqueda de recruiters (nombre, empresa)
- Resultados dropdown con categorías
- Navegación con teclado (arrow keys, enter)
- Debounce de 300ms
- Loading states
- Empty states

### No incluido

- Búsqueda con filtros avanzados
- Historial de búsquedas
- Búsqueda guardada
- Autocompletado
- Búsqueda en tiempo real con WebSocket

## Acceptance Criteria

- [ ] Barra de búsqueda visible en todas las páginas del dashboard
- [ ] Búsqueda funciona con debounce de 300ms
- [ ] Resultados mostrados por categoría (Jobs, Applications, Notes, Recruiters)
- [ ] Click en resultado navega a la página correspondiente
- [ ] Navegación con teclado funciona (↑↓ para navegar, Enter para seleccionar)
- [ ] Escape cierra los resultados
- [ ] Loading state mientras busca
- [ ] Empty state cuando no hay resultados
- [ ] Responsive en mobile y desktop

## Technical Notes

- Crear Server Action para buscar across todas las entidades
- Usar debounce hook personalizado
- Componente SearchResult con iconos por categoría
- Integrar en Navbar existente
- Usar Cmd+K o / como atajo de teclado (opcional)
