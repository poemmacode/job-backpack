import { JobResult } from '../types/scraper';
import { prisma } from '@/lib/prisma';

export function deduplicateResults(
  results: JobResult[],
  existingJobs: { title: string; company: string }[]
): JobResult[] {
  const existingKeys = new Set(
    existingJobs.map(
      (j) => `${j.title.toLowerCase().trim()}|${j.company.toLowerCase().trim()}`
    )
  );

  const seen = new Set<string>();

  return results.filter((job) => {
    const key = `${job.title.toLowerCase().trim()}|${job.company.toLowerCase().trim()}`;

    if (existingKeys.has(key) || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function getExistingJobs(
  userId: string
): Promise<{ title: string; company: string }[]> {
  return prisma.job.findMany({
    where: { userId },
    select: { title: true, company: true },
  });
}
