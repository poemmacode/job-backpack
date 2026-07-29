# Plan: Monitoring & Error Tracking (Sentry)

## Architecture

```
Application → Sentry SDK → Sentry Server
     ↓              ↓            ↓
  Errors      Capture &      Dashboard
  Performance   Send         & Alerts
```

## Implementation Steps

### Step 1: Install Sentry
- Install `@sentry/nextjs`
- Run Sentry wizard for configuration

### Step 2: Configuration Files
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.ts` with Sentry plugin

### Step 3: Error Boundaries
- Create `src/app/error.tsx` (React Error Boundary)
- Create `src/app/global-error.tsx` (Global Error Boundary)

### Step 4: Environment Variables
- Add Sentry DSN to `.env`
- Configure Vercel environment variables

### Step 5: Source Maps
- Configure source map upload
- Test with intentional error

### Step 6: Testing
- Create test error route
- Verify errors appear in Sentry
- Clean up test route

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Performance impact | Use sample rate, async init |
| PII in errors | Configure data scrubbing |
| Source map exposure | Upload to Sentry only, don't serve |
| Build time increase | Cache Sentry plugin |

## Testing Strategy

1. Create temporary test error
2. Verify error appears in Sentry dashboard
3. Check source maps work
4. Remove test error
5. Deploy to production
