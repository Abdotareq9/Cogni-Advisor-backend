import type { Response } from "express";
import * as authService from "./auth.service.js";

export const loginHandler = async (req: any, res: Response) => {
  const { identifier, password, role: requestedRole } = req.body;

  const result = await authService.login(
    identifier,
    password,
    requestedRole
  );

  res.json(result);
};

export const meHandler = async (req: any, res: Response) => {
  res.json({
    id: req.user.id,
    role: req.user.role
  });
};

export const changePasswordHandler = async (
  req: any,
  res: Response
) => {

  const { currentPassword, newPassword } = req.body;

  const result = await authService.changePassword(
    req.user.id,
    currentPassword,
    newPassword
  );

  res.json(result);
};