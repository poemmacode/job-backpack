'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { createJobAction, updateJobAction } from '../actions/jobs';

interface JobFormProps {
  jobId?: string;
  initialData?: {
    title?: string;
    company?: string;
    location?: string | null;
    url?: string | null;
    salary?: string | null;
    notes?: string | null;
  };
  submitLabel: string;
}

export function JobForm({ jobId, initialData, submitLabel }: JobFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = jobId
      ? await updateJobAction(jobId, formData)
      : await createJobAction(formData);
    if (result?.error) {
      setErrors(result.error);
      setIsPending(false);
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Job Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Software Engineer"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company *
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          defaultValue={initialData?.company}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Google"
        />
        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company[0]}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={initialData?.location ?? ''}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="San Francisco, CA or Remote"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Job URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          defaultValue={initialData?.url ?? ''}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="https://..."
        />
        {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url[0]}</p>}
      </div>

      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
          Salary
        </label>
        <input
          id="salary"
          name="salary"
          type="text"
          defaultValue={initialData?.salary ?? ''}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="$100,000 - $150,000"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={initialData?.notes ?? ''}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Any additional notes..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
