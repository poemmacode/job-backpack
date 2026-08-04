import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { getUser } from '@/features/auth/hooks/useAuth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <>
      <Navbar user={user} showBack />
      <Sidebar user={user} />
      <main className="lg:pl-60 pt-16 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
