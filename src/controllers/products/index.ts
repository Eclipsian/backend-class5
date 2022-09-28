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



export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  try { 

    const existingProduct = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!existingProduct) {
      return res.json({
        message: 'Product does not exist',
      });
    }

    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(product);

  } catch (error) {
    res.json({
      message: 'Error deleting product',
    });
  }
};

