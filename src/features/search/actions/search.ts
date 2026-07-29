'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/features/auth/hooks/useAuth';
import type { SearchResults } from '../types';

export async function searchGlobalAction(query: string): Promise<SearchResults> {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  if (!query || query.trim().length < 2) {
    return { jobs: [], applications: [], notes: [], recruiters: [] };
  }

  const trimmedQuery = query.trim();

  const [jobs, applications, notes, recruiters] = await Promise.all([
    prisma.job.findMany({
      where: {
        userId: user.id,
        OR: [
          { title: { contains: trimmedQuery, mode: 'insensitive' } },
          { company: { contains: trimmedQuery, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        company: true,
        location: true,
      },
      take: 5,
    }),
    prisma.application.findMany({
      where: {
        userId: user.id,
        OR: [
          { job: { company: { contains: trimmedQuery, mode: 'insensitive' } } },
          { status: { contains: trimmedQuery, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        status: true,
        job: {
          select: {
            id: true,
            title: true,
            company: true,
          },
        },
      },
      take: 5,
    }),
    prisma.note.findMany({
      where: {
        application: { userId: user.id },
        content: { contains: trimmedQuery, mode: 'insensitive' },
      },
      select: {
        id: true,
        content: true,
        type: true,
        application: {
          select: {
            id: true,
            job: {
              select: {
                id: true,
                title: true,
                company: true,
              },
            },
          },
        },
      },
      take: 5,
    }),
    prisma.recruiter.findMany({
      where: {
        userId: user.id,
        OR: [
          { name: { contains: trimmedQuery, mode: 'insensitive' } },
          { company: { contains: trimmedQuery, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        company: true,
        email: true,
      },
      take: 5,
    }),
  ]);

  return { jobs, applications, notes, recruiters };
}
