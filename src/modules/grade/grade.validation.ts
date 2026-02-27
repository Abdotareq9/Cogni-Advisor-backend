import { z } from "zod";

export const assignGradeSchema = z.object({
  body: z.object({
    student_id: z.number(),
    course_id: z.number(),
    grade: z.enum(["A", "B", "C", "D", "F"])
  })
});
