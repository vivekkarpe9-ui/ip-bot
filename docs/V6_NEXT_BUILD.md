# iP Bot V6 — Next Functional Build

## Objective
Turn the documented platform into a testable functional app foundation.

## Functional screens
- Home Dashboard
- Rooms list
- Create/Edit Work Room
- Room workspace
- Agent list
- Create/Edit Agent
- Agent Team workspace
- Task queue
- Workflow run detail
- Research Lab
- Approval Center
- Control Tower
- Reports
- Settings / integrations

## Local-first prototype behavior

The first functional pass should work with seeded local data so users can explore the product without connecting external accounts. Actions should update UI state and produce activity/audit events.

## Room behavior

Users can create a custom room, define its purpose, add agents, create tasks, configure approval rules, view KPIs and inspect activity.

## Agent behavior

Users can create an agent, configure its role, objective, instructions, tools, research settings, memory scope, schedule and permissions. A test-run mode should show a simulated execution before activation.

## Research behavior

A research task should create a run record, show progress, capture source/evidence fields, produce a structured report and retain run history. Real web/provider connectors can be connected after the local workflow is stable.

## Approval behavior

A gated action enters `waiting_approval`. The user can inspect the proposed action and approve/reject it. The decision becomes an audit event.

## Control Tower

Show active runs, waiting approvals, failed/retrying runs, recent agent actions and usage metrics.

## Definition of done for V6 foundation

- Navigation works on mobile and desktop.
- Room CRUD works against the chosen local data layer.
- Agent CRUD works.
- Tasks can be created and assigned.
- Agent test runs can be simulated.
- Approval flow works end-to-end in demo mode.
- Research runs can be created and reviewed.
- Activity/audit events appear in the UI.
- No credentials or API keys are committed.
