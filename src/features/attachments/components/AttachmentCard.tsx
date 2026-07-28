'use client';

import { useState, useTransition } from 'react';
import { deleteAttachmentAction } from '../actions/attachments';
import { formatFileSize, FILE_TYPE_LABELS } from '../types';
import type { Attachment } from '../types';
import { getTimeAgo } from '@/features/notes/utils/getTimeAgo';

interface AttachmentCardProps {
  attachment: Attachment;
  onAttachmentDeleted: () => void;
}

export function AttachmentCard({ attachment, onAttachmentDeleted }: AttachmentCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteAttachmentAction(attachment.id);
      setShowDeleteConfirm(false);
      onAttachmentDeleted();
    });
  }

  function getFileIcon(type: string) {
    if (type === 'application/pdf') return '📄';
    if (type.includes('word')) return '📝';
    if (type.startsWith('image/')) return '🖼️';
    return '📎';
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{getFileIcon(attachment.type)}</span>
        <div>
          <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
          <p className="text-xs text-gray-500">
            {formatFileSize(attachment.size)} • {FILE_TYPE_LABELS[attachment.type] || 'File'} •{' '}
            {getTimeAgo(attachment.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={attachment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          Download
        </a>
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
        >
          Delete
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Delete Attachment</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete &quot;{attachment.name}&quot;? This action cannot be
              undone.
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
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
