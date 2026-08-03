import { Suspense } from 'react';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getSavedOpportunities } from '@/features/saved/repositories/saved-opportunities';
import { SavedOpportunitiesPageClient } from '@/features/saved/components/SavedOpportunitiesPageClient';

function SavedSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-2" />
        </div>
        <div className="flex gap-2 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-48 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

async function SavedContent() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const opportunities = await getSavedOpportunities(user.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SavedOpportunitiesPageClient initialOpportunities={opportunities} />
      </div>
    </div>
  );
}

export default function SavedPage() {
  return (
    <Suspense fallback={<SavedSkeleton />}>
      <SavedContent />
    </Suspense>
  );
}
