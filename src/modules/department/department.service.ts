import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const createDepartment = async (data: any) => {
  const { dept_name, dept_code } = data;

  if (!dept_name)
    throw new AppError("Department name is required", 400);

  return prisma.department.create({
    data: { dept_name, dept_code: dept_code ?? undefined }
  });
};

export const getAllDepartments = async () => {
  return prisma.department.findMany();
};

export const deleteDepartment = async (id: number) => {
  return prisma.department.delete({
    where: { dept_id: id }
  });
};
