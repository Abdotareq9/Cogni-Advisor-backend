import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { createMorganStream } from "./config/logger.js";
import { requestId } from "./middlewares/requestId.middleware.js";
import indexRoutes from "./routes/index.js";
import authRoutes from "./modules/auth/auth.routes.js";
import courseRoutes from "./modules/course/course.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import departmentRoutes from "./modules/department/department.routes.js";
import enrollmentRoutes from "./modules/enrollment/enrollment.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import gradeRoutes from "./modules/grade/grade.routes.js";
import progressRoutes from "./modules/progress/progress.routes.js";
import semesterRoutes from "./modules/semester/semester.routes.js";
import semesterRecordRoutes from "./modules/semesterRecord/semesterRecord.routes.js";
import feedbackRoutes from "./modules/feedback/feedback.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import studyPlanRoutes from "./modules/studyPlan/studyPlan.routes.js";
import recommendationsRoutes from "./modules/recommendations/recommendations.routes.js";
import advisorRoutes from "./modules/advisor/advisor.routes.js";
import messageRoutes from "./modules/message/message.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { globalErrorHandler } from "./middlewares/errorHandler.middleware.js";



const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts, please try again later." }
});

const app = express();
app.use(requestId);
app.use(morgan("combined", { stream: createMorganStream() }));
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") ?? "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type", "X-Request-Id"]
}));
app.use("/api", apiLimiter);
app.use(globalErrorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", indexRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/semester-records", semesterRecordRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/study-plan", studyPlanRoutes);
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/advisor", advisorRoutes);
app.use("/api/advisor/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

export default app;

