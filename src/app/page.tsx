import { Navbar } from '@/components/Navbar';
import { Hero, TargetAudience, Features, HowItWorks, Footer } from '@/features/landing';
import { getUser } from '@/features/auth/hooks/useAuth';

export default async function Home() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} />
      <main>
        <Hero />
        <TargetAudience />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
