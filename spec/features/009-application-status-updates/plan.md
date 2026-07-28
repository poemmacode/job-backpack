# 009 - Application Status Updates - Plan

## Architecture

### Data Layer

Agregar función al repositorio:

```typescript
// src/features/applications/repositories/applications.ts

export function getValidTransitions(currentStatus: string): string[];
```

### Transiciones Válidas

```typescript
const TRANSITIONS: Record<string, string[]> = {
  interested: ['applied', 'withdrawn'],
  applied: ['interview', 'rejected', 'withdrawn'],
  interview: ['offer', 'rejected', 'withdrawn'],
  offer: ['accepted', 'rejected', 'withdrawn'],
  accepted: [],
  rejected: ['applied'],
  ghosted: ['applied'],
  withdrawn: ['applied'],
};
```

### Components

```
src/features/applications/components/
├── StatusUpdateButton.tsx   # Botón con dropdown de transiciones
└── StatusHistory.tsx        # Muestra timestamp del último cambio
```

### Pages

Modificar:

```
src/app/dashboard/applications/[id]/page.tsx  # Detail page
```

## Data Flow

```
ApplicationDetailPage (Server)
  ├── getApplication()
  └── getValidTransitions()
        ↓
StatusUpdateButton (Client)
  ├── Muestra estado actual
  ├── Dropdown con transiciones válidas
  ├── Confirmación para rejected/withdrawn
  └── updateApplicationStatus()
        ↓
Optimistic Update → UI inmediata
```

## Design

### StatusUpdateButton

```
┌─────────────────────────────┐
│ Current: Applied            │
│                             │
│ [Change Status ▼]           │
│   ├─ Interview              │
│   ├─ Rejected ⚠️            │
│   └─ Withdrawn ⚠️           │
└─────────────────────────────┘
```

### Confirm Dialog

```
┌─────────────────────────────┐
│ Confirm Status Change       │
│                             │
│ Change to "Rejected"?       │
│ This action cannot be       │
│ undone.                     │
│                             │
│ [Cancel]  [Confirm]         │
└─────────────────────────────┘
```

## Testing

- Verificar transiciones válidas para cada estado
- Verificar que transiciones inválidas no aparecen
- Verificar confirmación para estados negativos
- Verificar optimistic update
