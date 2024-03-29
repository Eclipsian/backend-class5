import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const check = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (token) {
    try {
      const isValid = jwt.verify(token as string, 'my very secret key');
      const user = jwt.decode(token as string);
      return res.json({
        token: isValid,
        user,
      });
    } catch (error: any) {
      if (error.message === 'jwt expired') {
        return res.status(401).json({ message: 'Token expired' });
      }
    }
  }
};

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

  if (user) {
    const token = jwt.sign({ id: user.id }, 'my very secret key', {
      expiresIn: 86400,
    });

    return res.json({
      ...user,
      token,
    });
  };
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const student = await prisma.student.create({
    data: {
      email,
      password: hash
    },
  });
  return res.json(student);
};

