import { z } from 'zod';

export const searchProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  locations: z.array(z.string()).optional().default([]),
  workType: z.enum(['remote', 'hybrid', 'onsite', 'any']).nullable().optional(),
  salaryMin: z.number().int().positive().nullable().optional(),
  salaryMax: z.number().int().positive().nullable().optional(),
  skills: z.array(z.string()).optional().default([]),
  notes: z.string().max(500).nullable().optional(),
});

export type SearchProfileInput = z.infer<typeof searchProfileSchema>;
