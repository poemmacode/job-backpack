import Link from 'next/link';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/Button';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user.email}</p>

        <div className="mt-8">
          <Link href="/dashboard/jobs">
            <Button>View My Jobs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
