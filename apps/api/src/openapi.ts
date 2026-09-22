import { z } from "zod";
import { ErrorResponseSchema } from "./contracts/error.schema.js";
import {
  UserPublicSchema,
  SessionPublicSchema,
  MeResponseSchema,
} from "./contracts/user.schema.js";
import {
  UpdateProfileSchema,
  UpdateProfileResponseSchema,
} from "./contracts/profile.schema.js";
import { healthOpenApiPaths } from "./routes/health.js";
import { meOpenApiPaths } from "./routes/me.js";

z.globalRegistry.add(ErrorResponseSchema, { id: "ErrorResponse" });
z.globalRegistry.add(UserPublicSchema, { id: "UserPublic" });
z.globalRegistry.add(SessionPublicSchema, { id: "SessionPublic" });
z.globalRegistry.add(MeResponseSchema, { id: "MeResponse" });
z.globalRegistry.add(UpdateProfileSchema, { id: "UpdateProfile" });
z.globalRegistry.add(UpdateProfileResponseSchema, {
  id: "UpdateProfileResponse",
});

const jsonSchema = z.toJSONSchema(z.globalRegistry, {
  target: "openapi-3.0",
  uri: (id) => `#/components/schemas/${id}`,
}) as { schemas: Record<string, Record<string, unknown>> };

function stripRegistryKeys(schema: Record<string, unknown>) {
  const cleaned = { ...schema };
  delete cleaned.id;
  delete cleaned.$id;
  return cleaned;
}

const schemas = Object.fromEntries(
  Object.entries(jsonSchema.schemas ?? {}).map(([id, schema]) => [
    id,
    stripRegistryKeys(schema),
  ]),
);

export const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Agent Native API",
    version: "0.1.0",
    description: "API for the Agent Native Software Engineering Template.",
  },
  servers: [{ url: "http://localhost:4000" }],
  paths: {
    ...healthOpenApiPaths,
    ...meOpenApiPaths,
  },
  components: {
    schemas,
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "better-auth.session_token",
      },
    },
  },
};