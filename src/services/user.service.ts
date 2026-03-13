import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import { UserRole } from "@prisma/client";

export const createUser = async (data: any) => {

  const existingUser = await prisma.user.findUnique({
    where: { national_id: data.national_id }
  });

  if (existingUser)
    throw new AppError("National ID already exists", 400);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      national_id: data.national_id,
      personal_email: data.personal_email,
      password_hash: hashedPassword,
      gender: data.gender,
      street_address: data.street_address,
      role: data.role as UserRole
    }
  });

  // 🔥 Auto Profile Creation Based On Role

  if (data.role === "STUDENT") {
    await prisma.student.create({
      data: {
        student_id: user.user_id
      }
    });
  }

  if (data.role === "ADVISOR") {
    await prisma.advisor.create({
      data: {
        advisor_id: user.user_id
      }
    });
  }

  if (data.role === "ADMIN") {
    await prisma.admin.create({
      data: {
        admin_id: user.user_id
      }
    });
  }

  return user;
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      user_id: true,
      first_name: true,
      last_name: true,
      national_id: true,
      personal_email: true,
      role: true
    }
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { user_id: id }
  });
};

export const updateUser = async (id: number, data: any) => {

  return prisma.user.update({
    where: { user_id: id },
    data
  });
};

export const deleteUser = async (id: number, currentUserId?: number) => {
  const user = await prisma.user.findUnique({
    where: { user_id: id },
    include: { student: true, advisor: true, admin: true }
  });

  if (!user)
    throw new AppError("User not found", 404);

  if (currentUserId !== undefined && currentUserId === id)
    throw new AppError("Cannot delete your own account", 400);

  await prisma.$transaction(async (tx) => {
    await tx.notification.deleteMany({ where: { recipient_id: id } });

    if (user.student) {
      const studentId = user.student.student_id;
      const planIds = await tx.studyPlan.findMany({ where: { student_id: studentId }, select: { plan_id: true } }).then((p) => p.map((x) => x.plan_id));
      if (planIds.length) await tx.planDetail.deleteMany({ where: { plan_id: { in: planIds } } });
      await tx.studyPlan.deleteMany({ where: { student_id: studentId } });
      await tx.enrollment.deleteMany({ where: { student_id: studentId } });
      await tx.feedback.deleteMany({ where: { student_id: studentId } });
      await tx.semesterRecord.deleteMany({ where: { student_id: studentId } });
      await tx.student.delete({ where: { student_id: studentId } });
    }

    if (user.advisor) {
      const advisorId = user.advisor.advisor_id;
      await tx.feedback.deleteMany({ where: { advisor_id: advisorId } });
      await tx.studyPlan.updateMany({ where: { advisor_id: advisorId }, data: { advisor_id: null } });
      await tx.advisor.delete({ where: { advisor_id: advisorId } });
    }

    if (user.admin)
      await tx.admin.delete({ where: { admin_id: user.admin.admin_id } });

    await tx.user.delete({ where: { user_id: id } });
  });
};