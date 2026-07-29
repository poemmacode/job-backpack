# Feature 020 - Monitoring & Error Tracking

## Overview

Integrate Sentry for error tracking, performance monitoring, and alerting in production.

## Goals

- Capture and track errors in production
- Monitor application performance
- Get alerts for critical errors
- Debug issues faster with stack traces

## Requirements

### Functional Requirements

1. **Error Tracking**:
   - Capture unhandled exceptions
   - Capture unhandled promise rejections
   - Breadcrumbs for debugging
   - Source maps for readable stack traces

2. **Performance Monitoring**:
   - Page load performance
   - API route performance
   - Database query performance

3. **Alerting**:
   - Email alerts for new errors
   - Slack integration (optional)

4. **Error Boundary**:
   - React Error Boundary for UI errors
   - Fallback UI on error

### Non-Functional Requirements

- Minimal performance impact (< 1ms overhead)
- GDPR compliant (no PII in errors)
- Works with Next.js App Router

## Technical Decisions

- **Error Tracking**: Sentry (per tech-stack.md)
- **SDK**: `@sentry/nextjs`
- **Sampling**: 100% errors, 10% performance (adjustable)
- **Source Maps**: Upload to Sentry on build

## Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_SENTRY_DSN` | Public | Sentry DSN URL |
| `SENTRY_ORG` | Secret | Sentry organization slug |
| `SENTRY_PROJECT` | Secret | Sentry project slug |
| `SENTRY_AUTH_TOKEN` | Secret | Sentry auth token for source maps |

## Out of Scope

- Custom dashboards
- Log management
- Uptime monitoring
- APM (Application Performance Monitoring) beyond basics

## Success Criteria

- [ ] Sentry SDK installed and configured
- [ ] Errors captured in production
- [ ] Source maps uploaded
- [ ] Error Boundary for React
- [ ] Alert rules configured

## Files to Create/Modify

- `sentry.client.config.ts` - Client-side Sentry config
- `sentry.server.config.ts` - Server-side Sentry config
- `sentry.edge.config.ts` - Edge runtime config
- `next.config.ts` - Add Sentry plugin
- `src/app/error.tsx` - Error Boundary
- `src/app/global-error.tsx` - Global Error Boundary
