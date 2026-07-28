import { Navbar } from '@/components/Navbar';
import { Hero, TargetAudience, Features, HowItWorks, Footer } from '@/features/landing';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
