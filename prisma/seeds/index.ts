import { PrismaClient, } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const seeding = async (prisma: PrismaClient) => {
  console.log('Seeding start...');
  const now = new Date();

  const laptopCatergory = await prisma.category.create({
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
    }
  })

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
