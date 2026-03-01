import type { Request, Response } from "express";
import * as graduationService from "./graduation.service.js";

export const getOverviewHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await graduationService.getGraduationOverview(studentId);

  res.json(result);
};

export const getRequirementsHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await graduationService.getDetailedRequirements(studentId);

  res.json(result);
};

export const getAuditHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await graduationService.getDegreeAudit(studentId);

  res.json(result);
};

export const createRequirementHandler = async (req: Request, res: Response) => {
  const result = await graduationService.createGraduationRequirement(req.body);

  res.status(201).json(result);
};
