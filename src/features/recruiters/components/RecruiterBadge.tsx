import type { Recruiter } from '../types';

interface RecruiterBadgeProps {
  recruiter: Recruiter;
  role?: string | null;
}

export function RecruiterBadge({ recruiter, role }: RecruiterBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-xs font-medium text-gray-600">
          {recruiter.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-900">{recruiter.name}</span>
        {recruiter.company && (
          <span className="text-[10px] text-gray-500">{recruiter.company}</span>
        )}
      </div>
      {role && (
        <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 capitalize">
          {role.replace('_', ' ')}
        </span>
      )}
    </div>
  );
}
