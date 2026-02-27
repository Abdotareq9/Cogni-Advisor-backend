import { describe, it, expect, vi } from "vitest";
import { asyncHandler } from "../../src/utils/asyncHandler.js";
describe("asyncHandler", () => {
    it("passes through successful async handler", async () => {
        const req = {};
        const res = { json: vi.fn() };
        const next = vi.fn();
        const handler = asyncHandler(async (_req, res) => {
            res.json({ ok: true });
        });
        await handler(req, res, next);
        expect(res.json).toHaveBeenCalledWith({ ok: true });
        expect(next).not.toHaveBeenCalled();
    });
    it("calls next with error when handler throws", async () => {
        const req = {};
        const res = {};
        const next = vi.fn();
        const error = new Error("Test error");
        const handler = asyncHandler(async () => {
            throw error;
        });
        await handler(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
    });
});
//# sourceMappingURL=asyncHandler.test.js.map