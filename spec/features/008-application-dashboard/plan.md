# 008 - Application Dashboard - Plan

## Architecture

### Data Layer

Agregar funciones al repositorio existente:

```typescript
// src/features/applications/repositories/applications.ts

// Obtener applications stale (>14 días sin respuesta)
export async function getStaleApplications(userId: string): Promise<Application[]>;

// Obtener últimas applications
export async function getRecentApplications(userId: string, limit?: number): Promise<Application[]>;

// Calcular métricas
export async function getApplicationMetrics(userId: string): Promise<ApplicationMetrics>;
```

### Types

```typescript
// src/features/applications/types.ts

interface ApplicationMetrics {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
  responseRate: number; // applications with interview / total
  staleCount: number;
}
```

### Components

```
src/features/dashboard/
├── components/
│   ├── MetricCard.tsx      # Card con métrica individual
│   ├── StatusChart.tsx     # Gráfico de barras por status
│   ├── StaleAlert.tsx      # Lista de applications stale
│   └── RecentActivity.tsx  # Timeline de actividad
└── index.ts
```

### Pages

```
src/app/dashboard/overview/
└── page.tsx  # Server component
```

## Data Flow

```
page.tsx (Server)
  ├── getUser()
  ├── getApplicationMetrics()
  ├── getStaleApplications()
  └── getRecentApplications()
        ↓
DashboardClient (Client)
  ├── MetricCard (x4)
  ├── StatusChart
  ├── StaleAlert
  └── RecentActivity
```

## Design

### Layout

```
┌─────────────────────────────────────────────┐
│  Application Dashboard                      │
├─────────┬─────────┬─────────┬───────────────┤
│ Total   │ Interviews│ Response│ Stale        │
│ 12      │ 3       │ 25%    │ 2             │
├─────────┴─────────┴─────────┴───────────────┤
│ Status Distribution                         │
│ Applied   ████████████ 8                    │
│ Interview ███ 3                             │
│ Offer     █ 1                               │
├─────────────────────────────────────────────┤
│ Needs Attention (>14 days)                  │
│ • Google - SWE (21 days)                   │
│ • Meta - Frontend (18 days)                │
├─────────────────────────────────────────────┤
│ Recent Activity                             │
│ • Applied to Netflix - 2 days ago          │
│ • Interview at Amazon - 5 days ago         │
└─────────────────────────────────────────────┘
```

### Colors

- Total: blue-600
- Interviews: yellow-600
- Response Rate: green-600
- Stale: red-600
- Status bars: colores existentes de StatusBadge

## Testing

- Verificar que las funciones del repositorio retornan datos correctos
- Verificar que el dashboard carga sin errores
- Verificar responsive en mobile
