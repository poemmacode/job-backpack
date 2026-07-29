export type ActivityType =
  | 'status_change'
  | 'note_created'
  | 'attachment_uploaded'
  | 'recruiter_associated'
  | 'job_created';

export interface Activity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  title: string;
  description: string;
  applicationId?: string;
  jobId?: string;
  href: string;
}

export interface ActivityFilters {
  type?: ActivityType | 'all';
}

export interface GetActivitiesOptions {
  limit: number;
  offset: number;
  type?: ActivityType | 'all';
}

export const ACTIVITY_TYPE_CONFIG: Record<
  ActivityType,
  { icon: string; color: string; bgColor: string; label: string }
> = {
  status_change: {
    icon: '📋',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Status Change',
  },
  note_created: {
    icon: '📝',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Note Created',
  },
  attachment_uploaded: {
    icon: '📎',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: 'Attachment',
  },
  recruiter_associated: {
    icon: '👤',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    label: 'Recruiter',
  },
  job_created: {
    icon: '💼',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    label: 'Job Created',
  },
};
