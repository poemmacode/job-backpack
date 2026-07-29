import type { ProfileStats as ProfileStatsType } from '../types';

interface ProfileStatsProps {
  stats: ProfileStatsType;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-3xl font-bold text-blue-600">{stats.jobCount}</p>
        <p className="text-sm text-gray-600 mt-1">Jobs</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-3xl font-bold text-purple-600">{stats.applicationCount}</p>
        <p className="text-sm text-gray-600 mt-1">Applications</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-3xl font-bold text-green-600">{stats.recruiterCount}</p>
        <p className="text-sm text-gray-600 mt-1">Recruiters</p>
      </div>
    </div>
  );
}
