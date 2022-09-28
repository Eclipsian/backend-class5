import { prisma } from '../..';
import { Request, Response } from 'express';

export const getAllOrders = async (req: Request, res: Response) => {
	const orders = await prisma.order.findMany({
		include: {
			products: true,
			student: true,
		},
	});
	res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
	const { studentId, products } = req.body;
	const order = await prisma.order.create({
		data: {
			student: {
				connect: {
					id: Number(studentId),
				},
			},
			products: {
				connect: (products as []).map((productId: string) => ({
					id: Number(productId),
				})),
			},
		},
		include: {
			products: true,
			student : true,
		},
	});
	res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
	const { id } = req.body;
	try { 
	  const order = await prisma.order.delete({
		where: {
		  id: Number(id),
		},
	  });
	  res.json(order);
	} catch (error) {
	  console.log(error);
	  res.json({
		message: 'Something went wrong'
	  });
	}
  };