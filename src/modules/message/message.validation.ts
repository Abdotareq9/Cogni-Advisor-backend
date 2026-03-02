import { z } from "zod";

export const studentIdParamSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "studentId must be a positive integer")
  })
});

export const sendMessageSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "studentId must be a positive integer")
  }),
  body: z
    .object({
      body: z.string().min(1).max(10000).optional(),
      message: z.string().min(1).max(10000).optional(),
      content: z.string().min(1).max(10000).optional(),
      text: z.string().min(1).max(10000).optional()
    })
    .refine(
      (obj) => {
        const val = obj.body ?? obj.message ?? obj.content ?? obj.text;
        return typeof val === "string" && val.trim().length > 0;
      },
      {
        message:
          "يجب إرسال نص الرسالة في أحد الحقول: body, message, content, text"
      }
    )
});

/** Schema for student sending message (body only, no params) */
export const sendMessageBodySchema = z.object({
  body: z
    .object({
      body: z.string().min(1).max(10000).optional(),
      message: z.string().min(1).max(10000).optional(),
      content: z.string().min(1).max(10000).optional(),
      text: z.string().min(1).max(10000).optional()
    })
    .refine(
      (obj) => {
        const val = obj.body ?? obj.message ?? obj.content ?? obj.text;
        return typeof val === "string" && val.trim().length > 0;
      },
      {
        message:
          "يجب إرسال نص الرسالة في أحد الحقول: body, message, content, text"
      }
    )
});
