# 012 - Kanban Board - Plan

## Architecture

### Dependencies

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Data Flow

```
/dashboard/kanban (page)
  └── KanbanBoardContainer (Server)
        ├── getApplications(userId)
        └── KanbanBoard (Client)
              ├── KanbanColumn (applied)
              ├── KanbanColumn (interview)
              ├── KanbanColumn (offer)
              ├── KanbanColumn (rejected)
              └── KanbanCard (per application)
```

### Components

```
src/features/kanban/
├── components/
│   ├── KanbanBoard.tsx       # Main board with DnD context
│   ├── KanbanColumn.tsx      # Column for each status
│   ├── KanbanCard.tsx        # Draggable card
│   └── KanbanSummary.tsx     # Stats summary
├── hooks/
│   └── useKanban.ts          # DnD logic and state
├── types.ts
└── index.ts
```

### Server Actions

Reutilizar `updateApplicationStatusAction` existente.

## Design

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Kanban Board                                      [Summary] │
├─────────────────┬─────────────────┬───────────┬─────────────┤
│ Applied (5)     │ Interview (2)   │ Offer (1) │ Rejected (3)│
├─────────────────┼─────────────────┼───────────┼─────────────┤
│ ┌─────────────┐ │ ┌─────────────┐ │           │ ┌─────────┐ │
│ │ SWE - Google│ │ │ FE - Meta   │ │           │ │ BE-AWS  │ │
│ │ 2 days ago  │ │ │ 5 days ago  │ │           │ │ 1wk ago │ │
│ └─────────────┘ │ └─────────────┘ │           │ └─────────┘ │
│ ┌─────────────┐ │                 │           │             │
│ │ Dev - Netflix│ │                 │           │             │
│ │ 3 days ago  │ │                 │           │             │
│ └─────────────┘ │                 │           │             │
└─────────────────┴─────────────────┴───────────┴─────────────┘
```

### Column Colors

- Applied: blue-500
- Interview: yellow-500
- Offer: green-500
- Rejected: red-500

## Testing

- Verificar que el tablero carga correctamente
- Verificar drag and drop entre columnas
- Verificar que el estado se actualiza
- Verificar responsive en tablet
