'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './Button';
import Logo from './Logo';
import BackpackIcon from './BackpackIcon';
import { logout } from '@/features/auth/actions/auth';

interface NavbarProps {
  user?: {
    email?: string;
  } | null;
  showBack?: boolean;
}

export function Navbar({ user, showBack = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                type="button"
                onClick={() => router.back()}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8">
                <BackpackIcon />
              </div>
              <div className="h-6 w-24">
                <Logo />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              How it Works
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/jobs">
                  <Button variant="secondary" size="sm">
                    My Jobs
                  </Button>
                </Link>
                <Link href="/dashboard/applications">
                  <Button variant="secondary" size="sm">
                    Applications
                  </Button>
                </Link>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="#features" className="text-gray-700 hover:text-gray-900 px-2 py-1">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-gray-900 px-2 py-1">
                How it Works
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="secondary" size="sm" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/jobs">
                      <Button variant="secondary" size="sm" className="w-full">
                        My Jobs
                      </Button>
                    </Link>
                    <Link href="/dashboard/applications">
                      <Button variant="secondary" size="sm" className="w-full">
                        Applications
                      </Button>
                    </Link>
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
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="secondary" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="primary" size="sm" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
