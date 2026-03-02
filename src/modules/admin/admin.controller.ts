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
  let patch: Record<string, unknown> = req.body ?? {};
  if (patch.key && patch.value && typeof patch.key === "string" && typeof patch.value === "object") {
    const k = patch.key as string;
    if (["general", "aiEngine", "permissions", "security"].includes(k)) {
      patch = { [k]: patch.value };
    }
  }
  const result = await adminService.patchSystemSettings(req.user.id, patch as any);
  res.json(result);
};

