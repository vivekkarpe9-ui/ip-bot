# iP Bot Agent Platform V2

## Agent Builder

Users can create custom agents with:
- Name, avatar, role and objective
- System instructions / custom command
- Skills and tools
- Research configuration and source preferences
- Memory scope
- Room/team membership
- Schedule and triggers
- Output format
- Budget and usage limits
- Permission policy
- Approval policy
- Active/paused state

## Agent Teams

Teams can use manager, researcher, analyst, reviewer and executor roles. Tasks can run sequentially or in parallel, then merge into a reviewed result.

## Research Lab

A research run stores:
- Question and scope
- Sources and URLs
- Publication/access date when available
- Findings
- Evidence notes
- Assumptions and uncertainty
- Comparisons
- Final report
- Run history

## Memory

Memory is scoped by user, organization, room and agent. Agents only receive memory permitted by their access policy.

## Control Tower

Monitor active runs, current step, tool calls, latency, failures, estimated cost, approval waits and final outputs. Keep an audit trail for every consequential action.

## Approval gates

Actions can require approval based on tool, room, amount, destination, data sensitivity or action type. Examples include purchases, financial transfers, contracts, employment decisions and external publishing.

## Agent budgets

Per-agent limits can include daily/monthly usage, task count, execution time and configured spend/tool limits. Reaching a limit pauses execution and requests review.

## Reliability

Workflows should persist state, support safe retries, prevent duplicate external actions where possible, recover from transient tool errors and escalate unrecoverable failures to a human.

## Evaluation Lab

Before deployment, agents can be tested against a saved test set. Track expected vs actual output, tool-use correctness, research/source quality, permission behavior, failures and regression results.

## Agent Factory

A user can describe a business objective and generate a proposed team of specialized agents, workflows, permissions and reporting requirements. Generated configurations require user review before activation.

## Templates / Marketplace direction

Future reusable templates: Solar Consultant, Travel Planner, E-commerce Manager, HR Recruiter, Customer Support, Market Researcher, Marketing Manager and custom templates.
