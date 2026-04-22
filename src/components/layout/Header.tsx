"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";


export default function Header() {
  const { theme, setTheme } = useTheme();
  
  const montado = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );


  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          <span className="font-bold text-gray-900 dark:text-white text-lg">RuleCheck</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Juegos
          </Link>
          {montado && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}