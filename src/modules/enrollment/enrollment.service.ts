import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";


const checkPrerequisites = async (
  studentId: number,
  courseId: number
) => {
  // get course prerequisites
  const prerequisites = await prisma.coursePrerequisite.findMany({
    where: { course_id: courseId },
  });

  if (prerequisites.length === 0) return true;

  // get passed courses for student
  const passedCourses = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { not: null },
      NOT: { grade: "F" },
    },
  });

  const passedCourseIds = passedCourses.map((e) => e.course_id);

  // check if student passed all prerequisites
  for (const prereq of prerequisites) {
    if (!passedCourseIds.includes(prereq.prereq_course_id)) {
      throw new Error(
        `Prerequisite not satisfied. Missing course ID: ${prereq.prereq_course_id}`
      );
    }
  }

  return true;
};

export const enrollStudent = async (
  studentId: number,
  courseId: number
) => {
  // 🔥 prerequisite check
  await checkPrerequisites(studentId, courseId);

  // check already enrolled
  const existing = await prisma.enrollment.findFirst({
    where: {
      student_id: studentId,
      course_id: courseId,
    },
  });

  if (existing) {
    throw new Error("Student already enrolled in this course");
  }

  return await prisma.enrollment.create({
    data: {
      student_id: studentId,
      course_id: courseId,
    },
  });
};

export const markCoursePassed = async (
  studentId: number,
  courseId: number,
  grade: string
) => {

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      student_id: studentId,
      course_id: courseId
    },
    include: { course: true }
  });

  if (!enrollment)
    throw new AppError("Enrollment not found", 404);

  // Update enrollment
  await prisma.enrollment.update({
    where: { enrollment_id: enrollment.enrollment_id },
    data: {
      status: "PASSED",
      grade: grade
    }
  });

  // Update earned hours
  await prisma.student.update({
    where: { student_id: studentId },
    data: {
      total_earned_hours: {
        increment: enrollment.course.credits
      }
    }
  });

  // Recalculate GPA
  await recalculateGPA(studentId);

  return { message: "Course marked as PASSED" };
};

const gradePoints: any = {
  "A": 4,
  "B": 3,
  "C": 2,
  "D": 1,
  "F": 0
};

const recalculateGPA = async (studentId: number) => {

  const enrollments = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      status: "PASSED"
    },
    include: { course: true }
  });

  let totalPoints = 0;
  let totalCredits = 0;

  for (const e of enrollments) {
    const points = e.grade
  ? gradePoints[e.grade as keyof typeof gradePoints] || 0
  : 0;

    totalPoints += points * e.course.credits;
    totalCredits += e.course.credits;
  }

  const gpa =
    totalCredits === 0
      ? 0
      : parseFloat((totalPoints / totalCredits).toFixed(2));

  await prisma.student.update({
    where: { student_id: studentId },
    data: {
      cumulative_gpa: gpa
    }
  });
};


