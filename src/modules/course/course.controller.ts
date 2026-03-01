import type { Request, Response } from "express";
import * as courseService from "./course.service.js";

export const createCourseHandler = async (req: Request,res: Response) => {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  };

export const getCoursesHandler = async (
  req: Request,
  res: Response
) => {

    const courses = await courseService.getAllCourses();
    res.json(courses);
};

export const getCourseByIdHandler = async (
  req: Request,
  res: Response
) => {
    const id = Number(req.params.id);
    const course = await courseService.getCourseById(id);

    res.json(course);
};

export const updateCourseHandler = async (
  req: Request,
  res: Response
) => {
    const id = Number(req.params.id);

    const updated =
      await courseService.updateCourse(id, req.body);

    res.json(updated);
};

export const deleteCourseHandler = async (
  req: Request,
  res: Response
) => {
    const id = Number(req.params.id);

    await courseService.deleteCourse(id);

    res.json({ message: "Course deleted successfully" });
};

export const toggleAvailabilityHandler = async (
  req: Request,
  res: Response
) => {
    const id = Number(req.params.id);

    const updated =
      await courseService.toggleCourseAvailability(id);

    res.json(updated);
};

export const addPrerequisiteHandler = async (
  req: Request,
  res: Response
) => {
    const { courseId, prerequisiteId } = req.body;

    const result =
      await courseService.addPrerequisite(
        courseId,
        prerequisiteId
      );

    res.status(201).json(result);
};

export const getCourseDetailsHandler = async (
  req: Request,
  res: Response
) => {
    const id = Number(req.params.id);

    const course =
      await courseService.getCourseWithPrerequisites(id);

    res.json(course);
};

export const removePrerequisiteHandler = async (
  req: Request,
  res: Response
) => {
    const { courseId, prerequisiteId } = req.body;

    await courseService.removePrerequisite(
      courseId,
      prerequisiteId
    );

    res.json({ message: "Prerequisite removed successfully" });
};

