import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect, notFound } from 'next/navigation';
import { getJob } from '@/features/jobs/repositories/jobs';
import { JobForm } from '@/features/jobs';
import { updateJobAction } from '@/features/jobs/actions/jobs';

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const job = await getJob(id, user.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Job</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <JobForm
            initialData={job}
            action={(formData) => updateJobAction(id, formData)}
            submitLabel="Update Job"
          />
        </div>
      </div>
    </div>
  );
}
