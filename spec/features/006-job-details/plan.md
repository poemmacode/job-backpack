# 006 - Job Details - Plan

## Enfoque Técnico

### Estructura

```
src/features/jobs/
├── components/
│   ├── JobDetail.tsx       (actualizar)
│   ├── JobHeader.tsx       (nuevo)
│   ├── JobInfo.tsx         (nuevo)
│   └── JobNotes.tsx        (nuevo)
```

### Componentes

**JobHeader:**

- Título de la vacante
- Empresa
- Botones de acción: Edit, Delete, Back
- Link al URL original (si existe)

**JobInfo:**

- Location
- Salary
- URL (clickable)
- Timestamps (created, updated)

**JobNotes:**

- Notas de la vacante
- Estado vacío si no hay notas

**JobDetail (actualizar):**

- Combinar todos los componentes
- Layout de dos columnas en desktop
- Breadcrumb: Dashboard > Jobs > [Job Title]

## Decisiones Técnicas

- **Componentes pequeños**: cada sección en su propio archivo
- **Layout responsive**: dos columnas en desktop, una en mobile
- **Breadcrumb**: ayuda a la navegación
