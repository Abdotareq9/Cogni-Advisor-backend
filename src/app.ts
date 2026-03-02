import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { createMorganStream } from "./config/logger.js";
import { requestId } from "./middlewares/requestId.middleware.js";
import { apiRoutes, rootRoutes } from "./routes/registry.js";
import { globalErrorHandler } from "./middlewares/errorHandler.middleware.js";
import prisma from "./config/prisma.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_API, RATE_LIMIT_MAX_AUTH } from "./constants/api.js";

const apiLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_API,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." }
});

const authLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_AUTH,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts, please try again later." }
});

const app = express();
app.use(requestId);
app.use(morgan("combined", { stream: createMorganStream() }));
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") ?? "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type", "X-Request-Id"]
}));
app.use("/api", apiLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth/login", authLimiter);
rootRoutes.forEach(({ path, router }) => app.use(path, router));
apiRoutes.forEach(({ path, router, middleware }) => {
  if (middleware?.length) app.use(path, ...middleware, router);
  else app.use(path, router);
});

app.get("/api/health", asyncHandler(async (_req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({
      status: "OK",
      database: "connected"
    });
  } catch {
    res.status(503).json({
      status: "ERROR",
      database: "disconnected"
    });
  }
}));

app.use(globalErrorHandler);

export default app;

