import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken } from "../helpers/authHelper.js";

const prismaMock = {
  $connect: vi.fn(),
  user: { findUnique: vi.fn() },
  department: { findMany: vi.fn(), create: vi.fn(), delete: vi.fn() }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

describe("Departments API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  const adminToken = getAdminToken();

  describe("GET /api/departments", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/departments");
      expect(res.status).toBe(401);
    });

    it("returns 200 and list with valid token", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.department.findMany.mockResolvedValue([]);
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/departments")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /api/departments", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).post("/api/departments").send({ dept_name: "CS" });
      expect(res.status).toBe(401);
    });

    it("returns 400 when body is invalid", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/departments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});
      expect(res.status).toBe(400);
    });

    it("returns 201 when admin creates department", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.department.create.mockResolvedValue({
        dept_id: 1,
        dept_name: "Computer Science"
      });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .post("/api/departments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ dept_name: "Computer Science" });
      expect(res.status).toBe(201);
      expect(res.body.dept_name).toBe("Computer Science");
    });
  });

  describe("DELETE /api/departments/:id", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).delete("/api/departments/1");
      expect(res.status).toBe(401);
    });
  });
});
