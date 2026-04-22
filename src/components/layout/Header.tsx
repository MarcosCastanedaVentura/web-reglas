import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          <span className="font-bold text-gray-900 text-lg">RuleCheck</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Juegos
          </Link>
        </nav>
      </div>
    </header>
  );
}