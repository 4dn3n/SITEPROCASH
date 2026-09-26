import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import { logger } from "./lib/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { sessionId } from "./middleware/sessionId.js";
import { productsRouter } from "./routes/products.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    }),
  );
  app.use(pinoHttp({ logger }));
  app.use(sessionId);
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/products", productsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
