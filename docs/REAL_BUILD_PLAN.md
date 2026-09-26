# iP Bot — Real Production Build Plan

## Goal
Turn the current frontend/demo foundation into a production web + Android agent platform without pretending that local UI state is a real backend, payment rail, OAuth connection, or device-control bridge.

## P0 — production foundation
1. Backend API and persistent database.
2. Real authentication with secure sessions.
3. RBAC: owner, manager, agent, customer.
4. Durable agent job queue with retries, cancellation, idempotency and audit logs.
5. Approval service for consequential actions.
6. Secrets/connection vault using provider-managed OAuth tokens; never store passwords or OTPs.
7. Observability: structured logs, health checks, error tracking and rate limits.

## P1 — real integrations
- Google OAuth and Gmail/Drive APIs after consent.
- Microsoft OAuth where required.
- Social integrations only through official APIs and platform permissions.
- Payment provider with server-side verification and webhooks; UPI ID is only a destination, not payment verification.
- Research service with citations, source timestamps, retries, robots/rate-limit compliance and provider fallbacks.

## P2 — Android/device bridge
- Companion Android app with explicit user-granted permissions.
- Deep links/intents where supported.
- Accessibility/device-control only for permitted, user-authorized actions.
- Foreground/background service subject to Android policy and OS restrictions.
- Remote task queue with device online/offline state.

## P3 — agent products
- Website/app/game generation workspace.
- Agent Builder with tools, schedules, budgets and approval policies.
- Tournament management: registration, brackets, schedules, results and admin workflows.
- Trading research and broker integrations only with explicit authorization and risk controls; no unauthorized automation.

## P4 — quality gate
Every feature must have: source test, browser smoke test, mobile test where relevant, integration test, error-path test, security review and rollback path before being called production-ready.

## Current known gaps
The repository currently contains substantial UI and local/demo foundations, but the real backend, production authentication, durable worker, real OAuth, payment verification, Android bridge and full integration/browser tests are not yet present. Do not label those features as live until the corresponding implementation and tests exist.
