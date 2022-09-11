import { PrismaClient } from '@prisma/client';
import { seeding } from './seeds';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  seeding(prisma);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
