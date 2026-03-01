import type { Request, Response } from "express";
import * as reviewService from "./review.service.js";

export const createReviewHandler = async (req: any, res: Response) => {
  const result = await reviewService.createOrUpdateReview(req.user.id, req.body);

  res.status(result.message.includes("تحديث") ? 200 : 201).json(result);
};

export const getCourseReviewsHandler = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId);

  const result = await reviewService.getCourseReviews(courseId);

  res.json(result);
};

export const getMyReviewsHandler = async (req: any, res: Response) => {
  const result = await reviewService.getMyReviews(req.user.id);

  res.json(result);
};

export const deleteReviewHandler = async (req: any, res: Response) => {
  const reviewId = Number(req.params.id);

  const result = await reviewService.deleteReview(reviewId, req.user.id);

  res.json(result);
};

export const getCourseStatsHandler = async (req: Request, res: Response) => {
  const courseId = Number(req.params.id);

  const result = await reviewService.getCourseStats(courseId);

  res.json(result);
};
