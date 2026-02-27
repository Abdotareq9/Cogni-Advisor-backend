import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  enrollment: { findMany: vi.fn() },
  student: { findUnique: vi.fn() },
  course: { findMany: vi.fn() }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Progress API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe("GET /api/progress/:studentId", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/progress/1");
      expect(res.status).toBe(401);
    });

    it("returns 200 with valid token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.student.findUnique.mockResolvedValue({ student_id: 1 });
      prismaMock.enrollment.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/progress/1")
        .set("Authorization", `Bearer ${getAdminToken()}`);
      expect(res.status).toBe(200);
    });
  });
});
