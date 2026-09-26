# iP Bot — Withdrawal & Payout Specification

## Goal
Add a controlled withdrawal/payout system for business wallets, agent budgets, vendor/customer settlements, and future authorized payment integrations.

## Wallet model
Each room/business can have a ledger/wallet view with:
- Available balance
- Pending balance
- Reserved balance
- Withdrawable balance
- Transaction history

Balances must be derived from recorded ledger entries, not manually trusted UI values.

## Withdrawal flow
User/authorized workflow:

Withdrawal request
→ Validate identity/session
→ Check available/withdrawable balance
→ Check limits and policy
→ Risk/fraud checks
→ Approval if required
→ Authorized payment provider/bank integration
→ Transaction status
→ Receipt/reference
→ Ledger update
→ Audit log

## Withdrawal request fields
- Request ID
- Room/business
- Requested amount
- Currency
- Purpose/category
- Destination/payment method reference (never expose sensitive account details in normal logs)
- Requested by
- Created time
- Approval status
- Processing status
- Provider transaction reference
- Receipt/reference
- Failure reason when applicable

## Agent restrictions
Agents may prepare a withdrawal request and calculate/verify eligibility when permitted, but must not autonomously transfer money from a personal bank account or bypass approval/policy controls.

Default: financial withdrawals require human approval.

## Limits
Support configurable:
- Per transaction limit
- Daily limit
- Weekly/monthly limit
- Room limit
- Agent limit
- Approval threshold

## States
DRAFT → PENDING_APPROVAL → APPROVED → PROCESSING → COMPLETED
Alternative terminal/error states:
REJECTED, FAILED, CANCELLED, REFUNDED

## Security
- Never store raw banking passwords, card PINs, OTPs or recovery codes.
- Use authorized payment/banking APIs or provider-hosted flows where available.
- Use least-privilege access.
- Keep sensitive destination identifiers masked in UI/logs.
- Require re-authentication/strong authorization where appropriate.
- Record every consequential action in the audit log.

## UI
Add a Finance/Wallet area with:
- Balance
- Withdraw
- Deposit/credits where supported
- Transactions
- Pending requests
- Approvals
- Limits
- Receipts
- Audit history

Withdrawal confirmation should clearly show amount, destination reference, fees if known, estimated net amount, reason, approval requirement and final confirmation.

## Important boundary
A working money-transfer integration must not be simulated as real. Until a compliant payment provider/bank integration is connected and tested, the app should operate in request/simulation mode and clearly label it.
