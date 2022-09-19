import { prisma } from '../..';
import { Request, Response } from 'express';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, price, quantity } = req.body;
  const product = await prisma.product.create({
    data : {
      title,
      price: Number(price),
      quantity: Number(quantity),
    }
  });
  res.json(product);
};
