import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biblioteca de juegos de mesa",
  description: "Consulta las reglas de tus juegos de mesa favoritos y resuelve dudas durante la partida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geist.className} bg-gray-50 antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}