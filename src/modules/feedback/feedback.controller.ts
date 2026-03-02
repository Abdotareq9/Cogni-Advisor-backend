import type { Request, Response } from "express";
import * as feedbackService from "./feedback.service.js";

export const createFeedbackHandler = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const role = String(user?.role ?? "").toUpperCase();
  let advisorId: number;

  if (req.body.advisor_id) {
    advisorId = req.body.advisor_id;
    if (role !== "ADMIN" && role !== "ADVISOR") {
      return res.status(403).json({ message: "Forbidden: Only ADMIN or ADVISOR can create feedback" });
    }
    if (role === "ADVISOR" && advisorId !== user.id) {
      return res.status(403).json({ message: "Forbidden: ADVISOR can only use their own advisor_id" });
    }
  } else if (role === "ADVISOR") {
    advisorId = user.id;
  } else if (role === "ADMIN") {
    return res.status(400).json({ message: "advisor_id is required when creating feedback as ADMIN" });
  } else {
    return res.status(403).json({
      message: "Forbidden: Only ADVISOR or ADMIN can create feedback. Verify your token at GET /api/auth/me",
      yourRole: user?.role ?? "unknown"
    });
  }
  const record = await feedbackService.createFeedback({
    advisor_id: advisorId,
    student_id: req.body.student_id,
    message: req.body.message
  });
  res.status(201).json(record);
};

export const getByStudentIdHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);
  const list = await feedbackService.getByStudentId(studentId);
  res.json(list);
};

export const getMyFeedbackHandler = async (req: Request, res: Response) => {
  const advisorId = (req as any).user.id;
  const list = await feedbackService.getByAdvisorId(advisorId);
  res.json(list);
};
