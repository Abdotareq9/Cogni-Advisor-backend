import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken, getStudentToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  semester: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Semesters API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  const adminToken = getAdminToken();
  const studentToken = getStudentToken();

  describe("GET /api/semesters", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/semesters");
      expect(res.status).toBe(401);
    });

    it("returns 200 and list with valid token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.semester.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/semesters")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/semesters/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/semesters/1");
      expect(res.status).toBe(401);
    });

    it("returns 200 with valid token when semester exists", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.semester.findUnique.mockResolvedValue({
        semester_id: 1,
        semester_name: "Fall 2024",
        start_date: null,
        end_date: null
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/semesters/1")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
      expect(res.body.semester_id).toBe(1);
    });
  });

  describe("POST /api/semesters", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).post("/api/semesters").send({ semester_name: "Fall 2024" });
      expect(res.status).toBe(401);
    });

    it("returns 403 when not ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/semesters")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ semester_name: "Fall 2024" });
      expect(res.status).toBe(403);
    });

    it("returns 201 when admin creates semester", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.semester.create.mockResolvedValue({
        semester_id: 1,
        semester_name: "Fall 2024",
        start_date: null,
        end_date: null
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/semesters")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ semester_name: "Fall 2024" });
      expect(res.status).toBe(201);
      expect(res.body.semester_name).toBe("Fall 2024");
    });
  });

  describe("PUT /api/semesters/:id", () => {
    it("returns 403 when not ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .put("/api/semesters/1")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ semester_name: "Updated" });
      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/semesters/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).delete("/api/semesters/1");
      expect(res.status).toBe(401);
    });

    it("returns 403 when not ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .delete("/api/semesters/1")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(403);
    });
  });
});
