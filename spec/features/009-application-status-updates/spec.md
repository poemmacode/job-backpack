# 009 - Application Status Updates - Specification

## Overview

Permitir al usuario actualizar el estado de una aplicación directamente desde la página de detalles de la aplicación, con transiciones de estado válidas y feedback visual.

## Goals

- Actualizar estado de aplicación desde la página de detalle
- Mostrar transiciones de estado válidas (no todas las transiciones son posibles)
- Feedback visual inmediato al cambiar estado
- Historial de cambios de estado

## User Stories

1. Como usuario, quiero cambiar el estado de una aplicación desde su página de detalles
2. Como usuario, quiero ver qué transiciones de estado son válidas
3. Como usuario, quiero ver cuándo cambió el estado por última vez
4. Como usuario, quiero confirmar cambios de estado importantes

## Scope

### Incluido

- StatusUpdateButton en página de detalle de aplicación
- Transiciones válidas:
  - interested → applied, withdrawn
  - applied → interview, rejected, withdrawn
  - interview → offer, rejected, withdrawn
  - offer → accepted, rejected, withdrawn
  - accepted → (terminal)
  - rejected → (terminal)
  - ghosted → applied
  - withdrawn → applied
- Confirmación para cambios a "rejected" o "withdrawn"
- Timestamp del último cambio
- Optimistic update en UI

### No incluido

- Historial completo de cambios (audit log)
- Notificaciones por email de cambios
- Cambios de estado automáticos

## Acceptance Criteria

- [ ] Botón de actualizar estado en página de detalle
- [ ] Dropdown muestra solo transiciones válidas
- [ ] Confirmación al cambiar a rejected/withdrawn
- [ ] Timestamp muestra última actualización
- [ ] UI se actualiza inmediatamente (optimistic)
- [ ] Error handling si falla la actualización

## Technical Notes

- Reutilizar `updateApplicationStatus` existente
- Crear función `getValidTransitions` en repository
- Crear componente `StatusUpdateButton`
- Usar `useOptimistic` de React para updates inmediatos
- Agregar campo `updatedAt` al mostrar (ya existe en schema)
