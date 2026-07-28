# 010 - Notes - Specification

## Overview

Sistema de notas para agregar información adicional a las aplicaciones y trabajos, permitiendo al usuario guardar seguimiento, feedback de entrevistas, contactos, y otros datos relevantes.

## Goals

- Crear, editar y eliminar notas en applications
- Tipos de nota predefinidos (general, interview, follow-up, etc.)
- Ordenar notas por fecha
- Buscar notas por contenido

## User Stories

1. Como usuario, quiero agregar notas a una aplicación
2. Como usuario, quiero editar notas existentes
3. Como usuario, quiero eliminar notas
4. Como usuario, quiero filtrar notas por tipo
5. Como usuario, quiero buscar notas por contenido

## Scope

### Incluido

- Modelo Note en Prisma (content, type, applicationId)
- Tipos de nota: general, interview, follow-up, feedback, contact
- CRUD completo de notas
- UI en página de detalle de aplicación
- Filtro por tipo de nota
- Búsqueda por contenido

### No incluido

- Notas en jobs directamente (solo via applications)
- Notas compartidas
- Adjuntos en notas
- Rich text editing

## Acceptance Criteria

- [ ] Modelo Note creado en Prisma
- [ ] Crear nota desde página de detalle
- [ ] Editar nota existente
- [ ] Eliminar nota con confirmación
- [ ] Filtrar por tipo de nota
- [ ] Buscar notas por contenido
- [ ] Notas ordenadas por fecha (más reciente primero)

## Technical Notes

- Agregar modelo Note a schema.prisma
- Crear repository, actions, components
- Integrar en página de detalle de application
- Usar server actions para CRUD
