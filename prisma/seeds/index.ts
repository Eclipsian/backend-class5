import { PrismaClient, } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const seeding = async (prisma: PrismaClient) => {
  console.log('Seeding start...');
  const now = new Date();

  const laptopCategory = await prisma.category.create({
    data: {
      title: "Laptop",
    },
  });
  const phoneCategory = await prisma.category.create({
    data: {
      title: "Phones",
    },
  });
  const tabletCategory = await prisma.category.create({
    data: {
      title: "Tablets",
    },
  });
  const accessoryCategory = await prisma.category.create({
    data: {
      title: "Accessories",
    },
  });

  const exampleStudent = await prisma.student.create({
    data: {
      firstName: 'Kevin',
      lastName: 'Zhang',
      age: 10,
      grade: 'A',
      email: 'kevin.zhang@example.com',
      password: '123456',
    },
  });

  const exampleProduct = await prisma.product.create({
		data: {
			title: 'iPhone 14',
			price: 6572,
			quantity: 48973,
      description: 'Best iPhone ever',
			category: {
				connect: {
					id: phoneCategory.id,
				},
			},
			thumbnailImage:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617560',
			reviews: {
				createMany: {
					data: [
						{
							rating: 5,
							comment: 'I love this product',
							studentId: exampleStudent.id,
						},
						{
							rating: 4,
							comment: 'I like this product',
							studentId: exampleStudent.id,
						},
					],
				},
			},
			highlightTitle: 'iPhone 14 Pro',
			highlightDescription: 'The best iPhone ever',
			productHighlight: {
				createMany: {
					data: [
						{
							title: 'A14 Bionic',
							subtitle: 'The fastest chip in a smartphone',
							image: '',
						},
						{
							title: 'Pro camera system',
							subtitle: 'The most advanced camera system ever on iPhone',
							image: '',
						},
					],
				},
			},
		},
	});

  const products = await prisma.product.createMany({
		data: [
			{
				title: 'MacBook Pro 2021',
				price: 2999,
				quantity: 1000,
				categoryId: laptopCategory.id,
			},
			{
				title: 'iPad Pro 2021',
				price: 999,
				quantity: 1000,
				categoryId: tabletCategory.id,
			},
			{
				title: 'Apple Watch Series 7',
				price: 599,
				quantity: 1000,
				categoryId: accessoryCategory.id,
			},
		],
	});

  if (products) {
    console.log(' products created.');
  }

  const order = await prisma.order.create({
    data: {
      student: {
        connect: {
          id: exampleStudent.id,
        },
      },
      products: {
        connect: [
          {
            id: exampleProduct.id,
          },
          //{
            // can add another product
          //},
        ],
      },
    },
  });

};
