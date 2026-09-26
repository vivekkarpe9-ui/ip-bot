# iP Bot V12 — Room Workspace Specification

## Goal
Define the first real Work Room experience on top of the existing Room model.

## Workspace sections
- Overview
- Agents
- Team
- Tasks
- Workflows
- Research
- Files/Data
- KPIs
- Approvals
- Activity

## Room header
Show room name, purpose, active agents, running tasks, pending approvals and room status.

## Overview
Cards for active work, completed work, pending approvals, research runs, KPI snapshots and recent activity.

## Agents
List room agents with status, role, current task, permissions and pause/resume controls.

## Tasks
Create, assign, prioritize, filter and inspect tasks. Task states: queued, running, waiting approval, completed, failed, cancelled.

## Workflows
Show reusable workflows and recent runs. A workflow can contain agent steps, research steps, tool steps and approval gates.

## Research
Create research requests tied to the room. Store source/evidence records, findings, assumptions, uncertainty and final reports.

## Files/Data
Show room-scoped files and structured business data. Access must follow room permissions.

## KPIs
Support configurable room KPIs. Financial values must be labeled as actual, estimated or simulated.

## Approvals
Show actions waiting for human review. Approve/reject decisions create audit events.

## Activity
Chronological room activity: agent runs, task changes, approvals, research updates, integration events and errors.

## Navigation
The workspace must be mobile-first and preserve the existing futuristic visual language. Desktop can use a wider two-column layout where appropriate.

## Safety
Room actions cannot bypass agent permissions. Consequential external actions require the configured approval policy.

## V12 acceptance criteria
- Room opens into a dedicated workspace instead of an alert-only placeholder.
- Sections can be navigated on mobile.
- Demo/local state is persisted.
- Agent/task/approval activity is visible.
- No production credentials are required for demo mode.
