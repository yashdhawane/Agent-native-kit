# Agent Native Kit

> A reusable, agent-native software engineering template for building projects with AI coding agents.

Agent Native Kit is a **Turborepo-based project template** designed to give a developer a strong engineering foundation from day one.

The idea is simple:

```text
Clone this repository
        ↓
Rename the project
        ↓
Configure what your project needs
        ↓
Start building
        ↓
Ship THIS repository as your project
```

**The cloned repository becomes the actual project.**

You do not keep Agent Native Kit as a separate dependency or framework underneath your application.

---

# What This Repository Provides

A normal starter repository usually gives you:

```text
Code
Dependencies
Basic configuration
```

Agent Native Kit additionally provides an environment designed for AI coding agents:

```text
Code
+
Architecture rules
+
AGENTS.md
+
AgentMemory
+
MCP tools
+
Agent Skills
+
Specialist agents
+
Testing
+
Observability
+
GitHub CI
```

The purpose is to make coding agents understand the project faster, work consistently, remember important decisions, and verify their changes.

---

# The Core Idea

This repository has several layers, and each layer has a different job.

```text
AGENTS.md
    ↓
Permanent engineering rules

AgentMemory
    ↓
Changing project knowledge

Source Code
    ↓
Current technical truth

Git
    ↓
Project history

Skills
    ↓
Specialized knowledge

MCP
    ↓
Tools available to agents

CI
    ↓
Independent verification

Coding Agents
    ↓
Workers that build the project
```

### Source code is the source of truth

AgentMemory is **not** a replacement for source code.

If memory says one thing but the current repository says another:

```text
Current source code
        ↓
Repository configuration
        ↓
Official documentation
        ↓
Git history
        ↓
AgentMemory
```

The current repository wins.

The agent should update the memory when it discovers that previous information is outdated.

---

# How To Use This Template

This is the most important part.

## 1. Clone the repository

```bash
git clone <repository-url> my-project
cd my-project
```

You can rename the folder to whatever your project is called.

For example:

```text
my-turborepo
      ↓
ai-data-agent
```

---

## 2. This repository is now your project

You do **not** create another project inside this repository.

The repository itself becomes:

```text
Your GitHub repository
        ↓
Your application
        ↓
Your source code
        ↓
Your deployment
        ↓
Your shipped product
```

You can rename:

* Project name
* Package names
* Application names
* Repository name
* Documentation
* README
* Business-specific code

according to your project.

---

## 3. Start building

Once the repository is cloned and configured, start using it as a normal project.

The difference is that the project already has an agent-friendly engineering foundation.

You can use:

* OpenCode
* Claude Code
* Kilo
* Kiro
* VS Code-based coding agents
* Other compatible coding agents

You only need **one** coding agent.

You do not need to install every supported agent.

---

# Prerequisites

A developer using this template should have:

### Required

```text
Git
Node.js 24+
pnpm 11+
Docker Desktop
GitHub account
One compatible coding agent
```

Basic knowledge of:

```text
Terminal
Git
Node.js
```

is recommended.

### Optional

Depending on the application:

```text
Neon
Cloudinary
Upstash
Sentry
Other external services
```

You do **not** need to create every external account supported by the template.

Only configure the services your application actually needs.

---

# Technology Stack

## Monorepo

* Turborepo
* pnpm
* Node.js 24+

## Frontend

* Next.js 16
* React 19
* TypeScript

## Backend

* Node.js
* Express
* TypeScript

NestJS is **not part of the default architecture**.

Use NestJS only when there is a specific reason to introduce it.

## Database

* PostgreSQL
* Neon
* Prisma

Database access is centralized through the database package.

## Authentication

* Better Auth

Better Auth handles authentication and sessions.

Do not create another authentication system unless the project has a specific requirement.

## Storage

* Cloudinary

File storage is accessed through the storage package.

## Cache

* Upstash Redis

Caching is accessed through the cache package.

## AI / ML

