export type Seccion = {
    titulo: string;
    contenido: string[];
  };
  
  export type Pregunta = {
    pregunta: string;
    respuesta: string;
  };
  
  export type Juego = {
    slug: string;
    nombre: string;
    descripcion: string;
    jugadores: string;
    duracion: string;
    dificultad: "Fácil" | "Media" | "Difícil";
    imagen: string;
    pdf: string;
    reglas: Seccion[];
    faq: Pregunta[];
  };