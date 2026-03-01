import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { AlertType, AlertSeverity } from "@prisma/client";

export const getAllAlerts = async (filters?: {
  isResolved?: boolean;
  severity?: AlertSeverity;
  alertType?: AlertType;
}) => {
  const where: any = {};

  if (filters?.isResolved !== undefined) {
    where.is_resolved = filters.isResolved;
  }

  if (filters?.severity) {
    where.severity = filters.severity;
  }

  if (filters?.alertType) {
    where.alert_type = filters.alertType;
  }

  const alerts = await prisma.alert.findMany({
    where,
    include: {
      student: {
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
              personal_email: true
            }
          }
        }
      },
      resolvedBy: {
        select: {
          first_name: true,
          last_name: true
        }
      }
    },
    orderBy: [
      { is_resolved: "asc" },
      { created_at: "desc" }
    ]
  });

  return {
    total: alerts.length,
    unresolved: alerts.filter(a => !a.is_resolved).length,
    alerts
  };
};

export const getStudentAlerts = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const alerts = await prisma.alert.findMany({
    where: { student_id: studentId },
    include: {
      resolvedBy: {
        select: {
          first_name: true,
          last_name: true
        }
      }
    },
    orderBy: { created_at: "desc" }
  });

  return {
    student_id: studentId,
    total: alerts.length,
    unresolved: alerts.filter(a => !a.is_resolved).length,
    alerts
  };
};

export const checkAndCreateAlerts = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { student_id: studentId },
    include: {
      semesterRecords: {
        orderBy: { semester_id: "desc" },
        take: 1
      },
      enrollments: {
        where: { semester_id: { not: null } },
        include: {
          semester: true,
          course: true
        }
      }
    }
  });

  if (!student) {
    throw new AppError("الطالب غير موجود", 404);
  }

  const createdAlerts: any[] = [];

  // تحقق من LOW_GPA
  if (Number(student.cumulative_gpa) < 2.0) {
    const existingAlert = await prisma.alert.findFirst({
      where: {
        student_id: studentId,
        alert_type: "LOW_GPA",
        is_resolved: false
      }
    });

    if (!existingAlert) {
      const alert = await prisma.alert.create({
        data: {
          student_id: studentId,
          alert_type: "LOW_GPA",
          severity: Number(student.cumulative_gpa) < 1.5 ? "CRITICAL" : "HIGH",
          title: "معدل تراكمي منخفض",
          message: `المعدل التراكمي الحالي ${student.cumulative_gpa} أقل من 2.0. يرجى مراجعة المرشد الأكاديمي`
        }
      });
      createdAlerts.push(alert);
    }
  }

  // تحقق من MISSING_HOURS
  const expectedHoursByLevel: { [key: number]: number } = {
    1: 15,
    2: 45,
    3: 75,
    4: 105,
    5: 135
  };

  const expectedHours = expectedHoursByLevel[student.level] || 0;
  if (student.total_earned_hours < expectedHours - 12) {
    const existingAlert = await prisma.alert.findFirst({
      where: {
        student_id: studentId,
        alert_type: "MISSING_HOURS",
        is_resolved: false
      }
    });

    if (!existingAlert) {
      const alert = await prisma.alert.create({
        data: {
          student_id: studentId,
          alert_type: "MISSING_HOURS",
          severity: "MEDIUM",
          title: "نقص في الساعات المنجزة",
          message: `الساعات المنجزة ${student.total_earned_hours} أقل من المتوقع للمستوى ${student.level}`
        }
      });
      createdAlerts.push(alert);
    }
  }

  // تحقق من OVERLOAD
  const currentSemester = await prisma.semester.findFirst({
    where: {
      start_date: { lte: new Date() },
      end_date: { gte: new Date() }
    }
  });

  if (currentSemester) {
    const currentEnrollments = student.enrollments.filter(
      e => e.semester_id === currentSemester.semester_id && e.status === "ENROLLED"
    );

    const totalHours = currentEnrollments.reduce(
      (sum, e) => sum + e.course.credits,
      0
    );

    if (totalHours > 21) {
      const existingAlert = await prisma.alert.findFirst({
        where: {
          student_id: studentId,
          alert_type: "OVERLOAD",
          is_resolved: false
        }
      });

      if (!existingAlert) {
        const alert = await prisma.alert.create({
          data: {
            student_id: studentId,
            alert_type: "OVERLOAD",
            severity: "MEDIUM",
            title: "عبء دراسي زائد",
            message: `مسجل ${totalHours} ساعة في الفصل الحالي (الحد الأقصى 21)`
          }
        });
        createdAlerts.push(alert);
      }
    }
  }

  return {
    student_id: studentId,
    checks_performed: ["LOW_GPA", "MISSING_HOURS", "OVERLOAD"],
    new_alerts: createdAlerts.length,
    alerts: createdAlerts
  };
};

export const resolveAlert = async (
  alertId: number,
  resolvedBy: number,
  resolutionNote?: string
) => {
  const alert = await prisma.alert.findUnique({
    where: { alert_id: alertId }
  });

  if (!alert) {
    throw new AppError("التنبيه غير موجود", 404);
  }

  if (alert.is_resolved) {
    throw new AppError("التنبيه تم حله مسبقاً", 400);
  }

  const updated = await prisma.alert.update({
    where: { alert_id: alertId },
    data: {
      is_resolved: true,
      resolved_at: new Date(),
      resolved_by: resolvedBy
    },
    include: {
      resolvedBy: {
        select: {
          first_name: true,
          last_name: true
        }
      }
    }
  });

  return {
    message: "تم تحديد التنبيه كمحلول",
    alert: updated
  };
};

export const getAdvisorAlerts = async (advisorId: number) => {
  const advisor = await prisma.advisor.findUnique({
    where: { advisor_id: advisorId },
    include: {
      students: {
        include: {
          alerts: {
            where: { is_resolved: false },
            include: {
              student: {
                include: {
                  user: {
                    select: {
                      first_name: true,
                      last_name: true,
                      personal_email: true
                    }
                  }
                }
              }
            },
            orderBy: { created_at: "desc" }
          }
        }
      }
    }
  });

  if (!advisor) {
    throw new AppError("المرشد غير موجود", 404);
  }

  const allAlerts = advisor.students.flatMap(s => s.alerts);

  return {
    advisor_id: advisorId,
    total_students: advisor.students.length,
    total_alerts: allAlerts.length,
    critical_alerts: allAlerts.filter(a => a.severity === "CRITICAL").length,
    high_alerts: allAlerts.filter(a => a.severity === "HIGH").length,
    alerts: allAlerts
  };
};
