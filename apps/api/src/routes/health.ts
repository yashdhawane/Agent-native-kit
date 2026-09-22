import { Router } from "express";
import { prisma } from "@repo/db";

export const healthRouter: Router = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

healthRouter.get("/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      status: "error",
      database: "disconnected",
    });
  }
});

export const healthOpenApiPaths = {
  "/health": {
    get: {
      summary: "Check API health",
      responses: {
        "200": {
          description: "API is healthy",
        },
      },
    },
  },
  "/health/db": {
    get: {
      summary: "Check database connectivity",
      responses: {
        "200": {
          description: "Database is connected",
        },
        "503": {
          description: "Database is unavailable",
        },
      },
    },
  },
};