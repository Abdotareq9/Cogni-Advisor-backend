import { Router } from "express";
import * as controller from "../controllers/semester.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSemesterSchema, updateSemesterSchema, semesterIdParamSchema } from "../validations/semester.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createSemesterSchema),
  asyncHandler(controller.createSemesterHandler)
);

router.get("/", authenticate, asyncHandler(controller.getAllSemestersHandler));
router.get(
  "/:id",
  authenticate,
  validate(semesterIdParamSchema),
  asyncHandler(controller.getSemesterByIdHandler)
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(semesterIdParamSchema),
  validate(updateSemesterSchema),
  asyncHandler(controller.updateSemesterHandler)
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(semesterIdParamSchema),
  asyncHandler(controller.deleteSemesterHandler)
);

export default router;
