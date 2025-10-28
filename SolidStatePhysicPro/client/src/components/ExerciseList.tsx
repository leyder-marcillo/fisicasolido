import { StarRating } from "@/components/StarRating";

function getRandomRating() {
  return Math.round(Math.random() * 5);
}

export default function ExerciseList() {
  return (
    <section className="mt-16 px-4 md:px-8">
      <h2 className="text-2xl font-semibold mb-8">Ejercicios por Unidad</h2>

      {/* Primera Unidad */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">📘 Primera Unidad</h3>
        <ul className="space-y-4">
          {[
            { title: "Ecuación de Schrödinger", file: "schrodinger.pdf" },
            { title: "Principio de Broglie", file: "uno.pdf" },
            { title: "Efecto túnel", file: "tunel.pdf" },
            { title: "Autofunciones y autovalores", file: "autofunciones.pdf" },
          ].map((item, index) => (
            <li key={index} className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <a
                  href={`/pdfs/${item.file}`}
                  target="_blank"
                  className="text-blue-600 hover:underline text-lg font-medium"
                >
                  {item.title}
                </a>
                <StarRating rating={getRandomRating()} size={18} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Segunda Unidad */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📗 Segunda Unidad</h3>
        <ul className="space-y-4">
          {[
            { title: "Ensambles Maxwell-Boltzmann", file: "maxwell-boltzmann.pdf" },
            { title: "Distribución Fermi-Dirac", file: "fermi-dirac.pdf" },
            { title: "Energía y temperatura de Fermi", file: "energia-fermi.pdf" },
            { title: "Planos cristalinos", file: "cristales.pdf" },
            { title: "Ley de Bragg", file: "bragg.pdf" },
            { title: "Espacio recíproco", file: "reciproco.pdf" },
          ].map((item, index) => (
            <li key={index} className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <a
                  href={`/pdfs/${item.file}`}
                  target="_blank"
                  className="text-blue-600 hover:underline text-lg font-medium"
                >
                  {item.title}
                </a>
                <StarRating rating={getRandomRating()} size={18} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}