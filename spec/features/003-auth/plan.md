# 003 - Auth (Login/Signup) - Plan

## Enfoque Técnico

### Estructura

```
src/features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── ForgotPasswordForm.tsx
│   └── AuthFormWrapper.tsx
├── actions/
│   └── auth.ts          (Server Actions)
├── schemas/
│   └── auth.ts          (Zod validation)
├── hooks/
│   └── useAuth.ts
├── types.ts
└── index.ts

src/app/
├── login/page.tsx
├── signup/page.tsx
├── forgot-password/page.tsx
└── layout.tsx           (update - redirect if logged in)

src/middleware.ts         (route protection)
```

### Server Actions

Usar Server Actions de Next.js para manejar form submissions:

- `login(email, password)` → supabase.auth.signInWithPassword
- `signup(email, password)` → supabase.auth.signUp
- `logout()` → supabase.auth.signOut
- `resetPassword(email)` → supabase.auth.resetPasswordForEmail

### Middleware

Crear `src/middleware.ts` para proteger rutas:

- Rutas públicas: `/`, `/login`, `/signup`, `/forgot-password`
- Rutas protegidas: todo lo demás (futuro: `/dashboard`, `/jobs`, etc.)

### Validación

Usar Zod para validar formularios:

- Email: formato válido, required
- Password: mínima 6 caracteres, required

### Flujos

**Login:**

1. Usuario ingresa email y password
2. Server Action llama a supabase.auth.signInWithPassword
3. Si exitoso → redirect a `/dashboard`
4. Si error → mostrar mensaje de error

**Signup:**

1. Usuario ingresa email y password
2. Server Action llama a supabase.auth.signUp
3. Si exitoso → mostrar mensaje de "verifica tu email"
4. Si error → mostrar mensaje de error

**Forgot Password:**

1. Usuario ingresa email
2. Server Action llama a supabase.auth.resetPasswordForEmail
3. Si exitoso → mostrar mensaje de "revisa tu email"
4. Si error → mostrar mensaje de error

## Decisiones Técnicas

- **Server Actions en vez de API Routes**: más simple, integrado con Next.js
- **Zod para validación**: ya está en el tech stack
- **Middleware para proteger rutas**: enfoque estándar de Next.js
- **Cookies para sesión**: Supabase maneja esto automáticamente con SSR
