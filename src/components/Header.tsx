"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-line">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Logo />

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive(item.href)
                  ? "text-brand-600"
                  : "text-ink-700 hover:text-brand-600 hover:bg-brand-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contacto/"
            className="ml-2 inline-flex items-center rounded-lg bg-magenta px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-magenta-600"
          >
            Cuéntanos tu proyecto
          </Link>
        </nav>

        {/* Botón menú mobile */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-ink hover:bg-brand-50"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <nav className="md:hidden border-t border-line bg-paper px-5 py-3" aria-label="Menú móvil">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-3 rounded-lg text-base font-semibold ${
                isActive(item.href) ? "text-brand-600 bg-brand-50" : "text-ink-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contacto/"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center rounded-lg bg-magenta px-4 py-3 text-base font-bold text-white"
          >
            Cuéntanos tu proyecto
          </Link>
        </nav>
      )}
    </header>
  );
}
