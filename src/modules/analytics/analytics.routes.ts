import { Router } from "express";
import * as controller from "./analytics.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { studentIdParamSchema } from "./analytics.validation.js";

const router = Router();

router.get(
  "/:studentId/overview",
  authenticate,
  authorize("ADMIN", "ADVISOR", "STUDENT"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getOverviewHandler)
);

router.get(
  "/:studentId/gpa-trend",
  authenticate,
  authorize("ADMIN", "ADVISOR", "STUDENT"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getGpaTrendHandler)
);

router.get(
  "/:studentId/grade-distribution",
  authenticate,
  authorize("ADMIN", "ADVISOR", "STUDENT"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getGradeDistributionHandler)
);

router.get(
  "/:studentId/hours-progress",
  authenticate,
  authorize("ADMIN", "ADVISOR", "STUDENT"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getHoursProgressHandler)
);

export default router;
