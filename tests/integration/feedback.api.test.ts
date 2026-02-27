import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdvisorToken, getStudentToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  feedback: {
    findMany: vi.fn(),
    create: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Feedback API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  const advisorToken = getAdvisorToken();
  const studentToken = getStudentToken();

  describe("POST /api/feedback", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/feedback")
        .send({ student_id: 1, message: "Good progress" });
      expect(res.status).toBe(401);
    });

    it("returns 403 when not ADVISOR", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/feedback")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ student_id: 1, message: "test" });
      expect(res.status).toBe(403);
    });

    it("returns 201 when advisor creates feedback", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 3, role: "ADVISOR" });
      prismaMock.feedback.create.mockResolvedValue({
        feed_id: 1,
        student_id: 1,
        advisor_id: 3,
        message: "Good progress",
        created_at: new Date()
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/feedback")
        .set("Authorization", `Bearer ${advisorToken}`)
        .send({ student_id: 1, message: "Good progress" });
      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Good progress");
    });
  });

  describe("GET /api/feedback/student/:studentId", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/feedback/student/1");
      expect(res.status).toBe(401);
    });

    it("returns 200 when advisor requests", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 3, role: "ADVISOR" });
      prismaMock.feedback.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/feedback/student/1")
        .set("Authorization", `Bearer ${advisorToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("returns 200 when student requests own feedback", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.feedback.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/feedback/student/2")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /api/feedback/my", () => {
    it("returns 403 when not ADVISOR", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/feedback/my")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(403);
    });

    it("returns 200 when advisor requests", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 3, role: "ADVISOR" });
      prismaMock.feedback.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/feedback/my")
        .set("Authorization", `Bearer ${advisorToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
