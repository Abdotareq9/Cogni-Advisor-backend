import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken, getStudentToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  student: { findUnique: vi.fn() },
  semester: { findUnique: vi.fn() },
  semesterRecord: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Semester Records API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  const adminToken = getAdminToken();
  const studentToken = getStudentToken();

  describe("POST /api/semester-records", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/semester-records")
        .send({ student_id: 1, semester_id: 1 });
      expect(res.status).toBe(401);
    });

    it("returns 403 when not ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/semester-records")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ student_id: 1, semester_id: 1 });
      expect(res.status).toBe(403);
    });

    it("returns 201 when admin creates record", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.student.findUnique.mockResolvedValue({ student_id: 1 });
      prismaMock.semester.findUnique.mockResolvedValue({ semester_id: 1 });
      prismaMock.semesterRecord.create.mockResolvedValue({
        record_id: 1,
        student_id: 1,
        semester_id: 1,
        semester_gpa: null,
        registered_hours: null
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/semester-records")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ student_id: 1, semester_id: 1 });
      expect(res.status).toBe(201);
      expect(res.body.student_id).toBe(1);
    });
  });

  describe("GET /api/semester-records/student/:studentId", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/semester-records/student/1");
      expect(res.status).toBe(401);
    });

    it("returns 200 with valid token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      prismaMock.semesterRecord.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/semester-records/student/1")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/semester-records/semester/:semesterId", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/semester-records/semester/1");
      expect(res.status).toBe(401);
    });
  });

  describe("PATCH /api/semester-records/:id", () => {
    it("returns 403 when not ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/semester-records/1")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ semester_gpa: 3.5 });
      expect(res.status).toBe(403);
    });
  });
});
