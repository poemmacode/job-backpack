import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getRecruiters } from '@/features/recruiters/repositories/recruiters';
import { RecruiterList } from '@/features/recruiters/components/RecruiterList';
import { RecruiterForm } from '@/features/recruiters/components/RecruiterForm';

export default async function RecruitersPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const recruiters = await getRecruiters(user.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruiters</h1>
            <p className="text-gray-600 mt-1">Manage your recruiting contacts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Recruiter</h2>
          <RecruiterForm />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            All Recruiters ({recruiters.length})
          </h2>
          <RecruiterList recruiters={recruiters} />
        </div>
      </div>
    </div>
  );
}
