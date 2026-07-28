interface JobInfoProps {
  location?: string | null;
  salary?: string | null;
  url?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function JobInfo({ location, salary, url, createdAt, updatedAt }: JobInfoProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>

      <dl className="space-y-4">
        {location && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-gray-900">{location}</dd>
          </div>
        )}

        {salary && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Salary</dt>
            <dd className="mt-1 text-green-600 font-medium">{salary}</dd>
          </div>
        )}

        {url && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Job URL</dt>
            <dd className="mt-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {url}
              </a>
            </dd>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <dt className="text-sm font-medium text-gray-500">Created</dt>
          <dd className="mt-1 text-gray-600">
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
          <dd className="mt-1 text-gray-600">
            {new Date(updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </dd>
        </div>
      </dl>
    </div>
  );
}
