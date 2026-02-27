import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getRecommendationsHandler } from "./recommendations.controller.js";
import { getRecommendationsSchema } from "./recommendations.validation.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(getRecommendationsSchema),
  asyncHandler(getRecommendationsHandler)
);

export default router;
