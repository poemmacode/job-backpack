'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { disassociateRecruiterAction } from '../actions/recruiters';
import { RecruiterBadge } from './RecruiterBadge';
import { AssociateRecruiterDialog } from './AssociateRecruiterDialog';
import type { ApplicationRecruiterWithDetails } from '../types';

interface RecruiterSectionProps {
  applicationId: string;
  recruiters: ApplicationRecruiterWithDetails[];
}

export function RecruiterSection({ applicationId, recruiters }: RecruiterSectionProps) {
  const [showAssociateDialog, setShowAssociateDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDisassociate(recruiterId: string) {
    startTransition(async () => {
      await disassociateRecruiterAction(applicationId, recruiterId);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Recruiters ({recruiters.length})
        </h3>
        <button
          type="button"
          onClick={() => setShowAssociateDialog(true)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          + Associate
        </button>
      </div>

      {recruiters.length === 0 ? (
        <p className="text-sm text-gray-500 py-4">
          No recruiters associated yet. Click &quot;Associate&quot; to add one.
        </p>
      ) : (
        <div className="space-y-3">
          {recruiters.map((association) => (
            <div
              key={association.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <RecruiterBadge
                recruiter={association.recruiter}
                role={association.role}
              />
              <button
                type="button"
                onClick={() => handleDisassociate(association.recruiterId)}
                disabled={isPending}
                className="text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <AssociateRecruiterDialog
        applicationId={applicationId}
        isOpen={showAssociateDialog}
        onClose={() => setShowAssociateDialog(false)}
      />
    </div>
  );
}
