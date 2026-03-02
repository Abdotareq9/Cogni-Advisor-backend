import { z } from "zod";

export const enrollSchema = z.object({
  body: z.object({
    course_id: z.coerce.number().int().positive("course_id يجب أن يكون رقماً موجباً")
  })
});

export const markPassedSchema = z.object({
  body: z.object({
    student_id: z.coerce.number().int().positive("student_id يجب أن يكون رقماً موجباً"),
    course_id: z.coerce.number().int().positive("course_id يجب أن يكون رقماً موجباً"),
    grade: z.enum(["A", "B", "C", "D", "F"])
  })
});