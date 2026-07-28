import { prisma } from '@/lib/prisma';

export async function getOrCreateUser(userId: string, email: string) {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: {
      id: userId,
      email,
    },
  });
}
