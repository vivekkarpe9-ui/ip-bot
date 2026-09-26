# iP Bot — Approval and Authentication Flow

Agents may encounter websites or connected services that require sign-in, Google/Gmail OAuth, MFA, OTP, consent, or another human verification step.

## Required behavior
1. Agent identifies the blocked step.
2. Agent creates an Approval Request containing:
   - Room
   - Agent
   - Target website/service
   - Requested permission/scope
   - Why the access is needed
   - What the agent plans to do after access
   - Risk level
   - Expiration/time limit
3. iP Bot pauses the dependent task.
4. User reviews the request.
5. If approved, the user completes the provider's official sign-in/consent/verification flow.
6. iP Bot receives only the authorized result/token through the supported integration; it must not ask the user to paste passwords, OTPs, recovery codes or private credentials into chat.
7. The agent resumes only within the granted scope.
8. The approval, granted scope, action and outcome are recorded in the audit log.

## Example
Travel Research Agent needs access to an authorized travel/vendor portal:

Research → Login required → Approval Request → User approves → Official OAuth/verification → Limited access granted → Research resumes → Sources/results recorded.

## Security rules
- Never bypass CAPTCHA, MFA, OTP, login restrictions or access controls.
- Never request or store plaintext passwords or one-time verification codes in agent memory.
- Never silently reuse a broader permission than the user approved.
- Separate read-only research access from write/transaction access.
- Expire temporary grants when their task or time window ends.
- Consequential actions remain behind the configured approval policy.

## UX
Approval cards should show a clear `Approve`, `Deny`, `View Details` and `Cancel Task` action. The user should always know which service is requesting access and what will happen next.
