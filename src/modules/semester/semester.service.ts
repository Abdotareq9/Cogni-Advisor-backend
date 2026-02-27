import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const createSemester = async (data: {
  semester_name?: string;
  start_date?: Date;
  end_date?: Date;
}) => {
  return prisma.semester.create({
    data: {
      semester_name: data.semester_name ?? null,
      start_date: data.start_date ?? null,
      end_date: data.end_date ?? null
    }
  });
};

export const getAllSemesters = async () => {
  return prisma.semester.findMany({
    orderBy: { semester_id: "desc" }
  });
};

export const getSemesterById = async (id: number) => {
  const semester = await prisma.semester.findUnique({
    where: { semester_id: id }
  });
  if (!semester) throw new AppError("Semester not found", 404);
  return semester;
};

export const updateSemester = async (
  id: number,
  data: { semester_name?: string; start_date?: Date | null; end_date?: Date | null }
) => {
  await getSemesterById(id);
  return prisma.semester.update({
    where: { semester_id: id },
    data
  });
};

export const deleteSemester = async (id: number) => {
  await getSemesterById(id);
  return prisma.semester.delete({
    where: { semester_id: id }
  });
};
