import type { Response } from "express";
import * as messageService from "../services/message.service.js";

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
  const body =
    (req.body?.body ??
      req.body?.message ??
      req.body?.content ??
      req.body?.text ??
      "") as string;
  const message = await messageService.sendMessageToStudent(
    req.user.id,
    studentUserId,
    body
  );
  res.status(201).json(message);
};

/** Student: get my messages with my advisor */
export const getMessagesWithAdvisorHandler = async (req: any, res: Response) => {
  const messages = await messageService.getMessagesWithAdvisor(req.user.id);
  res.json(messages);
};

/** Student: send message to my advisor */
export const sendMessageToAdvisorHandler = async (req: any, res: Response) => {
  const body =
    (req.body?.body ??
      req.body?.message ??
      req.body?.content ??
      req.body?.text ??
      "") as string;
  const message = await messageService.sendMessageToAdvisor(req.user.id, body);
  res.status(201).json(message);
};
