import { Router } from "express";
import * as controller from "./alert.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  studentIdParamSchema,
  alertIdSchema,
  resolveAlertSchema
} from "./alert.validation.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "ADVISOR"),
  asyncHandler(controller.getAllAlertsHandler)
);

router.get(
  "/student/:studentId",
  authenticate,
  authorize("ADMIN", "ADVISOR"),
  validate(studentIdParamSchema),
  asyncHandler(controller.getStudentAlertsHandler)
);

router.post(
  "/check/:studentId",
  authenticate,
  authorize("ADMIN", "ADVISOR"),
  validate(studentIdParamSchema),
  asyncHandler(controller.checkStudentHandler)
);

router.patch(
  "/:id/resolve",
  authenticate,
  authorize("ADMIN", "ADVISOR"),
  validate(resolveAlertSchema),
  asyncHandler(controller.resolveAlertHandler)
);

router.get(
  "/advisor/alerts",
  authenticate,
  authorize("ADVISOR"),
  asyncHandler(controller.getAdvisorAlertsHandler)
);

export default router;
