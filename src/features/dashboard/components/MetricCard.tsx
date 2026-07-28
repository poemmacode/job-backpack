interface MetricCardProps {
  title: string;
  value: number | string;
  color: string;
  subtitle?: string;
}

export function MetricCard({ title, value, color, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
