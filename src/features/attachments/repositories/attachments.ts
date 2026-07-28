import { prisma } from '@/lib/prisma';

export async function getAttachments(applicationId: string) {
  return prisma.attachment.findMany({
    where: { applicationId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAttachment(id: string) {
  return prisma.attachment.findUnique({
    where: { id },
  });
}

export async function createAttachment(
  applicationId: string,
  name: string,
  url: string,
  size: number,
  type: string
) {
  return prisma.attachment.create({
    data: {
      applicationId,
      name,
      url,
      size,
      type,
    },
  });
}

export async function deleteAttachment(id: string) {
  return prisma.attachment.delete({
    where: { id },
  });
}
