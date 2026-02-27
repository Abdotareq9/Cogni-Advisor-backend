import { z } from "zod";

export const enrollSchema = z.object({
  body: z.object({
    course_id: z.number()
  })
});

export const markPassedSchema = z.object({
  body: z.object({
    student_id: z.number(),
    course_id: z.number(),
    grade: z.enum(["A", "B", "C", "D", "F"])
  })
});