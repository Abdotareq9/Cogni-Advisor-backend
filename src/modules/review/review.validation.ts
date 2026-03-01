import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    course_id: z.number().int().positive("معرف المادة يجب أن يكون رقم موجب"),
    rating: z.number().int().min(1, "التقييم يجب أن يكون بين 1 و 5").max(5, "التقييم يجب أن يكون بين 1 و 5"),
    difficulty: z.number().int().min(1, "الصعوبة يجب أن تكون بين 1 و 5").max(5, "الصعوبة يجب أن تكون بين 1 و 5"),
    workload: z.number().int().min(1, "حجم العمل يجب أن يكون بين 1 و 5").max(5, "حجم العمل يجب أن يكون بين 1 و 5"),
    would_recommend: z.boolean(),
    comment: z.string().max(1000, "التعليق طويل جداً").optional(),
    is_anonymous: z.boolean().optional()
  })
});

export const courseIdParamSchema = z.object({
  params: z.object({
    courseId: z.string().regex(/^\d+$/, "معرف المادة يجب أن يكون رقم موجب")
  })
});

export const reviewIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "معرف التقييم يجب أن يكون رقم موجب")
  })
});
