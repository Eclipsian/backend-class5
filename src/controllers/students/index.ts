import { prisma } from "../..";
import { Request, Response } from 'express';

export const getAllStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany({
    include: {
      orders : {
        select : {
          id : true,
          products : true,
        },
      },
    },
  });
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



export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.body;
  try { 

    const existingOrder = await prisma.order.findFirst({
      where: {
        studentId: Number(id),
      },
    });
    if (existingOrder) {
      return res.json({
        message: 'Cannot delete student with existing order',
      });
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!existingStudent) {
      return res.json({
        message: 'Student does not exist',
      });
    }

    const student = await prisma.student.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(student);

  } catch (error) {
    res.json({
      message: 'Error deleting student',
    });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id, firstName, lastName, age, grade } = req.body;

  const existingStudent = await prisma.student.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!existingStudent) {
    return res.json({
      message: 'Student does not exist',
    });
  }

  const student = await prisma.student.update({
    where: {
      id: Number(id),
    },
    data: {
      firstName,
      lastName,
      age: Number(age),
      grade,
    },
  });
  res.json(student);
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await prisma.student.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      orders: {
        select: {
          id: true,
          products: true,
        },
      },
    },
  });
  if (!student) {
    return res.json({
      message: 'Student does not exist',
    });
  }
  res.json(student);
};
