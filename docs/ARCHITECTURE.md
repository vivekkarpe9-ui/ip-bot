# iP Bot Architecture

## Platform layers

### 1. Experience
- Mobile-first dashboard
- Business room UI
- Agent/team workspace
- Approvals and notifications
- Reports and exports

### 2. Orchestration
- Master Agent
- Agent registry
- Task planner
- Workflow engine
- Scheduler
- Approval gates
- Audit/event log

### 3. Business capabilities
- CRM and customers
- Sales and orders
- Inventory
- Projects and operations
- HR
- Call centre
- Marketing
- Finance analytics
- Research
- Website/app factory

### 4. Integrations
- Gmail
- Google Sheets / Excel-compatible exports
- Calendar
- Web research sources
- Future business-specific providers

### 5. Business rooms

Rooms are modules built on shared capabilities. Initial planned rooms:

- Solar
- Travel
- Shopping / Fashion
- General Business
- HR
- Call Centre
- Marketing
- Finance
- Operations
- Custom Business

## Agent model

Each room can register specialized agents. Agents receive scoped tasks and permissions. Consequential actions require configurable approval gates.

## Data model direction

Core entities: User, Organization, Room, Agent, Team, Task, Workflow, Customer, Product, Order, Project, Expense, Revenue, Report, Integration, Permission, Approval, AuditEvent.

Business-specific data should live in room modules rather than being hard-coded into the core.

## Security principles

- OAuth for external accounts
- Secrets stored outside source code
- Least-privilege permissions
- Human approval for consequential external actions
- Immutable audit trail for agent actions
- Clear separation between simulation/analysis and real-world execution
