import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

import {
  loginHandler,
  changePasswordHandler
} from "./auth.controller.js";

import {
  loginSchema,
  changePasswordSchema
} from "./auth.validation.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(loginHandler)
);

router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  asyncHandler(changePasswordHandler)
);

export default router;