import type { Job } from '@prisma/client';
import { JobHeader } from './JobHeader';
import { JobInfo } from './JobInfo';
import { JobNotes } from './JobNotes';

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <div>
      <JobHeader id={job.id} title={job.title} company={job.company} url={job.url} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <JobNotes notes={job.notes} />
        </div>

        <div>
          <JobInfo
            location={job.location}
            salary={job.salary}
            url={job.url}
            createdAt={job.createdAt}
            updatedAt={job.updatedAt}
          />
        </div>
      </div>
    </div>
  );
}
