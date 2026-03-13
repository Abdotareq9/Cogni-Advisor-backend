import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getOverviewHandler, getSystemSettingsHandler, patchSystemSettingsHandler } from "../controllers/admin.controller.js";
import { patchSystemSettingsSchema } from "../validations/admin.validation.js";

const router = Router();

router.use(authenticate);
router.use(authorize("ADMIN"));

router.get("/overview", asyncHandler(getOverviewHandler));

router.get("/system-settings", asyncHandler(getSystemSettingsHandler));
router.patch(
  "/system-settings",
  validate(patchSystemSettingsSchema),
  asyncHandler(patchSystemSettingsHandler)
);

export default router;

