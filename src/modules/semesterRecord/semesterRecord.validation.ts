import { z } from "zod";

export const createSemesterRecordSchema = z.object({
  body: z.object({
    student_id: z.coerce.number().int().positive(),
    semester_id: z.coerce.number().int().positive(),
    semester_gpa: z.number().min(0).max(4).optional(),
    registered_hours: z.coerce.number().int().min(0).optional()
  })
});

export const updateSemesterRecordSchema = z.object({
  body: z.object({
    semester_gpa: z.number().min(0).max(4).optional().nullable(),
    registered_hours: z.coerce.number().int().min(0).optional().nullable()
  })
});

export const studentIdParamSchema = z.object({
  params: z.object({
    studentId: z.coerce.number().int().positive()
  })
});

export const semesterIdParamSchema = z.object({
  params: z.object({
    semesterId: z.coerce.number().int().positive()
  })
});

export const recordIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

export const updateSemesterRecordWithIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  }),
  body: z.object({
    semester_gpa: z.number().min(0).max(4).optional().nullable(),
    registered_hours: z.coerce.number().int().min(0).optional().nullable()
  })
});
