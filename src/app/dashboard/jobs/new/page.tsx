import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { JobForm } from '@/features/jobs';
import { createJobAction } from '@/features/jobs/actions/jobs';

export default async function NewJobPage() {
  const user = await getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Job</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <JobForm action={createJobAction} submitLabel="Create Job" />
        </div>
      </div>
    </div>
  );
}
