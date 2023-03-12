import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await prisma.student.findUnique({
    where: {
      email
    },
    select: {
      password: true
    }
  });

  if (!userExists) {
    return res.status(404).json({message: 'User not found' });
  }

  const passwordIsValid = bcrypt.compareSync(password, userExists.password);

  if (!passwordIsValid) {
    return res.status(404).json({ message: 'Invalid password' });
  }

  const user = await prisma.student.findUnique({
    where: {
      email
    },
    select: {
      id: true,
      email: true,
      age: true,
      firstName: true,
      lastName: true,
      avatar: true,
      grade: true,
    }
  });

  return res.json(user);
}

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const student = await prisma.student.create({
    data: {
      email,
      password: hash
    }
  })
  return res.json(student);
}


