import prisma from "../../config/prisma.js";

export const getAcademicProgress = async (studentId: number) => {
  // get student
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // get passed enrollments (not F)
  const enrollments = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { not: null },
      NOT: { grade: "F" },
    },
    include: { course: true },
  });

  // total completed credits
  const completedCredits = enrollments.reduce(
    (sum, e) => sum + e.course.credits,
    0
  );

  // grade distribution (A, B, C, D counts)
  const enrollmentsWithGrade = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { in: ["A", "B", "C", "D"] },
    },
    select: { grade: true },
  });

  const gradeDistribution = { A: 0, B: 0, C: 0, D: 0 };
  for (const e of enrollmentsWithGrade) {
    if (e.grade && e.grade in gradeDistribution) {
      gradeDistribution[e.grade as keyof typeof gradeDistribution]++;
    }
  }

  // 👇 عدل الرقم حسب نظام كليتك
  const TOTAL_REQUIRED_CREDITS = 132;

  const remainingCredits = TOTAL_REQUIRED_CREDITS - completedCredits;

  const progressPercentage = parseFloat(
    ((completedCredits / TOTAL_REQUIRED_CREDITS) * 100).toFixed(2)
  );

  return {
    student_id: student.student_id,
    level: student.level,
    cumulative_gpa: Number(student.cumulative_gpa),
    completedCredits,
    remainingCredits,
    progressPercentage,
    gradeDistribution,
  };
};