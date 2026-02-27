import { Router } from "express";
import * as controller from "./department.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createDepartmentSchema } from "./department.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createDepartmentSchema),
  asyncHandler(controller.createDepartmentHandler)
);

router.get("/",authenticate,controller.getDepartmentsHandler);

router.delete("/:id",authenticate,authorize("ADMIN"),controller.deleteDepartmentHandler);

export default router;
