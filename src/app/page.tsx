import { getTodosLosJuegos } from "@/lib/juegos";
import JuegoCard from "@/components/ui/JuegoCard";

export default async function Home() {
  const juegos = await getTodosLosJuegos();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
          🎲 {juegos.length} juego{juegos.length !== 1 ? "s" : ""} disponible{juegos.length !== 1 ? "s" : ""}
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Las reglas claras,<br />
          <span className="text-indigo-600">sin discusiones</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Consulta las reglas oficiales de tus juegos de mesa favoritos y resuelve dudas en plena partida.
        </p>
      </div>

      {/* Grid de juegos */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Juegos disponibles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {juegos.map((juego) => (
            <JuegoCard key={juego.slug} juego={juego} />
          ))}
        </div>
      </section>

    </main>
  );
}