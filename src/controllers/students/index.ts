import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  res.json(students);
};
