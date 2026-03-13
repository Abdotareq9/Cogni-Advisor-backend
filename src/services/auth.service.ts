import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

const LOGIN_ERROR_MESSAGE = "Invalid credentials or account not found";

export const login = async (
  identifier: string,
  password: string,
  requestedRole?: string
) => {
  const user = await prisma.user.findUnique({
    where: { national_id: identifier }
  });

  if (!user)
    throw new AppError(LOGIN_ERROR_MESSAGE, 401);

  const isMatch = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isMatch)
    throw new AppError(LOGIN_ERROR_MESSAGE, 401);

  if (requestedRole && requestedRole !== user.role)
    throw new AppError(LOGIN_ERROR_MESSAGE, 401);

  const secret = process.env.JWT_SECRET ?? "fallback-secret-change-in-production";
  const token = jwt.sign(
    {
      id: user.user_id,
      role: user.role
    },
    secret,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    }
  };
};

export const changePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {

  const user = await prisma.user.findUnique({
    where: { user_id: userId }
  });

  if (!user)
    throw new AppError("User not found", 404);

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password_hash
  );

  if (!isMatch)
    throw new AppError("Incorrect current password", 400);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { user_id: userId },
    data: {
      password_hash: hashedPassword
    }
  });

  return { message: "Password updated successfully" };
};