import type { RequestHandler } from "express";
import indexRoutes from "./index.js";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import courseRoutes from "../modules/course/course.routes.js";
import studentRoutes from "../modules/student/student.routes.js";
import enrollmentRoutes from "../modules/enrollment/enrollment.routes.js";
import progressRoutes from "../modules/progress/progress.routes.js";
import semesterRoutes from "../modules/semester/semester.routes.js";
import semesterRecordRoutes from "../modules/semesterRecord/semesterRecord.routes.js";
import feedbackRoutes from "../modules/feedback/feedback.routes.js";
import notificationRoutes from "../modules/notification/notification.routes.js";
import studyPlanRoutes from "../modules/studyPlan/studyPlan.routes.js";
import recommendationsRoutes from "../modules/recommendations/recommendations.routes.js";
import advisorRoutes from "../modules/advisor/advisor.routes.js";
import messageRoutes from "../modules/message/message.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js";

export interface RouteConfig {
  path: string;
  router: typeof indexRoutes;
  middleware?: RequestHandler[];
}

/** مسارات API - يتم تسجيلها تلقائياً في app */
export const apiRoutes: RouteConfig[] = [
  { path: "/api/users", router: userRoutes },
  { path: "/api/auth", router: authRoutes },
  { path: "/api/courses", router: courseRoutes },
  { path: "/api/students", router: studentRoutes },
  { path: "/api/enrollments", router: enrollmentRoutes },
  { path: "/api/progress", router: progressRoutes },
  { path: "/api/semesters", router: semesterRoutes },
  { path: "/api/semester-records", router: semesterRecordRoutes },
  { path: "/api/feedback", router: feedbackRoutes },
  { path: "/api/notifications", router: notificationRoutes },
  { path: "/api/study-plan", router: studyPlanRoutes },
  { path: "/api/recommendations", router: recommendationsRoutes },
  { path: "/api/advisor/messages", router: messageRoutes },
  { path: "/api/advisor", router: advisorRoutes },
  { path: "/api/admin", router: adminRoutes },
  { path: "/api/ai", router: aiRoutes },
];

/** المسارات الجذرية (بدون /api) */
export const rootRoutes: RouteConfig[] = [{ path: "/", router: indexRoutes }];
