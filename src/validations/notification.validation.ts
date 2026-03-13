import { z } from "zod";

export const createNotificationSchema = z.object({
  body: z.object({
    recipient_id: z
      .coerce.number({ error: "recipient_id must be a number" })
      .refine((n) => !Number.isNaN(n) && Number.isInteger(n) && n >= 0, {
        message: "recipient_id must be a non-negative integer (0 = send to self)"
      }),
    title: z.string().max(150).optional(),
    body: z.string().optional()
  })
});

export const notificationIdParamSchema = z.object({
  params: z.object({
    id: z
      .coerce.number({ error: "Notification id must be a number" })
      .refine((n) => !Number.isNaN(n) && Number.isInteger(n) && n > 0, {
        message: "Notification id must be a positive integer"
      })
  })
});
