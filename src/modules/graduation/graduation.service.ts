import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { TOTAL_REQUIRED_HOURS } from "../../constants/academic.js";

export const getGraduationOverview = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true
        }
      },
      graduationProgress: {
        include: {
          requirement: true
        }
      }
    }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const remainingHours = TOTAL_REQUIRED_HOURS - student.total_earned_hours;
  const completionPercentage = (student.total_earned_hours / TOTAL_REQUIRED_HOURS) * 100;

  const averageHoursPerSemester = await calculateAverageHoursPerSemester(studentId);
  
  let estimatedSemestersRemaining = 0;
  if (averageHoursPerSemester > 0) {
    estimatedSemestersRemaining = Math.ceil(remainingHours / averageHoursPerSemester);
  }

  return {
    student: {
      student_id: student.student_id,
      name: `${student.user.first_name} ${student.user.last_name}`,
      level: student.level,
      cumulative_gpa: student.cumulative_gpa
    },
    progress: {
      total_required_hours: TOTAL_REQUIRED_HOURS,
      earned_hours: student.total_earned_hours,
      remaining_hours: remainingHours,
      completion_percentage: Number(completionPercentage.toFixed(2))
    },
    estimation: {
      average_hours_per_semester: averageHoursPerSemester,
      estimated_semesters_remaining: estimatedSemestersRemaining
    },
    requirements_progress: student.graduationProgress.map(gp => ({
      requirement: gp.requirement.requirement_name,
      category: gp.requirement.category,
      required_hours: gp.requirement.required_hours,
      completed_hours: gp.completed_hours,
      percentage: Number(((gp.completed_hours / gp.requirement.required_hours) * 100).toFixed(2))
    }))
  };
};

export const getDetailedRequirements = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      graduationProgress: {
        include: {
          requirement: true
        }
      }
    }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const allRequirements = await prisma.graduationRequirement.findMany({
    orderBy: { category: "asc" }
  });

  const detailedRequirements = allRequirements.map(req => {
    const progress = student.graduationProgress.find(
      gp => gp.requirement_id === req.requirement_id
    );

    const completedHours = progress?.completed_hours || 0;
    const remainingHours = req.required_hours - completedHours;
    const isCompleted = completedHours >= req.required_hours;

    return {
      requirement_id: req.requirement_id,
      requirement_name: req.requirement_name,
      category: req.category,
      description: req.description,
      required_hours: req.required_hours,
      completed_hours: completedHours,
      remaining_hours: remainingHours,
      completion_percentage: Number(((completedHours / req.required_hours) * 100).toFixed(2)),
      is_completed: isCompleted
    };
  });

  const summary = {
    total_requirements: allRequirements.length,
    completed_requirements: detailedRequirements.filter(r => r.is_completed).length,
    in_progress_requirements: detailedRequirements.filter(r => !r.is_completed && r.completed_hours > 0).length,
    not_started_requirements: detailedRequirements.filter(r => r.completed_hours === 0).length
  };

  return {
    student_id: studentId,
    summary,
    requirements: detailedRequirements
  };
};

export const getDegreeAudit = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true
        }
      },
      enrollments: {
        include: {
          course: true,
          semester: true
        }
      },
      graduationProgress: {
        include: {
          requirement: true
        }
      }
    }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const passedCourses = student.enrollments.filter(
    e => e.status === "PASSED" && e.grade && !["F", "W"].includes(e.grade)
  );

  const failedCourses = student.enrollments.filter(
    e => e.status === "FAILED" || e.grade === "F"
  );

  const inProgressCourses = student.enrollments.filter(
    e => e.status === "ENROLLED"
  );

  const coursesByCategory = passedCourses.reduce((acc: any, enrollment) => {
    const category = "غير محدد";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      course_code: enrollment.course.course_code,
      course_name: enrollment.course.course_name,
      credits: enrollment.course.credits,
      grade: enrollment.grade
    });
    return acc;
  }, {});

  return {
    student: {
      student_id: student.student_id,
      name: `${student.user.first_name} ${student.user.last_name}`,
      level: student.level,
      cumulative_gpa: student.cumulative_gpa,
      total_earned_hours: student.total_earned_hours
    },
    audit_summary: {
      total_courses_taken: student.enrollments.length,
      courses_passed: passedCourses.length,
      courses_failed: failedCourses.length,
      courses_in_progress: inProgressCourses.length,
      total_earned_hours: student.total_earned_hours,
      remaining_hours: TOTAL_REQUIRED_HOURS - student.total_earned_hours
    },
    courses_by_category: coursesByCategory,
    failed_courses: failedCourses.map(e => ({
      course_code: e.course.course_code,
      course_name: e.course.course_name,
      grade: e.grade
    })),
    in_progress_courses: inProgressCourses.map(e => ({
      course_code: e.course.course_code,
      course_name: e.course.course_name,
      credits: e.course.credits
    })),
    requirements_status: student.graduationProgress.map(gp => ({
      requirement: gp.requirement.requirement_name,
      category: gp.requirement.category,
      required_hours: gp.requirement.required_hours,
      completed_hours: gp.completed_hours,
      is_met: gp.completed_hours >= gp.requirement.required_hours
    }))
  };
};

export const createGraduationRequirement = async (data: {
  requirement_name: string;
  required_hours: number;
  category: string;
  description?: string;
}) => {
  const requirement = await prisma.graduationRequirement.create({
    data: {
      requirement_name: data.requirement_name,
      required_hours: data.required_hours,
      category: data.category as any,
      description: data.description
    }
  });

  return {
    message: "تم إنشاء متطلب التخرج بنجاح",
    requirement
  };
};

async function calculateAverageHoursPerSemester(studentId: number): Promise<number> {
  const semesterRecords = await prisma.semesterRecord.findMany({
    where: { student_id: studentId }
  });

  if (semesterRecords.length === 0) {
    return 15;
  }

  const totalHours = semesterRecords.reduce(
    (sum, record) => sum + (record.registered_hours || 0),
    0
  );

  return Number((totalHours / semesterRecords.length).toFixed(2));
}
