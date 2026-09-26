# iP Bot Production Readiness Audit — 2026-09-26

## Executive status
The repository has a useful mobile-first prototype and several permission/approval foundations, but it is **not yet a production agent platform**. Current app state is primarily browser-local demo state.

## Verified implemented foundations
- Mobile-first dashboard, Work Rooms and custom room persistence.
- Room-scoped Agent Builder foundation.
- Local login/demo session flow.
- Owner, manager and agent wallet/ledger UI foundations.
- Owner sales approval flow.
- Configurable owner UPI destination (`shopclothes@naviaxis`) as a setting only.
- Agent Control Center with capability toggles.
- Game & App Control permission center.
- Existing security/approval architecture requires official OAuth and explicit human approval for consequential actions.

## Critical gaps before production
### P0 — Backend and durable execution
- No production backend/service layer is present in the current repository tree.
- Data is stored in browser `localStorage`; it is not shared across devices/users and can be cleared or modified by the client.
- Background/offline switches are UI settings only; they do not create a server-side worker or durable queue.
- Agent run states, retries, cancellation and scheduling are documented but not backed by a durable execution engine.

### P0 — Authentication and authorization
- Current login is explicitly a local demo session, not real Google/Microsoft/OAuth authentication.
- Role/permission decisions are client-side and therefore cannot be trusted for security-sensitive actions.
- Real user, organization, manager and agent identities need a server-side authorization model.

### P0 — Real payments
- The UPI ID is only a configurable destination string; it does not collect or verify payments.
- Wallet balances are internal demo ledger values, not bank/payment-provider balances.
- Real checkout requires a verified merchant/payment provider, server-side signature/webhook verification, idempotency, reconciliation and refund handling.

### P0 — Integrations and account control
- Gmail, social media, connected websites, Google services and device control are permission UI foundations only.
- No production OAuth/token vault/refresh/revocation implementation is present.
- Mobile device control requires an Android bridge/authorized accessibility or app/API integration; a web page cannot directly control arbitrary mobile apps.

### P1 — Research and agent intelligence
- Research tabs and permissions exist conceptually, but a production web research engine, source capture, citations, freshness, retries, rate-limit handling and evidence store are still required.
- Agent planning/tool execution and cross-agent orchestration need a real runtime.

### P1 — App/game/website factory
- The current repository does not yet contain a full code-generation/build/deploy pipeline for arbitrary Android apps, websites or games.
- Game research/control settings do not themselves play games or bypass game restrictions.

### P1 — Manager/finance enforcement
- Manager policy UI exists, but production enforcement must move to server-side policy checks.
- Every money-moving action needs an immutable audit event and provider confirmation.

### P1 — QA/build pipeline
- Existing QA documents explicitly note that real browser execution has not been verified through the available GitHub connector.
- There is no package/build/test configuration visible in the current repository root; an executable CI/dev-server pipeline must be added before claiming a production build.

## Required implementation order
1. Backend + database + durable job queue.
2. Real authentication and server-side RBAC/permissions.
3. OAuth connection service and secure token storage.
4. Agent runtime: planner, tool registry, run state, retries, cancellation and audit events.
5. Research engine with source/evidence storage.
6. Payment provider + webhook verification + reconciliation.
7. Android device-control bridge with explicit per-app permissions.
8. Website/app/game build-and-deploy workers.
9. Automated tests + CI + browser/device smoke tests.
10. Production observability, rate limits, backups and recovery.

## User action
No credential or password is needed for this audit. Provider onboarding/consent will be required later when real OAuth, payments and device integrations are connected.

## Rule
Do not label the current repository as production-ready until the P0 items are implemented and the critical flows are executed in a real runtime.
