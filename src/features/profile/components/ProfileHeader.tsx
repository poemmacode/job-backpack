import type { UserProfile } from '../types';

interface ProfileHeaderProps {
  user: UserProfile;
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function getInitials(name: string | null, email: string) {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return email.charAt(0).toUpperCase();
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">
            {getInitials(user.name, user.email)}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.name || 'No name set'}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Member since {formatDate(user.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
