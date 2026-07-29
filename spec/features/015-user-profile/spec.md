# 015 - User Profile - Specification

## Overview

Página de perfil del usuario donde puede ver y editar su información personal, cambiar su contraseña, y ver estadísticas de su cuenta.

## Goals

- Visualizar información del perfil del usuario
- Editar nombre del usuario
- Cambiar contraseña
- Mostrar estadísticas de la cuenta (jobs, applications, recruiters)
- Gestionar avatar/foto de perfil

## User Stories

1. Como usuario, quiero ver mi perfil con mi información actual
2. Como usuario, quiero editar mi nombre
3. Como usuario, quiero cambiar mi contraseña
4. Como usuario, quiero ver cuántos jobs, applications y recruiters tengo
5. Como usuario, quiero subir o cambiar mi foto de perfil
6. Como usuario, quiero ver cuándo me registré

## Scope

### Incluido

- Página /dashboard/profile
- Formulario para editar nombre
- Sección de cambio de contraseña
- Estadísticas de cuenta (jobs, applications, recruiters)
- Fecha de registro
- Avatar con iniciales o imagen

### No incluido

- Cambio de email (requiere verificación de Supabase)
- Eliminación de cuenta
- Exportación de datos
- Preferencias de notificaciones
- Two-factor authentication

## Acceptance Criteria

- [ ] Página /dashboard/profile accesible
- [ ] Mostrar email (solo lectura)
- [ ] Editar nombre con validación
- [ ] Cambiar contraseña con validación
- [ ] Mostrar estadísticas: total jobs, applications, recruiters
- [ ] Mostrar fecha de registro
- [ ] Avatar con iniciales del nombre
- [ ] Feedback de éxito/error al guardar
- [ ] Loading states

## Technical Notes

- Usar Supabase Auth para cambio de contraseña
- Actualizar modelo User en Prisma si es necesario
- Crear server action para actualizar perfil
- Crear componente ProfilePageClient para partes interactivas
- Usar Supabase Storage para avatar (futuro)
