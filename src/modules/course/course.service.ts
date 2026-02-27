import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const createCourse = async (data: any) => {
  const {
    course_code,
    course_name,
    credits,
    required_hours_to_take,
    is_available
  } = data;

  if (!course_code || !course_name || !credits) {
    throw new AppError("Missing required fields", 400);
  }

  return prisma.course.create({
    data: {
      course_code,
      course_name,
      credits,
      required_hours_to_take,
      is_available: is_available ?? true
    }
  });
};


export const getAllCourses = async () => {
  return prisma.course.findMany();
};

export const getCourseById = async (id: number) => {
  const course = await prisma.course.findUnique({
    where: { course_id: id },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return course;
};

export const updateCourse = async (
  id: number,
  data: any
) => {
  const course = await prisma.course.findUnique({
    where: { course_id: id },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return prisma.course.update({
    where: { course_id: id },
    data,
  });
};

export const deleteCourse = async (id: number) => {
  const course = await prisma.course.findUnique({
    where: { course_id: id },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return prisma.course.delete({
    where: { course_id: id },
  });
};


export const toggleCourseAvailability = async (
  id: number
) => {
  const course = await prisma.course.findUnique({
    where: { course_id: id },
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return prisma.course.update({
    where: { course_id: id },
    data: {
      is_available: !course.is_available,
    },
  });
};

export const addPrerequisite = async (
  courseId: number,
  prerequisiteId: number
) => {
  if (courseId === prerequisiteId) {
    throw new AppError("Course cannot depend on itself", 400);
  }

  const existing = await prisma.coursePrerequisite.findFirst({
    where: {
      course_id: courseId,
      prereq_course_id: prerequisiteId,
    },
  });

  if (existing) {
    throw new AppError("Prerequisite already exists", 400);
  }

  return prisma.coursePrerequisite.create({
    data: {
      course_id: courseId,
      prereq_course_id: prerequisiteId,
    },
  });
};

export const getCourseWithPrerequisites = async (
  courseId: number
) => {
  return prisma.course.findUnique({
    where: { course_id: courseId },
    include: {
      prerequisites: {
        include: {
          prereq: true,
        },
      },
    },
  });
};


