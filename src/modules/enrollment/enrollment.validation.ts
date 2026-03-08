import { z } from "zod";

export const enrollSchema = z.object({
  body: z.object({
    course_id: z.coerce.number().int().positive("course_id must be a positive number")
  })
});

export const markPassedSchema = z.object({
  body: z.object({
    student_id: z.coerce.number().int().positive("student_id must be a positive number"),
    course_id: z.coerce.number().int().positive("course_id must be a positive number"),
    grade: z.enum(["A", "B", "C", "D", "F"])
  })
});