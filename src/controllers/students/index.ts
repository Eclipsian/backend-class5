import { prisma } from "../..";
import { Request, Response } from 'express';

export const getAllStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  res.json(students);
};

export const createStudent = async (req: Request, res: Response) => {
  const { firstName, lastName, age, grade } = req.body;
  const student = await prisma.student.create({
    data: {
      firstName, 
      lastName, 
      age: Number(age), 
      grade, 
    },
  });
  res.json(student);
};
