'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '../actions/auth';
import { AuthFormWrapper } from './AuthFormWrapper';
import type { AuthState } from '../types';

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    async (prev: AuthState | null, formData: FormData) => {
      return signup(formData);
    },
    null
  );

  return (
    <AuthFormWrapper title="Create an account" subtitle="Start tracking your job applications">
      <form action={formAction} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="you@example.com"
            />
            {state?.error?.email && (
              <p className="mt-1 text-sm text-red-600">{state.error.email[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
            />
            {state?.error?.password && (
              <p className="mt-1 text-sm text-red-600">{state.error.password[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
            />
            {state?.error?.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{state.error.confirmPassword[0]}</p>
            )}
          </div>
        </div>

        {state?.success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{state.success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating account...' : 'Create account'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
}
