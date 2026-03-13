import prisma from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";


export const getStudentById = async (id: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: id },
    include: {
      user: true
    }
  });

  if (!student)
    throw new AppError("Student not found", 404);

  return student;
};

const UPDATE_STUDENT_FIELDS = [
  "advisor_id",
  "major_type",
  "level",
  "cumulative_gpa",
  "total_earned_hours",
  "status"
] as const;

export const updateStudent = async (
  id: number,
  data: {
    advisor_id?: number | null;
    major_type?: string | null;
    level?: number;
    cumulative_gpa?: number;
    total_earned_hours?: number;
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  }
) => {
  const student = await prisma.student.findUnique({
    where: { student_id: id }
  });

  if (!student)
    throw new AppError("Student not found", 404);

  if (data.advisor_id != null) {
    const advisor = await prisma.advisor.findUnique({
      where: { advisor_id: data.advisor_id }
    });
    if (!advisor)
      throw new AppError("Advisor not found", 404);
  }

  const safeData: Record<string, unknown> = {};
  for (const key of UPDATE_STUDENT_FIELDS) {
    if (data[key] !== undefined) {
      if (key === "cumulative_gpa" && typeof data[key] === "number") {
        safeData[key] = data[key];
      } else {
        safeData[key] = data[key];
      }
    }
  }

  return prisma.student.update({
    where: { student_id: id },
    data: safeData
  });
};

export const deactivateStudent = async (id: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: id }
  });

  if (!student)
    throw new AppError("Student not found", 404);

  return prisma.student.update({
    where: { student_id: id },
    data: {
      status: "INACTIVE"
    }
  });
};

export const activateStudent = async (id: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: id }
  });

  if (!student)
    throw new AppError("Student not found", 404);

  return prisma.student.update({
    where: { student_id: id },
    data: {
      status: "ACTIVE"
    }
  });
};


export const getAcademicSummary = async (studentId: number) => {

  const student = await prisma.student.findUnique({
    where: { student_id: studentId }
  });

  if (!student)
    throw new AppError("Student not found", 404);

  const passedCourses = await prisma.enrollment.count({
    where: {
      student_id: studentId,
      status: "PASSED"
    }
  });

  const currentEnrollments = await prisma.enrollment.count({
    where: {
      student_id: studentId,
      status: "ENROLLED"
    }
  });

  const TOTAL_PROGRAM_HOURS = 144;

  return {
    student_id: student.student_id,
    cumulative_gpa: Number(student.cumulative_gpa),
    earned_hours: student.total_earned_hours,
    remaining_hours:
      TOTAL_PROGRAM_HOURS - student.total_earned_hours,
    current_level: student.level,
    passed_courses: passedCourses,
    current_enrollments: currentEnrollments
  };
};

export const getMyProfile = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      user: {
        include: {
          phones: true
        }
      }
    }
  });

  if (!student)
    throw new AppError("Student not found", 404);

  const { user, ...studentData } = student;
  const { password_hash: _, ...userSafe } = user;
  return {
    ...studentData,
    cumulative_gpa: Number(student.cumulative_gpa),
    user: {
      ...userSafe,
      phones: user.phones.map((p) => p.phone_number)
    }
  };
};

export const updateMyProfile = async (
  studentId: number,
  data: {
    first_name?: string;
    last_name?: string;
    street_address?: string | null;
    phones?: string[];
  }
) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: { user: true }
  });

  if (!student)
    throw new AppError("Student not found", 404);

  const userId = student.student_id;

  const { phones, ...userFields } = data;
  const updatePayload: Record<string, unknown> = {};
  if (userFields.first_name !== undefined) updatePayload.first_name = userFields.first_name;
  if (userFields.last_name !== undefined) updatePayload.last_name = userFields.last_name;
  if (userFields.street_address !== undefined) updatePayload.street_address = userFields.street_address;

  if (Object.keys(updatePayload).length > 0) {
    await prisma.user.update({
      where: { user_id: userId },
      data: updatePayload
    });
  }

  if (phones !== undefined) {
    await prisma.userPhone.deleteMany({
      where: { user_id: userId }
    });
    if (phones.length > 0) {
      await prisma.userPhone.createMany({
        data: phones.map((phone_number) => ({ user_id: userId, phone_number }))
      });
    }
  }

  return getMyProfile(studentId);
};