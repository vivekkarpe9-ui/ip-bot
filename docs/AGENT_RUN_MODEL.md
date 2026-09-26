# Agent Run Model

An agent execution is represented by a durable run with a run ID.

## States
queued → planning → running → waiting_approval → retrying → completed / failed / cancelled

## Run record
- run_id
- room_id
- agent_id / team_id
- task_id
- input summary
- plan steps
- tool calls
- approvals
- outputs
- errors/retries
- timestamps
- usage/cost metadata where available
- final status

## Execution rules

1. Validate room and agent permissions before execution.
2. Build a plan appropriate to the task.
3. Execute allowed steps.
4. Pause at required approval gates.
5. Retry transient failures safely.
6. Avoid duplicate external actions where possible.
7. Record the outcome and audit event.
8. Surface uncertainty and source evidence for research tasks.

## Human control

The user can pause/cancel an active run, approve/reject gated actions, inspect run details, and change agent permissions. Financial, contractual, employment, privacy-sensitive and consequential external actions use explicit policy gates.
