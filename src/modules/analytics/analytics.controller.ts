import type { Request, Response } from "express";
import * as analyticsService from "./analytics.service.js";

export const getOverviewHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await analyticsService.getStudentOverview(studentId);

  res.json(result);
};

export const getGpaTrendHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await analyticsService.getGpaTrend(studentId);

  res.json(result);
};

export const getGradeDistributionHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await analyticsService.getGradeDistribution(studentId);

  res.json(result);
};

export const getHoursProgressHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await analyticsService.getHoursProgress(studentId);

  res.json(result);
};
