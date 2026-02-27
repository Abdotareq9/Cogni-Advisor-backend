import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

const makeToken = (id: number, role: string) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  studyPlan: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  },
  planDetail: { create: vi.fn() },
  semester: { findFirst: vi.fn() },
  enrollment: { findMany: vi.fn() },
  course: { findMany: vi.fn() }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

const studentUser = { user_id: 1, role: "STUDENT" };
const advisorUser = { user_id: 2, role: "ADVISOR" };

describe("Study Plan API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  // --- POST /api/study-plan ---
  describe("POST /api/study-plan", () => {
    it("returns 400 when semester_id is missing", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/study-plan")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("returns 400 when semester_id is a string instead of number", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/study-plan")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`)
        .send({ semester_id: "Fall 2025" });
      expect(res.status).toBe(400);
    });

    it("returns 400 when plan already exists for the semester", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      prismaMock.studyPlan.findUnique.mockResolvedValue({ plan_id: 1 });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/study-plan")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`)
        .send({ semester_id: 1 });
      expect(res.status).toBe(400);
    });

    it("returns 201 and new plan when semester_id is valid", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      prismaMock.studyPlan.findUnique.mockResolvedValue(null);
      prismaMock.studyPlan.create.mockResolvedValue({ plan_id: 5, student_id: 1, semester_id: 1, plan_status: "PENDING" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/study-plan")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`)
        .send({ semester_id: 1 });
      expect(res.status).toBe(201);
      expect(res.body.plan_id).toBe(5);
    });

    it("returns 401 when no token is provided", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).post("/api/study-plan").send({ semester_id: 1 });
      expect(res.status).toBe(401);
    });
  });

  // --- GET /api/study-plan/me/current ---
  describe("GET /api/study-plan/me/current", () => {
    it("returns 401 when no token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/study-plan/me/current");
      expect(res.status).toBe(401);
    });

    it("returns 400 when semesterId query param is not a number", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/study-plan/me/current?semesterId=abc")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`);
      expect(res.status).toBe(400);
    });

    it("returns 404 when no plan found", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      prismaMock.semester.findFirst.mockResolvedValue({ semester_id: 1, semester_name: "Fall 2025" });
      prismaMock.studyPlan.findUnique.mockResolvedValue(null);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/study-plan/me/current")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`);
      expect(res.status).toBe(404);
    });

    it("returns 200 with plan details when plan exists", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      prismaMock.semester.findFirst.mockResolvedValue({ semester_id: 1, semester_name: "Fall 2025" });
      prismaMock.studyPlan.findUnique.mockResolvedValue({
        plan_id: 1, student_id: 1, semester_id: 1, plan_status: "PENDING",
        semester: { semester_id: 1, semester_name: "Fall 2025" },
        details: [
          { course: { course_id: 10, course_code: "CS101", course_name: "Intro", credits: 3 } }
        ]
      });
      prismaMock.enrollment.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/study-plan/me/current")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`);
      expect(res.status).toBe(200);
      expect(res.body.semesterLabel).toBe("Fall 2025 Semester");
      expect(res.body.totalCourses).toBe(1);
      expect(res.body.courses[0]?.code).toBe("CS101");
    });
  });

  // --- GET /api/study-plan/generate ---
  describe("GET /api/study-plan/generate", () => {
    it("returns 401 when no token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/study-plan/generate");
      expect(res.status).toBe(401);
    });

    it("returns 200 with suggested courses list", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      prismaMock.enrollment.findMany.mockResolvedValue([]);
      prismaMock.course.findMany.mockResolvedValue([
        { course_id: 1, course_code: "CS101", course_name: "Intro", credits: 3, prerequisites: [] }
      ]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/study-plan/generate")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.courses).toBeDefined();
    });
  });

  // --- GET /api/study-plan/advisor/pending ---
  describe("GET /api/study-plan/advisor/pending", () => {
    it("returns 403 when called by a student", async () => {
      prismaMock.user.findUnique.mockResolvedValue(studentUser);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/study-plan/advisor/pending")
        .set("Authorization", `Bearer ${makeToken(1, "STUDENT")}`);
      expect(res.status).toBe(403);
    });

    it("returns 200 with pending plans list for advisor", async () => {
      prismaMock.user.findUnique.mockResolvedValue(advisorUser);
      prismaMock.studyPlan.findMany.mockResolvedValue([
        { plan_id: 1, plan_status: "PENDING", student: { student_id: 1 }, details: [] }
      ]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/study-plan/advisor/pending")
        .set("Authorization", `Bearer ${makeToken(2, "ADVISOR")}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // --- PATCH /api/study-plan/:id/review ---
  describe("PATCH /api/study-plan/:id/review", () => {
    it("returns 400 when status is invalid", async () => {
      prismaMock.user.findUnique.mockResolvedValue(advisorUser);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/study-plan/1/review")
        .set("Authorization", `Bearer ${makeToken(2, "ADVISOR")}`)
        .send({ status: "MAYBE" });
      expect(res.status).toBe(400);
    });

    it("returns 404 when plan is not found", async () => {
      prismaMock.user.findUnique.mockResolvedValue(advisorUser);
      prismaMock.studyPlan.findUnique.mockResolvedValue(null);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/study-plan/99/review")
        .set("Authorization", `Bearer ${makeToken(2, "ADVISOR")}`)
        .send({ status: "APPROVED" });
      expect(res.status).toBe(404);
    });

    it("returns 200 when advisor approves a pending plan", async () => {
      prismaMock.user.findUnique.mockResolvedValue(advisorUser);
      prismaMock.studyPlan.findUnique.mockResolvedValue({ plan_id: 1, plan_status: "PENDING" });
      prismaMock.studyPlan.update.mockResolvedValue({ plan_id: 1, plan_status: "APPROVED" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/study-plan/1/review")
        .set("Authorization", `Bearer ${makeToken(2, "ADVISOR")}`)
        .send({ status: "APPROVED" });
      expect(res.status).toBe(200);
    });
  });
});
