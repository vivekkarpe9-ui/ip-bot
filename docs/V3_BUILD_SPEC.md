# iP Bot V3 Build Specification

## Goal
Move from a documented prototype to a functional platform foundation while keeping the system modular and mobile-first.

## App shell
- Home dashboard
- Rooms
- Agents
- Teams
- Tasks
- Research
- Approvals
- Reports
- Activity
- Settings

## Agent Builder screens
- Identity and role
- Objective
- Custom instructions/commands
- Skills and tools
- Research settings
- Memory scope
- Room/team assignment
- Schedule/trigger
- Output format
- Budget/limits
- Permission policy
- Approval policy
- Test and deploy

## Work Room screens
- Room overview
- Agent team
- Work queue
- Workflow builder
- Research
- Files/data
- KPI dashboard
- Reports
- Permissions
- Activity

## Control Tower
- Active runs
- Waiting approvals
- Errors/retries
- Tool activity
- Usage/cost metrics
- Run details and audit trail

## First functional workflows

### Custom Agent
Create → configure → test → save → activate/pause.

### Custom Room
Create → select template/custom → add agents → configure workflow → set permissions → activate.

### Research
Create research task → gather sources → analyze → record evidence → review → save report.

### Approval
Agent requests action → policy checks → human approval/rejection → action result → audit event.

### Reporting
Room data → KPI calculation → report → spreadsheet-compatible export → optional Gmail notification.

## Data entities
User, Organization, Room, Agent, AgentTeam, Task, Workflow, WorkflowRun, ResearchRun, Source, Report, Customer, Product, Order, Project, Expense, Revenue, Permission, Approval, Integration, AuditEvent, Notification.

## Implementation rules
- Keep UI components reusable.
- Keep room-specific logic isolated from platform core.
- Never store credentials in source code.
- External actions require explicit integration and permission.
- Consequential actions use approval gates.
- Keep an audit event for agent execution and approvals.
- Build mock/local data first so the UI can be tested before integrations are connected.
