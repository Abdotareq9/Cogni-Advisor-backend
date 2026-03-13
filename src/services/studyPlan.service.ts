import  prisma  from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";

export const createStudyPlan = async (studentId: number, semesterId: number) => {

  // TODO: Check here
  const existingPlan = await prisma.studyPlan.findUnique({
    where: {
      student_id_semester_id: {
        student_id: studentId,
        semester_id: semesterId
      }
    }
  });

  if (existingPlan) {
    throw new AppError("You already created a plan for this semester", 400);
  }

  const plan = await prisma.studyPlan.create({
    data: {
      student_id: studentId,
      semester_id: semesterId
    }
  });

  return plan;
};


export const addCourseToPlan = async (
  planId: number,
  courseId: number,
  studentId: number
) => {

  const plan = await prisma.studyPlan.findUnique({
    where: { plan_id: planId },
    include: { details: true }
  });

  if (!plan) throw new AppError("Plan not found", 404);

  if (plan.student_id !== studentId)
    throw new AppError("Not allowed", 403);

  if (plan.plan_status !== "PENDING")
    throw new AppError("Plan is locked", 400);

  await prisma.planDetail.create({
    data: {
      plan_id: planId,
      course_id: courseId
    }
  });

  return { message: "Course added successfully" };
};

export const submitPlan = async (planId: number, studentId: number) => {

  const plan = await prisma.studyPlan.findUnique({
    where: { plan_id: planId }
  });

  if (!plan) throw new AppError("Plan not found", 404);

  if (plan.student_id !== studentId)
    throw new AppError("Not allowed", 403);

  if (plan.plan_status !== "PENDING")
    throw new AppError("Plan already submitted", 400);

  // PENDING = awaiting advisor review; no status change needed on submit
  return plan;
};


export const reviewPlan = async (
  planId: number,
  advisorId: number,
  status: "APPROVED" | "REJECTED",
  feedback?: string 
) => {

  const plan = await prisma.studyPlan.findUnique({
    where: { plan_id: planId }
  });

  if (!plan) throw new AppError("Plan not found", 404);

  if (plan.plan_status !== "PENDING")
    throw new AppError("Plan already reviewed", 400);

  return await prisma.studyPlan.update({
    where: { plan_id: planId },
    data: {
      plan_status: status,
      advisor_id: advisorId,
      feedback: feedback ?? null 
    }
  });
};


export const getPendingPlans = async () => {

  return await prisma.studyPlan.findMany({
    where: {
      plan_status: "PENDING"
    },
    include: {
      student: {
        select: {
          student_id: true,
          cumulative_gpa: true,
          total_earned_hours: true,
          level: true
        }
      },
      details: {
        include: {
          course: true
        }
      }
    }
  });

};

export type CurrentStudyPlanCourse = {
  code: string;
  name: string;
  instructor: string | null;
  credits: number;
  grade: string | null;
  status: "Completed" | "In Progress" | "Planned";
};

export type CurrentStudyPlanResponse = {
  semesterLabel: string;
  planStatus: string;
  totalCourses: number;
  totalCredits: number;
  courses: CurrentStudyPlanCourse[];
};

export const getCurrentStudyPlan = async (
  studentId: number,
  semesterId?: number
): Promise<CurrentStudyPlanResponse | null> => {
  let targetSemesterId = semesterId;
  if (targetSemesterId == null) {
    const latestSemester = await prisma.semester.findFirst({
      orderBy: { semester_id: "desc" }
    });
    if (!latestSemester) return null;
    targetSemesterId = latestSemester.semester_id;
  }

  const plan = await prisma.studyPlan.findUnique({
    where: {
      student_id_semester_id: {
        student_id: studentId,
        semester_id: targetSemesterId
      }
    },
    include: {
      semester: true,
      details: {
        include: {
          course: true
        }
      }
    }
  });

  if (!plan) return null;

  const enrollmentsForSemester = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      semester_id: targetSemesterId
    },
    select: { course_id: true, grade: true, status: true }
  });
  const enrollmentByCourse = new Map(
    enrollmentsForSemester.map((e) => [e.course_id, e])
  );

  const courses: CurrentStudyPlanCourse[] = plan.details.map((d) => {
    const course = d.course;
    const enrollment = enrollmentByCourse.get(course.course_id);
    const grade = enrollment?.grade ?? null;
    const status: "Completed" | "In Progress" | "Planned" =
      enrollment?.grade != null && enrollment.grade !== "F"
        ? "Completed"
        : enrollment
          ? "In Progress"
          : "Planned";

    return {
      code: course.course_code,
      name: course.course_name,
      instructor: null,
      credits: course.credits,
      grade,
      status
    };
  });

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const semesterLabel =
    plan.semester.semester_name != null
      ? `${plan.semester.semester_name} Semester`
      : `Semester ${plan.semester_id}`;

  return {
    semesterLabel,
    planStatus: plan.plan_status,
    totalCourses: courses.length,
    totalCredits,
    courses
  };
};
