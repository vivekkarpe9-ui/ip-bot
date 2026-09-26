# iP Bot Agent Builder

## Purpose
Users can create unlimited custom agents and configure what each agent is responsible for. Agents can belong to one or more Work Rooms/Teams subject to permissions.

## Agent configuration
Each agent has:

- Name and avatar/icon
- Role/title
- Mission/objective
- Detailed work description
- System instructions / command
- Skills and tools
- Research scope
- Allowed data sources
- Room/team membership
- Schedule/trigger
- Output format
- Approval policy
- Spending/external-action permissions
- Active/paused state

## Commands
Users can provide custom instructions such as:

> Research solar subsidy updates every Monday, summarize changes with official sources, and send a report for approval.

The agent stores the instruction as a versioned configuration. Important actions are still constrained by the permission policy.

## Research mode
Agents can be configured for:

- Quick research
- Deep research
- Scheduled research
- Competitor research
- Market research
- Supplier research
- Customer research
- Policy/regulation research
- Technical research

Research outputs should retain source references, timestamps, assumptions, and uncertainty where relevant.

## Agent workflow

Create Agent → Define Role → Set Command → Choose Skills → Select Research Mode → Choose Room/Team → Configure Permissions → Test → Activate.

## Team collaboration
Agents can delegate tasks to other authorized agents through the orchestration layer. The Master Agent can coordinate teams, but each delegated action remains scoped by permissions.

## Human control

The user remains in control of consequential actions. Financial transactions, contracts, purchases, employment actions, public publishing, and other external commitments can require explicit approval.

## Example agents

- Solar Research Agent
- Travel Planner Agent
- Shopping Product Agent
- Supplier Research Agent
- Customer Support Agent
- HR Recruitment Assistant
- Marketing Research Agent
- Finance Analyst Agent
- Call Centre QA Agent
- Custom Agent
