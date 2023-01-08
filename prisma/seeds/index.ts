import { PrismaClient, } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const seeding = async (prisma: PrismaClient) => {
  console.log('Seeding start...');
  const now = new Date();

  const laptopCategory = await prisma.category.create({
		data: {
			title: 'Laptop',
			thumbnailImageUrl:
				'https://www.apple.com/v/mac/home/br/images/overview/compare/compare_mbp14_and_16__f2dhysusb5im_large.png',
			subCategory: {
				createMany: {
					data: [
						{
							title: 'MacBook Pro',
						},
						{
							title: 'MacBook Air',
						},
						{
							title: 'Macbook',
						},
						{
							title: 'iMac',
						},
					],
				},
			},
		},
	});
  const phoneCategory = await prisma.category.create({
		data: {
			title: 'Phones',
			thumbnailImageUrl:
				'https://www.apple.com/v/iphone/home/bk/images/overview/why-iphone/ios16__b66zg2a3322q_large.jpg',
			subCategory: {
				createMany: {
					data: [
						{
							title: 'iPhone 14',
						},
						{
							title: 'iPhone 14 Pro',
						},
						{
							title: 'iPhone 13',
						},
						{
							title: 'iPhone 13 Pro',
						},
						{
							title: 'iPhone Mini',
						},
					],
				},
			},
		},
	});
  const tabletCategory = await prisma.category.create({
		data: {
			title: 'Tablets',
			thumbnailImageUrl:
				'https://www.apple.com/v/ipad/home/cc/images/overview/hero/ipad_hero__d0tgmaq6shm6_large.jpg',
			subCategory: {
				createMany: {
					data: [
						{
							title: 'iPad Air',
						},
						{
							title: 'iPad Mini',
						},
						{
							title: 'iPad Pro',
						},
					],
				},
			},
		},
	});
  const accessoryCategory = await prisma.category.create({
		data: {
			title: 'Accessories',
			thumbnailImageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/magsafe-202209?wid=2880&hei=960&fmt=jpeg&qlt=90&.v=1666047384972',
			subCategory: {
				createMany: {
					data: [
						{
							title: 'Airpods',
						},
						{
							title: 'Airpods Max',
						},
						{
							title: 'Chargers',
						},
						{
							title: 'Cables',
						},
						{
							title: 'Cases',
						},
						{
							title: 'Apple Watch',
						},
					],
				},
			},
		},
	});

	const iPhoneCategory = await prisma.subCategory.findFirst({
		where: {
			title: 'iPhone 14',
		},
	});

	const macbookProSubCategory = await prisma.subCategory.findFirst({
		where: {
			title: 'MacBook Pro',
		},
	});

	const iPadProSubCategory = await prisma.subCategory.findFirst({
		where: {
			title: 'iPad Pro',
		},
	});

	const appleWatchSubCategory = await prisma.subCategory.findFirst({
		where: {
			title: 'Apple Watch',
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
			subCategory: {
				connect: {
					id: iPhoneCategory?.id,
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
			highlightTitle: 'iPhone 14',
			highlightDescription: 'The best iPhone ever',
			productHighlights: {
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
				subCategoryId: macbookProSubCategory?.id,
				thumbnailImage:
					'https://www.techadvisor.com/wp-content/uploads/2022/06/redesigned_macbook_pro_2021_news.jpg?quality=50&strip=all',
			},
			{
				title: 'iPad Pro 2021',
				price: 999,
				quantity: 1000,
				subCategoryId: iPadProSubCategory?.id,
				thumbnailImage:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9ZmlQ_-NOAtMXdC_I5PwYclT4rmBYQqMkQ&usqp=CAU',
			},
			{
				title: 'Apple Watch Series 7',
				price: 599,
				quantity: 1000,
				subCategoryId: appleWatchSubCategory?.id,
				thumbnailImage:
					'https://www.klarna.com/sac/product/1200x630/3002867167/Apple-Watch-Series-7-Cellular-45mm-Aluminium-Case-with-Sport-Band.jpg',
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
