import prisma from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import type { AIQueryType } from "@prisma/client";

export const createChatInteraction = async (studentId: number, message: string) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId }
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const interaction = await prisma.aIInteraction.create({
    data: {
      student_id: studentId,
      query_type: "CHAT",
      input_data: { message },
      status: "PENDING"
    }
  });

  return {
    interaction_id: interaction.interaction_id,
    message: "Your inquiry has been submitted. It will be processed shortly",
    status: interaction.status
  };
};

export const createPlanSuggestion = async (
  studentId: number,
  semesterId: number,
  preferences?: any
) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      enrollments: {
        where: { status: "PASSED" },
        include: { course: true }
      }
    }
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const semester = await prisma.semester.findUnique({
    where: { semester_id: semesterId }
  });

  if (!semester) {
    throw new AppError("Semester not found", 404);
  }

  const interaction = await prisma.aIInteraction.create({
    data: {
      student_id: studentId,
      query_type: "SUGGEST_PLAN",
      input_data: {
        semester_id: semesterId,
        preferences: preferences || {},
        student_context: {
          level: student.level,
          cumulative_gpa: student.cumulative_gpa.toString(),
          earned_hours: student.total_earned_hours,
          completed_courses: student.enrollments.map(e => e.course.course_code)
        }
      },
      status: "PENDING"
    }
  });

  return {
    interaction_id: interaction.interaction_id,
    message: "Creating suggested study plan. You will be notified when complete",
    status: interaction.status
  };
};

export const createGpaPrediction = async (
  studentId: number,
  semesterId: number,
  plannedCourses: Array<{ course_id: number; expected_grade: string }>
) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId }
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const courses = await prisma.course.findMany({
    where: {
      course_id: { in: plannedCourses.map(c => c.course_id) }
    }
  });

  if (courses.length !== plannedCourses.length) {
    throw new AppError("Some courses not found", 404);
  }

  const interaction = await prisma.aIInteraction.create({
    data: {
      student_id: studentId,
      query_type: "PREDICT_GPA",
      input_data: {
        semester_id: semesterId,
        planned_courses: plannedCourses,
        current_gpa: student.cumulative_gpa.toString(),
        current_hours: student.total_earned_hours
      },
      status: "PENDING"
    }
  });

  return {
    interaction_id: interaction.interaction_id,
    message: "Calculating prediction. You will be notified of the result",
    status: interaction.status
  };
};

export const getRiskAnalysis = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      semesterRecords: {
        orderBy: { semester_id: "desc" },
        take: 3
      },
      enrollments: {
        where: { status: "FAILED" }
      },
      alerts: {
        where: { is_resolved: false }
      }
    }
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const interaction = await prisma.aIInteraction.create({
    data: {
      student_id: studentId,
      query_type: "RISK_ANALYSIS",
      input_data: {
        cumulative_gpa: student.cumulative_gpa.toString(),
        level: student.level,
        earned_hours: student.total_earned_hours,
        recent_semesters: student.semesterRecords.map(sr => ({
          semester_gpa: sr.semester_gpa?.toString(),
          registered_hours: sr.registered_hours
        })),
        failed_courses_count: student.enrollments.length,
        active_alerts_count: student.alerts.length
      },
      status: "PENDING"
    }
  });

  return {
    interaction_id: interaction.interaction_id,
    message: "Analyzing academic risk",
    status: interaction.status,
    preliminary_data: {
      cumulative_gpa: student.cumulative_gpa,
      active_alerts: student.alerts.length,
      failed_courses: student.enrollments.length
    }
  };
};

export const getStudentHistory = async (studentId: number) => {
  const interactions = await prisma.aIInteraction.findMany({
    where: { student_id: studentId },
    orderBy: { created_at: "desc" },
    take: 50
  });

  return {
    total: interactions.length,
    interactions: interactions.map(i => ({
      interaction_id: i.interaction_id,
      query_type: i.query_type,
      status: i.status,
      created_at: i.created_at,
      has_response: !!i.response_data
    }))
  };
};
