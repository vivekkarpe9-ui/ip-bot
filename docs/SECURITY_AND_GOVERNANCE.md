# iP Bot Security & Governance

## Permission levels

- View
- Analyze
- Draft
- Send externally
- Modify data
- Purchase/financial action
- Administrative action

## Approval rules

Approval can be required by action type, amount, destination, room, integration, data sensitivity or policy.

## Data boundaries

Agents receive only the data and tools granted by their room and permission policy. Memory is scoped and access-controlled.

## Auditability

Record agent, task, room, timestamp, action, tool, status, approval state and result for consequential operations.

## Financial safety

Analytics, forecasting and simulations are supported. Real financial transactions require an explicitly connected provider and appropriate human approval; the platform must not assume that an agent has authority to move money.

## External communications

Drafting can be automated. Sending messages, publishing content, placing orders or making commitments can require approval based on policy.

## Research integrity

Research outputs should retain source references, dates where available, assumptions and uncertainty. Agents should distinguish sourced facts from inference.

## Secret handling

Use OAuth/secure environment configuration. Never commit passwords, API keys, access tokens or private credentials to Git.
