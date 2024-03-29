import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const seeding = async (prisma: PrismaClient) => {
	console.log('Seeding start...');
	const passwordHash = bcrypt.hashSync('123456', 10);
	const dummyStudent = await prisma.student.create({
		data: {
			firstName: 'Kevin',
			lastName: 'Zhang',
			age: 10,
			grade: 'A',
			email: 'kevin.zhang@example.com',
			password: passwordHash,
		},
	});

	// Create some dummy category here:
	// Mac, Phones, Tablets, Accessories.

	const clothing = await prisma.category.create({
		data: {
			title: 'Clothing',
			slug: 'clothing',
			description:
				"The latest in women's designer clothing from today's top brands has arrived at Saks Fifth Avenue. Our wide selection of women’s denim, tops, sweaters, jackets and loungewear offers styles for any occasion. Plus, complete any look with our curation of women’s designer shoes and accessories.",
			thumbnailImageUrl:
				'https://image.s5a.com/is/image/saks/0400018027345_BLACKNAVY_ASTL?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
			subCategory: {
				createMany: {
					data: [
						{
							title: 'Dresses',
							slug: 'dresses',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400018027345_BLACKNAVY_ASTL?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
						{
							title: 'Tops',
							slug: 'tops',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400017269760_SLATE_ASTL?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
						{
							title: 'Skirts',
							slug: 'skirts',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400018174422_CLOUDWHITE_ASTL?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
						{
							title: 'Jackets',
							slug: 'jackets',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400017826724_LIGHTGREYSANDSTONEHAZE_ASTL?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
						{
							title: 'Sweaters',
							slug: 'sweaters',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400017643364_CORALRED_ASTL?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
					],
				},
			},
		},
	});

	const shoes = await prisma.category.create({
		data: {
			title: 'Shoes',
			slug: 'shoes',
			description: "Women's Designer Shoes & Footwear",
			thumbnailImageUrl:
				'https://image.s5a.com/is/image/saks/011023_WMHP_3UP_1_SH_MINIMAL?scl=1&qlt=83&fmt=jpg',
			subCategory: {
				createMany: {
					data: [
						{
							title: 'Boots',
							slug: 'boots',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400016855480_BLACK_A1?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
						{
							title: 'Flats',
							slug: 'flats',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400017283513_BLACK?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
						{
							title: 'Heels',
							slug: 'heels',
							thumbnailImageUrl:
								'https://image.s5a.com/is/image/saks/0400017787163_MIRRORSILVER?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
						},
					],
				},
			},
		},
	});

	const dressSubCategory = await prisma.subCategory.findFirst({
		where: {
			slug: 'dresses',
		},
	});

	const clothingProduct1 = await prisma.product.create({
		data: {
			title: 'Wayf',
			slug: 'wayf',
			price: 148,
			quantity: 1000,
			description: 'Plaza Tiered Cotton-Blend Cut-Out Maxi Dress',
			subCategory: {
				connect: {
					id: dressSubCategory?.id,
				},
			},
			category: {
				connect: {
					id: clothing.id,
				},
			},
			thumbnailImage:
				'https://image.s5a.com/is/image/saks/0400018373853_LAVENDERDITSY?wid=480&hei=640&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0&id=ETWa_0&fmt=jpg&dpr=off&fit=constrain,1&wid=934&hei=1245',
		},
	});

	await prisma.product.createMany({
		data: [
			{
				title: 'Derek Lam 10 Crossby',
				slug: 'derek-lam-10-crossby',
				price: 425,
				quantity: 1000,
				description: 'Ruffle Sleeveless Silk Dress',
				subCategoryId: dressSubCategory?.id,
				categoryId: clothing.id,
				thumbnailImage:
					'https://image.s5a.com/is/image/saks/0400018521801_KHAKI?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
			},
			{
				title: 'Aje',
				slug: 'aje',
				price: 495,
				quantity: 1000,
				description: 'Spectral Cut-Out Minidress',
				subCategoryId: dressSubCategory?.id,
				categoryId: clothing.id,
				thumbnailImage:
					'https://image.s5a.com/is/image/saks/0400018478358_IVORY?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
			},
			{
				title: 'Aje',
				slug: 'aje-pink',
				price: 495,
				quantity: 1000,
				description: 'Simplicity Puff-Sleeve Minidress',
				subCategoryId: dressSubCategory?.id,
				categoryId: clothing.id,
				thumbnailImage:
					'https://image.s5a.com/is/image/saks/0400018160526_BALLETPINK?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
			},
			{
				title: 'Vince',
				slug: 'vince',
				price: 425,
				quantity: 1000,
				description: 'Wrap Tie-Waist Shirt Dress',
				subCategoryId: dressSubCategory?.id,
				categoryId: clothing.id,
				thumbnailImage:
					'https://image.s5a.com/is/image/saks/0400018426175_LIGHTKYANITE?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
			},
			{
				title: 'Rails',
				slug: 'rails',
				price: 238,
				quantity: 1000,
				description: 'Lily Plaid Button-Front Shirt Dress',
				subCategoryId: dressSubCategory?.id,
				categoryId: clothing.id,
				thumbnailImage:
					'https://image.s5a.com/is/image/saks/0400018386948_BLACK?wid=534&hei=712&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
			},
		],
	});
};
