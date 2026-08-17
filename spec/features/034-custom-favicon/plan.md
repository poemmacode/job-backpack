# Plan — Feature 034: Custom Favicon

## Arquitectura

```
BackpackIcon.tsx (SVG source)
        │
        ▼
   Generación de iconos (script/manual)
        │
        ▼
public/
  favicon.ico      (16x16 + 32x32)
  favicon.png      (48x48)
  apple-touch-icon.png (180x180)
  icon.png         (512x512 para OG)
        │
        ▼
src/app/layout.tsx (metadata.icons configurado)
```

## Archivos a modificar

| Archivo | Acción |
|---------|--------|
| `public/favicon.ico` | Crear — icono de pestaña del navegador |
| `public/favicon.png` | Crear — fallback para navegadores modernos |
| `public/apple-touch-icon.png` | Crear — icono para iOS/macOS |
| `public/icon.png` | Crear — Open Graph image |
| `src/app/layout.tsx` | Modificar — agregar metadata `icons` |
| `src/app/favicon.ico` | Eliminar — favicon default de Next.js |

## Generación de iconos

Se generarán los iconos rasterizados desde el SVG de BackpackIcon. Opciones:

1. **Sharp (recomendado)**: Script en Node.js usando `sharp` para convertir SVG a múltiples tamaños
2. **Herramienta manual**: Usar Figma, Sketch o conversor online para exportar PNGs
3. **SVG directo**: Crear `favicon.svg` y usar `<link rel="icon" type="image/svg+xml">` (no soportado en todos los navegadores)

Se recomienda Sharp para automatización y consistencia.

## Configuración de metadata

```tsx
export const metadata: Metadata = {
  title: 'Job Backpack - Organiza tu búsqueda de empleo',
  description: '...',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    images: ['/icon.png'],
  },
};
```

## Verificación

1. Abrir en Chrome, Firefox, Safari — verificar que el favicon aparece
2. Verificar apple-touch-icon en Safari iOS (simulador o dispositivo real)
3. Compartir URL en redes sociales — verificar que aparece la imagen OG
4. Ejecutar `npm run lint` y `npm run build`
