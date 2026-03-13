import prisma from "../config/prisma.js";

const MAX_CREDITS = 18;

export const generateStudyPlan = async (studentId: number) => {
  // 1. Get courses the student passed
  const completed = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { not: null },
      NOT: { grade: "F" },
    },
    select: { course_id: true },
  });

  const completedIds = completed.map((c: { course_id: number }) => c.course_id);

  // 2. Get all courses
  const allCourses = await prisma.course.findMany({
    include: { prerequisites: true },
  });

  let totalCredits = 0;
  const suggestedCourses: any[] = [];

  for (const course of allCourses) {
    // skip if student already completed
    if (completedIds.includes(course.course_id)) continue;

    // Check prerequisites
    const prereqIds = course.prerequisites.map((p: any) => p.prereq_course_id);

    const hasAllPrereq = prereqIds.every((id: number) =>
      completedIds.includes(id)
    );

    if (!hasAllPrereq) continue;

    // Check max credits
    if (totalCredits + course.credits > MAX_CREDITS) continue;

    suggestedCourses.push(course);
    totalCredits += course.credits;
  }

  return {
    totalCredits,
    courses: suggestedCourses,
  };
};
