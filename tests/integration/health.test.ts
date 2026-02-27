import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

// Mock prisma before app imports it
vi.mock("../../src/config/prisma.js", () => ({
  default: {
    $connect: vi.fn()
  }
}));

describe("Health API", () => {
  beforeEach(async () => {
    vi.resetModules();
  });

  it("GET /health returns 200 when database is connected", async () => {
    const { default: prisma } = await import("../../src/config/prisma.js");
    vi.mocked(prisma.$connect).mockResolvedValueOnce();

    const { default: app } = await import("../../src/app.js");
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "OK", database: "connected" });
  });

  it("GET /health returns 503 when database connection fails", async () => {
    const { default: prisma } = await import("../../src/config/prisma.js");
    vi.mocked(prisma.$connect).mockRejectedValueOnce(new Error("Connection failed"));

    const { default: app } = await import("../../src/app.js");
    const res = await request(app).get("/health");

    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: "ERROR", database: "disconnected" });
  });
});
