import { Router } from "express";
import * as controller from "./course.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createCourseSchema,
  updateCourseSchema,
  addPrerequisiteSchema
} from "./course.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createCourseSchema),
  asyncHandler(controller.createCourseHandler)
);
router.get("/", authenticate, controller.getCoursesHandler);
router.get("/:id", authenticate, controller.getCourseByIdHandler);
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateCourseSchema),
  asyncHandler(controller.updateCourseHandler)
);
router.delete("/:id", authenticate, authorize("ADMIN"), controller.deleteCourseHandler);
router.patch("/:id/toggle", authenticate, authorize("ADMIN"), controller.toggleAvailabilityHandler);
router.get("/:id/details", authenticate, controller.getCourseDetailsHandler);

router.post(
  "/add-prerequisite",
  authenticate,
  authorize("ADMIN"),
  validate(addPrerequisiteSchema),
  asyncHandler(controller.addPrerequisiteHandler)
);







export default router;
