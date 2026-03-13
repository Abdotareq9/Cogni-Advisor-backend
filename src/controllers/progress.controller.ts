import type{ Request, Response } from "express";
import * as progressService from "../services/progress.service.js";

export const getProgressHandler = async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.studentId);

    const result = await progressService.getAcademicProgress(studentId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};