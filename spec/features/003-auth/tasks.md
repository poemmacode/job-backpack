# 003 - Auth (Login/Signup) - Tasks

## Estructura

- [x] Crear `src/features/auth/` con subcarpetas
- [x] Crear `src/features/auth/index.ts`
- [x] Crear `src/features/auth/types.ts`

## Schemas (Zod)

- [x] Crear `src/features/auth/schemas/auth.ts` con validación de login, signup, forgot-password

## Server Actions

- [x] Crear `src/features/auth/actions/auth.ts`
  - `login(email, password)`
  - `signup(email, password)`
  - `logout()`
  - `resetPassword(email)`

## Componentes

- [x] Crear `src/features/auth/components/AuthFormWrapper.tsx`
- [x] Crear `src/features/auth/components/LoginForm.tsx`
- [x] Crear `src/features/auth/components/SignupForm.tsx`
- [x] Crear `src/features/auth/components/ForgotPasswordForm.tsx`

## Páginas

- [x] Crear `src/app/login/page.tsx`
- [x] Crear `src/app/signup/page.tsx`
- [x] Crear `src/app/forgot-password/page.tsx`

## Middleware

- [x] Crear `src/middleware.ts` para proteger rutas
- [x] Definir rutas públicas y protegidas

## Hooks

- [x] Crear `src/features/auth/hooks/useAuth.ts` (obtener sesión actual)

## Integración

- [x] Actualizar Navbar para mostrar login/logout según sesión
- [x] Redirect a dashboard post-login
- [x] Crear página placeholder de dashboard

## Verificación

- [x] `npm run build` pasa
- [x] `npm run lint` pasa
- [x] `npm run test` pasa
- [x] `npm run format:check` pasa
