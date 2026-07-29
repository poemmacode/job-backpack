# Feature 019 - Production Deployment (Vercel)

## Overview

Deploy the application to Vercel for production use, with proper environment variable configuration and domain setup.

## Goals

- Deploy the application to Vercel
- Configure all environment variables
- Set up custom domain (optional)
- Enable preview deployments for PRs

## Requirements

### Functional Requirements

1. **Vercel Project Setup**:
   - Connect GitHub repository
   - Configure build settings
   - Set up environment variables

2. **Environment Variables**:
   - `DATABASE_URL` - Supabase PostgreSQL connection
   - `DIRECT_URL` - Supabase direct connection
   - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

3. **Build Configuration**:
   - Node.js 20
   - Build command: `npm run build`
   - Output directory: `.next`

4. **Preview Deployments**:
   - Automatic preview URLs for PRs
   - Environment variables inherited from production

### Non-Functional Requirements

- Deployment completes in < 3 minutes
- HTTPS enabled by default
- Automatic CI/CD integration with GitHub Actions

## Technical Decisions

- **Platform**: Vercel (per tech-stack.md)
- **Build**: Next.js optimized build
- **Node**: 20 (LTS)
- **Region**: Auto (Vercel edge network)

## Out of Scope

- Custom domain configuration (user-specific)
- Sentry integration (Feature 020)
- Analytics (Feature 022)
- Database migrations (manual via Supabase)

## Success Criteria

- [ ] Application deployed to Vercel
- [ ] All environment variables configured
- [ ] Application accessible via Vercel URL
- [ ] Preview deployments working for PRs
- [ ] No build errors

## Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `DATABASE_URL` | Secret | PostgreSQL connection (pooler) |
| `DIRECT_URL` | Secret | PostgreSQL direct connection |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Supabase service role key |
