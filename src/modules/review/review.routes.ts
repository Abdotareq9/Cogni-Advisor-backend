import { Router } from "express";
import * as controller from "./review.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createReviewSchema,
  courseIdParamSchema,
  reviewIdSchema
} from "./review.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(createReviewSchema),
  asyncHandler(controller.createReviewHandler)
);

router.get(
  "/course/:courseId",
  authenticate,
  validate(courseIdParamSchema),
  asyncHandler(controller.getCourseReviewsHandler)
);

router.get(
  "/my",
  authenticate,
  authorize("STUDENT"),
  asyncHandler(controller.getMyReviewsHandler)
);

router.delete(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  validate(reviewIdSchema),
  asyncHandler(controller.deleteReviewHandler)
);

export default router;
