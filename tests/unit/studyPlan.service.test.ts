import { describe, it, expect, vi, beforeEach } from "vitest";

const prismaMock = {
  studyPlan: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  },
  planDetail: {
    create: vi.fn()
  },
  semester: {
    findFirst: vi.fn()
  },
  enrollment: {
    findMany: vi.fn()
  }
};

vi.mock("../../src/config/prisma.js", () => ({ default: prismaMock }));

describe("studyPlan.service - createStudyPlan", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws 400 when plan already exists for the semester", async () => {
    prismaMock.studyPlan.findUnique.mockResolvedValue({ plan_id: 1 });
    const { createStudyPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    await expect(createStudyPlan(1, 1)).rejects.toMatchObject({ statusCode: 400 });
  });

  it("creates and returns a new plan when none exists", async () => {
    prismaMock.studyPlan.findUnique.mockResolvedValue(null);
    prismaMock.studyPlan.create.mockResolvedValue({ plan_id: 1, student_id: 1, semester_id: 1, plan_status: "PENDING" });
    const { createStudyPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    const result = await createStudyPlan(1, 1);
    expect(result.plan_id).toBe(1);
    expect(prismaMock.studyPlan.create).toHaveBeenCalledOnce();
  });
});

describe("studyPlan.service - addCourseToPlan", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws 404 when plan is not found", async () => {
    prismaMock.studyPlan.findUnique.mockResolvedValue(null);
    const { addCourseToPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    await expect(addCourseToPlan(99, 1, 1)).rejects.toMatchObject({ statusCode: 404 });
  });

  it("throws 403 when student does not own the plan", async () => {
    prismaMock.studyPlan.findUnique.mockResolvedValue({ plan_id: 1, student_id: 2, plan_status: "PENDING", details: [] });
    const { addCourseToPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    await expect(addCourseToPlan(1, 5, 1)).rejects.toMatchObject({ statusCode: 403 });
  });

  it("throws 400 when plan is not PENDING", async () => {
    prismaMock.studyPlan.findUnique.mockResolvedValue({ plan_id: 1, student_id: 1, plan_status: "APPROVED", details: [] });
    const { addCourseToPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    await expect(addCourseToPlan(1, 5, 1)).rejects.toMatchObject({ statusCode: 400 });
  });

  it("adds course when plan is PENDING and owned by student", async () => {
    prismaMock.studyPlan.findUnique.mockResolvedValue({ plan_id: 1, student_id: 1, plan_status: "PENDING", details: [] });
    prismaMock.planDetail.create.mockResolvedValue({ plan_id: 1, course_id: 5 });
    const { addCourseToPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    const result = await addCourseToPlan(1, 5, 1);
    expect(result.message).toBe("Course added successfully");
  });
});

describe("studyPlan.service - getCurrentStudyPlan", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns null when no semester exists", async () => {
    prismaMock.semester.findFirst.mockResolvedValue(null);
    const { getCurrentStudyPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    const result = await getCurrentStudyPlan(1);
    expect(result).toBeNull();
  });

  it("returns null when no plan exists for the semester", async () => {
    prismaMock.semester.findFirst.mockResolvedValue({ semester_id: 1, semester_name: "Fall 2025" });
    prismaMock.studyPlan.findUnique.mockResolvedValue(null);
    const { getCurrentStudyPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    const result = await getCurrentStudyPlan(1);
    expect(result).toBeNull();
  });

  it("returns formatted plan with course details when plan exists", async () => {
    prismaMock.semester.findFirst.mockResolvedValue({ semester_id: 1, semester_name: "Fall 2025" });
    prismaMock.studyPlan.findUnique.mockResolvedValue({
      plan_id: 1, student_id: 1, semester_id: 1, plan_status: "PENDING",
      semester: { semester_id: 1, semester_name: "Fall 2025" },
      details: [
        { course: { course_id: 10, course_code: "CS101", course_name: "Intro to CS", credits: 3 } },
        { course: { course_id: 11, course_code: "MATH201", course_name: "Calculus II", credits: 4 } }
      ]
    });
    prismaMock.enrollment.findMany.mockResolvedValue([
      { course_id: 10, grade: "A", status: "PASSED" }
    ]);
    const { getCurrentStudyPlan } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    const result = await getCurrentStudyPlan(1);
    expect(result).not.toBeNull();
    expect(result!.semesterLabel).toBe("Fall 2025 Semester");
    expect(result!.totalCourses).toBe(2);
    expect(result!.totalCredits).toBe(7);
    const cs101 = result!.courses.find(c => c.code === "CS101");
    expect(cs101?.status).toBe("Completed");
    const math201 = result!.courses.find(c => c.code === "MATH201");
    expect(math201?.status).toBe("Planned");
  });
});

describe("studyPlan.service - getPendingPlans", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns all plans with PENDING status including student and course details", async () => {
    const mockPlans = [
      { plan_id: 1, plan_status: "PENDING", student: { student_id: 1 }, details: [] }
    ];
    prismaMock.studyPlan.findMany.mockResolvedValue(mockPlans);
    const { getPendingPlans } = await import("../../src/modules/studyPlan/studyPlan.service.js");
    const result = await getPendingPlans();
    expect(result).toHaveLength(1);
    expect(prismaMock.studyPlan.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { plan_status: "PENDING" } })
    );
  });
});
