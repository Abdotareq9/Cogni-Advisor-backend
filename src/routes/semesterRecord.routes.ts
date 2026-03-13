import { Router } from "express";
import * as controller from "../controllers/semesterRecord.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createSemesterRecordSchema,
  updateSemesterRecordWithIdSchema,
  studentIdParamSchema,
  semesterIdParamSchema
} from "../validations/semesterRecord.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createSemesterRecordSchema),
  asyncHandler(controller.createSemesterRecordHandler)
);

router.get(
  "/student/:studentId",
  authenticate,
  validate(studentIdParamSchema),
  asyncHandler(controller.getByStudentIdHandler)
);

router.get(
  "/semester/:semesterId",
  authenticate,
  validate(semesterIdParamSchema),
  asyncHandler(controller.getBySemesterIdHandler)
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateSemesterRecordWithIdSchema),
  asyncHandler(controller.updateSemesterRecordHandler)
);

export default router;
