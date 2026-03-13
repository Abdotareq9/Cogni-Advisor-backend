import { z } from "zod";

export const createSemesterSchema = z.object({
  body: z.object({
    semester_name: z.string().min(1).optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional()
  })
});

export const updateSemesterSchema = z.object({
  body: z.object({
    semester_name: z.string().min(1).optional(),
    start_date: z.coerce.date().optional().nullable(),
    end_date: z.coerce.date().optional().nullable()
  })
});

export const semesterIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});
