# Architecture

## Overview

Job Backpack follows a feature-based modular architecture.

The goal is to keep the codebase scalable, maintainable, and easy to extend.

Business logic, UI, and data access must remain separated.

---

## Request Flow

```text
UI
    ↓
Server Action / API Route
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
Supabase PostgreSQL
```

---

## Project Structure

```text
src/
├── app/
├── features/
├── components/
├── hooks/
├── lib/
├── server/
├── prisma/
├── types/
└── utils/
```

Each feature should be self-contained.

---

## Feature Structure

```text
features/
└── jobs/
    ├── components/
    ├── actions/
    ├── services/
    ├── repositories/
    ├── hooks/
    ├── schemas/
    ├── types/
    └── utils/
```

Create only the folders that are needed.

---

## Principles

- UI should not contain business logic.
- Services contain business rules.
- Repositories are the only layer allowed to access Prisma.
- Validate all user input before processing it.
- Features should remain loosely coupled.
- Prefer Server Components and Server Actions when possible.
