import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default user for comments
  const defaultUser = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'anonymous@example.com',
      name: 'Anonymous User',
    },
  });

  console.log('Created default user:', defaultUser);

  // Create a welcome post
  const welcomePost = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Welcome to MadickBlog',
      content: '# Welcome\n\nThis is your first blog post. Edit or delete it to get started.',
      authorId: defaultUser.id,
    },
  });

  console.log('Created welcome post:', welcomePost);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
