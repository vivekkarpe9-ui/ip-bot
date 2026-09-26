# iP Bot Product Specification — V1

## Product goal
Build a mobile-first AI business operating system where users create rooms, assign agent teams, review work, and manage business data from one workspace.

## V1 navigation
1. Home
2. Rooms
3. Agents
4. Tasks
5. Approvals
6. Reports
7. Settings

## Room lifecycle
Create Room → choose template/custom → configure agents → set permissions → create tasks → monitor activity → review outputs → approve consequential actions → report results.

## Initial room templates
- General Business
- Solar Business
- Travel Business
- Shopping/Fashion
- HR
- Call Centre
- Marketing
- Operations

## Agent lifecycle
Create Agent → role → objective → tools → data access → permissions → schedule → approval policy → active/inactive.

## Core safety controls
- Human approval for consequential external actions.
- No hard-coded credentials or API keys.
- External account connections use OAuth where available.
- Financial research is decision support; real transactions are not executed autonomously by the core platform.
- Agent activity is logged.

## Reporting
Every room should expose:
- KPI summary
- tasks completed/pending
- agent activity
- revenue/expense fields where relevant
- research findings and sources
- export/report actions

## Contact configuration
Primary business contact: 7999868978
Primary business email: vivekkarpe9@gmail.com

## Future extensions
Website/app factory, agent marketplace, advanced integrations, customer portals, deeper analytics, and specialized business workflows.