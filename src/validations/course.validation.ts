import { z } from "zod";

export const courseIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Course ID must be a positive integer"),
  }),
});

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
    course_code: z.string().min(1).max(20).optional(),
    course_name: z.string().min(2).max(150).optional(),
    credits: z.number().int().min(1).optional(),
    required_hours_to_take: z.number().int().min(0).nullable().optional(),
    is_available: z.boolean().optional()
  })
});

export const addPrerequisiteSchema = z.object({
  body: z.object({
    courseId: z.number(),
    prerequisiteId: z.number()
  })
});

export const removePrerequisiteSchema = z.object({
  body: z.object({
    courseId: z.number(),
    prerequisiteId: z.number()
  })
});
