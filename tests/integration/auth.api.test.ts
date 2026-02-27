import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import bcrypt from "bcrypt";

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

const prismaMock = {
  $connect: vi.fn(),
  user: {
    findUnique: vi.fn(),
    update: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

describe("Auth API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe("POST /api/auth/login", () => {
    it("returns 400 when body is invalid", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/auth/login")
        .send({ identifier: "short" });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("returns 401 when user not found", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/auth/login")
        .send({ identifier: "12345678901234", password: "password123" });
      expect(res.status).toBe(401);
    });

    it("returns 401 when password is wrong", async () => {
      const hash = await bcrypt.hash("correct", 10);
      prismaMock.user.findUnique.mockResolvedValue({
        user_id: 1,
        national_id: "12345678901234",
        password_hash: hash,
        first_name: "Test",
        last_name: "User",
        role: "STUDENT"
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/auth/login")
        .send({ identifier: "12345678901234", password: "wrongpassword" });
      expect(res.status).toBe(401);
    });

    it("returns 200 and token when credentials are valid", async () => {
      const hash = await bcrypt.hash("password123", 10);
      prismaMock.user.findUnique.mockResolvedValue({
        user_id: 1,
        national_id: "12345678901234",
        password_hash: hash,
        first_name: "Test",
        last_name: "User",
        role: "STUDENT"
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/auth/login")
        .send({ identifier: "12345678901234", password: "password123" });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toMatchObject({ id: 1, role: "STUDENT" });
    });
  });

  describe("PATCH /api/auth/change-password", () => {
    it("returns 401 when no token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/auth/change-password")
        .send({ currentPassword: "old", newPassword: "new123" });
      expect(res.status).toBe(401);
    });
  });
});
