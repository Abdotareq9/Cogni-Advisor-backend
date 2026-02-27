import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../src/utils/asyncHandler.js";

describe("asyncHandler", () => {
  it("passes through successful async handler", async () => {
    const req = {} as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    const handler = asyncHandler(async (_req, res) => {
      res.json({ ok: true });
    });

    await handler(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ ok: true });
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with error when handler throws", async () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;
    const error = new Error("Test error");

    const handler = asyncHandler(async () => {
      throw error;
    });

    await handler(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
