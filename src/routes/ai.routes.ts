import { Router } from "express";
import * as controller from "../controllers/ai.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  chatSchema,
  suggestPlanSchema,
  predictGpaSchema,
  riskAnalysisSchema
} from "../validations/ai.validation.js";

const router = Router();

router.post(
  "/chat",
  authenticate,
  authorize("STUDENT"),
  validate(chatSchema),
  asyncHandler(controller.chatHandler)
);

router.post(
  "/suggest-plan",
  authenticate,
  authorize("STUDENT"),
  validate(suggestPlanSchema),
  asyncHandler(controller.suggestPlanHandler)
);

router.post(
  "/predict-gpa",
  authenticate,
  authorize("STUDENT"),
  validate(predictGpaSchema),
  asyncHandler(controller.predictGpaHandler)
);

router.get(
  "/risk-analysis/:studentId",
  authenticate,
  authorize("ADMIN", "ADVISOR"),
  validate(riskAnalysisSchema),
  asyncHandler(controller.getRiskAnalysisHandler)
);

router.get(
  "/history",
  authenticate,
  authorize("STUDENT"),
  asyncHandler(controller.getHistoryHandler)
);

export default router;