Python is used when an AI/ML service actually requires Python.

Typical technologies:

* FastAPI
* Python
* LangChain
* LangGraph

Do not introduce Python into a project simply because the template supports it.

## Observability

* OpenTelemetry
* Sentry

## Background Jobs

* Inngest

Use background jobs only when the application actually needs asynchronous/background processing.

## API Documentation

* OpenAPI
* Swagger

## Testing

* Node.js native test runner
* Playwright for browser/E2E testing when required

## Development

* GitHub
* GitHub Actions
* Docker

---

# Repository Structure

```text
.
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── db/
│   ├── storage/
│   ├── cache/
│   ├── jobs/
│   ├── observability/
│   ├── ui/
│   ├── eslint-config/
│   └── typescript-config/
│
├── AGENTS.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## `apps/web`

Next.js frontend.

Default development port:

```text
3000
```

## `apps/api`

Express + TypeScript backend.

Default development port:

```text
4000
```

Typical structure:

```text
apps/api/src/
├── routes/
├── services/
├── contracts/
└── middleware/
```

Business logic should generally live in services rather than becoming large route handlers.

## `packages/db`

Database and Prisma infrastructure.

Use:

```text
@repo/db
```

for database access.

## `packages/storage`

File/object storage infrastructure.

Use:

```text
@repo/storage
```

## `packages/cache`

Redis/cache infrastructure.

Use:

```text
@repo/cache
```

## `packages/jobs`

Background job infrastructure.

## `packages/observability`

Shared observability infrastructure.

## `packages/ui`

Reusable UI components.

---

# Engineering Principles

## 1. Keep the architecture simple

Do not add technology just because it exists in the ecosystem.

Example:

```text
Does the feature need Redis?
        ↓
      Yes → Use Redis

      No
        ↓
Don't add Redis to the feature
```

The same principle applies to:

* Queues
* Microservices
* Vector databases
* Graph databases
* Event systems
* Python services
* Additional frameworks

---

## 2. Prefer official tooling

When adding technology, prefer:

```text
Official CLI
      ↓
Official documentation
      ↓
Official MCP
      ↓
Official Agent Skill
```

Avoid unnecessary abstractions and dependencies.

---

## 3. Keep dependencies minimal

Every dependency creates additional:

* Maintenance
* Security surface
* Upgrade work
* Debugging complexity
* Agent complexity

Before adding a dependency, check whether the existing stack can already solve the problem.

---

# AGENTS.md

`AGENTS.md` contains the permanent engineering instructions for coding agents.

It explains things such as:

* Repository architecture
* Technology choices
* Coding standards
* Security rules
* Testing rules
* Agent workflow
* Specialist agents
* AgentMemory usage
* Environment rules
* Git rules
* Definition of done

### Coding agents should read `AGENTS.md` first.

Do not repeatedly explain the repository architecture to the agent through prompts when the information already exists in `AGENTS.md`.

---

# AgentMemory

AgentMemory provides persistent memory for coding agents.

Without persistent memory:

```text
Agent A
   ↓
Works on project
   ↓
Stops
   ↓
Agent B
   ↓
Has to rediscover everything
```

With AgentMemory:

```text
Agent A
   ↓
Discovers something important
   ↓
Saves useful knowledge
   ↓
Agent B
   ↓
Retrieves the knowledge
   ↓
Continues the project
```

This is especially useful when switching between:

* OpenCode
* Kilo
* Claude Code
* Kiro
* Other compatible agents

---

# What Should Be Saved To AgentMemory?

Good things to remember:

```text
Architecture decisions
Technology decisions and reasons
Important constraints
Non-obvious implementation details
Failed approaches
Bug root causes
Infrastructure discoveries
API decisions
Data-model decisions
Deployment discoveries
Project lessons
Unfinished work
Agent handoff information
```

Do **not** store:

```text
Passwords
API keys
Access tokens
Secrets
.env contents
Temporary conversation details
Information already obvious from source code
```

AgentMemory is a **project context layer**, not the source of truth.

---

# AgentMemory Workflow

For a meaningful task:

```text
Search relevant memory
        ↓
