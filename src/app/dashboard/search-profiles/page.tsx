import { Suspense } from 'react';
import { getUser } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { getSearchProfiles } from '@/features/search-profiles/repositories/search-profiles';
import { SearchProfilesPageClient } from '@/features/search-profiles/components/SearchProfilesPageClient';

function SearchProfilesSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-2" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
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

async function SearchProfilesContent() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const profiles = await getSearchProfiles(user.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchProfilesPageClient initialProfiles={profiles} />
      </div>
    </div>
  );
}

export default function SearchProfilesPage() {
  return (
    <Suspense fallback={<SearchProfilesSkeleton />}>
      <SearchProfilesContent />
    </Suspense>
  );
}
