# Agent Native Stack

## Purpose

This repository is an agent-native software engineering workspace.

The goal is to make the repository easy for coding agents to understand, modify, test, debug, and operate.

## Core Principles

* Prefer official documentation.
* Prefer official CLI tools.
* Prefer official MCP servers.
* Prefer Agent Skills when available.
* Prefer machine-readable configuration.
* Prefer TypeScript for application code.
* Use Python only when AI/ML services require it.
* Prefer free-tier or local development.
* Do not introduce paid infrastructure unless explicitly required.
* Keep the architecture simple until a capability is needed.
* Do not add dependencies without a reason.

## Default Stack

* Frontend: Next.js
* Backend: Node.js(expressjs) + TypeScript
* Backend Framework: NestJS [when user explicit say then only]
* AI/ML Services: FastAPI + Python
* Database: Neon PostgreSQL
* Package Manager: pnpm
* Monorepo: Turborepo
* Git: GitHub
* Containers: Docker

## Agent Workflow

Before changing code:

1. Inspect the repository structure.
2. Read relevant AGENTS.md files.
3. Read the relevant documentation.
4. Inspect existing implementations.
5. Make the smallest appropriate change.
6. Run formatting.
7. Run linting.
8. Run type checking.
9. Run tests.
10. Report what changed and what was verified.


For every non-trivial task:

1. Understand
Read this file.
Inspect relevant files.
Identify existing architecture and conventions.
Determine the smallest change that solves the task.

2. Plan

Before implementation, identify:

affected modules
API/data changes
dependencies
risks
verification steps

For large architectural changes, ask for confirmation before implementation.

3. Implement

Use the smallest appropriate specialist.

Prefer:

* backend-architect → backend/API architecture
* frontend-developer → Next.js/React
* typescript-pro → advanced TypeScript
* python-pro → Python
* fastapi-pro → FastAPI
* database-architect → schema/data architecture
* sql-pro → SQL/query optimization
* ai-engineer → AI/agent systems
* data-engineer → data pipelines
* cloud-architect → infrastructure architecture
* deployment-engineer → deployment/CI/CD
* observability-engineer → logs/metrics/tracing
* performance-engineer → performance/scaling
* security-auditor → security review
* test-automator → tests
* code-reviewer → final code review
* debugger → difficult bugs

Do not invoke every specialist by default.

Use the minimum number of agents necessary.


## AgentMemory

AgentMemory is the persistent memory layer for this repository.

Coding agents are replaceable. Project memory must survive between agents and sessions.

### Memory Rules

Before starting a non-trivial task:

1. Search AgentMemory for relevant previous work, decisions, lessons, failures, and current project state.
2. Do not duplicate information that already exists in memory.
3. Use the retrieved context to understand the current state before modifying code.

During implementation:

1. Save important discoveries that would help a future coding agent.
2. Save architectural or technology decisions when they affect future work.
3. Save important failures and their causes when the same mistake could happen again.
4. Update the relevant action/task when its status changes.

After completing meaningful work:

1. Save important implementation knowledge to AgentMemory.
2. Save reusable lessons when something was learned.
3. Update the task/action status.
4. Make sure the next coding agent can understand what was completed, what remains, and any known limitations.

### AgentMemory Tool Selection

Prefer the smallest appropriate AgentMemory operation.

Use:

* `memory_smart_search` → find relevant project knowledge.
* `memory_recall` → retrieve previous session observations.
* `memory_save` → save important project knowledge, decisions, or discoveries.
* `memory_lesson_save` → save reusable lessons and important mistakes.
* `memory_action_create` → create meaningful project work items.
* `memory_action_update` → update task progress or completion.
* `memory_next` → determine the next important unblocked action.
* `memory_commit_lookup` → understand which agent session produced a Git commit.

Do not use every memory tool by default.

### What Should Be Remembered

Good candidates for persistent memory:

* architectural decisions
* technology choices and their reasons
* important repository conventions
* non-obvious implementation details
* recurring bugs and their root causes
* failed approaches that should not be repeated
* important infrastructure or deployment discoveries
* API/data model decisions
* project constraints
* completed or partially completed work
* important lessons learned during implementation

