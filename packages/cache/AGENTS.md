# Cache Package Agent Instructions

## Purpose

`@repo/cache` is the application's shared cache abstraction backed by Upstash Redis.

Application code must use this package instead of importing `@upstash/redis` directly.

## Rules

### 1. Use the package abstraction

Application code should import from:

```ts
import { del, exists, get, set } from "@repo/cache";
```

Do not add direct Upstash Redis imports to `apps/api`, `apps/web`, or other application packages.

Avoid:

```ts
import { Redis } from "@upstash/redis";
```

Upstash-specific implementation belongs inside `packages/cache`.

### 2. Read cached values

Use:

```ts
const value = await get<MyType>("some:key");
```

`get()` returns the stored value or `null` when the key does not exist.

### 3. Write cached values

Use:

```ts
await set("some:key", value);
```

For expiring values:

```ts
await set("some:key", value, 300);
```

The third argument is the expiration time in seconds.

Use expiration for temporary/cache data whenever appropriate.

### 4. Delete cached values

Use:

```ts
await del("some:key");
```

Do not call Redis `DEL` directly from application code.

### 5. Check key existence

Use:

```ts
const present = await exists("some:key");
```

Prefer `get()` when the application needs the value. Use `exists()` only when existence itself is what matters.

### 6. Key naming

Use predictable namespaced keys.

Prefer:

```text
user:123:profile
session:abc123
rate-limit:user:123
cache:product:456
```

Avoid generic keys such as:

```text
data
user
cache
temp
```

When introducing a new key pattern, document the pattern near the consuming feature if it is not self-evident.

### 7. Environment variables

The package requires:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

Never hardcode credentials or commit them to the repository.

### 8. Keep Upstash isolated

Upstash-specific code belongs under:

```text
packages/cache/src/
```

If a new Redis capability is required, expose a small application-friendly function from `@repo/cache` instead of leaking the Upstash client into consumers.

Do not expose the raw Redis client unless there is a deliberate architectural decision to do so.

### 9. Cache is not the source of truth

Do not use this package as the primary persistent database.

Persistent application data belongs in the database.

Redis should be used for concerns such as:

* caching
* temporary state
* rate limiting
* short-lived data
* distributed coordination when explicitly designed for it

### 10. Agent workflow

Before changing this package:

1. Read this `AGENTS.md`.
2. Read `README.md`.
3. Inspect the existing implementation.
4. Reuse existing functions before creating new ones.
5. Keep Upstash SDK details inside this package.
6. Run typecheck after changes.
7. Run the package build after changes.
8. Add/update tests when changing behavior.

Validation commands:

```bash
pnpm --filter @repo/cache typecheck
pnpm --filter @repo/cache build
```

### 11. Agent skills

The repository provides the Upstash Redis skill under:

```text
.agents/skills/
```

Use the relevant Upstash Redis skill when working on Redis or Upstash-specific behavior.

### 12. MCP

Do not add or configure Upstash MCP as part of normal application implementation unless the task explicitly requires operational access to the Upstash environment.

MCP is separate from the runtime cache abstraction.

## Design principle

Keep this dependency direction:

```text
apps
  ↓
@repo/cache
  ↓
@upstash/redis
  ↓
Upstash Redis
```

Never make application code depend directly on the Upstash SDK.
