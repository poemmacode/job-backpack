# 005 - Job Listing & Filters - Plan

## Enfoque Técnico

### Estructura

```
src/features/jobs/
├── components/
│   ├── JobFilters.tsx       (nuevo)
│   ├── JobSearchBar.tsx     (nuevo)
│   └── JobList.tsx          (actualizar)
├── hooks/
│   └── useJobFilters.ts     (nuevo)
├── utils/
│   └── filterJobs.ts        (nuevo)
```

### Filtrado Client-Side

Usar estado local para manejar filtros sin llamadas al servidor:

- `searchQuery` - búsqueda por título
- `companyFilter` - filtro por empresa
- `locationFilter` - filtro por ubicación
- `dateFilter` - filtro por fecha

### Componentes

**JobSearchBar:**

- Input de búsqueda con ícono
- Debounce de 300ms para evitar renders excesivos

**JobFilters:**

- Select dropdown para empresa (valores únicos de las jobs)
- Select dropdown para ubicación (valores únicos)
- Select dropdown para fecha (week, month, all)
- Botón "Clear filters"

**JobList (actualizar):**

- Recibir filtros como props
- Filtrar jobs en el cliente
- Mostrar contador de resultados
- Mostrar estado vacío

### Utils

Función `filterJobs(jobs, filters)` que aplica todos los filtros y retorna las jobs filtradas.

## Decisiones Técnicas

- **Client-side filtering**: las jobs ya se cargan en la página, no necesitamos server-side filtering aún
- **Debounce**: evitar renders excesivos mientras el usuario escribe
- **URL params futuro**: mantener filtros en URL para compartir links (futuro)
