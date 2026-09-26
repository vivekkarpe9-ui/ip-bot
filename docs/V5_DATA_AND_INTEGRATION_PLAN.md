# iP Bot V5 Data & Integration Plan

## Backend foundation

Use a persistent backend as the source of truth for users, rooms, agents, tasks, workflows, runs, approvals, research, customers, products, orders, projects, finance records, reports and audit events.

## Integration model

Integrations are explicit connections with scoped permissions. Examples:
- Google/Gmail
- Google Sheets / spreadsheet export
- Calendar
- Future CRM, messaging, payment, logistics and business providers

## Data synchronization

1. Connected provider authorizes access.
2. iP Bot records the integration and scopes.
3. Sync jobs import permitted data.
4. Data is normalized into platform entities.
5. Changes are logged.
6. Reports/exports can be generated.

## Gmail reporting

Gmail is a reporting/communication channel, not the primary database. Users can choose daily, weekly, monthly or event-based reports.

## Spreadsheet reporting

Provide exportable tables for customers, orders, sales, expenses, inventory, HR, call-centre activity, projects, agent activity, research and P&L. Keep formulas/labels clear and distinguish actual vs estimated values.

## OAuth and secrets

Use provider OAuth flows where available. Store tokens/secrets in secure server-side configuration, never in client code or Git.

## Offline/mobile resilience

The mobile UI should tolerate temporary network loss, preserve drafts locally where appropriate, and reconcile safely after reconnecting.

## Audit and privacy

Every integration action records actor/agent, timestamp, integration, action, scope and outcome. Access is least-privilege and revocable from the Permission Center.
