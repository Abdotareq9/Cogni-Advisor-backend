import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { getAdminToken } from "../helpers/authHelper.js";

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

const prismaMock: any = {
  $connect: vi.fn(),
  $queryRaw: vi.fn(),
  $transaction: vi.fn(async (fn: any) => fn(prismaMock)),
  user: {
    findUnique: vi.fn(),
    count: vi.fn()
  },
  course: {
    count: vi.fn()
  },
  department: {
    findMany: vi.fn()
  },
  systemSetting: {
    upsert: vi.fn(),
    findMany: vi.fn()
  },
  auditLog: {
    findMany: vi.fn(),
    create: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

describe("Admin API", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  const adminToken = getAdminToken();

  describe("GET /api/admin/overview", () => {
    it("returns 401 without token", async () => {
      const { default: app } = await import("../../src/app.js");
      const res = await request(app).get("/api/admin/overview");
      expect(res.status).toBe(401);
    });

    it("returns 403 with non-ADMIN token", async () => {
      const { getStudentToken } = await import("../helpers/authHelper.js");
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 2, role: "STUDENT" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/admin/overview")
        .set("Authorization", `Bearer ${getStudentToken()}`);
      expect(res.status).toBe(403);
    });

    it("returns 200 with overview data for ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.user.count.mockResolvedValue(5);
      prismaMock.course.count.mockResolvedValue(2);
      prismaMock.department.findMany.mockResolvedValue([
        { dept_id: 1, dept_name: "CS", _count: { students: 10 } }
      ]);
      prismaMock.auditLog.findMany.mockResolvedValue([]);
      prismaMock.$queryRaw.mockResolvedValue([{ "?column?": 1 }]);

      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/admin/overview")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("totalUsers", 5);
      expect(res.body).toHaveProperty("activeCourses", 2);
      expect(Array.isArray(res.body.studentsPerDepartment)).toBe(true);
      expect(res.body.serverStatus).toMatchObject({ api: "online" });
    });
  });

  describe("GET /api/admin/system-settings", () => {
    it("returns 200 with defaults and performance snapshot", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.systemSetting.upsert.mockResolvedValue({});
      prismaMock.systemSetting.findMany.mockResolvedValue([
        { key: "general", value: { systemName: "CogniAdvisor" } },
        { key: "aiEngine", value: { aiModelStatus: "active" } },
        { key: "permissions", value: { ADMIN: { systemAccess: true } } },
        { key: "security", value: { sessionTimeoutMinutes: 30 } }
      ]);
      prismaMock.course.count.mockResolvedValue(347);
      prismaMock.$queryRaw.mockResolvedValue([{ "?column?": 1 }]);

      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .get("/api/admin/system-settings")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("general");
      expect(res.body).toHaveProperty("aiEngine");
      expect(res.body).toHaveProperty("permissions");
      expect(res.body).toHaveProperty("security");
      expect(res.body).toHaveProperty("performance");
      
      expect(res.body.aiEngine).toHaveProperty("metrics");
      expect(res.body.aiEngine.metrics).toHaveProperty("totalCourses");
      expect(res.body.aiEngine.metrics).toHaveProperty("recommendationsGenerated");
      expect(res.body.aiEngine.metrics).toHaveProperty("successRate");
      expect(typeof res.body.aiEngine.metrics.successRate).toBe("number");
      
      expect(res.body.performance).toHaveProperty("serverLoad");
      expect(res.body.performance).toHaveProperty("cpuUsage");
      expect(res.body.performance).toHaveProperty("databaseHealth");
      expect(res.body.performance).toHaveProperty("responseTimeMs");
      expect(typeof res.body.performance.serverLoad).toBe("number");
      expect(typeof res.body.performance.cpuUsage).toBe("number");
      expect(typeof res.body.performance.databaseHealth).toBe("number");
      expect(typeof res.body.performance.responseTimeMs).toBe("number");
    });
  });

  describe("PATCH /api/admin/system-settings", () => {
    it("returns 200 and updatedKeys on success", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      prismaMock.systemSetting.findMany.mockResolvedValue([
        { key: "general", value: { systemName: "CogniAdvisor" } }
      ]);
      prismaMock.systemSetting.upsert.mockResolvedValue({});
      prismaMock.auditLog.create.mockResolvedValue({});

      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/admin/system-settings")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ general: { defaultCreditLimit: 24 } });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("updatedKeys");
      expect(Array.isArray(res.body.updatedKeys)).toBe(true);
    });

    it("returns 400 when body is empty", async () => {
      prismaMock.user.findUnique.mockResolvedValue({ user_id: 1, role: "ADMIN" });
      const { default: app } = await import("../../src/app.js");
      const res = await request(app)
        .patch("/api/admin/system-settings")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});
      expect(res.status).toBe(400);
    });
  });
});

