import type{ Request, Response } from "express";
import * as gradeService from "./grade.service.js";

export const assignGradeHandler = async (req: Request, res: Response) => {
  try {
    const { student_id, course_id, grade } = req.body;

    const result = await gradeService.assignGrade(
      student_id,
      course_id,
      grade
    );

    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};