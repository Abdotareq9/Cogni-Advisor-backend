import type { Request, Response } from "express";
import * as semesterRecordService from "../services/semesterRecord.service.js";

export const createSemesterRecordHandler = async (req: Request, res: Response) => {
  const record = await semesterRecordService.createSemesterRecord(req.body);
  res.status(201).json(record);
};

export const getByStudentIdHandler = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);
  const records = await semesterRecordService.getByStudentId(studentId);
  res.json(records);
};

export const getBySemesterIdHandler = async (req: Request, res: Response) => {
  const semesterId = Number(req.params.semesterId);
  const records = await semesterRecordService.getBySemesterId(semesterId);
  res.json(records);
};

export const updateSemesterRecordHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const record = await semesterRecordService.updateSemesterRecord(id, req.body);
  res.json(record);
};
