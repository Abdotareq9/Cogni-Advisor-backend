import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken, getStudentToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  notification: {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Notifications API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  const adminToken = getAdminToken();
  const studentToken = getStudentToken();

  describe("GET /api/notifications", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/notifications");
      expect(res.status).toBe(401);
    });

    it("returns 200 and list with valid token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.notification.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/notifications")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("PATCH /api/notifications/read-all", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).patch("/api/notifications/read-all");
      expect(res.status).toBe(401);
    });

    it("returns 200 with valid token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.notification.updateMany.mockResolvedValue({ count: 0 });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/notifications/read-all")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
    });
  });

  describe("PATCH /api/notifications/:id/read", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).patch("/api/notifications/1/read");
      expect(res.status).toBe(401);
    });

    it("returns 200 when notification exists for user", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.notification.findFirst.mockResolvedValue({
        notification_id: 1,
        recipient_id: 2
      });
      prismaMock.notification.update.mockResolvedValue({
        notification_id: 1,
        recipient_id: 2,
        is_read: true
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/notifications/1/read")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
    });
  });

  describe("POST /api/notifications", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/notifications")
        .send({ recipient_id: 2, title: "Test" });
      expect(res.status).toBe(401);
    });

    it("returns 403 when not ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/notifications")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ recipient_id: 2, title: "Test" });
      expect(res.status).toBe(403);
    });

    it("returns 201 when admin creates notification", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.notification.create.mockResolvedValue({
        notification_id: 1,
        recipient_id: 2,
        title: "Test",
        body: null,
        is_read: false,
        sent_at: new Date()
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/notifications")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ recipient_id: 2, title: "Test" });
      expect(res.status).toBe(201);
      expect(res.body.title).toBe("Test");
    });
  });
});
