import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getUserProfile } from '@/features/auth/repositories/users';
import { getJobCount } from '@/features/jobs/repositories/jobs';
import { getApplicationCounts } from '@/features/applications/repositories/applications';
import { getRecruiterCount } from '@/features/recruiters/repositories/recruiters';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { PasswordForm } from '@/features/profile/components/PasswordForm';
import { ProfileStats } from '@/features/profile/components/ProfileStats';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getUserProfile(user.id);

  if (!profile) {
    redirect('/login');
  }

  const [jobCount, applicationCounts, recruiterCount] = await Promise.all([
    getJobCount(user.id),
    getApplicationCounts(user.id),
    getRecruiterCount(user.id),
  ]);

  const totalApplications = Object.values(applicationCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile</h1>

        <div className="space-y-6">
          <ProfileHeader user={profile} />

          <ProfileStats
            stats={{
              jobCount,
              applicationCount: totalApplications,
              recruiterCount,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProfileForm user={profile} />
            <PasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
