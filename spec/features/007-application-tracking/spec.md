# 007 - Application Tracking

## Descripción

Convertir una vacante (Job) en una postulación (Application) con estados: interested → applied → interview → offer → rejected.

## ¿Por qué?

El usuario necesita trackear el progreso de cada postulación, no solo tener vacantes guardadas.

## Criterios de Aceptación

- [ ] Modelo Application en Prisma con campos: id, status, jobId, userId, createdAt, updatedAt
- [ ] Estados: interested, applied, interview, offer, rejected
- [ ] Botón "Apply" en la vista de detalle de Job para crear Application
- [ ] Vista de Applications con lista y filtros por estado
- [ ] Cambio de estado con confirmación
- [ ] Badge de estado con colores diferentes
- [ ] Solo el propietario puede ver/editar sus Applications
- [ ] Dashboard muestra count de Applications por estado
- [ ] Responsive en todas las vistas
