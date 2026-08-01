# 023 - Search Profiles - Specification

## Overview

Perfiles de búsqueda de empleo que permiten a los usuarios definir y guardar sus preferencias de búsqueda. Cada perfil representa un conjunto de criterios que el usuario busca en oportunidades laborales, facilitando la organización y segmentación de su búsqueda.

## Goals

- Permitir a los usuarios crear múltiples perfiles de búsqueda
- Guardar preferencias detalladas por perfil
- Facilitar la organización de la búsqueda por categorías
- Editar y eliminar perfiles existentes
- Seleccionar un perfil como activo

## User Stories

1. Como usuario, quiero crear un perfil de búsqueda con mis preferencias
2. Como usuario, quiero ver todos mis perfiles de búsqueda
3. Como usuario, quiero editar un perfil existente
4. Como usuario, quiero eliminar un perfil que ya no necesite
5. Como usuario, quiero seleccionar un perfil como mi perfil activo
6. Como usuario, quiero definir ubicaciones de interés
7. Como usuario, quiero definir tipos de trabajo remoto/híbrido/presencial
8. Como usuario, quiero definir rango salarial esperado
9. Como usuario, quiero definir skills o tecnologías de interés
10. Como usuario, quiero agregar notas o prioridades al perfil

## Scope

### Incluido

- Modelo SearchProfile en Prisma
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Campos: nombre, ubicaciones, tipo de trabajo, salario, skills, notas
- UI de lista de perfiles
- Formulario de creación/edición
- Selección de perfil activo
- Confirmación de eliminación
- Empty state para nuevos usuarios
- Responsive design

### No incluido

- Integración automática con job scraper
- Matching automático de perfil con vacantes
- Perfiles compartidos
- Importación/exportación de perfiles
- IA para sugerir perfiles

## Acceptance Criteria

- [ ] Modelo SearchProfile creado en Prisma
- [ ] Migration ejecutada correctamente
- [ ] CRUD funcional (create, read, update, delete)
- [ ] Lista de perfiles muestra todos los del usuario
- [ ] Formulario valida campos requeridos
- [ ] Edición carga datos existentes
- [ ] Eliminación muestra confirmación
- [ ] Perfil activo se resalta visualmente
- [ ] Empty state para usuarios sin perfiles
- [ ] Responsive en mobile y desktop

## Technical Notes

- Requiere migración de Prisma para nuevo modelo
- SearchProfile tiene relación 1:1 con User
- Usar Server Actions para CRUD
- Seguir patrón de features existentes (profile, recruiters)
- Validar con Zod en Server Actions
