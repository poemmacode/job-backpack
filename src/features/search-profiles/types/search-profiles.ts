import type { SearchProfile } from '@prisma/client';

export type { SearchProfile };

export type WorkType = 'remote' | 'hybrid' | 'onsite' | 'any';

export interface SearchProfileFormData {
  name: string;
  locations: string[];
  workType: WorkType | null;
  salaryMin: number | null;
  salaryMax: number | null;
  skills: string[];
  notes: string | null;
}
