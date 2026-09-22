import express from "express";
import type { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { openapiSpec } from "./openapi.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRouter } from "./routes/health.js";
import { meRouter } from "./routes/me.js";
import { ApiError } from "./lib/errors.js";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );

  app.all("/api/auth/*splat", toNodeHandler(auth));

  app.use(express.json());

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

  app.use(healthRouter);
  app.use(meRouter);

  app.use((_req, _res, next) => {
    next(new ApiError(404, "NOT_FOUND", "Route not found"));
  });

  app.use(errorHandler);

  return app;
}