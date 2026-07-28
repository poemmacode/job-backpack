import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getApplications } from '@/features/applications/repositories/applications';
import { KanbanBoard } from '@/features/kanban/components/KanbanBoard';

export default async function KanbanPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const applications = await getApplications(user.id);

  const filteredApplications = applications.filter((app) =>
    ['applied', 'interview', 'offer', 'rejected'].includes(app.status)
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
        <p className="mt-2 text-gray-600">Drag and drop applications between columns</p>

        <div className="mt-8">
          <KanbanBoard applications={filteredApplications} />
        </div>
      </div>
    </div>
  );
}
