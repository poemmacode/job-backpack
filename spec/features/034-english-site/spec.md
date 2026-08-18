# Feature 034 — English Site

## Resumen

Establecer el sitio completamente en inglés. Actualmente el landing page tiene texto en español mientras que el dashboard/app ya está en inglés.

## Objetivo

- Alinear todo el contenido del sitio con el atributo `lang="en"` ya configurado
- Consistencia de idioma en toda la experiencia de usuario

## Alcance

### Incluido

- Traducir metadata de layout.tsx (title, description)
- Traducir Hero.tsx (heading, párrafo)
- Traducir Features.tsx (descripciones, headings de sección)
- Traducir HowItWorks.tsx (descripciones, headings de sección)
- Traducir TargetAudience.tsx (heading, subheading)

### Excluido

- Infraestructura i18n (no se necesita — el dashboard ya está en inglés)
- Traducción de contenido dinámico del usuario
- Cambios de diseño o layout

## Criterios de aceptación

1. Todo el texto visible del sitio está en inglés
2. El atributo `lang="en"` permanece configurado
3. No hay errores de lint ni build
4. La información se mantiene fiel al contenido original en español

## Nota

El dashboard/app ya estaba 100% en inglés. Solo el landing page (5 archivos, 17 strings) necesita traducción.
