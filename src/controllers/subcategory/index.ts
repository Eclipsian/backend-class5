import { Request, Response } from "express";
import { prisma } from '../..';

export const getAllSubcategory = async (req: Request, res: Response) => {
  const data = await prisma.subCategory.findMany();
  res.json(data);
};

export const getAllProductsBySubcategory = async (req: Request, res: Response) => {
  const { subCategoryId } = req.params;
  const { slug } = req.params
  const products = await prisma.subCategory.findFirst({
		where: {
			slug,
		},
    include: {
      products: true,
    },
	});
	res.json(products);
};
