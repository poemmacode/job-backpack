# 022 - Analytics Dashboard - Specification

## Overview

Dashboard de analytics que proporciona métricas detalladas y tendencias del proceso de búsqueda de empleo del usuario. Va más allá del dashboard principal mostrando insights profundos para ayudar al usuario a optimizar su estrategia de búsqueda.

## Goals

- Visualizar tendencias de postulaciones en el tiempo
- Mostrar tasa de conversión por etapa del funnel
- Identificar empresas y skills más frecuentes
- Analizar tiempo de respuesta por empresa/estado
- Detectar patrones de éxito y áreas de mejora
- Comparar métricas entre períodos

## User Stories

1. Como usuario, quiero ver la tendencia de mis postulaciones por mes/semana
2. Como usuario, quiero ver mi funnel de conversión (applied → interview → offer)
3. Como usuario, quiero ver qué empresas aplico con más frecuencia
4. Como usuario, quiero ver qué skills son más demandadas en mis postulaciones
5. Como usuario, quiero ver el tiempo promedio entre cada etapa
6. Como usuario, quiero ver mi tasa de éxito por tipo de vacante
7. Como usuario, quiero comparar métricas con el mes anterior
8. Como usuario, quiero ver gráficos de distribución temporal

## Scope

### Incluido

- Gráfico de tendencia de postulaciones (línea temporal)
- Funnel de conversión (Applied → Screening → Interview → Offer)
- Top empresas aplicadas
- Skills más demandadas extraídas de títulos/descripciones
- Tiempo promedio por etapa
- Comparativa con período anterior
- Filtros de rango de fechas (semana, mes, 3 meses, 6 meses, año)
- Responsive design
- Empty states para datos insuficientes

### No incluido

- Exportación de reportes
- Analytics de uso de la app (PostHog)
- Recomendaciones basadas en IA
- Comparación con otros usuarios
- Predictiones de éxito
- Integración conLinkedIn Analytics

## Acceptance Criteria

- [ ] Gráfico de tendencia muestra postulaciones por período seleccionado
- [ ] Funnel de conversión calcula y muestra tasas correctas
- [ ] Top empresas muestra las 5 más aplicadas
- [ ] Skills extraídos al menos de títulos de vacantes
- [ ] Tiempo promedio por etapa calculado correctamente
- [ ] Comparativa con período anterior funcional
- [ ] Filtros de fecha funcionan correctamente
- [ ] Responsive en mobile y desktop
- [ ] Empty states para usuarios con pocos datos

## Technical Notes

- Crear feature analytics con estructura estándar
- Repository con queries de agregación en Prisma
- Componentes de gráficos: usar librería de charting existente o crear componentes simples con CSS
- Mantener Server Components para data fetching
- Extraer skills de títulos de jobs con lógica simple (match de keywords)
- Calcular métricas de funnel usando groupBy de Prisma
