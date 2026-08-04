'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';

export default function ExtensionPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch('/api/user/api-key');
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch {
        console.error('Failed to fetch API key');
      }
    }
    fetchApiKey();
  }, []);

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 px-4 max-w-3xl mx-auto pb-8">
        <h1 className="text-2xl font-bold mb-6">Browser Extension</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Installation</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              Download the extension folder from this project
            </li>
            <li>
              Open Chrome and go to <code className="bg-gray-100 px-2 py-1 rounded">chrome://extensions/</code>
            </li>
            <li>
              Enable <strong>Developer mode</strong> (toggle in top right)
            </li>
            <li>
              Click <strong>Load unpacked</strong> and select the <code className="bg-gray-100 px-2 py-1 rounded">extension/</code> folder
            </li>
            <li>
              Pin the extension to your toolbar
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">API Key</h2>
          <p className="text-gray-600 mb-4">
            Your API key is used to authenticate the extension with your Job Backpack account.
          </p>
          <div className="flex items-center gap-4">
            <code className="flex-1 bg-gray-100 px-4 py-2 rounded text-sm break-all">
              {apiKey || 'No API key available'}
            </code>
            <button
              onClick={handleCopyApiKey}
              disabled={!apiKey}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">How to Use</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Go to any job listing on LinkedIn, Indeed, Glassdoor, or Wellfound</li>
            <li>Click the Job Backpack icon in your toolbar</li>
            <li>The extension will auto-detect the job details</li>
            <li>Add any notes and click <strong>Save to Job Backpack</strong></li>
            <li>The job will appear in your Jobs list</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Supported Sites</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <a href="https://linkedin.com/jobs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn Jobs
              </a>
            </li>
            <li>
              <a href="https://indeed.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Indeed
              </a>
            </li>
            <li>
              <a href="https://glassdoor.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Glassdoor
              </a>
            </li>
            <li>
              <a href="https://wellfound.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Wellfound (AngelList)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
