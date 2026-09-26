# iP Bot V10 Build Update

## Current focus
The project is moving from architecture/specification into a testable functional app foundation.

## V10 implementation targets
- Futuristic mobile-first app shell
- Dashboard and navigation
- Dynamic Work Rooms
- Create/Edit Room flow
- Agent Builder
- Agent Teams
- Tasks and workflow runs
- Research Lab
- Approval Center
- Agent Control Tower
- Activity/Audit timeline
- Reports and KPI cards
- Local/demo persistence for first end-to-end testing

## Product behavior

### Rooms
Users can create unlimited custom work rooms and configure purpose, agents, teams, tasks, workflows, data, KPIs and permissions.

### Agents
Users can create agents with role, objective, custom commands, tools, research settings, memory scope, schedules, output format, budgets and approval policies.

### Research
Research runs retain source/evidence fields, findings, assumptions, uncertainty and report history.

### Agent execution
Runs have explicit states, can pause at approval gates, support safe retry/recovery and produce audit events.

## Before production integrations
The app should first pass local/demo tests for room creation, agent creation, task assignment, simulated execution, approval, research and audit flows. Production backend, OAuth and external actions come after this foundation is verified.

## User action
No user action is required at this stage. Ask only when a real external account connection, production deployment, model/provider choice, or consequential external action needs authorization.
