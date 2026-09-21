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
