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
  body: z.object({
    body: z.string().min(1).max(10000)
  })
});
