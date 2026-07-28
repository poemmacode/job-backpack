import Link from 'next/link';
import { Button } from '@/components/Button';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Organiza tu búsqueda de empleo
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Trackea tus postulaciones, CVs y entrevistas en un solo lugar. Deja de perder tiempo
          buscando en emails y hojas de cálculo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
