import { z } from 'zod';

export const savedOpportunitySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  company: z.string().min(1, 'Company is required').max(200),
  location: z.string().max(200).optional().nullable(),
  url: z.string().url().optional().nullable(),
  salary: z.string().max(100).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  source: z.string().max(50).optional().nullable(),
});

export type SavedOpportunityInput = z.infer<typeof savedOpportunitySchema>;
