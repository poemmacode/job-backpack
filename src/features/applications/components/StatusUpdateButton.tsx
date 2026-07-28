'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateApplicationStatusAction } from '@/features/applications/actions/applications';
import { getValidTransitions } from '@/features/applications/repositories/applications';

interface StatusUpdateButtonProps {
  applicationId: string;
  currentStatus: string;
}

const STATUS_LABELS: Record<string, string> = {
  interested: 'Interested',
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  accepted: 'Accepted',
  rejected: 'Rejected',
  ghosted: 'Ghosted',
  withdrawn: 'Withdrawn',
};

const DANGER_STATUSES = ['rejected', 'withdrawn'];

export function StatusUpdateButton({ applicationId, currentStatus }: StatusUpdateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const validTransitions = getValidTransitions(currentStatus);

  if (validTransitions.length === 0) {
    return null;
  }

  function handleStatusClick(status: string) {
    if (DANGER_STATUSES.includes(status)) {
      setConfirmStatus(status);
    } else {
      updateStatus(status);
    }
    setIsOpen(false);
  }

  function updateStatus(status: string) {
    startTransition(async () => {
      await updateApplicationStatusAction(applicationId, status);
      router.refresh();
    });
  }

  function handleConfirm() {
    if (confirmStatus) {
      updateStatus(confirmStatus);
      setConfirmStatus(null);
    }
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          {isPending ? (
            <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          )}
          Change Status
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="py-1">
              {validTransitions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusClick(status)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                    DANGER_STATUSES.includes(status) ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <span>{STATUS_LABELS[status]}</span>
                  {DANGER_STATUSES.includes(status) && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {confirmStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Status Change</h3>
            <p className="mt-2 text-gray-600">
              Change to &quot;{STATUS_LABELS[confirmStatus]}&quot;? This action cannot be undone.
            </p>
            <div className="mt-4 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmStatus(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
