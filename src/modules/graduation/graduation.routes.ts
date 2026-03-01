import { Router } from "express";
import * as controller from "./graduation.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createRequirementSchema, studentIdParamSchema } from "./graduation.validation.js";

const router = Router();

router.get(
  "/:studentId",
  authenticate,
  authorize("ADMIN", "ADVISOR", "STUDENT"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getOverviewHandler)
);

router.get(
  "/:studentId/requirements",
  authenticate,
  authorize("ADMIN", "ADVISOR", "STUDENT"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getRequirementsHandler)
);

router.get(
  "/:studentId/audit",
  authenticate,
  authorize("ADMIN", "ADVISOR", "STUDENT"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getAuditHandler)
);

router.post(
  "/requirements",
  authenticate,
  authorize("ADMIN"),
  validate(createRequirementSchema),
  asyncHandler(controller.createRequirementHandler)
);

export default router;
