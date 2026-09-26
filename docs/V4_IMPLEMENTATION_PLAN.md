# iP Bot V4 Implementation Plan

## Working app modules
- Mobile-first App Shell
- Home Dashboard
- Dynamic Work Rooms
- Agent Builder
- Agent Teams
- Task Queue
- Workflow Runs
- Research Lab
- Approval Center
- Control Tower
- Reports and exports
- Settings / integrations

## Core user flows

### Create Agent
Create → role/objective → instructions → tools → research → memory → room/team → permissions → approval policy → test → activate.

### Create Room
Create → template/custom → objective → agents → workflows → data → KPIs → permissions → activate.

### Run Research
Question → scope → source collection → evidence capture → analysis → review → report → save/share.

### Run Work
Task → plan → agent/team execution → tool calls → approval gates → result → audit log → report.

## Data-first implementation
Use local/mock data during UI development. Then add a real backend and OAuth integrations without coupling room-specific business logic to the platform core.

## First business modules after core
1. Solar
2. Travel
3. Shopping/Fashion
4. Call Centre
5. HR
6. Marketing
7. Operations

Each module must reuse the same Room, Agent, Task, Workflow, Research, Permission and Reporting primitives.

## UX principles
- Fast mobile navigation
- Clear room context
- Agent status visible at a glance
- Approvals impossible to miss
- Research sources easy to inspect
- Financial figures clearly labeled as actual, estimated, or simulated
- Safe defaults for external actions
