import type { Request, Response } from "express";
import * as notificationService from "./notification.service.js";

export const getMyNotificationsHandler = async (req: Request, res: Response) => {
  const recipientId = (req as any).user.id;
  const list = await notificationService.getByRecipientId(recipientId);
  res.json(list);
};

export const markAsReadHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const recipientId = (req as any).user.id;
  const notification = await notificationService.markAsRead(id, recipientId);
  res.json(notification);
};

export const markAllAsReadHandler = async (req: Request, res: Response) => {
  const recipientId = (req as any).user.id;
  const result = await notificationService.markAllAsRead(recipientId);
  res.json(result);
};

export const createNotificationHandler = async (req: Request, res: Response) => {
  const notification = await notificationService.createNotification(req.body);
  res.status(201).json(notification);
};
