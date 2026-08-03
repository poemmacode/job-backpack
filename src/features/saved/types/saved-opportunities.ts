import type { SavedOpportunity } from '@prisma/client';

export type { SavedOpportunity };

export type Priority = 'low' | 'normal' | 'high';

export interface SavedOpportunityFormData {
  title: string;
  company: string;
  location?: string | null;
  url?: string | null;
  salary?: string | null;
  notes?: string | null;
  priority: Priority;
  source?: string | null;
}
