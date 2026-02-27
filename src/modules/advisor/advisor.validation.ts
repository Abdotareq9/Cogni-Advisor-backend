import { z } from "zod";

export const updateAdvisorProfileSchema = z.object({
  body: z.object({
    first_name: z.string().min(1).max(50).optional(),
    last_name: z.string().min(1).max(50).optional(),
    office_hours: z.string().max(200).nullable().optional(),
    bio: z.string().max(5000).nullable().optional()
  })
});

export const getMyStudentsSchema = z.object({
  query: z.object({
    search: z.string().max(100).optional(),
    level: z.string().regex(/^\d+$/).optional()
  })
});

export const studentIdParamSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "studentId must be a positive integer")
  })
});
