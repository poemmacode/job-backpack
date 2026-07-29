# Tasks: CI/CD Pipeline

## Task Breakdown

### 1. Infrastructure Setup

- [ ] 1.1 Create `.github/workflows/` directory
- [ ] 1.2 Create `ci.yml` workflow file

### 2. Pipeline Configuration

- [ ] 2.1 Define triggers (push to main, PRs)
- [ ] 2.2 Set up Node.js 20
- [ ] 2.3 Configure npm caching

### 3. Pipeline Steps

- [ ] 3.1 Add `npm ci` step
- [ ] 3.2 Add `npm run lint` step
- [ ] 3.3 Add `npx tsc --noEmit` step
- [ ] 3.4 Add `npm run test:run` step
- [ ] 3.5 Add `npm run build` step

### 4. Testing & Validation

- [ ] 4.1 Push to feature branch
- [ ] 4.2 Verify pipeline runs
- [ ] 4.3 Test failure scenario

### 5. Documentation

- [ ] 5.1 Update roadmap.md

## Dependencies

- package-lock.json must exist (for npm ci)
- All lint/typecheck/test/build commands must work locally

## Estimated Time

- 30 minutes total
