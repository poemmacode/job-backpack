import { prisma } from '@/lib/prisma';

export async function getNotesByApplication(applicationId: string) {
  return prisma.note.findMany({
    where: { applicationId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getNotesByType(applicationId: string, type: string) {
  return prisma.note.findMany({
    where: { applicationId, type },
    orderBy: { createdAt: 'desc' },
  });
}

export async function searchNotes(applicationId: string, query: string) {
  return prisma.note.findMany({
    where: {
      applicationId,
      content: { contains: query, mode: 'insensitive' },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createNote(applicationId: string, content: string, type: string) {
  return prisma.note.create({
    data: {
      applicationId,
      content,
      type,
    },
  });
}

export async function updateNote(id: string, content: string) {
  return prisma.note.update({
    where: { id },
    data: { content },
  });
}

export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: { id },
  });
}

export async function getNote(id: string) {
  return prisma.note.findUnique({
    where: { id },
  });
}
