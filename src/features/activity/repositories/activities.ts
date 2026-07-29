import { prisma } from '@/lib/prisma';
import type { Activity, ActivityType, GetActivitiesOptions } from '../types';

interface RawActivity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  title: string;
  description: string;
  applicationId?: string;
  jobId?: string;
}

export async function getActivities(
  userId: string,
  options: GetActivitiesOptions
): Promise<Activity[]> {
  const { limit, offset, type } = options;
  const activities: RawActivity[] = [];

  const includeFilter = type && type !== 'all' ? type : null;

  // Get application status changes
  if (!includeFilter || includeFilter === 'status_change') {
    const applications = await prisma.application.findMany({
      where: { userId },
      select: {
        id: true,
        status: true,
        updatedAt: true,
        job: { select: { title: true, company: true } },
      },
      orderBy: { updatedAt: 'desc' },
      take: limit * 2,
    });

    applications.forEach((app) => {
      activities.push({
        id: `app-${app.id}`,
        type: 'status_change',
        timestamp: app.updatedAt,
        title: `Status changed to "${app.status}"`,
        description: `${app.job.title} at ${app.job.company}`,
        applicationId: app.id,
      });
    });
  }

  // Get notes
  if (!includeFilter || includeFilter === 'note_created') {
    const notes = await prisma.note.findMany({
      where: { application: { userId } },
      select: {
        id: true,
        content: true,
        createdAt: true,
        application: {
          select: {
            id: true,
            job: { select: { title: true, company: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit * 2,
    });

    notes.forEach((note) => {
      activities.push({
        id: `note-${note.id}`,
        type: 'note_created',
        timestamp: note.createdAt,
        title: 'Note added',
        description: note.content.slice(0, 60) + (note.content.length > 60 ? '...' : ''),
        applicationId: note.application.id,
      });
    });
  }

  // Get attachments
  if (!includeFilter || includeFilter === 'attachment_uploaded') {
    const attachments = await prisma.attachment.findMany({
      where: { application: { userId } },
      select: {
        id: true,
        name: true,
        createdAt: true,
        application: {
          select: {
            id: true,
            job: { select: { title: true, company: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit * 2,
    });

    attachments.forEach((attachment) => {
      activities.push({
        id: `attachment-${attachment.id}`,
        type: 'attachment_uploaded',
        timestamp: attachment.createdAt,
        title: 'Attachment uploaded',
        description: attachment.name,
        applicationId: attachment.application.id,
      });
    });
  }

  // Get recruiter associations
  if (!includeFilter || includeFilter === 'recruiter_associated') {
    const recruiterAssociations = await prisma.applicationRecruiter.findMany({
      where: { application: { userId } },
      select: {
        id: true,
        createdAt: true,
        recruiter: { select: { name: true, company: true } },
        application: {
          select: {
            id: true,
            job: { select: { title: true, company: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit * 2,
    });

    recruiterAssociations.forEach((assoc) => {
      activities.push({
        id: `recruiter-${assoc.id}`,
        type: 'recruiter_associated',
        timestamp: assoc.createdAt,
        title: 'Recruiter associated',
        description: `${assoc.recruiter.name}${assoc.recruiter.company ? ` - ${assoc.recruiter.company}` : ''}`,
        applicationId: assoc.application.id,
      });
    });
  }

  // Get jobs created
  if (!includeFilter || includeFilter === 'job_created') {
    const jobs = await prisma.job.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        company: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit * 2,
    });

    jobs.forEach((job) => {
      activities.push({
        id: `job-${job.id}`,
        type: 'job_created',
        timestamp: job.createdAt,
        title: 'Job added',
        description: `${job.title} at ${job.company}`,
        jobId: job.id,
      });
    });
  }

  // Sort by timestamp descending
  activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Apply pagination
  const paginatedActivities = activities.slice(offset, offset + limit);

  // Map to Activity type with href
  return paginatedActivities.map((activity) => ({
    ...activity,
    href: activity.applicationId
      ? `/dashboard/applications/${activity.applicationId}`
      : activity.jobId
        ? `/dashboard/jobs/${activity.jobId}`
        : '/dashboard',
  }));
}

export async function getTotalActivities(userId: string): Promise<number> {
  const [appCount, noteCount, attachmentCount, recruiterCount, jobCount] = await Promise.all([
    prisma.application.count({ where: { userId } }),
    prisma.note.count({ where: { application: { userId } } }),
    prisma.attachment.count({ where: { application: { userId } } }),
    prisma.applicationRecruiter.count({ where: { application: { userId } } }),
    prisma.job.count({ where: { userId } }),
  ]);

  return appCount + noteCount + attachmentCount + recruiterCount + jobCount;
}
