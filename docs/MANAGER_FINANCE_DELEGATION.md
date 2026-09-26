# Manager Finance Delegation

## Goal
Allow the owner to delegate defined financial-management responsibilities to one or more trusted managers when the owner is unavailable, while keeping owner ownership and audit visibility.

## Delegation model
Owner creates a Manager role and chooses a finance policy:
- View only
- Approve agent sales within limit
- Approve refunds within limit
- Transfer funds between internal business/agent budget ledgers within limit
- Fund/return agent budgets within limit
- Manage pending withdrawal requests (review/recommend/approve according to configured policy)
- Emergency/temporary delegation with start/end time

## Important boundary
A manager does not automatically receive unrestricted access to the owner's personal bank account or payment credentials. External withdrawals/payouts use an authorized payment provider and verified destination, with the configured approval policy.

## Limits
Owner can configure:
- Per-transaction limit
- Daily limit
- Weekly/monthly limit
- Maximum agent budget
- Allowed rooms/agents
- Allowed transaction types
- Require second approval above threshold

## Availability mode
If owner enables "Manager Coverage", selected managers can handle permitted finance approvals while the owner is unavailable. The system records:
- delegation ID
- manager
- owner
- start/end time
- scope
- limits
- every action taken

## Escalation
If an action exceeds the manager's authority, the request remains pending and is escalated to the owner or another authorized approver. No bypass.

## Audit
Every approval/transfer/refund/withdrawal decision includes manager identity, delegation policy, timestamp, amount, reason, transaction/order reference and result.

## UI target
Owner Settings -> Team & Managers -> Manager -> Finance Permissions -> Limits -> Coverage Schedule -> Approval Rules -> Audit.

Finance -> Pending Approvals -> Manager can act only on requests permitted by the active delegation.
