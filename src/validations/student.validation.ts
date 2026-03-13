import { z } from "zod";

export const studentIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Student ID must be a positive integer")
  })
});

export const updateStudentSchema = z.object({
  body: z.object({
    advisor_id: z.number().int().positive().nullable().optional(),
    major_type: z.string().max(50).nullable().optional(),
    level: z.number().int().min(1).optional(),
    cumulative_gpa: z.number().min(0).max(4).optional(),
    total_earned_hours: z.number().int().min(0).optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
  }),
});

export const updateMyProfileSchema = z.object({
  body: z.object({
    first_name: z.string().min(2).max(50).optional(),
    last_name: z.string().min(2).max(50).optional(),
    street_address: z.string().max(500).nullable().optional(),
    phones: z.array(z.string().max(20)).optional()
  })
});
