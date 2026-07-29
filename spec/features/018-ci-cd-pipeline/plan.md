# Plan: CI/CD Pipeline

## Architecture

```
.github/
└── workflows/
    └── ci.yml    # CI pipeline workflow
```

## Pipeline Flow

```
Push/PR → Install → Lint → TypeCheck → Test → Build
```

## Implementation Steps

### Step 1: Create GitHub Actions Directory
- Create `.github/workflows/` directory

### Step 2: Create CI Workflow
- Create `ci.yml` workflow file
- Define triggers (push to main, PRs)
- Set up Node.js 20
- Configure npm caching

### Step 3: Add Pipeline Steps
1. `npm ci` - Install dependencies
2. `npm run lint` - Run ESLint
3. `npx tsc --noEmit` - Type checking
4. `npm run test:run` - Run Vitest
5. `npm run build` - Build Next.js

### Step 4: Configure Caching
- Cache node_modules using actions/cache
- Use package-lock.json as cache key

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Slow pipeline | Use npm caching, skip unnecessary steps |
| Flaky tests | Ensure tests are deterministic |
| Missing package-lock.json | Commit lock file |

## Testing Strategy

- Push to a feature branch and verify pipeline runs
- Create test PR to verify status checks
- Test failure scenarios (intentional lint error)
