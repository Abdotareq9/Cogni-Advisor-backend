import { z } from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    course_code: z.string().min(1).max(20),
    course_name: z.string().min(2),
    credits: z.number().min(1),
    required_hours_to_take: z.number().min(0).optional(),
    is_available: z.boolean().optional()
  })
});

export const updateCourseSchema = z.object({
  body: z.object({
    course_name: z.string().min(2).optional(),
    credits: z.number().min(1).optional(),
    required_hours_to_take: z.number().min(0).optional().nullable(),
    is_available: z.boolean().optional()
  })
});

export const addPrerequisiteSchema = z.object({
  body: z.object({
    courseId: z.number(),
    prerequisiteId: z.number()
  })
});
