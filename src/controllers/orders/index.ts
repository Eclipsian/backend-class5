import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllOrders = async (req: Request, res: Response) => {
	const { id } = req.params;
	const orders = await prisma.order.findMany({
		where: {
			studentId: Number(id),
		},
		include: {
			student: true,
			cart: {
				include: {
					cartItems: {
						include: {
							product: true,
						},
					},
				},
			},
		},
	});
	res.json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const order = await prisma.order.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			student: true,
			cart: {
				include: {
					cartItems: {
						include: {
							product: true,
						},
					},
				},
			},
			shippingAddress: true,
		},
	});

	if (!order) {
		return res.json({
			message: 'Order does not exist',
		});
	}

	const paymentIntentReponse = await axios.get(
		`https://api.stripe.com/v1/payment_intents/${order?.paymentIntentId}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRIPE_SECReT_KEY}`,
			},
		},
	);

	const paymentMethodResponse = await axios.get(
		`https://api.stripe.com/v1/payment_methods/${paymentIntentReponse.data.payment_method}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
			},
		},
	);

	res.json({
		...order,
		paymentMethod: paymentMethodResponse.data,
	});
};

export const createOrder = async (req: Request, res: Response) => {
	const {
		studentId,
		cartId,
		shippingAddressStreet,
		shippingAddressCity,
		shippingAddressState,
		shippingAddressPostalCode,
		subTotal,
		tax,
		paymentIntentId,
	} = req.body;

	const order = await prisma.order.create({
		data: {
			student: {
				connect: {
					id: Number(studentId),
				},
			},
			cart: {
				connect: {
					id: Number(cartId),
				},
			},
			shippingAddress: {
				create: {
					streetAddress: shippingAddressStreet,
					city: shippingAddressCity,
					state: shippingAddressState,
					zipCode: shippingAddressPostalCode,
				},
			},
			subtotal: Number(subTotal),
			tax: Number(tax),
			paymentIntentId,
		},
		include: {
			student: true,
		},
	});
	res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
	const { id } = req.body;
	try {
		const existingOrder = await prisma.order.findFirst({
			where: {
				id: Number(id),
			},
		});
		if (!existingOrder) {
			return res.json({
				message: 'Order does not exist',
			});
		}

		const order = await prisma.order.delete({
			where: {
				id: Number(id),
			},
		});
		res.json(order);
	} catch (error) {
		console.log(error);
		res.json({
			message: 'Something went wrong',
		});
	}
};

export const updateOrder = async (req: Request, res: Response) => {
	const { id, studentId, products } = req.body;

	const existingOrder = await prisma.order.findFirst({
		where: {
			id: Number(id),
		},
	});
	if (!existingOrder) {
		return res.json({
			message: 'Order does not exist',
		});
	}

	const order = await prisma.order.update({
		where: {
			id: Number(id),
		},
		data: {
			student: {
				connect: {
					id: Number(studentId),
				},
			},
		},
		include: {
			student: true,
		},
	});
	res.json(order);
};

export const getOrderByPaymentIntent = async (req: Request, res: Response) => {
	const { paymentIntentId } = req.params;
	const order = await prisma.order.findFirst({
		where: {
			paymentIntentId,
		},
	});
	res.json(order);
};
