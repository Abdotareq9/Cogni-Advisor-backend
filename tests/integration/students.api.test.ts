import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken, getStudentToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  student: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn()
  },
  enrollment: { findMany: vi.fn() },
  course: { findMany: vi.fn() }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Students API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe("GET /api/students/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/students/1");
      expect(res.status).toBe(401);
    });

    it("returns 403 with STUDENT token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/students/1")
        .set("Authorization", `Bearer ${getStudentToken()}`);
      expect(res.status).toBe(403);
    });

    it("returns 200 with admin token when student exists", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.student.findUnique.mockResolvedValue({
        student_id: 5,
        user: { user_id: 5, first_name: "Student", last_name: "One" }
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/students/5")
        .set("Authorization", `Bearer ${getAdminToken()}`);
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /api/students/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).put("/api/students/1").send({});
      expect(res.status).toBe(401);
    });
  });

  describe("PATCH /api/students/:id/deactivate", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).patch("/api/students/1/deactivate");
      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/students/me/summary", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/students/me/summary");
      expect(res.status).toBe(401);
    });

    it("returns 403 with ADMIN token for STUDENT-only route", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/students/me/summary")
        .set("Authorization", `Bearer ${getAdminToken()}`);
      expect([403, 401]).toContain(res.status);
    });
  });
});
