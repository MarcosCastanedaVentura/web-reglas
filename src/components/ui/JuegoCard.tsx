import Link from "next/link";
import { Juego } from "@/types/index";

const dificultadColor = {
  Fácil: "bg-green-100 text-green-700",
  Media: "bg-yellow-100 text-yellow-700",
  Difícil: "bg-red-100 text-red-700",
};

type Props = {
  juego: Juego;
};

export default function JuegoCard({ juego }: Props) {
  return (
    <Link
      href={`/juegos/${juego.slug}`}
      className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {juego.nombre}
        </h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${dificultadColor[juego.dificultad]}`}
        >
          {juego.dificultad}
        </span>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-5">
        {juego.descripcion}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-xs text-gray-400">
          <span>👥 {juego.jugadores}</span>
          <span>⏱ {juego.duracion}</span>
        </div>
        <span className="text-xs font-medium text-indigo-500 group-hover:underline">
          Ver reglas →
        </span>
      </div>
    </Link>
  );
}