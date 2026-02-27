import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(14, "Invalid national ID"),
    password: z.string().min(6)
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6)
  })
});