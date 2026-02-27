import type { Request, Response } from "express";
import * as feedbackService from "./feedback.service.js";

export const createFeedbackHandler = async (req: Request, res: Response) => {
  const advisorId = (req as any).user.id;
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
