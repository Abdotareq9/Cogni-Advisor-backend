import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { Decimal } from "@prisma/client/runtime/library";

export const createSemesterRecord = async (data: {
  student_id: number;
  semester_id: number;
  semester_gpa?: number | Decimal;
  registered_hours?: number;
}) => {
  const [student, semester] = await Promise.all([
    prisma.student.findUnique({ where: { student_id: data.student_id } }),
    prisma.semester.findUnique({ where: { semester_id: data.semester_id } })
  ]);
  if (!student) throw new AppError("Student not found", 404);
  if (!semester) throw new AppError("Semester not found", 404);

  return prisma.semesterRecord.create({
    data: {
      student_id: data.student_id,
      semester_id: data.semester_id,
      semester_gpa: data.semester_gpa ?? null,
      registered_hours: data.registered_hours ?? null
    }
  });
};

export const getByStudentId = async (studentId: number) => {
  return prisma.semesterRecord.findMany({
    where: { student_id: studentId },
    include: { semester: true },
    orderBy: { semester_id: "desc" }
  });
};

export const getBySemesterId = async (semesterId: number) => {
  return prisma.semesterRecord.findMany({
    where: { semester_id: semesterId },
    include: { student: true },
    orderBy: { record_id: "asc" }
  });
};

export const getRecordById = async (id: number) => {
  const record = await prisma.semesterRecord.findUnique({
    where: { record_id: id }
  });
  if (!record) throw new AppError("Semester record not found", 404);
  return record;
};

export const updateSemesterRecord = async (
  id: number,
  data: { semester_gpa?: number | Decimal | null; registered_hours?: number | null }
) => {
  await getRecordById(id);
  return prisma.semesterRecord.update({
    where: { record_id: id },
    data
  });
};
