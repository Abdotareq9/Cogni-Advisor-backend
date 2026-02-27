import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      const formattedErrors = result.error.issues.map(issue => ({
        field: issue.path.join("."),
        message: issue.message
      }));

      return res.status(400).json({
        success: false,
        errors: formattedErrors
      });
    }

    next();
  };