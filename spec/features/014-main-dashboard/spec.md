# 014 - Main Dashboard - Specification

## Overview

Dashboard principal que proporciona una vista general del progreso de búsqueda de empleo del usuario. Muestra métricas clave, distribución de estados, actividad reciente y alertas importantes en un solo lugar.

## Goals

- Proporcionar una vista completa del estado de búsqueda de empleo
- Mostrar métricas clave de un vistazo
- Visualizar distribución de aplicaciones por estado
- Destacar aplicaciones que requieren atención
- Mostrar actividad reciente
- Accesos rápidos a acciones comunes

## User Stories

1. Como usuario, quiero ver el total de jobs guardados
2. Como usuario, quiero ver el total de aplicaciones enviadas
3. Como usuario, quiero ver cuántas aplicaciones están en entrevista
4. Como usuario, quiero ver cuántas ofertas he recibido
5. Como usuario, quiero ver la distribución de aplicaciones por estado
6. Como usuario, quiero ver aplicaciones que llevan mucho tiempo sin actualización
7. Como usuario, quiero ver mi actividad reciente
8. Como usuario, quiero acceder rápidamente a acciones comunes

## Scope

### Incluido

- Métricas: Total Jobs, Total Applications, Interviews, Offers
- Gráfico de distribución por estado (barras horizontales)
- Sección de "Needs Attention" (aplicaciones stale > 14 días)
- Actividad reciente (últimas 5 aplicaciones actualizadas)
- Accesos rápidos: Add Job, View Jobs, View Applications, Kanban
- Tasa de respuesta (interviews / total)
- Responsive design

### No incluido

- Gráficos de tendencias temporales
- Comparativas entre períodos
- Exportación de datos
- Widgets personalizables
- Integración con calendario

## Acceptance Criteria

- [ ] Dashboard muestra 4 métricas principales
- [ ] Gráfico de distribución por estado funcional
- [ ] Sección "Needs Attention" muestra aplicaciones stale
- [ ] Actividad reciente muestra últimas 5 aplicaciones
- [ ] Accesos rápidos funcionales
- [ ] Responsive en mobile y desktop
- [ ] Loading states manejados
- [ ] Empty states para usuarios nuevos

## Technical Notes

- Usar componentes existentes: MetricCard, StatusChart, StaleAlert, RecentActivity
- Crear función getApplicationMetrics en repositories
- Crear componente DashboardPageClient para partes interactivas
- Mantener Server Components para data fetching
- Usar Suspense para loading states
