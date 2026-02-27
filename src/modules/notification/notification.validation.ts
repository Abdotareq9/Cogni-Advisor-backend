import { z } from "zod";

export const createNotificationSchema = z.object({
  body: z.object({
    recipient_id: z.coerce.number().int().positive(),
    title: z.string().max(150).optional(),
    body: z.string().optional()
  })
});

export const notificationIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});
