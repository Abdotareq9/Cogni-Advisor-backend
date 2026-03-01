import { z } from "zod";

export const studentIdParamSchema = z.object({
  params: z.object({
    studentId: z.string().regex(/^\d+$/, "معرف الطالب يجب أن يكون رقماً"),
  }),
});
