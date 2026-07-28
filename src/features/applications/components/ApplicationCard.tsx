'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Application, Job } from '@prisma/client';
import { StatusBadge, STATUS_OPTIONS } from './StatusBadge';
import { updateApplicationStatusAction, deleteApplicationAction } from '../actions/applications';

interface ApplicationCardProps {
  application: Application & { job: Job };
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const [status, setStatus] = useState(application.status);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(newStatus: string) {
    setIsUpdating(true);
    await updateApplicationStatusAction(application.id, newStatus);
    setStatus(newStatus);
    setIsUpdating(false);
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to remove this application?')) {
      return;
    }
    await deleteApplicationAction(application.id);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <Link href={`/dashboard/applications/${application.id}`} className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
            {application.job.title}
          </h3>
          <p className="text-gray-700">{application.job.company}</p>
          {application.job.location && (
            <p className="text-sm text-gray-600 mt-1">{application.job.location}</p>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleDelete}
          className="text-sm text-red-600 hover:text-red-800 px-3 py-1.5"
        >
          Remove
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Applied {new Date(application.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
