import express from "express";
import { prisma } from "@repo/db";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./openapi.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check API health
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

/**
 * @openapi
 * /health/db:
 *   get:
 *     summary: Check database connectivity
 *     responses:
 *       200:
 *         description: Database is connected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 database:
 *                   type: string
 *                   example: connected
 *       503:
 *         description: Database is unavailable
 */
app.get("/health/db", async (_req, res) => {
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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});