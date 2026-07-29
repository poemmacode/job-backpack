# 017 - Activity Timeline - Specification

## Overview

Línea de tiempo que muestra todas las actividades recientes del usuario en orden cronológico, incluyendo cambios de estado de aplicaciones, notas creadas, attachments subidos, y otras acciones relevantes.

## Goals

- Mostrar actividad reciente del usuario en orden cronológico
- Visualizar diferentes tipos de actividades
- Filtrar por tipo de actividad
- Navegar directamente a la actividad relacionada
- Proporcionar contexto sobre cada acción

## User Stories

1. Como usuario, quiero ver mis actividades recientes en orden cronológico
2. Como usuario, quiero ver cambios de estado de aplicaciones
3. Como usuario, quiero ver notas creadas
4. Como usuario, quiero ver attachments subidos
5. Como usuario, quiero ver nuevos reclutadores asociados
6. Como usuario, quiero filtrar actividades por tipo
7. Como usuario, quiero navegar al elemento relacionado

## Scope

### Incluido

- Página /dashboard/activity
- Timeline visual con eventos cronológicos
- Tipos de actividad:
  - Application status changes
  - Notes created
  - Attachments uploaded
  - Recruiters associated
  - Jobs created
- Filtro por tipo de actividad
- Paginación (carga无限 scroll o botón "Load more")
- Iconos y colores por tipo de actividad
- Timestamp relativo (hace 2 horas, ayer, etc.)

### No incluido

- Actividad de otros usuarios
- Exportación de actividad
- Notificaciones en tiempo real
- Detalle completo de cada actividad
- Estadísticas de actividad

## Acceptance Criteria

- [ ] Página /dashboard/activity accesible
- [ ] Timeline muestra actividades en orden cronológico
- [ ] Cada actividad muestra: icono, descripción, timestamp
- [ ] Actividades son clickeables y navegan al elemento
- [ ] Filtro por tipo funciona correctamente
- [ ] Paginación o infinite scroll funciona
- [ ] Empty state cuando no hay actividad
- [ ] Loading states manejados
- [ ] Responsive en mobile y desktop

## Technical Notes

- Crear modelo Activity en Prisma (o usar tablas existentes con timestamp)
- Crear repository para obtener actividades
- Crear server action con paginación
- Componentes: ActivityTimeline, ActivityItem, ActivityFilters
- Usar created_at de las tablas existentes como timestamp
- No crear modelo separado - derivar de tablas existentes
