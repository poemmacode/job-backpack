export interface Recruiter {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  linkedIn: string | null;
  notes: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecruiterWithApplication extends Recruiter {
  applications: ApplicationRecruiter[];
}

export interface ApplicationRecruiter {
  id: string;
  applicationId: string;
  recruiterId: string;
  role: string | null;
  createdAt: Date;
}

export interface ApplicationRecruiterWithDetails extends ApplicationRecruiter {
  application: {
    id: string;
    status: string;
    job: {
      id: string;
      title: string;
      company: string;
    };
  };
  recruiter: Recruiter;
}

export interface RecruiterWithApplications extends Recruiter {
  applications: ApplicationRecruiterWithDetails[];
}

export interface CreateRecruiterData {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  linkedIn?: string;
  notes?: string;
}

export interface UpdateRecruiterData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  linkedIn?: string;
  notes?: string;
}

export const RECRUITER_ROLES = [
  'recruiter',
  'hiring_manager',
  'referral',
  'technical_interviewer',
  'hr',
  'other',
] as const;

export type RecruiterRole = (typeof RECRUITER_ROLES)[number];
