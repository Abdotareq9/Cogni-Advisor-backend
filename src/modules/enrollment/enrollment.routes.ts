import { Router } from "express";
import * as controller from "./enrollment.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { } from "./enrollment.validation.js";
import { enrollSchema , markPassedSchema } from "./enrollment.validation.js";
import { enrollHandler , markPassedHandler  } from "./enrollment.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(enrollSchema),
  asyncHandler(enrollHandler)
);

router.patch(
  "/mark-passed",
  authenticate,
  authorize("ADMIN"),
  validate(markPassedSchema),
  asyncHandler(markPassedHandler)
);


export default router;
