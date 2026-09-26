import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../lib/logger.js";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: "Not found", path: req.path });
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Validation error", issues: err.issues });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  logger.error({ err, path: req.path }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
}
