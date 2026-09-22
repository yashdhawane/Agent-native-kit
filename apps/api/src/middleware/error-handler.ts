import type { ErrorRequestHandler, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../lib/errors.js";

function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown,
) {
  res.status(status).json({
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  });
}

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ApiError) {
    sendError(res, error.status, error.code, error.message, error.details);
    return;
  }

  if (error instanceof ZodError) {
    sendError(
      res,
      400,
      "VALIDATION_ERROR",
      "Request validation failed",
      error.issues.map((issue) => ({
        path: issue.path.map(String),
        message: issue.message,
        code: issue.code,
      })),
    );
    return;
  }

  console.error(error);

  sendError(res, 500, "INTERNAL_SERVER_ERROR", "Internal server error");
};