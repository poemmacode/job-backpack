import { prisma } from '@/lib/prisma';

export async function getOrCreateUser(userId: string, email: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser) {
      return existingUser;
    }

    return await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });
  } catch (error) {
    console.error('Error syncing user with Prisma:', error);
    return null;
  }
}

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      createdAt: true,
    },
  });
}

export async function updateUser(
  userId: string,
  data: { name?: string; avatarUrl?: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}
