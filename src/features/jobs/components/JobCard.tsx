import Link from 'next/link';
import type { Job } from '@/generated/prisma/client';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/dashboard/jobs/${job.id}`}
      className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
      </div>
      {job.location && <p className="mt-2 text-sm text-gray-500">{job.location}</p>}
      {job.salary && <p className="mt-1 text-sm text-green-600 font-medium">{job.salary}</p>}
      <p className="mt-2 text-xs text-gray-400">
        Added {new Date(job.createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
}
