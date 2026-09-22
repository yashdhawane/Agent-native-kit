import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { updateProfile } from "../services/user.service.js";
import { toUserPublic, toSessionPublic } from "../contracts/user.schema.js";
import {
  UpdateProfileSchema,
  type UpdateProfileInput,
} from "../contracts/profile.schema.js";

export const meRouter: Router = Router();

meRouter.get("/api/me", requireAuth, (_req, res) => {
  res.json({
    user: toUserPublic(res.locals.session.user),
    session: toSessionPublic(res.locals.session.session),
  });
});

meRouter.patch(
  "/api/me",
  requireAuth,
  validate({ body: UpdateProfileSchema }),
  async (req, res) => {
    const input: UpdateProfileInput = req.body;
    const user = await updateProfile(res.locals.session.user.id, input);

    res.json({ user: toUserPublic(user) });
  },
);

export const meOpenApiPaths = {
  "/api/me": {
    get: {
      summary: "Get the current user and session",
      security: [{ cookieAuth: [] }],
      responses: {
        "200": {
          description: "Current user and session",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MeResponse" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    patch: {
      summary: "Update the current user profile",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdateProfile" },
          },
        },
      },
      responses: {
        "200": {
          description: "Updated user",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateProfileResponse" },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};