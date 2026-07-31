# 022 - Analytics Dashboard - Tasks

## Setup

- [x] 1.1 Crear estructura de feature: `src/features/analytics/`
- [x] 1.2 Crear types/analytics.ts con tipos de datos

## Database / Repositories

- [x] 2.1 Crear analytics.ts repository
- [x] 2.2 Implementar getApplicationsByPeriod (tendencia temporal)
- [x] 2.3 Implementar getFunnelData (funnel de conversión)
- [x] 2.4 Implementar getTopCompanies (top empresas)
- [x] 2.5 Implementar getTopSkills (extraer skills de títulos)
- [x] 2.6 Implementar getStageTimeAverages (tiempo promedio por etapa)
- [x] 2.7 Implementar comparación con período anterior

## Utils

- [x] 3.1 Crear utils/date-range.ts (helper para rangos de fechas)
- [x] 3.2 Implementar funciones de cálculo de períodos

## Components

- [x] 4.1 Crear AnalyticsPageClient.tsx (wrapper client)
- [x] 4.2 Crear AnalyticsFilters.tsx (selector de rango de fechas)
- [x] 4.3 Crear TrendChart.tsx (gráfica de tendencia)
- [x] 4.4 Crear FunnelChart.tsx (funnel de conversión)
- [x] 4.5 Crear TopCompanies.tsx (lista top empresas)
- [x] 4.6 Crear TopSkills.tsx (skills más demandados)
- [x] 4.7 Crear StageTime.tsx (tiempo promedio por etapa)
- [x] 4.8 Crear ComparisonCard.tsx (comparativa con período anterior)

## Page

- [x] 5.1 Crear `src/app/analytics/page.tsx` (Server Component)
- [x] 5.2 Integrar AnalyticsFilters
- [x] 5.3 Integrar TrendChart
- [x] 5.4 Integrar FunnelChart
- [x] 5.5 Integrar TopCompanies y TopSkills
- [x] 5.6 Integrar StageTime
- [x] 5.7 Integrar ComparisonCard
- [x] 5.8 Implementar Suspense boundaries para loading

## Styling

- [x] 6.1 Layout responsive (1 col mobile, 2 col tablet/desktop)
- [x] 6.2 Spacing consistente entre secciones
- [x] 6.3 Empty states para usuarios con pocos datos
- [x] 6.4 Colores consistentes con el resto de la app

## Testing

- [x] 7.1 Verificar métricas calculadas correctamente
- [x] 7.2 Verificar componentes renderizan correctamente
- [x] 7.3 Verificar responsive design
- [x] 7.4 Verificar filtros de fecha funcionan
- [x] 7.5 Verificar comparativa con período anterior

## Documentation

- [x] 8.1 Actualizar roadmap.md - Marcar feature 022 como completado
