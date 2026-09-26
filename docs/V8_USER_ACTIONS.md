# iP Bot V8 — User Actions

Most of the build can continue without user input. When a user action is genuinely required, stop and request only that action.

## User actions eventually required

1. **Backend provider connection** — choose/authorize the production backend when the app is ready for persistent cloud data.
2. **Google OAuth consent** — connect Gmail/Sheets only when integration testing starts.
3. **AI provider/model configuration** — choose the model/provider or approved local model strategy for real agent execution.
4. **Deployment target** — choose the preferred production host when deployment is ready.
5. **Business/payment integrations** — only when a specific business room needs them; never assume authority to transact.

## No action needed yet

The user does not need to manually write code for the planned app architecture, agent/room specifications, UI structure, or local/demo workflows. Continue building those pieces first.

## Approval principle

Ask the user before connecting accounts, granting permissions, publishing externally, spending money, or enabling consequential real-world actions.