Inspect current source code
        ↓
Understand previous decisions
        ↓
Plan
        ↓
Implement
        ↓
Verify
        ↓
Save important new knowledge
```

Do not use every AgentMemory tool for every task.

Use only the tools that are useful for the current work.

---

# MCP

MCP gives coding agents access to external tools.

Depending on the project, this can include:

```text
Agent
  │
  ├── AgentMemory
  ├── Next.js DevTools
  ├── Playwright
  ├── GitHub
  └── Other required tools
```

Only configure MCP servers that are actually needed.

---

# Agent Skills

Skills provide specialized knowledge to coding agents.

Examples include skills for:

* Better Auth
* Prisma
* Cloudinary
* Upstash
* Next.js
* Playwright
* Other technologies

The intended workflow is:

```text
Task
 ↓
Identify technology involved
 ↓
Load relevant skill
 ↓
Read relevant guidance
 ↓
Implement
```

Do not load every skill for every task.

---

# Specialist Agents

The repository contains specialist agents for areas such as:

```text
Backend
Frontend
TypeScript
Python
FastAPI
Database
SQL
AI Engineering
Data Engineering
Cloud
Deployment
Observability
Performance
Security
Testing
Debugging
Code Review
```

Use the **minimum number of specialists necessary**.

For example, a database-heavy feature might use:

```text
Database Architect
       ↓
TypeScript Specialist
       ↓
Test Automator
```

There is no reason to involve every specialist agent.

---

# How An Agent Should Work

The expected workflow is:

```text
Understand
    ↓
Plan
    ↓
Implement
    ↓
Test
    ↓
Verify
    ↓
Review
    ↓
Commit
    ↓
Remember
```

For non-trivial tasks, the agent should first inspect:

```text
AGENTS.md
Current source code
Existing patterns
Relevant skills
Relevant AgentMemory
Official documentation
```

---

# First Prompt After Cloning

After cloning the repository, a good first prompt is:

```text
Read AGENTS.md and understand this repository.

I am going to turn this repository into my project.

My project is:
<describe your project>

Before writing code:

1. Understand the existing architecture.
2. Inspect the repository structure.
3. Identify which existing packages and infrastructure I can use.
4. Check AgentMemory for relevant project context.
5. Identify what needs to change for my project.
6. Identify anything that should NOT be changed.
7. Propose the project architecture.
8. Create a step-by-step implementation plan.

Do not start implementing until the plan is clear.
```

After reviewing the plan, start implementing the project.

---

# Project Development Workflow

Build the application feature-by-feature.

For each meaningful feature:

```text
1. Understand the requirement
          ↓
2. Search AgentMemory
          ↓
3. Inspect existing code
          ↓
4. Plan the change
          ↓
5. Implement
          ↓
6. Test
          ↓
7. Lint
          ↓
8. Typecheck
          ↓
9. Review Git diff
          ↓
10. Commit
          ↓
11. Save important knowledge
```

---

# Build Vertical Slices

Prefer complete features instead of building the entire application layer-by-layer.

For example:

```text
Authentication

Database
   ↓
Better Auth
   ↓
API
   ↓
Frontend
   ↓
Tests
   ↓
Observability
   ↓
Verification
   ↓
Commit
```

Then move to the next feature.

This makes the project easier for both humans and agents to understand.

---

# Environment Variables

Never commit real secrets.

Use `.env.example` files to document required variables.

For example:

```text
DATABASE_URL

BETTER_AUTH_SECRET

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

SENTRY_DSN
```

Only configure the services required by the actual project.

---

# Local Development

Install dependencies:

```bash
pnpm install
```

Start development:

```bash
pnpm dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:4000
```

Use Docker for local infrastructure where required.

---

# Verification

Typical checks:

```bash
pnpm lint
pnpm check-types
pnpm test
pnpm build
```

For frontend changes, use browser/E2E tests when appropriate.

For infrastructure changes, validate the relevant local configuration.

Not every tiny change requires every check, but meaningful features should be properly verified.

---

# Git Workflow

Git is the history of the actual project.

Recommended workflow:

```text
Implement
   ↓
