const audiences = [
  'Software Engineers',
  'Data Engineers',
  'Data Scientists',
  'DevOps Engineers',
  'QA Engineers',
  'Product Managers',
  'UX/UI Designers',
];

export function TargetAudience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Para profesionales de tecnología
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Diseñado para quienes buscan empleo en el sector tech
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {audiences.map((audience) => (
            <span
              key={audience}
              className="px-4 py-2 bg-white rounded-full text-gray-700 font-medium shadow-sm border border-gray-200"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
