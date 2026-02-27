import type { Response } from "express";
import * as recommendationsService from "./recommendations.service.js";

interface AuthenticatedRequest {
  user: { id: number; role: string };
  query: { semesterId?: string };
}

export const getRecommendationsHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const studentId = req.user.id;
  const semesterId =
    req.query.semesterId != null ? Number(req.query.semesterId) : undefined;

  const result = await recommendationsService.getRecommendations(
    studentId,
    semesterId
  );
  res.json(result);
};
