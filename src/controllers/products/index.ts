import { prisma } from '../..';
import { Request, Response } from 'express';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getAllProductsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const products = await prisma.product.findMany({
    where: {
      categoryId,
    },
  });
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, price, quantity, categoryId, slug } = req.body;
  const product = await prisma.product.create({
    data : {
      title,
      slug,
      price: Number(price),
      quantity: Number(quantity),
      category: {
        connect: {
          id: categoryId,
        }
      }
    }
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  const foundProduct = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!foundProduct) {
    return res.json({
      message: 'Product does not exist',
    });
  }
  const productExistsInCart = await prisma.cartItem.findFirst({
    where: {
      productId: Number(id),
    },
  })
  if (productExistsInCart) {
    return res.json({
      message: 'Cannot delete product with existing order',
    });
  }
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, title, price, quantity } = req.body;
  
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
  
  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      price: Number(price),
      quantity: Number(quantity),
    },
  });
  res.json(product);
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: true,
      subCategory: true,
      reviews: {
        include: {
          student: true,
        },
      },
      productHighlights: true,
    },
  });
  if (!product) {
    return res.json({
      message: 'Product does not exist',
    });
  }
  res.json(product);
};
