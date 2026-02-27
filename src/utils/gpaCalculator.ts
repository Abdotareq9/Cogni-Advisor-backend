import prisma from "../config/prisma.js";

export const gradePoints: Record<string, number> = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  F: 0,
};

interface Enrollment {
  grade: string | null;
  course: {
    credits: number;
  };
}

export const calculateGPA = (enrollments: Enrollment[]): number => {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const e of enrollments) {
    if (!e.grade) continue;

    const points = gradePoints[e.grade as keyof typeof gradePoints];
    if (points === undefined) continue;

    totalPoints += points * e.course.credits;
    totalCredits += e.course.credits;
  }

  return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(2));
};

export const recalculateStudentGPA = async (studentId: number): Promise<number> => {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { not: null },
    },
    include: { course: true },
  });

  const gpa = calculateGPA(enrollments);

  await prisma.student.update({
    where: { student_id: studentId },
    data: { cumulative_gpa: gpa },
  });

  return gpa;
};
