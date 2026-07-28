# 008 - Application Dashboard - Specification

## Overview

Página de dashboard que muestra un resumen visual del estado de todas las postulaciones del usuario, con métricas y gráficos para entender rápidamente el progreso de su búsqueda de empleo.

## Goals

- Visualizar el estado actual de todas las postulaciones
- Mostrar métricas clave: total, por estado, tasa de respuesta, interviews pendientes
- Identificar applications que necesitan atención (sin respuesta por mucho tiempo)
- Facilitar el seguimiento del funnel de aplicación

## User Stories

1. Como usuario, quiero ver un dashboard con métricas de mis postulaciones
2. Como usuario, quiero ver una distribución visual por estado
3. Como usuario, quiero identificar applications stale (sin respuesta)
4. Como usuario, quiero ver un timeline de actividad reciente

## Scope

### Incluido

- Dashboard page con métricas principales
- Gráfico de distribución por estado (usando chart simple con CSS)
- Lista de applications stale (>14 días sin respuesta)
- Timeline de actividad reciente
- Responsive design

### No incluido

- Gráficos complejos (librerías externas)
- Exportar datos
- Filtros avanzados (ya existe en applications page)

## Acceptance Criteria

- [ ] Dashboard muestra total de applications
- [ ] Dashboard muestra count por cada status
- [ ] Dashboard muestra applications stale (>14 días sin interview)
- [ ] Dashboard muestra últimas 5 applications con fecha
- [ ] Dashboard es responsive
- [ ] Dashboard carga en <2 segundos
- [ ] Dashboard muestra tasa de respuesta (applications con interview / total)

## Technical Notes

- Reutilizar `getApplicationCounts` del repositorio existente
- Crear función `getStaleApplications` en repositories
- Crear función `getRecentApplications` en repositories
- Usar server components para carga de datos
- CSS puro para gráficos de barras (sin librerías externas)
