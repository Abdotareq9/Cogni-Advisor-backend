import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { logger } from "../config/logger.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`${err.message ?? "Unknown error"} - ${req.method} ${req.path}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Prisma foreign key violation (P2003)
  if (err.code === "P2003") {
    return res.status(400).json({
      success: false,
      message: "Reference not found (student, course, or semester)"
    });
  }

  // Prisma unique constraint (P2002)
  if (err.code === "P2002") {
    const target = (err.meta?.target as string[])?.join(", ");
    const field = target || "field";
    return res.status(409).json({
      success: false,
      message: `Value already exists for field: ${field}`
    });
  }

  // Other Prisma errors
  if (err.code) {
    return res.status(400).json({
      success: false,
      message: "Database error"
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
};