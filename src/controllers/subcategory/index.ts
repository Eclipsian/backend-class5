import { Request, Response } from "express";
import { prisma } from '../..';

export const getAllSubcategory = async (req: Request, res: Response) => {
  const data = await prisma.subCategory.findMany();
  res.json(data);
};


export const getAllProductsBySubcategory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { search } = req.query;
  const subCategory = await prisma.subCategory.findFirst({
		where: {
			slug,
		},
	});
  const products = await prisma.product.findMany({
    where: {
      AND: [
        {
          title: {
            contains: search as string,
            mode: 'insensitive',
          }
        },
        {
          subCategoryId: subCategory?.id,
        }
      ]  
    }
  });

	res.json({
    ...subCategory,
    products
  });
};
