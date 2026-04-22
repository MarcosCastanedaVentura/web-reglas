import { getJuego, getTodosLosJuegos } from "@/lib/juegos";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const juegos = await getTodosLosJuegos();
  return juegos.map((j) => ({ slug: j.slug }));
}

export default async function JuegoPage({ params }: Props) {
  const { slug } = await params;
  const juego = await getJuego(slug);

  if (!juego) notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Cabecera */}
<div className="mb-10">
  <h1 className="text-4xl font-bold text-gray-900 mb-2">{juego.nombre}</h1>
  <p className="text-gray-500 mb-4">{juego.descripcion}</p>
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex gap-4 text-sm text-gray-400">
      <span>👥 {juego.jugadores}</span>
      <span>⏱ {juego.duracion}</span>
      <span>🎯 {juego.dificultad}</span>
    </div>
    
      <a href={juego.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
    >
      📄 Ver PDF oficial
    </a>
  </div>
</div>

        {/* Reglas */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reglas</h2>
          <div className="flex flex-col gap-6">
            {juego.reglas.map((seccion) => (
              <div
                key={seccion.titulo}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  {seccion.titulo}
                </h3>
                <ul className="flex flex-col gap-2">
                  {seccion.contenido.map((linea, i) => (
                    <li key={i} className="text-gray-600 text-sm leading-relaxed">
                      • {linea}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-4">
            {juego.faq.map((item) => (
              <div
                key={item.pregunta}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <p className="font-semibold text-gray-800 mb-2">{item.pregunta}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.respuesta}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}