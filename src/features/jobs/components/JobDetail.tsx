import Link from 'next/link';
import type { Job } from '@/generated/prisma/client';
import { DeleteJobButton } from './DeleteJobButton';

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-xl text-gray-600">{job.company}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/jobs/${job.id}/edit`}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            Edit
          </Link>
          <DeleteJobButton jobId={job.id} />
        </div>
      </div>

      <dl className="space-y-4">
        {job.location && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-gray-900">{job.location}</dd>
          </div>
        )}
        {job.url && (
          <div>
            <dt className="text-sm font-medium text-gray-500">URL</dt>
            <dd className="mt-1">
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {job.url}
              </a>
            </dd>
          </div>
        )}
        {job.salary && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Salary</dt>
            <dd className="mt-1 text-gray-900">{job.salary}</dd>
          </div>
        )}
        {job.notes && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Notes</dt>
            <dd className="mt-1 text-gray-900 whitespace-pre-wrap">{job.notes}</dd>
          </div>
        )}
      </dl>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-400">
          Created {new Date(job.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
