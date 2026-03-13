import prisma from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";

const parseDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  if (dateValue instanceof Date) return dateValue;
  
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) {
    throw new AppError("Invalid date format. Use YYYY-MM-DD or ISO-8601 format", 400);
  }
  return date;
};

export const createSemester = async (data: {
  semester_name?: string;
  start_date?: Date | string;
  end_date?: Date | string;
}) => {
  return prisma.semester.create({
    data: {
      semester_name: data.semester_name ?? null,
      start_date: parseDate(data.start_date),
      end_date: parseDate(data.end_date)
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
  data: { 
    semester_name?: string; 
    start_date?: Date | string | null; 
    end_date?: Date | string | null;
  }
) => {
  await getSemesterById(id);
  
  const updateData: any = {};
  if (data.semester_name !== undefined) updateData.semester_name = data.semester_name;
  if (data.start_date !== undefined) updateData.start_date = parseDate(data.start_date);
  if (data.end_date !== undefined) updateData.end_date = parseDate(data.end_date);
  
  return prisma.semester.update({
    where: { semester_id: id },
    data: updateData
  });
};

export const deleteSemester = async (id: number) => {
  await getSemesterById(id);
  return prisma.semester.delete({
    where: { semester_id: id }
  });
};
