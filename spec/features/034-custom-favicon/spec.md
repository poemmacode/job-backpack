# Feature 034 — Custom Favicon

## Resumen

Reemplazar el favicon default de Next.js con un icono personalizado basado en el BackpackIcon del proyecto, en múltiples formatos y tamaños para compatibilidad cross-browser y dispositivos Apple.

## Objetivo

- Establecer identidad visual consistente en la barra de direcciones y pestañas del navegador
- Soporte para apple-touch-icon en dispositivos iOS/macOS
- Soporte para Open Graph image en redes sociales

## Alcance

### Incluido

- Generar favicon.ico (16x16, 32x32 combinado)
- Generar favicon.png (48x48)
- Generar apple-touch-icon.png (180x180)
- Generar icon.png para Open Graph (512x512)
- Configurar metadata `icons` en `layout.tsx`
- Eliminar favicon.ico default de `src/app/`

### Excluido

- Diseño de nuevos iconos (se usa BackpackIcon existente)
- Cambios en la identidad visual del logo in-app
- Favicons para PWA/manifest (se puede agregar después)

## Criterios de aceptación

1. El favicon personalizado aparece en la pestaña del navegador
2. Apple touch icon funciona en Safari iOS/macOS
3. Open Graph image aparece al compartir en redes sociales
4. No hay errores de lint ni build
5. Se elimina el favicon.ico default de `src/app/`

## Fuente del icono

El icono se genera desde `src/components/BackpackIcon.tsx`, un SVG con gradiente azul-verde (#0066FF → #00A8FF → #00D2A0).
