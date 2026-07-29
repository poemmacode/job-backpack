'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  getRecruitersAction,
  searchRecruitersAction,
  associateRecruiterAction,
} from '../actions/recruiters';
import { RECRUITER_ROLES } from '../types';
import type { Recruiter } from '../types';

interface AssociateRecruiterDialogProps {
  applicationId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AssociateRecruiterDialog({
  applicationId,
  isOpen,
  onClose,
}: AssociateRecruiterDialogProps) {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [selectedRecruiterId, setSelectedRecruiterId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      getRecruitersAction().then((result) => {
        if (result.data) {
          setRecruiters(result.data);
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchRecruitersAction(searchQuery).then((result) => {
          if (result.data) {
            setRecruiters(result.data);
          }
        });
      } else if (isOpen) {
        getRecruitersAction().then((result) => {
          if (result.data) {
            setRecruiters(result.data);
          }
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, isOpen]);

  function handleAssociate() {
    if (!selectedRecruiterId) return;

    startTransition(async () => {
      await associateRecruiterAction(
        applicationId,
        selectedRecruiterId,
        selectedRole || undefined
      );
      onClose();
      setSelectedRecruiterId(null);
      setSelectedRole('');
      router.refresh();
    });
  }

  function handleClose() {
    onClose();
    setSelectedRecruiterId(null);
    setSelectedRole('');
    setSearchQuery('');
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">Associate Recruiter</h3>

        <div className="mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recruiters..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-4 max-h-60 overflow-y-auto">
          {recruiters.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              No recruiters found. Create one first.
            </div>
          ) : (
            <div className="space-y-2">
              {recruiters.map((recruiter) => (
                <label
                  key={recruiter.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRecruiterId === recruiter.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="recruiter"
                    value={recruiter.id}
                    checked={selectedRecruiterId === recruiter.id}
                    onChange={() => setSelectedRecruiterId(recruiter.id)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {recruiter.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{recruiter.name}</p>
                    {recruiter.company && (
                      <p className="text-xs text-gray-500">{recruiter.company}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role (optional)
          </label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select role...</option>
            {RECRUITER_ROLES.map((role) => (
              <option key={role} value={role}>
                {role.replace('_', ' ').charAt(0).toUpperCase() + role.replace('_', ' ').slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssociate}
            disabled={!selectedRecruiterId || isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Associating...' : 'Associate'}
          </button>
        </div>
      </div>
    </div>
  );
}
