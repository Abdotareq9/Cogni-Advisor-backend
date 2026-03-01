import type { Request, Response } from "express";
import * as alertService from "./alert.service.js";

export const getAllAlertsHandler = async (req: Request, res: Response) => {
  const filters = {
    isResolved: req.query.isResolved === "true" ? true : req.query.isResolved === "false" ? false : undefined,
    severity: req.query.severity as any,
    alertType: req.query.alertType as any
  };

  const result = await alertService.getAllAlerts(filters);

  res.json(result);
};

export const getStudentAlertsHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await alertService.getStudentAlerts(studentId);

  res.json(result);
};

export const checkStudentHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const result = await alertService.checkAndCreateAlerts(studentId);

  res.status(201).json(result);
};

export const resolveAlertHandler = async (req: any, res: Response) => {
  const alertId = Number(req.params.id);

  const result = await alertService.resolveAlert(
    alertId,
    req.user.id,
    req.body?.resolution_note
  );

  res.json(result);
};

export const getAdvisorAlertsHandler = async (req: any, res: Response) => {
  const result = await alertService.getAdvisorAlerts(req.user.id);

  res.json(result);
};
