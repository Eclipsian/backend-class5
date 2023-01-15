import { prisma } from '../..';
import { Request, Response } from 'express';

export const getAllCategories = async (req: Request, res: Response) => {
	const data = await prisma.category.findMany();
	res.json(data);
};

export const getCategoryBySlug = async (req: Request, res: Response) => {
	const { slug } = req.params;
	const data = await prisma.category.findFirst({
		where: {
			slug,
		},
		include: {
			products: true,
		},
	});
	res.json(data);
};

export const createCategory = async (req: Request, res: Response) => {
	const { title, slug } = req.body;
	const data = await prisma.category.create({
		data: {
			title,
			slug,
		},
	});
	res.json(data);
};

export const deleteCategory = async (req: Request, res: Response) => {
	const { id } = req.body;
	if (!id) {
		res.status(400).json({ message: 'Missing id' });
	}
	try {
		const existingCategory = await prisma.category.findFirst({
			where: {
				id: String(id),
			},
		});
		if (!existingCategory) {
			return res.json({
				message: 'Category does not exist',
			});
		}
		const category = await prisma.category.delete({
			where: {
				id: String(id),
			},
		});
		res.json(category);
	} catch (error) {
		console.log(error);
		res.json({
			message: 'Something went wrong',
		});
	}
};

export const updateCategory = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, description, thumbnailImageUrl, heroImageUrl } = req.body;
	if (!id) {
		res.status(400).json({ message: 'Missing id' });
	}
	const existingCategory = await prisma.category.findFirst({
		where: {
			id: String(id),
		},
	});
	if (!existingCategory) {
		return res.json({
			message: 'Category does not exist',
		});
	}
	const data = await prisma.category.update({
		where: {
			id,
		},
		data: {
			title,
			description,
			thumbnailImageUrl,
			heroImageUrl,
		},
	});
	res.json(data);
};
