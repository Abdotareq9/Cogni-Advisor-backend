import { vi } from "vitest";

export const createPrismaMock = () => ({
  $connect: vi.fn(),
  user: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  },
  course: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  },
  coursePrerequisite: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn()
  },
  department: {
    findMany: vi.fn(),
    create: vi.fn(),
    delete: vi.fn()
  },
  student: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn()
  },
  enrollment: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  }
});
