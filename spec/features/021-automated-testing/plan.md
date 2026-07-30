# Plan: Automated Testing

## Architecture

```
src/
├── lib/__tests__/          # Unit tests for utilities
├── features/
│   └── [feature]/__tests__ # Feature-specific tests
│       ├── components/     # Component tests
│       ├── actions/        # Server action tests
│       └── repositories/   # Repository tests
```

## Implementation Steps

### Step1: Utility Tests
- Create `src/lib/__tests__/utils.test.ts`
- Test `cn()` function
- Test any other utility functions

### Step 2: Status Transitions Tests
- Create `src/features/applications/__tests__/utils/status-transitions.test.ts`
- Test `getValidTransitions()`
- Test `canTransition()`
- Test all status transitions

### Step 3: Component Tests
- Create `src/features/applications/__tests__/components/StatusUpdateButton.test.tsx`
- Test button renders correctly
- Test dropdown options
- Test click handlers

### Step 4: Job Component Tests
- Create `src/features/jobs/__tests__/components/JobCard.test.tsx`
- Test job card renders
- Test link navigation

### Step 5: CI Integration
- Verify tests run in GitHub Actions
- Add test coverage report (optional)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Flaky tests | Use proper mocking, avoid real APIs |
| Slow tests | Mock heavy operations, use test timeout |
| Missing test utilities | Create helper functions |

## Testing Strategy

1. Write tests for critical paths first
2. Mock all external dependencies
3. Use descriptive test names
4. Test both success and error cases
