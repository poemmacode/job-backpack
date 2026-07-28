'use client';

import { useRouter } from 'next/navigation';
import { AttachmentForm } from './AttachmentForm';
import { AttachmentList } from './AttachmentList';
import type { Attachment } from '../types';

interface AttachmentSectionProps {
  applicationId: string;
  initialAttachments: Attachment[];
}

export function AttachmentSection({ applicationId, initialAttachments }: AttachmentSectionProps) {
  const router = useRouter();

  function handleAttachmentUploaded() {
    router.refresh();
  }

  function handleAttachmentDeleted() {
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Attachments ({initialAttachments.length})</h3>
      </div>

      <AttachmentForm
        applicationId={applicationId}
        onAttachmentUploaded={handleAttachmentUploaded}
      />

      <AttachmentList attachments={initialAttachments} onAttachmentDeleted={handleAttachmentDeleted} />
    </div>
  );
}
