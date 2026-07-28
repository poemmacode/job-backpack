import { Navbar } from '@/components/Navbar';
import { getUser } from '@/features/auth/hooks/useAuth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <>
      <Navbar user={user} showBack />
      {children}
    </>
  );
}
