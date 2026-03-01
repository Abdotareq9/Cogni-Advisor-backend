import { z } from "zod";

export const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1, "الرسالة مطلوبة").max(2000, "الرسالة طويلة جداً")
  })
});

export const suggestPlanSchema = z.object({
  body: z.object({
    semester_id: z.number().int().positive("معرف الفصل يجب أن يكون رقم موجب"),
    preferences: z.object({
      max_hours: z.number().int().min(12).max(21).optional(),
      difficulty_level: z.enum(["EASY", "MODERATE", "HARD"]).optional(),
      priority_areas: z.array(z.string()).optional()
    }).optional()
  })
});

export const predictGpaSchema = z.object({
  body: z.object({
    semester_id: z.number().int().positive("معرف الفصل يجب أن يكون رقم موجب"),
    planned_courses: z.array(
      z.object({
        course_id: z.number().int().positive(),
        expected_grade: z.string().regex(/^[ABCDF][+-]?$/, "درجة غير صحيحة")
      })
    ).min(1, "يجب إدخال مادة واحدة على الأقل")
  })
});

export const riskAnalysisSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "معرف الطالب يجب أن يكون رقم موجب")
  })
});
