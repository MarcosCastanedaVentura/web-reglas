import { Juego } from "@/types/index";
import mus from "@/data/juegos/mus.json";
import poker from "@/data/juegos/poker.json";
import catan from "@/data/juegos/catan.json";

const juegosMap: Record<string, Juego> = {
  mus: mus as Juego,
  poker: poker as Juego,
  catan: catan as Juego,
};

export async function getJuego(slug: string): Promise<Juego | null> {
  return juegosMap[slug] ?? null;
}

export async function getTodosLosJuegos(): Promise<Juego[]> {
  return Object.values(juegosMap);
}