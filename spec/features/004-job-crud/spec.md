# 004 - Job CRUD

## Descripción

Crear, leer, actualizar y eliminar vacantes de empleo. Cada usuario gestiona sus propias vacantes.

## ¿Por qué?

Es la funcionalidad core de la aplicación. Sin esto no hay forma de guardar y organizar vacantes.

## Criterios de Aceptación

- [ ] Modelo Job en Prisma con campos: id, title, company, location, url, salary, notes, createdAt, updatedAt, userId
- [ ] Formulario para crear vacante con validación
- [ ] Formulario para editar vacante existente
- [ ] Botón de eliminar con confirmación
- [ ] Lista de vacantes del usuario
- [ ] Vista detallada de una vacante
- [ ] Solo el propietario puede ver/editar/eliminar sus vacantes
- [ ] Redirección post-creación a la lista
- [ ] Mensajes de éxito/error al crear/editar/eliminar
- [ ] Responsive en todas las vistas
