import { z } from "zod";

export const createDepartmentSchema = z.object({
  body: z.object({
    dept_name: z.string().min(2),
    dept_code: z.string().max(10).optional()
  })
});
