# Tasks: Automated Testing

## Task Breakdown

### 1. Unit Tests

- [ ] 1.1 Create `src/lib/__tests__/utils.test.ts`
- [ ] 1.2 Test `cn()` function
- [ ] 1.3 Test `formatDate()` if exists

### 2. Status Transitions Tests

- [ ] 2.1 Create `src/features/applications/__tests__/utils/status-transitions.test.ts`
- [ ] 2.2 Test `getValidTransitions()`
- [ ] 2.3 Test `canTransition()`
- [ ] 2.4 Test all status combinations

### 3. Component Tests

- [ ] 3.1 Create `src/features/applications/__tests__/components/StatusUpdateButton.test.tsx`
- [ ] 3.2 Test button renders
- [ ] 3.3 Test dropdown options
- [ ] 3.4 Create `src/features/jobs/__tests__/components/JobCard.test.tsx`
- [ ] 3.5 Test job card renders

### 4. Verification

- [ ] 4.1 Run `npm run test:run`
- [ ] 4.2 Verify all tests pass
- [ ] 4.3 Verify CI runs tests

### 5. Documentation

- [ ] 5.1 Update roadmap.md

## Dependencies

- Vitest configured (✅)
- React Testing Library installed (✅)
- jsdom environment configured (✅)

## Estimated Time

- 60-90 minutes total
