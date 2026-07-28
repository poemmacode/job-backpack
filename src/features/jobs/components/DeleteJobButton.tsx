'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteJobAction } from '../actions/jobs';

interface DeleteJobButtonProps {
  jobId: string;
}

export function DeleteJobButton({ jobId }: DeleteJobButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    setIsDeleting(true);
    await deleteJobAction(jobId);
    router.push('/dashboard/jobs');
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
