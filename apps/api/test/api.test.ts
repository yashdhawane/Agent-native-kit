import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { createApp } from "../src/app.js";
import { openapiSpec } from "../src/openapi.js";
import { validate } from "../src/middleware/validate.js";
import { errorHandler } from "../src/middleware/error-handler.js";
import { ApiError } from "../src/lib/errors.js";
import { UpdateProfileSchema } from "../src/contracts/profile.schema.js";
import { toSessionPublic } from "../src/contracts/user.schema.js";

let server: Server;
let baseUrl: string;

before(async () => {
  const app = createApp();
  server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => {
  server?.close();
});

function errorBody(payload: unknown) {
  return payload as {
    error: { code: string; message: string; details?: unknown };
  };
}

describe("health", () => {
  it("GET /health returns ok", async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "ok" });
  });

  it("GET /health/db reports database status", async () => {
    const res = await fetch(`${baseUrl}/health/db`);
    assert.ok(res.status === 200 || res.status === 503);
    const body = await res.json();
    const expected = res.status === 200 ? "ok" : "error";
    assert.equal(body.status, expected);
  });
});

describe("protected /api/me", () => {
  it("GET /api/me without a session returns 401", async () => {
    const res = await fetch(`${baseUrl}/api/me`);
    assert.equal(res.status, 401);
    assert.equal(errorBody(await res.json()).error.code, "UNAUTHORIZED");
  });

  it("PATCH /api/me without a session returns 401", async () => {
    const res = await fetch(`${baseUrl}/api/me`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Ava" }),
    });
    assert.equal(res.status, 401);
    assert.equal(errorBody(await res.json()).error.code, "UNAUTHORIZED");
  });
});

describe("404 fallback", () => {
  it("unknown routes return a JSON error", async () => {
    const res = await fetch(`${baseUrl}/api/does-not-exist`);
    assert.equal(res.status, 404);
    assert.equal(errorBody(await res.json()).error.code, "NOT_FOUND");
  });
});

describe("openapi spec", () => {
  it("targets OpenAPI 3.0.3 matching the zod JSON Schema target", () => {
    assert.equal(openapiSpec.openapi, "3.0.3");
  });

  it("describes protected /api/me routes with shared schemas", () => {
    assert.ok(openapiSpec.paths["/api/me"]?.get);
    assert.ok(openapiSpec.paths["/api/me"]?.patch);
    for (const name of [
      "UserPublic",
      "SessionPublic",
      "MeResponse",
      "UpdateProfile",
      "UpdateProfileResponse",
      "ErrorResponse",
    ]) {
      assert.ok(openapiSpec.components.schemas[name], `schema ${name}`);
    }
    assert.ok(openapiSpec.components.securitySchemes.cookieAuth);
  });

  it("SessionPublic schema does not expose the session token", () => {
    const sessionSchema = openapiSpec.components.schemas["SessionPublic"] as {
      properties?: Record<string, unknown>;
    };
    assert.ok(sessionSchema.properties);
    assert.ok(!sessionSchema.properties["token"]);
  });
});

describe("public session contract", () => {
  it("toSessionPublic omits the token and serializes dates to ISO strings", () => {
    const session = toSessionPublic({
      id: "sess_1",
      expiresAt: new Date("2027-01-01T00:00:00Z"),
      createdAt: new Date("2026-01-01T00:00:00Z"),
      updatedAt: new Date("2026-01-02T00:00:00Z"),
      ipAddress: null,
      userAgent: "test-agent",
      userId: "user_1",
    });
    assert.ok(!("token" in session));
    assert.equal(session.id, "sess_1");
    assert.equal(session.expiresAt, "2027-01-01T00:00:00.000Z");
    assert.equal(session.createdAt, "2026-01-01T00:00:00.000Z");
    assert.equal(session.updatedAt, "2026-01-02T00:00:00.000Z");
    assert.equal(session.userAgent, "test-agent");
    assert.equal(session.userId, "user_1");
  });
});

describe("validate middleware", () => {
  it("parses and normalizes a valid body", () => {
    const req = { body: { name: "  Ava  " } } as unknown as Request;
    const res = {} as Response;
    let errored: unknown;

    validate({ body: UpdateProfileSchema })(
      req,
      res,
      ((err: unknown) => {
        errored = err;
      }) as NextFunction,
    );

    assert.equal(errored, undefined);
    assert.equal((req.body as { name?: string }).name, "Ava");
  });

  it("forwards a ZodError for an invalid body", () => {
    const req = { body: { name: "" } } as unknown as Request;
    const res = {} as Response;
    let errored: unknown;

    validate({ body: UpdateProfileSchema })(
      req,
      res,
      ((err: unknown) => {
        errored = err;
      }) as NextFunction,
    );

    assert.ok(errored instanceof ZodError);
  });
});

describe("errorHandler", () => {
  type FakeRes = {
    statusCode: number;
    body: unknown;
    headersSent: boolean;
    status(code: number): FakeRes;
    json(payload: unknown): FakeRes;
  };

  function makeRes(): FakeRes {
    return {
      statusCode: 200,
      body: undefined as unknown,
      headersSent: false,
      status(this: FakeRes, code: number): FakeRes {
        this.statusCode = code;
        return this;
      },
      json(this: FakeRes, payload: unknown): FakeRes {
        this.body = payload;
        return this;
      },
    };
  }

  it("maps ApiError to its status and error envelope", () => {
    const res = makeRes();
    errorHandler(
      new ApiError(404, "NOT_FOUND", "User not found"),
      {} as Request,
      res as unknown as Response,
      (() => {}) as NextFunction,
    );
    assert.equal(res.statusCode, 404);
    assert.equal(errorBody(res.body).error.code, "NOT_FOUND");
  });

  it("maps ZodError to a 400 validation error with details", () => {
    const res = makeRes();
    const result = UpdateProfileSchema.safeParse({ name: "" });
    assert.ok(!result.success);
    errorHandler(result.error, {} as Request, res as unknown as Response, (() => {}) as NextFunction);
    assert.equal(res.statusCode, 400);
    assert.equal(errorBody(res.body).error.code, "VALIDATION_ERROR");
    assert.ok(Array.isArray(errorBody(res.body).error.details));
  });

  it("masks unknown errors as 500", () => {
    const res = makeRes();
    errorHandler(
      new Error("boom"),
      {} as Request,
      res as unknown as Response,
      (() => {}) as NextFunction,
    );
    assert.equal(res.statusCode, 500);
    assert.equal(errorBody(res.body).error.code, "INTERNAL_SERVER_ERROR");
  });

  it("delegates to next when headers are already sent", () => {
    const res = makeRes();
    res.headersSent = true;
    let forwarded: unknown;
    const err = new ApiError(500, "INTERNAL_SERVER_ERROR", "boom");

    errorHandler(
      err,
      {} as Request,
      res as unknown as Response,
      ((e: unknown) => {
        forwarded = e;
      }) as NextFunction,
    );

    assert.equal(forwarded, err);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body, undefined);
  });
});