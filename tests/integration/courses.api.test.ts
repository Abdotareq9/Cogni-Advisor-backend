import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  course: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  },
  coursePrerequisite: { findFirst: vi.fn(), create: vi.fn() }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Courses API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  const adminToken = getAdminToken();

  describe("GET /api/courses", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/courses");
      expect(res.status).toBe(401);
    });

    it("returns 200 and list with valid token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.course.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/courses")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/courses/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/courses/1");
      expect(res.status).toBe(401);
    });

    it("returns 200 when course exists", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.course.findUnique.mockResolvedValue({
        course_id: 1,
        course_code: "CS101",
        course_name: "Intro",
        credits: 3
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/courses/1")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.course_id).toBe(1);
    });
  });

  describe("POST /api/courses", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).post("/api/courses").send({
        course_code: "CS101",
        course_name: "Intro",
        credits: 3,
        is_available: true
      });
      expect(res.status).toBe(401);
    });

    it("returns 400 when body is invalid", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/courses")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ course_name: "Only name" });
      expect(res.status).toBe(400);
    });

    it("returns 201 when admin creates course", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.course.create.mockResolvedValue({
        course_id: 1,
        course_code: "CS101",
        course_name: "Intro",
        credits: 3,
        is_available: true
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/courses")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          course_code: "CS101",
          course_name: "Intro to CS",
          credits: 3,
          is_available: true
        });
      expect(res.status).toBe(201);
      expect(res.body.course_code).toBe("CS101");
    });
  });

  describe("PUT /api/courses/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).put("/api/courses/1").send({ course_name: "Updated" });
      expect(res.status).toBe(401);
    });
  });

  describe("DELETE /api/courses/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).delete("/api/courses/1");
      expect(res.status).toBe(401);
    });
  });
});
