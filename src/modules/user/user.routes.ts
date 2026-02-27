import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createUserHandler,
  getUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler
} from "./user.controller.js";

import {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema
} from "./user.validation.js";

const router = Router();


router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createUserSchema),
  asyncHandler(createUserHandler)
);


router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(getUsersHandler)
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(getUserHandler)
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateUserSchema),
  asyncHandler(updateUserHandler)
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(deleteUserSchema),
  asyncHandler(deleteUserHandler)
);

export default router;