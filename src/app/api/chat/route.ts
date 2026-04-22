import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

type Mensaje = {
  rol: "usuario" | "asistente";
  texto: string;
};

export async function POST(req: NextRequest) {
  try {
    const { pregunta, reglas, nombreJuego, historial } = await req.json();

    if (!pregunta || !reglas || !nombreJuego) {
      return NextResponse.json(
        { error: "Faltan datos en la petición" },
        { status: 400 }
      );
    }

    const reglasTexto = reglas
      .map((r: { titulo: string; contenido: string[] }) =>
        `${r.titulo}:\n${r.contenido.join("\n")}`
      )
      .join("\n\n");

    const mensajesHistorial = (historial as Mensaje[] ?? []).map((m) => ({
      role: m.rol === "usuario" ? "user" : "assistant" as "user" | "assistant",
      content: m.texto,
    }));

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Eres un asistente experto en el juego de mesa "${nombreJuego}". 
Tu única función es resolver dudas sobre las reglas de este juego durante una partida.
Responde siempre en español, de forma clara y concisa.
Si la pregunta no tiene relación con el juego, indica amablemente que solo puedes ayudar con dudas sobre "${nombreJuego}".

Estas son las reglas del juego:

${reglasTexto}`,
        },
        ...mensajesHistorial,
        {
          role: "user",
          content: pregunta,
        },
      ],
      max_tokens: 512,
      temperature: 0.3,
    });

    const respuesta =
      completion.choices[0]?.message?.content ??
      "No se pudo generar una respuesta.";

    return NextResponse.json({ respuesta });
  } catch (error) {
    console.error("Error al llamar a Groq:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}