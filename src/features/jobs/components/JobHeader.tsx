import Link from 'next/link';
import { DeleteJobButton } from './DeleteJobButton';
import { ApplyButton } from '@/features/applications/components/ApplyButton';

interface JobHeaderProps {
  id: string;
  title: string;
  company: string;
  url?: string | null;
  hasApplied: boolean;
}

export function JobHeader({ id, title, company, url, hasApplied }: JobHeaderProps) {
  return (
    <div className="mb-8">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        <Link href="/dashboard" className="hover:text-gray-900">
          Dashboard
        </Link>
        <span className="text-gray-400">/</span>
        <Link href="/dashboard/jobs" className="hover:text-gray-900">
          Jobs
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{title}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-700">{company}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <ApplyButton jobId={id} hasApplied={hasApplied} />
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              View Original
            </a>
          )}
          <Link
            href={`/dashboard/jobs/${id}/edit`}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Edit
          </Link>
          <DeleteJobButton jobId={id} />
          <Link
            href="/dashboard/jobs"
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
