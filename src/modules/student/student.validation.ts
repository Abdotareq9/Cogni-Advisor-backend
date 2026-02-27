import { z } from "zod";

export const studentIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Student ID must be a positive integer")
  })
});

export const updateMyProfileSchema = z.object({
  body: z.object({
    first_name: z.string().min(2).max(50).optional(),
    last_name: z.string().min(2).max(50).optional(),
    street_address: z.string().max(500).nullable().optional(),
    city_id: z.number().int().positive().nullable().optional(),
    phones: z.array(z.string().max(20)).optional()
  })
});
