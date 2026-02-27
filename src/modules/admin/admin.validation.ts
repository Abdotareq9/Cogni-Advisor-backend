import { z } from "zod";

const generalSchema = z.object({
  systemName: z.string().min(1).optional(),
  academicYear: z.string().min(1).optional(),
  defaultCreditLimit: z.number().int().min(1).max(60).optional(),
  semesterDurationWeeks: z.number().int().min(1).max(52).optional()
});

const aiEngineSchema = z.object({
  recommendationSensitivity: z.number().min(0).max(1).optional(),
  riskDetectionLevel: z.enum(["Low", "Medium", "High"]).optional(),
  gpaWarningThreshold: z.number().min(0).max(4).optional(),
  aiModelStatus: z.enum(["active", "inactive"]).optional()
});

const permissionFlagsSchema = z.object({
  viewPlans: z.boolean().optional(),
  editPlans: z.boolean().optional(),
  approvePlans: z.boolean().optional(),
  sendAlerts: z.boolean().optional(),
  manageCourses: z.boolean().optional(),
  systemAccess: z.boolean().optional()
});

const permissionsSchema = z.object({
  STUDENT: permissionFlagsSchema.optional(),
  ADVISOR: permissionFlagsSchema.optional(),
  ADMIN: permissionFlagsSchema.optional()
});

const securitySchema = z.object({
  enableTwoFactorAuthGlobally: z.boolean().optional(),
  suspiciousActivityDetection: z.boolean().optional(),
  passwordPolicyMinLength: z.number().int().min(6).max(64).optional(),
  sessionTimeoutMinutes: z.number().int().min(1).max(1440).optional()
});

export const patchSystemSettingsSchema = z.object({
  body: z
    .object({
      general: generalSchema.optional(),
      aiEngine: aiEngineSchema.optional(),
      permissions: permissionsSchema.optional(),
      security: securitySchema.optional()
    })
    .strict()
});


