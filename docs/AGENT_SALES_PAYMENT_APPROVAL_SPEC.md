# Agent Sales Payment + Owner Approval

## Goal
When an authorized agent sells a product or service to a customer, the payment flow must route through the owner's configured merchant/payment account or platform-controlled payment destination. Agents must not redirect customer funds to their personal accounts.

## Order flow
Customer -> Checkout -> Payment Provider -> Owner/Business Merchant Account -> Payment Confirmation -> Order -> Agent fulfillment task.

## Agent behavior
1. Agent may create a quote/cart/order within its granted permissions.
2. Agent must show customer the final amount, currency, taxes/fees and order details.
3. Before creating or confirming a charge, require the configured owner approval when the agent's policy says approval is required.
4. After successful payment, record the provider transaction reference and reconcile it to the owner's wallet/business ledger.
5. Agent can then receive the fulfillment task and update order status.

## Approval modes
- Always require owner approval.
- Require approval above a configurable amount.
- Auto-approve within a configured product/price/budget policy.
- Draft/quote only: never charge.

## Money routing
Customer payments should be collected using an authorized payment provider and settled to the verified owner/business merchant account. The app must not hold customer funds or pretend to have received money unless the payment provider confirms it.

## Refunds/cancellations
Refunds must use the payment provider's authorized refund flow and create an audit event. Agents may request refunds but cannot bypass configured approval rules.

## Audit
Record order ID, agent, customer reference (non-sensitive identifier), amount, currency, approval decision, approver, payment-provider reference, status, timestamps and refund/reversal status.

## Security
Never collect/store card PINs, CVV, bank passwords or OTPs in iP Bot. Use hosted checkout/tokenized provider flows. Payment credentials remain with the payment provider.

## Wallet integration
Successful settlements credit the configured Owner/Business ledger. Agent and manager wallets are internal controlled ledgers/budgets and do not become the destination for customer checkout funds unless explicitly configured as a compliant business merchant account through the payment provider.
