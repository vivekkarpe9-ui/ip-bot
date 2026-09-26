# iP Bot QA Runbook

## Rule
Run a smoke check after every meaningful UI/logic milestone, not only at the end. Fix regressions before adding the next layer.

## Smoke checks
1. App entry loads without a blank screen.
2. CSS and JS assets resolve.
3. Home dashboard renders.
4. Room cards render and open.
5. Create Room validates empty input and adds a room.
6. Agent Builder opens and validates required fields.
7. Agent save/edit/delete updates local state.
8. Team and task flows preserve state.
9. Simulated Agent Run transitions through states.
10. Approval actions update run state and activity log.
11. Research demo stores source/evidence fields.
12. Navigation works on mobile and desktop.
13. Console/runtime errors are checked before each milestone is marked complete.

## Regression policy
- Do not mark a feature complete from code inspection alone.
- Re-run affected flows after changes.
- Keep demo/mock mode independent from production credentials.
- Record known issues in the repository before moving forward.

## Production gate
Before external deployment, verify authentication, persistence, permission enforcement, secret handling, integration scopes, audit logging, error handling and automated tests.
