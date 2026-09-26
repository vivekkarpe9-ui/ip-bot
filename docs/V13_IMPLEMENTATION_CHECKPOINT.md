# iP Bot V13 Implementation Checkpoint

## Focus
Prepare the first dedicated Room Workspace implementation without breaking the existing dashboard/room persistence behavior.

## Workspace data model
Each room workspace should maintain local/demo state for:
- room metadata
- agents
- teams
- tasks
- workflow runs
- research runs
- approvals
- activity events
- KPI snapshots

## First implementation order
1. Replace the room alert placeholder with a dedicated workspace view.
2. Add room header and section navigation.
3. Add Overview cards using room-scoped demo state.
4. Add Agents and Tasks panels.
5. Add Approvals and Activity panels.
6. Add Research and KPI placeholders backed by local state.
7. Persist workspace state safely.
8. Run source/regression checks.

## Regression requirements
- Existing default rooms must still appear.
- Creating a custom room must still persist after refresh.
- Room names must remain safely escaped.
- Dashboard layout must remain responsive.
- No production credentials are needed.

## QA gate
Do not proceed to Agent Builder until the dedicated Room Workspace opens successfully, preserves state, and passes the source/regression checklist. Real browser execution remains a separate verification gate when a browser/dev-server environment is available.

## User action
None required at this checkpoint.
