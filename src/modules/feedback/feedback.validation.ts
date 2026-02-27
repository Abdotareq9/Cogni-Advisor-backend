import { z } from "zod";

export const createFeedbackSchema = z.object({
  body: z.object({
    student_id: z.coerce.number().int().positive(),
    message: z.string().optional()
  })
});

export const studentIdParamSchema = z.object({
  params: z.object({
    studentId: z.coerce.number().int().positive()
  })
});
