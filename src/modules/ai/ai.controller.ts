import type { Request, Response } from "express";
import * as aiService from "./ai.service.js";

export const chatHandler = async (req: any, res: Response) => {
  const result = await aiService.createChatInteraction(
    req.user.id,
    req.body.message
  );

  res.status(201).json(result);
};

export const suggestPlanHandler = async (req: any, res: Response) => {
  const result = await aiService.createPlanSuggestion(
    req.user.id,
    req.body.semester_id,
    req.body.preferences
  );

  res.status(201).json(result);
};

export const predictGpaHandler = async (req: any, res: Response) => {
  const result = await aiService.createGpaPrediction(
    req.user.id,
    req.body.semester_id,
    req.body.planned_courses
  );

  res.status(201).json(result);
};

export const getRiskAnalysisHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await aiService.getRiskAnalysis(studentId);

  res.json(result);
};

export const getHistoryHandler = async (req: any, res: Response) => {
  const result = await aiService.getStudentHistory(req.user.id);

  res.json(result);
};
