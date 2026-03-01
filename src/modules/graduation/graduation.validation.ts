import { z } from "zod";

export const studentIdParamSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "معرف الطالب يجب أن يكون رقماً"),
  }),
});

const REQUIREMENT_CATEGORIES = [
  "CORE_COURSES",
  "MAJOR_COURSES",
  "ELECTIVES",
  "GENERAL_EDUCATION",
  "CAPSTONE",
] as const;

export const createRequirementSchema = z.object({
  body: z.object({
    requirement_name: z.string().min(1, "اسم المتطلب مطلوب").max(100),
    required_hours: z.number().int().min(1, "الساعات المطلوبة يجب أن تكون موجباً"),
    category: z.enum(REQUIREMENT_CATEGORIES, {
      errorMap: () => ({ message: "فئة المتطلب غير صحيحة" }),
    }),
    description: z.string().max(500).optional(),
  }),
});
