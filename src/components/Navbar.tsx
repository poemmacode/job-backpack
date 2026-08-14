'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './Button';
import { logout } from '@/features/auth/actions/auth';
import { SearchInput } from '@/features/search/components/SearchInput';

interface NavbarProps {
  user?: {
    email?: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Job Backpack
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <div className="w-64">
                  <SearchInput />
                </div>
                <Link href="/dashboard/jobs/new">
                  <Button variant="primary" size="sm">
                    Add Job
                  </Button>
                </Link>
                <form action={logout}>
                  <Button variant="outline" size="sm" type="submit">
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {user && (
                <>
                  <div className="px-2">
                    <SearchInput />
                  </div>
                  <Link href="/dashboard/jobs/new">
                    <Button variant="primary" size="sm" className="w-full">
                      Add Job
                    </Button>
                  </Link>
                  <form action={logout}>
                    <Button variant="outline" size="sm" type="submit" className="w-full">
                      Logout
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
