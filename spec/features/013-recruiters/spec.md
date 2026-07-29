# 013 - Recruiters - Specification

## Overview

Módulo para gestionar contactos de reclutadores y personas de contacto asociadas a las aplicaciones de empleo. Permite al usuario mantener un directorio de contactos y vincularlos con aplicaciones específicas.

## Goals

- Crear, editar y eliminar reclutadores/contactos
- Asociar reclutadores con aplicaciones
- Información de contacto: nombre, email, teléfono, empresa, LinkedIn
- Historial de interacciones con el reclutador
- Vista de reclutadores por aplicación

## User Stories

1. Como usuario, quiero agregar un reclutador/contacto nuevo
2. Como usuario, quiero editar la información de un reclutador
3. Como usuario, quiero eliminar un reclutador
4. Como usuario, quiero asociar un reclutador con una aplicación
5. Como usuario, quiero ver los reclutadores asociados a una aplicación
6. Como usuario, quiero ver todas mis aplicaciones asociadas a un reclutador
7. Como usuario, quiero buscar reclutadores por nombre o empresa

## Scope

### Incluido

- Modelo Recruiter en Prisma (name, email, phone, company, linkedIn, userId)
- Modelo ApplicationRecruiter para asociación (applicationId, recruiterId, role)
- CRUD completo de reclutadores
- Asociación de reclutadores con aplicaciones
- UI en página de detalle de aplicación
- UI独立 para gestión de reclutadores
- Búsqueda de reclutadores

### No incluido

- CRM completo de reclutadores
- Seguimiento de comunicaciones (emails, llamadas)
- Integración con LinkedIn API
- Importación masiva de contactos
- Sharing de reclutadores entre usuarios

## Acceptance Criteria

- [ ] Modelo Recruiter creado en Prisma
- [ ] Modelo ApplicationRecruiter creado en Prisma
- [ ] Crear reclutador desde página de reclutadores
- [ ] Editar reclutador existente
- [ ] Eliminar reclutador con confirmación
- [ ] Asociar reclutador a aplicación desde página de detalle
- [ ] Desasociar reclutador de aplicación
- [ ] Ver lista de reclutadores en página dedicada
- [ ] Ver reclutadores asociados en detalle de aplicación
- [ ] Buscar reclutadores por nombre o empresa

## Technical Notes

- Agregar modelos Recruiter y ApplicationRecruiter a schema.prisma
- Crear migration de Prisma
- Crear repositories para ambos modelos
- Crear server actions para CRUD y asociación
- Crear componentes UI para reclutadores
- Integrar en página de detalle de application
- Crear página /dashboard/recruiters para gestión
- Usar server actions para todas las operaciones
