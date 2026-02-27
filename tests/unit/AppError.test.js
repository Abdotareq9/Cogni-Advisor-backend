import { describe, it, expect } from "vitest";
import { AppError } from "../../src/utils/AppError.js";
describe("AppError", () => {
    it("creates error with message and statusCode", () => {
        const err = new AppError("Not found", 404);
        expect(err.message).toBe("Not found");
        expect(err.statusCode).toBe(404);
        expect(err).toBeInstanceOf(Error);
    });
    it("inherits from Error", () => {
        const err = new AppError("Bad request", 400);
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe("Error");
    });
});
//# sourceMappingURL=AppError.test.js.map