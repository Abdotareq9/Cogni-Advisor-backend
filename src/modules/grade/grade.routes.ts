import { Router } from "express";
import { assignGradeHandler } from "./grade.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { assignGradeSchema } from "./grade.validation.js";

const router = Router();

router.post(
  "/assign",
  authenticate,
  authorize("ADVISOR"),
  validate(assignGradeSchema),
  asyncHandler(assignGradeHandler)
);

export default router;