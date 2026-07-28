'use client';

import { useState, useRef } from 'react';
import { uploadAttachment } from '../actions/attachments';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../types';

interface AttachmentFormProps {
  applicationId: string;
  onAttachmentUploaded: () => void;
}

export function AttachmentForm({ applicationId, onAttachmentUploaded }: AttachmentFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('file') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setError('Please select a file');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 10MB');
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('File type not allowed. Allowed: PDF, DOC, DOCX, JPG, PNG');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadAttachment(applicationId, formData);

    if (result?.error) {
      setError(result.error);
    } else {
      form.reset();
      onAttachmentUploaded();
    }

    setIsUploading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="flex-1 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          disabled={isUploading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-gray-500">Max 10MB. Allowed: PDF, DOC, DOCX, JPG, PNG</p>
    </form>
  );
}