Do not store:

* secrets
* API keys
* passwords
* tokens
* `.env` values
* temporary conversational details
* information that can already be reliably derived from the source code

### Memory and Source of Truth

AgentMemory is a context layer, not the source of truth for code.

Priority:

1. Current source code
2. Repository configuration
3. Official documentation
4. Git history
5. AgentMemory

If AgentMemory conflicts with the current repository state, trust the current repository state and update the stale memory.

### Multi-Agent Handoff

When work may continue in another coding agent:

1. Save the important current state.
2. Record unfinished work.
3. Record important decisions and discoveries.
4. Record known failures or blockers.
5. Update the corresponding action/task.

The next agent should be able to search AgentMemory and continue without relying on the previous agent's conversation history.


## Skills

Skills are supporting knowledge, not separate implementation steps.

Use the relevant skill when its domain matches the task.

Do not manually load unrelated skills.

Prefer progressive disclosure:

Start with the task.
Identify the relevant skill.
Read only the required skill/reference material.
Implement.
Verify.

## Technology Selection

When adding a technology:

1. Check whether an official CLI exists.
2. Check whether an official MCP server exists.
3. Check whether official Agent Skills exist.
4. Check whether documentation is LLM-friendly.
5. Check whether the service can be used locally or for free.
6. Prefer technologies that agents can inspect and operate directly.
7. Record the decision in the repository documentation.

## Dependency Rules
1. Do not install dependencies unnecessarily.
2. Prefer existing dependencies when they already solve the problem.
3. Prefer official packages.
4. Check whether a dependency has a CLI, MCP server, or Agent Skill before adding it.
5. Keep dependencies minimal.

## Safety

* Never expose secrets.
* Never commit `.env` files.
* Never run destructive commands without explicit approval.
* Never deploy production infrastructure without explicit approval.
* Never delete user data without explicit approval.

## Coding Style

* TypeScript strict mode.
* Avoid `any` unless there is a documented reason.
* Prefer small modules.
* Prefer explicit types at boundaries.
* Keep functions focused.
* Reuse existing utilities before creating new ones.

## Verification

A change is not considered complete until the appropriate checks have been run.

At minimum:

* lint
* typecheck
* tests

For UI changes:

* add/run appropriate E2E tests.

For infrastructure changes:

* validate configuration locally before deployment.

## Repository Commands

- Install dependencies: `pnpm install`
- Development: `pnpm dev`
- Lint: `pnpm lint`
- Typecheck: `pnpm check-types`
- Build: `pnpm build`
- Test: `pnpm test`

For API development:
- API runs on port `4000`
- Web runs on port `3000`

For Prisma:
- Generate client: `pnpm --filter @repo/db db:generate`

## Architecture Rules

- Use workspace packages instead of duplicating shared code.
- API routes belong in `apps/api/src/routes`.
- Business logic belongs in `apps/api/src/services`.
- Request/response contracts belong in `apps/api/src/contracts`.
- Zod schemas are the source of truth for API validation and OpenAPI schemas.
- Better Auth owns authentication and session handling.
- Do not expose Better Auth session tokens through API responses.
- Prisma is the database access layer.
- Neon PostgreSQL is the current database.
- Do not introduce another database or ORM unless explicitly required.
- FastAPI is only for services that genuinely require Python/AI/ML capabilities.
- Do not introduce NestJS unless explicitly requested.

## Environment

- Never commit `.env` files.
- Use environment variables for secrets and credentials.
- Keep environment configuration documented without exposing secret values.

## Git

- Keep commits focused and meaningful.
- Do not mix unrelated feature changes into a commit.
- Before committing, inspect `git status` and review the actual diff.
- Never commit secrets, generated credentials, or local environment files.

## Definition of Done

A task is complete only when:

implementation matches the requested behavior
existing architecture is respected
types pass
relevant tests pass
build passes when applicable
security implications are considered
no unnecessary dependency was added
no unrelated files were changed
remaining limitations are explicitly stated