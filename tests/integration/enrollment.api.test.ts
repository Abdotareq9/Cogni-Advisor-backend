import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getStudentToken, getAdminToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  enrollment: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  },
  coursePrerequisite: { findMany: vi.fn() },
  student: { update: vi.fn() }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Enrollment API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe("POST /api/enrollments", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).post("/api/enrollments").send({ course_id: 1 });
      expect(res.status).toBe(401);
    });

    it("returns 403 with ADMIN token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/enrollments")
        .set("Authorization", `Bearer ${getAdminToken()}`)
        .send({ course_id: 1 });
      expect(res.status).toBe(403);
    });

    it("returns 201 when student enrolls and prerequisites met", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.coursePrerequisite.findMany.mockResolvedValue([]);
      prismaMock.enrollment.findFirst.mockResolvedValue(null);
      prismaMock.enrollment.create.mockResolvedValue({
        enrollment_id: 1,
        student_id: 2,
        course_id: 1
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/enrollments")
        .set("Authorization", `Bearer ${getStudentToken()}`)
        .send({ course_id: 1 });
      expect(res.status).toBe(201);
    });
  });

  describe("PATCH /api/enrollments/mark-passed", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/enrollments/mark-passed")
        .send({ student_id: 1, course_id: 1, grade: "A" });
      expect(res.status).toBe(401);
    });
  });
});
