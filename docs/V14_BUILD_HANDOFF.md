# iP Bot V14 Build Handoff

## Current verified source state
The current `app/app.js` still has the original Room card flow and opens a Room with an alert-style placeholder. Room persistence and input escaping are already implemented.

## V14 target
Do not replace the working Room logic blindly. Extend it incrementally into a real Room Workspace.

### Required sequence
1. Keep existing default rooms and localStorage key `ipbot.rooms.v1` compatible.
2. Add a Room Workspace view/state instead of immediately deleting the existing Room behavior.
3. Add a back-to-dashboard control.
4. Add room tabs: Overview, Agents, Team, Tasks, Workflows, Research, KPIs, Approvals, Activity.
5. Use room-scoped local/demo state.
6. Add empty states and sample data without pretending sample data is real.
7. Preserve HTML escaping and safe input handling.
8. Re-run source checks after the change.
9. Run a browser smoke test when an executable browser/dev-server environment is available.

## Acceptance criteria
- Dashboard still loads.
- Existing default rooms still render.
- Custom Room creation still persists after refresh.
- Clicking a Room opens the dedicated workspace.
- Back navigation returns to the dashboard without losing state.
- Room tabs work on mobile.
- No credentials are required for demo mode.

## Do not claim yet
The current repository has not been verified as a fully production-ready agent platform. Agent Builder, Teams, real workflows, Research execution, backend persistence and production integrations remain implementation work.

## User action
None required at this stage.
