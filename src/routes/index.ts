import type { Request, Response } from "express";
import { Router } from "express";
import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/health", asyncHandler(async (_req: Request, res: Response) => {
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

export default router;
