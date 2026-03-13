import type { Request, Response } from "express";
import * as semesterService from "../services/semester.service.js";

export const createSemesterHandler = async (req: Request, res: Response) => {
  const semester = await semesterService.createSemester(req.body);
  res.status(201).json(semester);
};

export const getAllSemestersHandler = async (req: Request, res: Response) => {
  const semesters = await semesterService.getAllSemesters();
  res.json(semesters);
};

export const getSemesterByIdHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const semester = await semesterService.getSemesterById(id);
  res.json(semester);
};

export const updateSemesterHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const semester = await semesterService.updateSemester(id, req.body);
  res.json(semester);
};

export const deleteSemesterHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await semesterService.deleteSemester(id);
  res.json({ message: "Semester deleted" });
};
