import type { Request, Response } from "express";
import * as studyPlanService from "../services/studyPlan.service.js";
import { generateStudyPlan } from "../generators/studyPlan.generator.js";
import { AppError } from "../utils/AppError.js";

interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
    }
}

export const createPlanHandler = async (req: any, res: Response) => {
    const plan = await studyPlanService.createStudyPlan(
      req.user.id,
      req.body.semester_id
    );
    res.status(201).json(plan);
};

export const addCourseHandler = async (req: any, res: Response) => {
    const result = await studyPlanService.addCourseToPlan(
      Number(req.params.id),
      req.body.course_id,
      req.user.id
    );
    res.json(result);
};

export const submitPlanHandler = async (req: any, res: Response) => {
    const result = await studyPlanService.submitPlan(
      Number(req.params.id),
      req.user.id
    );
    res.json(result);
};

export const reviewPlanHandler = async (req: any, res: Response) => {
    const result = await studyPlanService.reviewPlan(
      Number(req.params.id),
      req.user.id,
      req.body.status,
      req.body.feedback
    );
    res.json(result);
};

export const getPendingPlansHandler = async (
  req: any,
  res: Response
) => {

    const plans = await studyPlanService.getPendingPlans();

    res.json(plans);
};

export const generatePlanHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const studentId = req.user.id;
        const result = await generateStudyPlan(studentId);

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

export const getCurrentPlanHandler = async (req: AuthenticatedRequest, res: Response) => {
    const studentId = req.user.id;
    const semesterId = req.query.semesterId != null ? Number(req.query.semesterId) : undefined;
    const plan = await studyPlanService.getCurrentStudyPlan(studentId, semesterId);
    if (!plan) {
        throw new AppError("No study plan found for the current semester", 404);
    }
    res.json(plan);
};
