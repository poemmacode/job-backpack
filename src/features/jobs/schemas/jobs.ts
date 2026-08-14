import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().optional(),
  url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  salary: z.string().optional(),
  notes: z.string().optional(),
  englishRequired: z.boolean().optional(),
  englishLevel: z.string().optional(),
  employmentType: z.string().optional(),
});

export const updateJobSchema = createJobSchema;

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
