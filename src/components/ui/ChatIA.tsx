"use client";

import { useState, useRef, useEffect } from "react";
import { Juego } from "@/types/index";

type Mensaje = {
  rol: "usuario" | "asistente";
  texto: string;
};

type Props = {
  juego: Juego;
};

export default function ChatIA({ juego }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      rol: "asistente",
      texto: `¡Hola! Soy tu asistente para ${juego.nombre}. Pregúntame cualquier duda sobre las reglas del juego durante la partida.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

  async function enviarPregunta() {
    const pregunta = input.trim();
    if (!pregunta || cargando) return;
  
    const nuevosMensajes: Mensaje[] = [
      ...mensajes,
      { rol: "usuario", texto: pregunta },
    ];
  
    setMensajes(nuevosMensajes);
    setInput("");
    setCargando(true);
  
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta,
          reglas: juego.reglas,
          nombreJuego: juego.nombre,
          historial: mensajes.filter((m) => m.rol !== "asistente" || mensajes.indexOf(m) !== 0),
        }),
      });
  
      const data = await res.json();
      setMensajes([
        ...nuevosMensajes,
        {
          rol: "asistente",
          texto: data.respuesta ?? "No se pudo obtener respuesta.",
        },
      ]);
    } catch {
      setMensajes([
        ...nuevosMensajes,
        { rol: "asistente", texto: "Ha ocurrido un error. Inténtalo de nuevo." },
      ]);
    } finally {
      setCargando(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") enviarPregunta();
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto((v) => !v)}
        className="fixed bottom-6 right-6 z-50 bg-blue-light hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Abrir asistente de reglas"
      >
        {abierto ? (
          <span className="text-xl">✕</span>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        )}
      </button>

      {/* Ventana del chat */}
      {abierto && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-blue-light px-4 py-3 flex items-center gap-3 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            <div>
              <p className="text-white font-semibold text-sm">NixIA</p>
              <p className="text-indigo-200 text-xs">{juego.nombre}</p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-80">
            {mensajes.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.rol === "usuario" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.rol === "usuario"
                      ? "bg-blue-light text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.texto}
                </div>
              </div>
            ))}

            {cargando && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 text-sm text-gray-500">
                  <span className="animate-pulse">Consultando las reglas...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu duda..."
              disabled={cargando}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 disabled:opacity-50"
            />
            <button
              onClick={enviarPregunta}
              disabled={cargando || !input.trim()}
              className="bg-blue-light hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl px-3 py-2 text-sm font-medium transition-colors"
            >
              →
            </button>
          </div>

        </div>
      )}
    </>
  );
}