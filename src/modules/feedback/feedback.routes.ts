import type { Request, Response } from "express";
import { Router } from "express";
import * as controller from "./feedback.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createFeedbackSchema, studentIdParamSchema } from "./feedback.validation.js";

const router = Router();

/** ADVISOR أو الطالب نفسه فقط لجدولة /student/:studentId */
const allowAdvisorOrStudentOwner = (req: Request, res: Response, next: () => void) => {
  const u = (req as any).user;
  if (u?.role === "ADVISOR") return next();
  if (u?.role === "STUDENT" && Number((req as any).params.studentId) === u?.id) return next();
  return res.status(403).json({ message: "Forbidden: Access denied" });
};

router.post(
  "/",
  authenticate,
  authorize("ADVISOR"),
  validate(createFeedbackSchema),
  asyncHandler(controller.createFeedbackHandler)
);

router.get(
  "/student/:studentId",
  authenticate,
  validate(studentIdParamSchema),
  allowAdvisorOrStudentOwner,
  asyncHandler(controller.getByStudentIdHandler)
);

router.get("/my", authenticate, authorize("ADVISOR"), asyncHandler(controller.getMyFeedbackHandler));

export default router;
