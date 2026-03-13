import { Router } from "express";
import { getProgressHandler } from "../controllers/progress.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getProgressSchema } from "../validations/progress.validation.js";

const router = Router();

router.get(
  "/:studentId",
  authenticate,
  validate(getProgressSchema),
  asyncHandler(getProgressHandler)
);

export default router;