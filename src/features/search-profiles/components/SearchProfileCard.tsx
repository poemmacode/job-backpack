'use client';

import { SearchProfile } from '../types/search-profiles';

interface SearchProfileCardProps {
  profile: SearchProfile;
  onEdit: (profile: SearchProfile) => void;
  onDelete: (profile: SearchProfile) => void;
  onSetDefault: (id: string) => void;
  isLoading: boolean;
}

const WORK_TYPE_LABELS: Record<string, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'Onsite',
  any: 'Any',
};

export function SearchProfileCard({
  profile,
  onEdit,
  onDelete,
  onSetDefault,
  isLoading,
}: SearchProfileCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border p-5 transition-all hover:shadow-md ${
        profile.isDefault ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{profile.name}</h3>
          {profile.isDefault && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Active
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        {profile.locations.length > 0 && (
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{profile.locations.join(', ')}</span>
          </div>
        )}

        {profile.workType && (
          <div className="flex items-center gap-2">
            <span>💼</span>
            <span>{WORK_TYPE_LABELS[profile.workType]}</span>
          </div>
        )}

        {(profile.salaryMin || profile.salaryMax) && (
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span>
              {profile.salaryMin && profile.salaryMax
                ? `$${profile.salaryMin.toLocaleString()} - $${profile.salaryMax.toLocaleString()}`
                : profile.salaryMin
                  ? `From $${profile.salaryMin.toLocaleString()}`
                  : `Up to $${profile.salaryMax?.toLocaleString()}`}
            </span>
          </div>
        )}

        {profile.skills.length > 0 && (
          <div className="flex items-start gap-2">
            <span>🛠</span>
            <div className="flex flex-wrap gap-1">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.notes && (
          <div className="flex items-start gap-2">
            <span>📝</span>
            <span className="text-gray-500">{profile.notes}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        {!profile.isDefault && (
          <button
            onClick={() => onSetDefault(profile.id)}
            disabled={isLoading}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
          >
            Set as Active
          </button>
        )}
        <button
          onClick={() => onEdit(profile)}
          disabled={isLoading}
          className="text-xs text-gray-600 hover:text-gray-700 font-medium disabled:opacity-50 ml-auto"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(profile)}
          disabled={isLoading}
          className="text-xs text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
