import { z } from "zod";

export const getProgressSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "studentId must be a positive integer")
  })
});
