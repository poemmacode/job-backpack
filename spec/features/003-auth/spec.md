# 003 - Auth (Login/Signup)

## Descripción

Autenticación de usuarios con email/password usando Supabase Auth. Incluye login, signup, recuperación de contraseña y protección de rutas.

## ¿Por qué?

Sin autenticación no hay forma de que cada usuario tenga sus propias postulaciones y datos privados.

## Criterios de Aceptación

- [ ] Página de Login con email y password
- [ ] Página de Signup con email, password y confirmación
- [ ] Página de "Forgot Password" para recuperación
- [ ] Redirección post-login a dashboard
- [ ] Protección de rutas: rutas privadas redirigen a login si no hay sesión
- [ ] Sesión persistente (cookie-based)
- [ ] Botón de Logout que cierra sesión
- [ ] Mensajes de error claros (email ya registrado, credenciales incorrectas, etc.)
- [ ] Responsive en todas las páginas de auth
- [ ] Formularios con validación (email válido, password mínima 6 caracteres)
