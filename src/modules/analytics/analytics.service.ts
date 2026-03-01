import prisma from "../../config/prisma.js";
import { TOTAL_REQUIRED_HOURS } from "../../constants/academic.js";
import { AppError } from "../../utils/AppError.js";

export const getStudentOverview = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true
        }
      },
      semesterRecords: {
        orderBy: { semester_id: "desc" },
        take: 1
      },
      enrollments: true,
      alerts: {
        where: { is_resolved: false }
      }
    }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const totalCourses = student.enrollments.length;
  const passedCourses = student.enrollments.filter(e => e.status === "PASSED").length;
  const failedCourses = student.enrollments.filter(e => e.status === "FAILED").length;
  const inProgressCourses = student.enrollments.filter(e => e.status === "ENROLLED").length;

  const hoursProgress = (student.total_earned_hours / TOTAL_REQUIRED_HOURS) * 100;

  return {
    student: {
      student_id: student.student_id,
      name: `${student.user.first_name} ${student.user.last_name}`,
      level: student.level,
      major_type: student.major_type
    },
    academic_standing: {
      cumulative_gpa: student.cumulative_gpa,
      total_earned_hours: student.total_earned_hours,
      hours_progress_percentage: Number(hoursProgress.toFixed(2)),
      remaining_hours: TOTAL_REQUIRED_HOURS - student.total_earned_hours,
      current_semester_gpa: student.semesterRecords[0]?.semester_gpa || null
    },
    courses_summary: {
      total: totalCourses,
      passed: passedCourses,
      failed: failedCourses,
      in_progress: inProgressCourses
    },
    alerts: {
      active_alerts: student.alerts.length,
      critical_alerts: student.alerts.filter(a => a.severity === "CRITICAL").length
    }
  };
};

export const getGpaTrend = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const semesterRecords = await prisma.semesterRecord.findMany({
    where: { student_id: studentId },
    include: {
      semester: {
        select: {
          semester_name: true,
          start_date: true
        }
      }
    },
    orderBy: { semester_id: "asc" }
  });

  const trend = semesterRecords.map(record => ({
    semester_id: record.semester_id,
    semester_name: record.semester.semester_name,
    semester_gpa: record.semester_gpa,
    registered_hours: record.registered_hours,
    start_date: record.semester.start_date
  }));

  let trendDirection = "مستقر";
  if (trend.length >= 2) {
    const lastTwo = trend.slice(-2);
    const lastGpa = Number(lastTwo[1].semester_gpa);
    const previousGpa = Number(lastTwo[0].semester_gpa);

    if (lastGpa > previousGpa) {
      trendDirection = "تصاعدي";
    } else if (lastGpa < previousGpa) {
      trendDirection = "تنازلي";
    }
  }

  return {
    student_id: studentId,
    cumulative_gpa: student.cumulative_gpa,
    total_semesters: trend.length,
    trend_direction: trendDirection,
    semester_records: trend
  };
};

export const getGradeDistribution = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      student_id: studentId,
      grade: { not: null }
    },
    include: {
      course: {
        select: {
          course_code: true,
          course_name: true,
          credits: true
        }
      }
    }
  });

  const gradeDistribution: { [key: string]: number } = {
    "A+": 0,
    "A": 0,
    "B+": 0,
    "B": 0,
    "C+": 0,
    "C": 0,
    "D+": 0,
    "D": 0,
    "F": 0
  };

  enrollments.forEach(enrollment => {
    if (enrollment.grade && gradeDistribution.hasOwnProperty(enrollment.grade)) {
      gradeDistribution[enrollment.grade]++;
    }
  });

  const totalGradedCourses = enrollments.length;

  const distribution = Object.entries(gradeDistribution).map(([grade, count]) => ({
    grade,
    count,
    percentage: totalGradedCourses > 0 ? Number(((count / totalGradedCourses) * 100).toFixed(2)) : 0
  }));

  const coursesByGrade = enrollments.map(e => ({
    course_code: e.course.course_code,
    course_name: e.course.course_name,
    credits: e.course.credits,
    grade: e.grade
  }));

  return {
    student_id: studentId,
    total_graded_courses: totalGradedCourses,
    distribution,
    courses_by_grade: coursesByGrade
  };
};

export const getHoursProgress = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      semesterRecords: {
        include: {
          semester: {
            select: {
              semester_name: true
            }
          }
        },
        orderBy: { semester_id: "asc" }
      }
    }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  let cumulativeHours = 0;
  const progressBySemester = student.semesterRecords.map(record => {
    cumulativeHours += record.registered_hours || 0;

    return {
      semester_id: record.semester_id,
      semester_name: record.semester.semester_name,
      hours_registered: record.registered_hours,
      cumulative_hours: cumulativeHours,
      progress_percentage: Number(((cumulativeHours / TOTAL_REQUIRED_HOURS) * 100).toFixed(2))
    };
  });

  const currentProgress = (student.total_earned_hours / TOTAL_REQUIRED_HOURS) * 100;
  const remainingHours = TOTAL_REQUIRED_HOURS - student.total_earned_hours;

  const averageHoursPerSemester = student.semesterRecords.length > 0
    ? student.total_earned_hours / student.semesterRecords.length
    : 0;

  const estimatedSemestersToGraduate = averageHoursPerSemester > 0
    ? Math.ceil(remainingHours / averageHoursPerSemester)
    : 0;

  return {
    student_id: studentId,
    current_status: {
      total_required_hours: TOTAL_REQUIRED_HOURS,
      earned_hours: student.total_earned_hours,
      remaining_hours: remainingHours,
      progress_percentage: Number(currentProgress.toFixed(2))
    },
    projection: {
      average_hours_per_semester: Number(averageHoursPerSemester.toFixed(2)),
      estimated_semesters_to_graduate: estimatedSemestersToGraduate
    },
    progress_by_semester: progressBySemester
  };
};
