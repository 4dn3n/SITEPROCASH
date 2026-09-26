import type { NextFunction, Request, Response } from "express";
import { ApiError } from "./errorHandler.js";

declare global {
  namespace Express {
    interface Request {
      sessionId?: string;
    }
  }
}

/** Anonymous cart/chat identity: client generates a UUID and sends it as x-session-id. */
export function sessionId(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("x-session-id");
  req.sessionId = header && header.trim().length > 0 ? header : undefined;
  next();
}

export function requireSessionId(req: Request, _res: Response, next: NextFunction) {
  if (!req.sessionId) {
    next(new ApiError(400, "Missing x-session-id header"));
    return;
  }
  next();
}
