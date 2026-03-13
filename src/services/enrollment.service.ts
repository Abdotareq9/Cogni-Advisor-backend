import prisma from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import { recalculateStudentGPA } from "../utils/gpaCalculator.js";


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
      throw new AppError(
        `Prerequisites not completed. Required: ${prereq.prereq_course_id}`,
        400
      );
    }
  }

  return true;
};

export const enrollStudent = async (
  studentId: number,
  courseId: number
) => {
  const course = await prisma.course.findUnique({
    where: { course_id: courseId },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  if (!course.is_available) {
    throw new AppError("Course not available for enrollment", 400);
  }

  await checkPrerequisites(studentId, courseId);

  // check already enrolled
  const existing = await prisma.enrollment.findFirst({
    where: {
      student_id: studentId,
      course_id: courseId,
    },
  });

  if (existing) {
    throw new AppError("Already enrolled in this course", 400);
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
  const course = await prisma.course.findUnique({
    where: { course_id: courseId }
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  const student = await prisma.student.findUnique({
    where: { student_id: studentId }
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  let enrollment = await prisma.enrollment.findFirst({
    where: {
      student_id: studentId,
      course_id: courseId
    },
    include: { course: true }
  });

  const wasAlreadyPassed = enrollment?.status === "PASSED";
  const gradeEarnsCredits = grade !== "F";
  const creditsToAdd =
    !wasAlreadyPassed && gradeEarnsCredits
      ? (enrollment?.course?.credits ?? course.credits)
      : 0;

  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        student_id: studentId,
        course_id: courseId,
        status: "PASSED",
        grade: grade
      },
      include: { course: true }
    });
  } else {
    await prisma.enrollment.update({
      where: { enrollment_id: enrollment.enrollment_id },
      data: {
        status: "PASSED",
        grade: grade
      }
    });
  }

  // Update earned hours when newly passed with grade A-D (F = no credits)
  if (creditsToAdd > 0) {
    await prisma.student.update({
      where: { student_id: studentId },
      data: {
        total_earned_hours: { increment: creditsToAdd }
      }
    });
  }

  await recalculateStudentGPA(studentId);

  return { message: "Course marked as PASSED" };
};

