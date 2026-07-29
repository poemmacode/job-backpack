# Tasks: Monitoring & Error Tracking (Sentry)

## Task Breakdown

### 1. Installation

- [ ] 1.1 Install `@sentry/nextjs`
- [ ] 1.2 Run Sentry configuration wizard

### 2. Configuration

- [ ] 2.1 Create `sentry.client.config.ts`
- [ ] 2.2 Create `sentry.server.config.ts`
- [ ] 2.3 Create `sentry.edge.config.ts`
- [ ] 2.4 Update `next.config.ts` with Sentry plugin

### 3. Error Boundaries

- [ ] 3.1 Create `src/app/error.tsx`
- [ ] 3.2 Create `src/app/global-error.tsx`

### 4. Environment Variables

- [ ] 4.1 Add `NEXT_PUBLIC_SENTRY_DSN` to `.env`
- [ ] 4.2 Add `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`
- [ ] 4.3 Configure Vercel environment variables

### 5. Source Maps

- [ ] 5.1 Configure source map upload
- [ ] 5.2 Test source maps work

### 6. Testing

- [ ] 6.1 Create test error route
- [ ] 6.2 Verify error in Sentry
- [ ] 6.3 Remove test route
- [ ] 6.4 Deploy and verify

### 7. Documentation

- [ ] 7.1 Update roadmap.md

## Dependencies

- Sentry account (free tier works)
- `@sentry/nextjs` package

## Estimated Time

- 45-60 minutes total
