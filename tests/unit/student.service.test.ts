import { describe, it, expect, vi, beforeEach } from "vitest";

const prismaMock = {
  student: {
    findUnique: vi.fn(),
    update: vi.fn()
  },
  enrollment: {
    count: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

describe("student.service - getStudentById", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws 404 when student is not found", async () => {
    prismaMock.student.findUnique.mockResolvedValue(null);
    const { getStudentById } = await import("../../src/modules/student/student.service.js");
    await expect(getStudentById(999)).rejects.toMatchObject({ statusCode: 404 });
  });

  it("returns student when found", async () => {
    const mockStudent = { student_id: 1, level: 2, cumulative_gpa: 3.5, user: { first_name: "Ali" } };
    prismaMock.student.findUnique.mockResolvedValue(mockStudent);
    const { getStudentById } = await import("../../src/modules/student/student.service.js");
    const result = await getStudentById(1);
    expect(result).toEqual(mockStudent);
  });
});

describe("student.service - deactivateStudent", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws 404 when student is not found", async () => {
    prismaMock.student.findUnique.mockResolvedValue(null);
    const { deactivateStudent } = await import("../../src/modules/student/student.service.js");
    await expect(deactivateStudent(999)).rejects.toMatchObject({ statusCode: 404 });
  });

  it("sets status to INACTIVE when student exists", async () => {
    prismaMock.student.findUnique.mockResolvedValue({ student_id: 1 });
    prismaMock.student.update.mockResolvedValue({ student_id: 1, status: "INACTIVE" });
    const { deactivateStudent } = await import("../../src/modules/student/student.service.js");
    await deactivateStudent(1);
    expect(prismaMock.student.update).toHaveBeenCalledWith({
      where: { student_id: 1 },
      data: { status: "INACTIVE" }
    });
  });
});

describe("student.service - getAcademicSummary", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws 404 when student is not found", async () => {
    prismaMock.student.findUnique.mockResolvedValue(null);
    const { getAcademicSummary } = await import("../../src/modules/student/student.service.js");
    await expect(getAcademicSummary(999)).rejects.toMatchObject({ statusCode: 404 });
  });

  it("returns correct summary with remaining hours calculation", async () => {
    prismaMock.student.findUnique.mockResolvedValue({
      student_id: 1,
      cumulative_gpa: 3.85,
      total_earned_hours: 72,
      level: 3
    });
    prismaMock.enrollment.count
      .mockResolvedValueOnce(24)  // passed courses
      .mockResolvedValueOnce(5);  // current enrollments
    const { getAcademicSummary } = await import("../../src/modules/student/student.service.js");
    const result = await getAcademicSummary(1);
    expect(result.earned_hours).toBe(72);
    expect(result.remaining_hours).toBe(144 - 72);
    expect(result.passed_courses).toBe(24);
    expect(result.current_enrollments).toBe(5);
  });
});
