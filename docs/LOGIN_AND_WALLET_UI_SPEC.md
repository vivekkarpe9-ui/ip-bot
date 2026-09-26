# iP Bot Login + Wallet UI Specification

## Login
Provide an app entry screen with:
- Continue with Google
- Continue with Microsoft
- Email + password
- Optional phone OTP
- Forgot password / account recovery
- Terms and privacy links

The authenticated account has a role: OWNER, MANAGER, MEMBER. The first owner account controls organization/work rooms, agents, permissions and finance settings.

Do not store provider passwords or OTPs in the application. Use official OAuth/OIDC flows and secure backend sessions. Provider access for Gmail, Drive, Facebook, Instagram, etc. is separate from iP Bot login and requires an explicit connection/permission flow.

## Wallet UI
Add a Finance/Wallets area with:
- Owner Wallet
- Manager Wallets
- Agent Budget Wallets
- Room/Business Wallets
- Vendor/Partner ledgers

Wallet screen:
- Available balance
- Pending balance
- Reserved budget
- Fund wallet
- Transfer
- Receive/return funds
- Withdraw
- Transactions
- Limits
- Approvals

## Owner flow
Owner Wallet -> Fund/Transfer -> Manager or Agent Budget Wallet -> work/expense -> return unused funds -> Owner Wallet.

External withdrawal:
Owner Wallet -> Withdrawal Request -> account verification -> policy/limit check -> owner approval where configured -> authorized payment provider -> status -> receipt -> ledger/audit.

## Agent controls
Agents never receive unrestricted bank credentials. Agent wallets are controlled budget ledgers. Spending is limited by assigned budget, permissions and approval policy.

## Transaction states
PENDING, APPROVED, REJECTED, PROCESSING, COMPLETED, FAILED, REVERSED, CANCELLED.

## Security
- No bank passwords, card PINs, OTPs or recovery codes stored in app.
- Real-money operations require an authorized payment provider and appropriate approval controls.
- Keep a complete audit trail.
- Separate simulated/ledger balances from real payment-provider balances until a verified provider is connected.

## First implementation target
Build login UI, account/role model, wallet dashboard, internal ledger transfer UI and approval screens. Keep payment-provider operations in sandbox/simulation mode until a real provider is configured.
