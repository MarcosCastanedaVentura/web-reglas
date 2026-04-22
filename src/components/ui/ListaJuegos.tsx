"use client";

import { useState } from "react";
import { Juego } from "@/types/index";
import JuegoCard from "@/components/ui/JuegoCard";

type Props = {
  juegos: Juego[];
};

const DIFICULTADES = ["Todas", "Fácil", "Media", "Difícil"];

export default function ListaJuegos({ juegos }: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [dificultad, setDificultad] = useState("Todas");

  const juegosFiltrados = juegos.filter((juego) => {
    const coincideBusqueda =
      juego.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      juego.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideDificultad =
      dificultad === "Todas" || juego.dificultad === dificultad;
    return coincideBusqueda && coincideDificultad;
  });

  return (
    <section>
      {/* Buscador y filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar juego..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-400 shadow-sm"
          />
        </div>

        <div className="flex gap-2">
          {DIFICULTADES.map((d) => (
            <button
              key={d}
              onClick={() => setDificultad(d)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors bg-white dark:bg-gray-900 border text-gray-900 dark:text-white border-gray-200 dark:border-gray-800 ${
                dificultad === d
                  ? "bg-indigo-600 text-black dark:text-white border-indigo-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Resultado */}
      {juegosFiltrados.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎲</p>
          <p className="font-medium">No se encontraron juegos</p>
          <p className="text-sm mt-1">Prueba con otro nombre o dificultad</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-4">
            {juegosFiltrados.length} juego{juegosFiltrados.length !== 1 ? "s" : ""} encontrado{juegosFiltrados.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {juegosFiltrados.map((juego) => (
              <JuegoCard key={juego.slug} juego={juego} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}