# iP Bot Wallet Architecture

## Purpose
Implement separate, controlled wallets/ledgers for the owner, managers/agents, business rooms and other authorized participants.

## Wallets
- Owner Wallet — controlled by the owner.
- Manager Wallet — separate balance/ledger for an authorized manager.
- Agent Budget Wallet — spending budget assigned to an agent; not a personal bank account.
- Room/Business Wallet — optional room-level operating ledger.
- Vendor/Partner Ledger — amounts payable/receivable where needed.

## Core operations
- Deposit/fund a wallet.
- Transfer between authorized internal wallets.
- Allocate budget to an agent/manager.
- Receive funds back from an agent/manager wallet.
- Request withdrawal.
- Request owner payout/withdrawal to an authorized external account.
- Refund/reversal with audit trail.
- View balance and transaction history.

## Owner wallet
The owner should be able to:
- Add funds through an authorized payment provider.
- Transfer/allocate funds to manager or agent budget wallets.
- Receive returned funds.
- Request a withdrawal/payout to the owner's verified external account.
- View all wallet and transaction records.

## Agent wallet rules
An agent wallet is a controlled budget ledger, not unrestricted access to a bank account. Agents can request or spend only within granted limits and permissions. Real-money transactions require the configured approval and authorized payment integration.

## Transfer flow
Owner Wallet → Transfer Request → Policy/Budget Check → Approval if required → Internal Ledger Transfer → Receipt/Audit Event.

Return flow:
Manager/Agent Wallet → Return Funds → Validation → Owner Wallet credit → Audit Event.

External payout:
Wallet → Withdrawal Request → Identity/account verification → Risk/limit check → Human approval where configured → Authorized payment provider → Transaction status → Receipt → Ledger + Audit.

## Transaction states
PENDING, APPROVED, REJECTED, PROCESSING, COMPLETED, FAILED, REVERSED, CANCELLED.

## Security
- Never store bank passwords, card PINs, OTPs or recovery codes in the application.
- Use authorized payment providers and their secure authentication flows.
- Apply least-privilege permissions.
- Maintain immutable-style audit records for financial events.
- Separate available balance, pending balance and reserved budget.
- Prevent negative balances unless explicitly supported by a verified business rule.
- Add configurable limits per wallet, user, agent, room and transaction type.

## Accounting
Every financial event must have:
- Transaction ID
- Wallet IDs
- Amount/currency
- Type
- Initiator
- Approver
- Purpose/reference
- Status
- Timestamp
- External provider reference when applicable
- Receipt/reference document when available

## UI target
Finance → Wallets → select wallet → Balance / Fund / Transfer / Receive / Withdraw / Transactions / Limits / Approvals.

For the first implementation, build ledger/simulation mode and approval workflows before connecting real-money providers. Never represent simulated money as real funds.
