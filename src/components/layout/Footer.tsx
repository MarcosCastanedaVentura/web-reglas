import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎲</span>
          <span className="font-bold text-gray-900 dark:text-white">RuleCheck</span>
          <span className="text-gray-400 text-sm">— Las reglas claras, sin discusiones</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            Juegos
          </Link>
          <a href="mailto:hola@rulecheck.org" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            Contacto
          </a>
          <span>© {new Date().getFullYear()} rulecheck.org</span>
        </div>
      </div>
    </footer>
  );
}