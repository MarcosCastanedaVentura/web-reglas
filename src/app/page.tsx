import { getTodosLosJuegos } from "@/lib/juegos";
import ListaJuegos from "@/components/ui/ListaJuegos";

export default async function Home() {
  const juegos = await getTodosLosJuegos();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950 text-indigo-600 dark:text-red-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
      🎲 {juegos.length} juego{juegos.length !== 1 ? "s" : ""} disponible{juegos.length !== 1 ? "s" : ""}
    </div>
    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
      Las reglas claras,<br />
      <span className="text-indigo-600 dark:text-red-400">sin discusiones</span>
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
      Consulta las reglas oficiales de tus juegos de mesa favoritos y resuelve dudas en plena partida.
    </p>
  </div>
  <ListaJuegos juegos={juegos} />
</main>
  );
}