import prisma from "../../config/prisma.js";

const MAX_CREDITS = 18;

export const generateStudyPlan = async (studentId: number) => {
  // 1️⃣ جيب المواد اللي الطالب نجح فيها
  const completed = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { not: null },
      NOT: { grade: "F" },
    },
    select: { course_id: true },
  });

  const completedIds = completed.map((c) => c.course_id);

  // 2️⃣ جيب كل الكورسات
  const allCourses = await prisma.course.findMany({
    include: { prerequisites: true },
  });

  let totalCredits = 0;
  const suggestedCourses: any[] = [];

  for (const course of allCourses) {
    // skip لو الطالب خلصها
    if (completedIds.includes(course.course_id)) continue;

    // تحقق من prerequisites
    const prereqIds = course.prerequisites.map((p: any) => p.prereq_course_id);

    const hasAllPrereq = prereqIds.every((id: number) =>
      completedIds.includes(id)
    );

    if (!hasAllPrereq) continue;

    // تحقق من max credits
    if (totalCredits + course.credits > MAX_CREDITS) continue;

    suggestedCourses.push(course);
    totalCredits += course.credits;
  }

  return {
    totalCredits,
    courses: suggestedCourses,
  };
};