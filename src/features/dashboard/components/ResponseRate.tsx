interface ResponseRateProps {
  rate: number;
  interviewCount: number;
  totalApplications: number;
}

export function ResponseRate({ rate, interviewCount, totalApplications }: ResponseRateProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Response Rate</h3>
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={`${rate * 2.51} 251`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{rate}%</span>
            <span className="text-xs text-gray-500">interview rate</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        {interviewCount} interviews from {totalApplications} applications
      </p>
    </div>
  );
}
