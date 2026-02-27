import type { Request, Response } from "express";
import * as departmentService from "./department.service.js";

export const createDepartmentHandler = async (req: Request, res: Response) => {
    const dept =
      await departmentService.createDepartment(req.body);

    res.status(201).json(dept);
};

export const getDepartmentsHandler = async (req: Request, res: Response) => {
  const depts =
    await departmentService.getAllDepartments();

  res.json(depts);
};

export const deleteDepartmentHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await departmentService.deleteDepartment(id);

  res.json({ message: "Department deleted" });
};
