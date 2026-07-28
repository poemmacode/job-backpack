# 002 - Landing Page - Plan

## Enfoque Técnico

### Estructura de Componentes

```
src/features/landing/
├── components/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── TargetAudience.tsx
│   └── Footer.tsx
├── index.ts
└── types.ts
```

### Componentes Compartidos

```
src/components/
├── Navbar.tsx
└── Button.tsx
```

### Página Principal

Modificar `src/app/page.tsx` para renderizar la landing page.

---

## Secciones

### 1. Navbar

- Logo (nombre del proyecto)
- Links: Features, How it works
- Botones: Login, Sign Up (CTA)

### 2. Hero

- Título: "Organiza tu búsqueda de empleo"
- Subtítulo: "Trackea tus postulaciones, CVs y entrevistas en un solo lugar"
- CTA primario: "Get Started"
- CTA secundario: "Learn More"

### 3. TargetAudience

- Título: "Para profesionales de tecnología"
- Lista: Software Engineers, Data Engineers, Data Scientists, DevOps, QA, PMs, Designers

### 4. Features

- 3-4 cards con:
  - Ícono
  - Título
  - Descripción corta
- Features: Job Tracking, Application Management, Notes & Attachments, AI Insights (futuro)

### 5. HowItWorks

- 3 pasos:
  1. "Save jobs you're interested in"
  2. "Track your applications"
  3. "Get insights to improve"

### 6. Footer

- Copyright
- Links básicos (Privacy, Terms)

---

## Decisiones Técnicas

- **Server Components por defecto**: mejor performance y SEO
- **Componentes separados**: cada sección en su propio archivo para mantenibilidad
- **TailwindCSS**: utilidades para diseño responsive sin CSS adicional
- **Sin dependencias externas**: usar solo Tailwind para íconos (heroicons o similar)

## Responsive

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Navbar colapsa en mobile con hamburger menu
