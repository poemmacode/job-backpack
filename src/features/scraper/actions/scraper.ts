'use server';

import { getUser } from '@/features/auth/hooks/useAuth';
import { scrapeJobs } from '../lib/scrapers';
import { deduplicateResults, getExistingJobs } from '../utils/dedup';
import { prisma } from '@/lib/prisma';
import { ScraperSource } from '../types/scraper';
import { z } from 'zod';

const searchSchema = z.object({
  source: z.enum(['indeed', 'glassdoor']),
  query: z.string().min(1, 'Search query is required').max(200),
  location: z.string().max(200).optional().default(''),
});

export async function searchJobs(
  source: ScraperSource,
  query: string,
  location: string
) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = searchSchema.parse({ source, query, location });

  const results = await scrapeJobs(
    validated.source,
    validated.query,
    validated.location
  );

  const existingJobs = await getExistingJobs(user.id);
  const uniqueResults = deduplicateResults(results, existingJobs);

  return {
    jobs: uniqueResults,
    total: uniqueResults.length,
    source: validated.source,
  };
}

const importSchema = z.object({
  jobs: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      location: z.string().nullable(),
      url: z.string(),
      source: z.string(),
      salary: z.string().nullable(),
    })
  ),
});

export async function importJobs(
  jobs: { title: string; company: string; location: string | null; url: string; source: string; salary: string | null }[]
) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = importSchema.parse({ jobs });

  const created = await prisma.job.createMany({
    data: validated.jobs.map((job) => ({
      title: job.title,
      company: job.company,
      location: job.location,
      url: job.url,
      salary: job.salary,
      notes: `Imported from ${job.source}`,
      userId: user.id,
    })),
    skipDuplicates: true,
  });

  return { imported: created.count };
}
