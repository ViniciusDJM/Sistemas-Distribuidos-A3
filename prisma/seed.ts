import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      password: 'password456',
    },
  });

  console.log('Created users:', { user1, user2 });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop',
      description: 'Powerful laptop for developers',
      price: 1299.99,
      userId: user1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Smartphone',
      description: 'Latest smartphone with amazing camera',
      price: 899.99,
      userId: user1.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Headphones',
      description: 'Noise cancelling headphones',
      price: 349.99,
      userId: user2.id,
    },
  });

  console.log('Created products:', { product1, product2, product3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });