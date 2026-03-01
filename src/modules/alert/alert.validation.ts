import { z } from "zod";

export const studentIdParamSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "معرف الطالب يجب أن يكون رقم موجب")
  })
});

export const alertIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "معرف التنبيه يجب أن يكون رقم موجب")
  })
});

export const resolveAlertSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "معرف التنبيه يجب أن يكون رقم موجب")
  }),
  body: z.object({
    resolution_note: z.string().max(500).optional()
  }).optional()
});
