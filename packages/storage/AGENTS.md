# Storage Package Agent Instructions

## Purpose

`@repo/storage` is the application's object-storage abstraction backed by Cloudinary.

Application code must use this package instead of importing the Cloudinary SDK directly.

## Rules

### 1. Use the package abstraction

Application code should import from:

```ts
import { upload, deleteAsset, getUrl } from "@repo/storage";
```

Do **not** add direct Cloudinary imports to `apps/api`, `apps/web`, or other application packages.

Avoid:

```ts
import { v2 as cloudinary } from "cloudinary";
```

Cloudinary-specific implementation belongs inside `packages/storage`.

### 2. Upload files

Use `upload()` for both string sources and in-memory `Buffer` uploads.

```ts
const result = await upload({
  file,
  folder: "profiles",
  resourceType: "image",
});
```

The returned result contains:

* `publicId`
* `secureUrl`
* `resourceType`
* `format`
* `bytes`

Prefer storing the `publicId` when the application needs to later delete or manage the asset.

### 3. Delete files

Use:

```ts
await deleteAsset({
  publicId,
});
```

Do not call Cloudinary deletion APIs directly from application code.

### 4. Generate asset URLs

Use:

```ts
const url = getUrl({
  publicId,
});
```

Do not construct Cloudinary URLs manually.

### 5. Environment variables

The package requires:

```text
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Never hardcode credentials or commit them to the repository.

### 6. Keep Cloudinary isolated

Cloudinary SDK-specific code belongs under:

```text
packages/storage/src/
```

If a new Cloudinary feature is required, expose a small application-friendly function from `@repo/storage` instead of leaking Cloudinary SDK types into consumers.

### 7. HTTP upload handling

Do not add HTTP/multipart concerns to this package.

Things such as:

* Express routes
* Multer
* request validation
* authentication
* authorization

belong in the consuming application/service layer.

The storage package should accept already-prepared data such as a `Buffer` or supported string source.

### 8. Agent workflow

Before changing this package:

1. Read this `AGENTS.md`.
2. Read `README.md`.
3. Inspect the existing implementation.
4. Reuse existing functions before creating new ones.
5. Keep Cloudinary SDK details inside this package.
6. Run typecheck after changes.
7. Run the package build after changes.
8. Add/update tests when changing behavior.

Validation commands:

```bash
pnpm --filter @repo/storage typecheck
pnpm --filter @repo/storage build
```

### 9. Agent skills

The repository provides Cloudinary-specific skills under:

```text
.agents/skills/cloudinary-docs
.agents/skills/cloudinary-next
.agents/skills/cloudinary-transformations
```

Use the relevant Cloudinary skill when working on Cloudinary-specific behavior.

### 10. MCP

Do not add or configure Cloudinary MCP as part of normal application implementation unless the task explicitly requires operational access to the Cloudinary environment.

MCP is separate from the runtime storage abstraction.

## Design principle

Keep this dependency direction:

```text
apps
  ↓
@repo/storage
  ↓
Cloudinary SDK
  ↓
Cloudinary
```

Never reverse this dependency by making application code depend directly on Cloudinary.
