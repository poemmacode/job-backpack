'use client';

import { useState, useCallback, useEffect, useTransition } from 'react';
import { getAttachments } from '../repositories/attachments';
import { AttachmentForm } from './AttachmentForm';
import { AttachmentList } from './AttachmentList';
import type { Attachment } from '../types';

interface AttachmentSectionProps {
  applicationId: string;
  initialAttachments: Attachment[];
}

export function AttachmentSection({ applicationId, initialAttachments }: AttachmentSectionProps) {
  const [attachments, setAttachments] = useState<Attachment[]>(initialAttachments);
  const [isPending, startTransition] = useTransition();

  const fetchAttachments = useCallback(async () => {
    const fetchedAttachments = await getAttachments(applicationId);
    setAttachments(fetchedAttachments);
  }, [applicationId]);

  useEffect(() => {
    startTransition(async () => {
      await fetchAttachments();
    });
  }, [fetchAttachments]);

  function handleAttachmentUploaded() {
    fetchAttachments();
  }

  function handleAttachmentDeleted() {
    fetchAttachments();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Attachments ({attachments.length})</h3>
      </div>

      <AttachmentForm
        applicationId={applicationId}
        onAttachmentUploaded={handleAttachmentUploaded}
      />

      {isPending ? (
        <div className="text-center py-8 text-gray-500 text-sm">Loading attachments...</div>
      ) : (
        <AttachmentList attachments={attachments} onAttachmentDeleted={handleAttachmentDeleted} />
      )}
    </div>
  );
}
