import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? "test-secret";

export function signToken(payload: { id: number; role: string }, expiresIn: SignOptions["expiresIn"] = "1h"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);
}

export function getAdminToken(): string {
  return signToken({ id: 1, role: "ADMIN" });
}

export function getStudentToken(): string {
  return signToken({ id: 2, role: "STUDENT" });
}

export function getAdvisorToken(): string {
  return signToken({ id: 3, role: "ADVISOR" });
}
