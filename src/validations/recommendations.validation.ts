import { z } from "zod";

export const getRecommendationsSchema = z.object({
  query: z.object({
    semesterId: z.string().regex(/^\d+$/).optional(),
  }),
});
