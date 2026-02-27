import type { Response } from "express";
import * as adminService from "./admin.service.js";

export const getOverviewHandler = async (req: any, res: Response) => {
  const overview = await adminService.getOverview();
  res.json(overview);
};

export const getSystemSettingsHandler = async (_req: any, res: Response) => {
  const settings = await adminService.getSystemSettings();
  res.json(settings);
};

export const patchSystemSettingsHandler = async (req: any, res: Response) => {
  const result = await adminService.patchSystemSettings(req.user.id, req.body ?? {});
  res.json(result);
};