Test
   ↓
Review git diff
   ↓
Commit
   ↓
Push
   ↓
GitHub Actions
```

Do not blindly commit large unreviewed changes.

---

# CI

GitHub Actions provides independent verification.

The local agent may say:

```text
"It works."
```

CI provides another layer of validation.

The typical pipeline includes:

```text
Install dependencies
        ↓
Prisma generate
        ↓
Lint
        ↓
Build
```

Additional project-specific checks can be added when needed.

---

# Security

Never commit:

```text
.env
.env.*
API keys
Passwords
Tokens
Private credentials
Production secrets
```

Agents should not perform destructive operations without appropriate approval.

Examples:

```text
Deleting production data
Dropping databases
Destructive migrations
Deleting repositories
Production deployment
```

should require explicit human approval.

---

# Adding New Technology

When your project needs something that is not already included:

```text
1. Confirm the capability is actually needed.
2. Check whether the existing stack can solve it.
3. Prefer the official tool/library.
4. Read the official documentation.
5. Check for an official MCP or Agent Skill.
6. Evaluate maintenance and agent usability.
7. Add the smallest required integration.
8. Document important decisions.
```

Do not add infrastructure simply because the template supports it.

---

# What You Do NOT Need To Do

After cloning this repository, you do **not** need to:

```text
Create another application inside it
Create Project A / Project B folders
Rebuild the monorepo from scratch
Install every coding agent
Configure every supported service
Understand all AgentMemory tools
Understand every MCP
Use every specialist agent
Rewrite the architecture before starting
```

Instead:

```text
Clone
  ↓
Rename
  ↓
Configure
  ↓
Build
  ↓
Test
  ↓
Ship
```

**The repository you cloned is the repository you ship.**

---

# When You Finish Your Project

Your final repository can look like:

```text
your-project/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── db/
│   ├── storage/
│   ├── cache/
│   ├── observability/
│   └── ...
├── AGENTS.md
├── README.md
├── package.json
└── ...
```

The original template identity should be replaced where appropriate.

Your README should describe **your actual application**.

Your GitHub repository should become the project's real repository.

Your application is then shipped from this repository.

---

# Definition of Done

For a meaningful feature:

```text
[ ] Requirement understood
[ ] Existing implementation inspected
[ ] Relevant AgentMemory checked
[ ] Plan created
[ ] Implementation completed
[ ] Types checked
[ ] Lint passed
[ ] Tests passed
[ ] E2E tested when required
[ ] Security considered
[ ] Observability considered
[ ] Git diff reviewed
[ ] Commit created
[ ] Important knowledge saved
```

---

# Agent Native Philosophy

The goal is not simply:

> Give an AI agent a repository and let it write code.

The goal is:

> **Give the AI agent a well-structured engineering environment where it can understand the project, use existing infrastructure, retrieve relevant knowledge, use specialized tools, verify its work, and continue work performed by another agent.**

The human decides:

```text
What to build
Product requirements
Important architecture decisions
Risky operations
Final acceptance
```

The agent handles as much of the engineering execution as it can safely perform.

---

# Final Mental Model

```text
             YOUR PROJECT
                  │
                  ▼
             AGENTS.md
          Permanent Rules
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
   AgentMemory   Skills     MCP
     Context   Knowledge   Tools
        │         │         │
        └─────────┼─────────┘
                  ▼
             Coding Agent
                  │
                  ▼
             Source Code
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
      Tests                Git
        │                   │
        └─────────┬─────────┘
                  ▼
              GitHub CI
                  │
                  ▼
             Ship Project
```

**Clone it. Rename it. Build on it. Test it. Ship it.**

The template becomes your project.
