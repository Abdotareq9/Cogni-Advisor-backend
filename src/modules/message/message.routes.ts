import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getConversationsHandler,
  getMessagesWithStudentHandler,
  sendMessageToStudentHandler
} from "./message.controller.js";
import { studentIdParamSchema, sendMessageSchema } from "./message.validation.js";

const router = Router();

router.use(authenticate);
router.use(authorize("ADVISOR"));

router.get("/conversations", asyncHandler(getConversationsHandler));
router.get(
  "/conversations/:studentId/messages",
  validate(studentIdParamSchema),
  asyncHandler(getMessagesWithStudentHandler)
);
router.post(
  "/conversations/:studentId/messages",
  validate(sendMessageSchema),
  asyncHandler(sendMessageToStudentHandler)
);

export default router;
