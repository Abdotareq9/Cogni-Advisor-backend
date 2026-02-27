import prisma from "../../config/prisma.js";
import { recalculateStudentGPA, gradePoints } from "../../utils/gpaCalculator.js";

/* -------------------- */
/* Strong Grade Typing  */
/* -------------------- */

type GradeType = "A" | "B" | "C" | "D" | "F";

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
  if (!(upperGrade in gradePoints)) {
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

  // ✅ Recalculate GPA using shared utility
  const gpa = await recalculateStudentGPA(studentId);

  return {
    message: "Grade assigned & GPA updated successfully",
    gpa,
  };
};