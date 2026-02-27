import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdvisorToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  enrollment: { findFirst: vi.fn(), findMany: vi.fn(), update: vi.fn() },
  student: { update: vi.fn() },
  course: { findMany: vi.fn() }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Grades API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe("POST /api/grades/assign", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/grades/assign")
        .send({ student_id: 1, course_id: 1, grade: "A" });
      expect(res.status).toBe(401);
    });

    it("returns 400 when body is invalid", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 3, role: "ADVISOR" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/grades/assign")
        .set("Authorization", `Bearer ${getAdvisorToken()}`)
        .send({ student_id: 1 });
      expect(res.status).toBe(400);
    });

    it("returns 200 when advisor assigns grade", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 3, role: "ADVISOR" });
      prismaMock.enrollment.findFirst.mockResolvedValue({
        enrollment_id: 1,
        student_id: 1,
        course_id: 1
      });
      prismaMock.enrollment.update.mockResolvedValue({});
      prismaMock.enrollment.findMany.mockResolvedValue([
        { grade: "A", course: { credits: 3 } }
      ]);
      prismaMock.student.update.mockResolvedValue({});
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/grades/assign")
        .set("Authorization", `Bearer ${getAdvisorToken()}`)
        .send({ student_id: 1, course_id: 1, grade: "A" });
      expect(res.status).toBe(200);
    });
  });
});
