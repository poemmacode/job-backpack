'use client';

import { AttachmentCard } from './AttachmentCard';
import type { Attachment } from '../types';

interface AttachmentListProps {
  attachments: Attachment[];
  onAttachmentDeleted: () => void;
}

export function AttachmentList({ attachments, onAttachmentDeleted }: AttachmentListProps) {
  if (attachments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No attachments yet. Upload your first file above.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attachments.map((attachment) => (
        <AttachmentCard
          key={attachment.id}
          attachment={attachment}
          onAttachmentDeleted={onAttachmentDeleted}
        />
      ))}
    </div>
  );
}
