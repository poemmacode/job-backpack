# 024 - Job Scraper - Specification

## Overview

Sistema de scraping automático de vacantes laborales desde sitios externos (Indeed, Glassdoor). Permite a los usuarios buscar y importar vacantes automáticamente basándose en sus Search Profiles o búsqueda personalizada.

## Goals

- Automatizar la búsqueda de vacantes en múltiples fuentes
- Importar vacantes encontradas directamente como Jobs en la app
- Reutilizar Search Profiles existentes como criterios de búsqueda
- Evitar duplicados al importar
- Respetar rate limits y términos de servicio

## User Stories

1. Como usuario, quiero buscar vacantes en Indeed desde la app
2. Como usuario, quiero buscar vacantes en Glassdoor desde la app
3. Como usuario, quiero usar mis Search Profiles como criterios de búsqueda
4. Como usuario, quiero ver los resultados antes de importarlos
5. Como usuario, quiero importar vacantes seleccionadas como Jobs
6. Como usuario, quiero evitar importar vacantes duplicadas
7. Como usuario, quiero ver el historial de búsquedas realizadas
8. Como usuario, quiero configurar búsquedas guardadas

## Scope

### Incluido

- Scraping de Indeed (búsqueda por关键词 + ubicación)
- Scraping de Glassdoor (búsqueda por关键词 + ubicación)
- UI de búsqueda con fuente seleccionable
- Importación de resultados como Jobs
- Detección de duplicados por título + empresa
- Historial de búsquedas recientes
- Integración con Search Profiles
- Loading states y manejo de errores

### No incluido

- Scraping automático programado (cron jobs)
- Scraping de LinkedIn (requiere autenticación, TOS estricto)
- Scraping de páginas con protección anti-bot avanzada
- Extracción de descripción completa de vacantes
- Alertas de nuevas vacantes
- Exportación de vacantes

## Acceptance Criteria

- [ ] UI de búsqueda funcional con selección de fuente
- [ ] Scraping de Indeed retorna resultados
- [ ] Scraping de Glassdoor retorna resultados
- [ ] Resultados muestran título, empresa, ubicación, URL
- [ ] Importación crea Jobs en la base de datos
- [ ] Duplicados detectados y marcados
- [ ] Search Profiles pueden usarse como criterios
- [ ] Loading states manejados correctamente
- [ ] Errores de scraping manejados gracefully
- [ ] Responsive design

## Technical Notes

- Usar fetch con headers de navegador para scraping
- Implementar delays entre requests para evitar rate limiting
- Parsear HTML con DOMParser o similar
- Guardar URLs originales para referencia
- Considerar usar Supabase Edge Functions para scraping server-side
- Rate limit: máximo 1 request por segundo por fuente
