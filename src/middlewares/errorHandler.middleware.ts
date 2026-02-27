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

  // Prisma errors
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