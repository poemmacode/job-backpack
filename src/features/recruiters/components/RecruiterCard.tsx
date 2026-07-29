'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteRecruiterAction } from '../actions/recruiters';
import { RecruiterForm } from './RecruiterForm';
import type { Recruiter } from '../types';

interface RecruiterCardProps {
  recruiter: Recruiter;
}

export function RecruiterCard({ recruiter }: RecruiterCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteRecruiterAction(recruiter.id);
      setShowDeleteConfirm(false);
      router.refresh();
    });
  }

  function handleSaved() {
    setIsEditing(false);
    router.refresh();
  }

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <RecruiterForm
          recruiter={recruiter}
          onSaved={handleSaved}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {recruiter.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{recruiter.name}</h4>
              {recruiter.company && (
                <p className="text-xs text-gray-500">{recruiter.company}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-600 hover:text-gray-900"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          {recruiter.email && (
            <p className="text-xs text-gray-600">
              <span className="text-gray-400">Email:</span> {recruiter.email}
            </p>
          )}
          {recruiter.phone && (
            <p className="text-xs text-gray-600">
              <span className="text-gray-400">Phone:</span> {recruiter.phone}
            </p>
          )}
          {recruiter.linkedIn && (
            <p className="text-xs text-gray-600">
              <span className="text-gray-400">LinkedIn:</span>{' '}
              <a
                href={recruiter.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {recruiter.linkedIn}
              </a>
            </p>
          )}
        </div>

        {recruiter.notes && (
          <p className="mt-3 text-xs text-gray-500 line-clamp-2">{recruiter.notes}</p>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Delete Recruiter</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete {recruiter.name}? This action cannot be undone.
            </p>
            <div className="mt-4 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
