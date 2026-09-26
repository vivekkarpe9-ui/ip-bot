# iP Bot — Master Architecture

## Product direction
Build iP Bot as a business operating system, not a simple chatbot. The system is organized around a Master Orchestrator, Work Rooms, specialist Agent Teams, Research, Knowledge, Tasks/Workflows, Permissions, Approvals, Finance controls, KPIs and Audit History.

## Core architecture

Master Orchestrator
→ Understand goal
→ Create plan
→ Delegate to specialist agents
→ Collect evidence/results
→ Cross-check
→ Analyze
→ Request approval when required
→ Execute permitted actions
→ Record result, evidence and audit trail

## Work Rooms
Initial rooms:
- Solar Business
- Travel
- Shopping
- Call Centre
- HR
- Marketing
- General Business

Users can create additional custom rooms. Each room owns its agents, tasks, workflows, research, KPIs, approvals and activity context.

## Agent profile
Every agent should eventually support:
- Name and role
- Goal and instructions
- Room/team assignment
- Tools
- Skills
- Knowledge sources
- Live research sources
- Memory
- Commands
- Schedule/triggers
- Budget and spending limits
- Permission policy
- Approval policy
- KPIs
- Audit history
- Status/health

## Research system
Research should be task-driven and source-aware:
1. Understand the question.
2. Build a research plan.
3. Search relevant web sources, websites, news and connected data sources when authorized.
4. Prefer authoritative/primary sources where applicable.
5. Track publication/update dates.
6. Cross-check important claims.
7. Detect conflicting information.
8. Preserve source links/evidence.
9. Produce an analysis with uncertainty and assumptions.
10. Never present estimates as verified facts.

## Action policy
Actions are classified as:
- Allowed: research, analysis, drafts, reports, internal task creation.
- Approval required: external customer communication, publishing, paid advertising, vendor orders, contracts, significant commitments.
- Restricted: unauthorized access, credential/OTP bypass, illegal activity, uncontrolled financial transfers or other actions outside granted permissions.

Consequential actions must pass the policy engine and, where configured, a human approval gate.

## Finance architecture
Do not give agents unrestricted access to a personal bank account. Use controlled budgets/wallet abstractions and authorized payment integrations. Track requested amount, purpose, policy result, approval, transaction reference, receipt and accounting record.

## Knowledge / memory / research
Keep these distinct:
- Knowledge = durable business information and documents.
- Memory = authorized prior interaction/context.
- Research = fresh external information gathered for a task.

## Team orchestration
A room may contain a manager agent and specialist agents. The manager can split a job into parallel research/work tasks, assign them, merge outputs, and produce a final draft. Agents should not silently grant themselves new permissions.

## Observability
Record:
- Agent/task ID
- Timestamp
- Action
- Input/context reference
- Sources used
- Output/result
- Policy decision
- Approval status
- Errors/retries
- Human edits

## KPI layer
Room and agent dashboards should support task completion, failures, response time, operating cost, revenue/cost metrics supplied by verified business data, approval rate, human corrections and other room-specific KPIs.

## Build order
1. Stable dashboard + Room Workspace.
2. Agent Builder with complete profile and permissions.
3. Room-scoped tasks and workflows.
4. Research abstraction + source/evidence model.
5. Knowledge and memory stores.
6. Policy/approval engine.
7. Agent team orchestration.
8. Audit/activity system.
9. KPI and finance reporting.
10. Authorized external integrations.
11. Automated browser/mobile QA and CI.

## Current implementation boundary
The repository currently contains the early Room + Agent foundation. This document is the target architecture; future milestones must be implemented and tested incrementally rather than claiming unimplemented capabilities as complete.
