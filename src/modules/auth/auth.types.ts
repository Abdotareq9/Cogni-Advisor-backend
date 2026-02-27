export enum UserRole {
  STUDENT = "STUDENT",
  ADVISOR = "ADVISOR",
  ADMIN = "ADMIN",
}

export interface LoginInput {
  identifier: string;
  password: string;
  role: UserRole;
}