import { z } from "zod";

export const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1, "Message is required").max(2000, "Message too long")
  })
});

export const suggestPlanSchema = z.object({
  body: z.object({
    semester_id: z.number().int().positive("Semester id must be a positive number"),
    preferences: z.object({
      max_hours: z.number().int().min(12).max(21).optional(),
      difficulty_level: z.enum(["EASY", "MODERATE", "HARD"]).optional(),
      priority_areas: z.array(z.string()).optional()
    }).optional()
  })
});

export const predictGpaSchema = z.object({
  body: z.object({
    semester_id: z.number().int().positive("Semester id must be a positive number"),
    planned_courses: z.array(
      z.object({
        course_id: z.number().int().positive(),
        expected_grade: z.string().regex(/^[ABCDF][+-]?$/, "Invalid grade")
      })
    ).min(1, "At least one course is required")
  })
});

export const riskAnalysisSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "Student id must be a positive number")
  })
});
