const steps = [
  {
    number: '1',
    title: "Save jobs you're interested in",
    description: 'Encuentra vacantes y guárdalas en tu backpack para revisarlas después.',
  },
  {
    number: '2',
    title: 'Track your applications',
    description: 'Convierte las vacantes en postulaciones y sigue su progreso.',
  },
  {
    number: '3',
    title: 'Get insights to improve',
    description: 'Analiza tus patrones y recibe sugerencias para mejorar tu búsqueda.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cómo funciona</h2>
          <p className="text-lg text-gray-600">Tres pasos para organizar tu búsqueda</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
