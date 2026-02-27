import prisma from "../../config/prisma.js";

const DEFAULT_REASON = "Based on your completed prerequisites and academic progress.";

export const getRecommendations = async (
  studentId: number,
  semesterId?: number
) => {
  const completed = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { not: null },
      NOT: { grade: "F" },
    },
    select: { course_id: true },
  });

  const completedIds = completed.map((c) => c.course_id);

  let excludeCourseIds: number[] = [];
  if (semesterId != null) {
    const plan = await prisma.studyPlan.findUnique({
      where: {
        student_id_semester_id: { student_id: studentId, semester_id: semesterId },
      },
      include: { details: { select: { course_id: true } } },
    });
    if (plan) {
      excludeCourseIds = plan.details.map((d) => d.course_id);
    }
  }

  const allCourses = await prisma.course.findMany({
    where: { is_available: true },
    include: { prerequisites: true },
  });

  const recommendations: Array<{
    course_id: number;
    course_code: string;
    course_name: string;
    credits: number;
    reason: string;
  }> = [];

  for (const course of allCourses) {
    if (completedIds.includes(course.course_id)) continue;
    if (excludeCourseIds.includes(course.course_id)) continue;

    const prereqIds = course.prerequisites.map((p) => p.prereq_course_id);
    const hasAllPrereq =
      prereqIds.length === 0 ||
      prereqIds.every((id) => completedIds.includes(id));

    if (!hasAllPrereq) continue;

    recommendations.push({
      course_id: course.course_id,
      course_code: course.course_code,
      course_name: course.course_name,
      credits: course.credits,
      reason: DEFAULT_REASON,
    });
  }

  return { recommendations };
};
