import type { Response } from "express";
import * as messageService from "./message.service.js";

export const getConversationsHandler = async (req: any, res: Response) => {
  const list = await messageService.getConversationsForAdvisor(req.user.id);
  res.json(list);
};

export const getMessagesWithStudentHandler = async (req: any, res: Response) => {
  const studentUserId = Number(req.params.studentId);
  const messages = await messageService.getMessagesWithStudent(
    req.user.id,
    studentUserId
  );
  res.json(messages);
};

export const sendMessageToStudentHandler = async (req: any, res: Response) => {
  const studentUserId = Number(req.params.studentId);
  const { body } = req.body;
  const message = await messageService.sendMessageToStudent(
    req.user.id,
    studentUserId,
    body
  );
  res.status(201).json(message);
};
