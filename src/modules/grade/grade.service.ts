import prisma from "../../config/prisma.js";

/* -------------------- */
/* Strong Grade Typing  */
/* -------------------- */

type GradeType = "A" | "B" | "C" | "D" | "F";

const gradeMap: Record<GradeType, number> = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  F: 0,
};

/* -------------------- */
/* Assign Grade Service */
/* -------------------- */

export const assignGrade = async (
  studentId: number,
  courseId: number,
  grade: string
) => {
  const upperGrade = grade.toUpperCase() as GradeType;

  // ✅ Validate Grade
  if (!(upperGrade in gradeMap)) {
    throw new Error("Invalid grade value");
  }

  // ✅ Check Enrollment Exists
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      student_id: studentId,
      course_id: courseId,
    },
  });

  if (!enrollment) {
    throw new Error("Student is not enrolled in this course");
  }

  // ✅ Update Grade
  await prisma.enrollment.update({
    where: { enrollment_id: enrollment.enrollment_id },
    data: { grade: upperGrade },
  });

  /* -------------------- */
  /* Recalculate GPA      */
  /* -------------------- */

  const enrollments = await prisma.enrollment.findMany({
    where: { student_id: studentId },
    include: { course: true },
  });

  let totalPoints = 0;
  let totalCredits = 0;

  enrollments.forEach((e) => {
    if (!e.grade) return;

    const points = gradeMap[e.grade as GradeType];

    if (points === undefined) return;

    totalPoints += points * e.course.credits;
    totalCredits += e.course.credits;
  });

  const gpa =
    totalCredits === 0
      ? 0
      : parseFloat((totalPoints / totalCredits).toFixed(2));

  // ✅ Update Student GPA
  await prisma.student.update({
    where: { student_id: studentId },
    data: { cumulative_gpa: gpa },
  });

  return {
    message: "Grade assigned & GPA updated successfully",
    gpa,
  };
};