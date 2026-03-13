import prisma from "../config/prisma.js";

export const createFeedback = async (data: {
  advisor_id: number;
  student_id: number;
  message?: string;
}) => {
  return prisma.feedback.create({
    data: {
      advisor_id: data.advisor_id,
      student_id: data.student_id,
      message: data.message ?? null
    }
  });
};

export const getByStudentId = async (studentId: number) => {
  return prisma.feedback.findMany({
    where: { student_id: studentId },
    include: { advisor: true },
    orderBy: { created_at: "desc" }
  });
};

export const getByAdvisorId = async (advisorId: number) => {
  return prisma.feedback.findMany({
    where: { advisor_id: advisorId },
    include: { student: true },
    orderBy: { created_at: "desc" }
  });
};
