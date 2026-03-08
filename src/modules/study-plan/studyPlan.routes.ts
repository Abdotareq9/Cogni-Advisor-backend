import { Router } from "express";

import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { addCourseHandler, createPlanHandler, generatePlanHandler, getCurrentPlanHandler, getPendingPlansHandler, reviewPlanHandler, submitPlanHandler } from "./studyPlan.controller.js";
import { addCourseSchema, createPlanSchema, getCurrentPlanSchema, reviewPlanSchema, submitPlanSchema } from "./studyPlan.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(createPlanSchema),
  asyncHandler(createPlanHandler)
);

router.get(
  "/me/current",
  authenticate,
  authorize("STUDENT"),
  validate(getCurrentPlanSchema),
  asyncHandler(getCurrentPlanHandler)
);

router.post(
  "/:id/add-course",
  authenticate,
  authorize("STUDENT"),
  validate(addCourseSchema),
  asyncHandler(addCourseHandler)
);

router.patch(
  "/:id/submit",
  authenticate,
  authorize("STUDENT"),
  validate(submitPlanSchema),
  asyncHandler(submitPlanHandler)
);

router.patch(
  "/:id/review",
  authenticate,
  authorize("ADVISOR"),
  validate(reviewPlanSchema),
  asyncHandler(reviewPlanHandler)
);
router.get("/advisor/pending", authenticate, authorize("ADVISOR"), asyncHandler(getPendingPlansHandler));

router.get(
  "/generate",
  authenticate,
  authorize("STUDENT"),
  asyncHandler(generatePlanHandler)
);
export default router;
