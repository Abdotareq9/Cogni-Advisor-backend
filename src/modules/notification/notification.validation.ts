import { z } from "zod";

export const createNotificationSchema = z.object({
  body: z.object({
    recipient_id: z
      .coerce.number({ error: "recipient_id يجب أن يكون رقماً" })
      .refine((n) => !Number.isNaN(n) && Number.isInteger(n) && n >= 0, {
        message: "recipient_id يجب أن يكون رقماً صحيحاً غير سالب (0 = إرسال لنفسك)"
      }),
    title: z.string().max(150).optional(),
    body: z.string().optional()
  })
});

export const notificationIdParamSchema = z.object({
  params: z.object({
    id: z
      .coerce.number({ error: "معرف الإشعار يجب أن يكون رقماً" })
      .refine((n) => !Number.isNaN(n) && Number.isInteger(n) && n > 0, {
        message: "معرف الإشعار يجب أن يكون رقماً صحيحاً موجباً"
      })
  })
});
