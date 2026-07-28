'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { resetPassword } from '../actions/auth';
import { AuthFormWrapper } from './AuthFormWrapper';
import type { AuthState } from '../types';

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    async (prev: AuthState | null, formData: FormData) => {
      return resetPassword(formData);
    },
    null
  );

  return (
    <AuthFormWrapper
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form action={formAction} className="mt-8 space-y-6">
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
          {isPending ? 'Sending...' : 'Send reset link'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
}
