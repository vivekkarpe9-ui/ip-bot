# iP Bot V11 Development Update

## Immediate implementation focus
Move the project from planning documents toward a verified runnable frontend foundation.

## V11 priorities
1. Verify existing app files and entry point.
2. Add a clean reusable component structure.
3. Implement persistent demo state for Rooms, Agents, Teams, Tasks and Approvals.
4. Implement Create Room flow.
5. Implement Create Agent flow with commands, research, memory and permissions.
6. Implement Agent Team and task assignment UI.
7. Implement simulated Agent Run with visible states.
8. Implement Approval Center interactions.
9. Implement Research Lab demo with source/evidence records.
10. Implement Control Tower and Activity timeline.
11. Add basic validation and error/empty/loading states.
12. Add a lightweight test plan for the core flows.

## Product behavior

### Dynamic Work Rooms
Users can create any work room and define its purpose, agents, workflows, data, KPIs and permissions. Room templates are optional starting points, not restrictions.

### Custom Agents
Agents support identity, role, objective, custom commands/instructions, tools, research settings, memory scope, schedule, output format, budgets and approval rules.

### Agent Teams
Teams can contain specialized agents with a manager/reviewer pattern and shared task queue. Execution remains permission-scoped.

### Research
Research runs keep source, evidence, findings, assumptions and uncertainty fields. The UI should clearly distinguish sourced information from agent inference.

### Human control
Consequential external actions remain gated by explicit permissions and human approval. Simulation/demo actions must be visually distinguishable from real execution.

## User action
No user action is required for the V11 local/demo implementation. Request user action only when a real external account, OAuth consent, production deployment, model/provider choice or consequential external action needs authorization.
