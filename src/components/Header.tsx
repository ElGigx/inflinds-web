"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import { nav, services } from "@/lib/site";
import { tools } from "@/lib/tools";
import { FAMILIES, FAMILY_ORDER, familyOf } from "@/lib/tool-taxonomy";

type MenuKey = "services" | "tools";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMenu(null);
    setOpen(false);
  }, [pathname]);

  const enter = (key: MenuKey) => {
    if (timer.current) clearTimeout(timer.current);
    setMenu(key);
  };

  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu(null), 120);
  };

  const counts = FAMILY_ORDER.map((key) => ({
    key,
    count: tools.filter((tool) => familyOf(tool.slug) === key).length,
  }));

  return (
    <header className="sticky top-0 z-50 bg-night/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Logo light />

        <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
          {nav.map((item) => {
            const key: MenuKey | null =
              item.href === "/services/" ? "services" : item.href === "/tools/" ? "tools" : null;

            if (!key) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "text-yellow after:absolute after:inset-x-3 after:-bottom-[9px] after:h-[2px] after:rounded-full after:bg-yellow after:content-['']"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            const expanded = menu === key;
            return (
              <div key={item.href} className="relative" onMouseEnter={() => enter(key)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onClick={() => setMenu(expanded ? null : key)}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.href) || expanded
                      ? "text-yellow bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  <Icon
                    name="chevron-down"
                    className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {expanded && (
                  <div
                    className={`absolute left-0 top-full mt-2 rounded-2xl border border-white/10 bg-night-800 p-3 shadow-2xl ${
                      key === "services" ? "w-[620px]" : "w-[600px]"
                    }`}
                  >
                    {key === "services" && (
                      <div className="flex gap-3">
                        <div className="grid flex-1 grid-cols-2 gap-1">
                          {services.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/#${service.slug}`}
                              onClick={() => setMenu(null)}
                              className="rounded-xl p-3 transition hover:bg-white/5"
                            >
                              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-yellow">
                                {service.tag}
                              </span>
                              <span className="mt-1 block text-sm font-semibold leading-snug text-white">
                                {service.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="w-[200px] shrink-0 rounded-xl bg-white/5 p-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-yellow">Destacado</p>
                          <p className="mt-1 font-display text-sm font-bold text-white">Merez · la plataforma</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                            La operación completa, sin cobro por usuario.
                          </p>
                          <a
                            href="https://www.merez.co/"
                            onClick={() => setMenu(null)}
                            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-yellow hover:underline"
                          >
                            Conocer Merez
                            <span aria-hidden="true">→</span>
                          </a>
                          <Link
                            href="/contact/"
                            onClick={() => setMenu(null)}
                            className="mt-3 block rounded-lg bg-gradient-cta px-3 py-2 text-center text-[11px] font-bold text-white"
                          >
                            Cuéntanos tu proyecto
                          </Link>
                        </div>
                      </div>
                    )}

                    {key === "tools" && (
                      <div className="flex gap-3">
                        <div className="grid flex-1 grid-cols-2 gap-1">
                          {counts.map(({ key: familyKey, count }) => {
                            const meta = FAMILIES[familyKey];
                            return (
                              <Link
                                key={familyKey}
                                href={`/tools/#familia-${familyKey}`}
                                onClick={() => setMenu(null)}
                                className="flex items-center gap-2 rounded-xl p-2.5 transition hover:bg-white/5"
                              >
                                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${meta.tile}`}>
                                  <Icon name={meta.icon} className="h-4 w-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold leading-tight text-white">
                                    {meta.label}
                                  </span>
                                  <span className="block text-[11px] text-slate-400">{count} herramientas</span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="w-[200px] shrink-0 rounded-xl bg-white/5 p-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-yellow">Empieza aquí</p>
                          <ul className="mt-1 space-y-0.5">
                            {["vat-and-totals", "invoice-with-withholdings", "hiring-cost"].map((slug) => {
                              const pick = tools.find((tool) => tool.slug === slug);
                              if (!pick) return null;
                              return (
                                <li key={slug}>
                                  <Link
                                    href={`/tools/${slug}/`}
                                    onClick={() => setMenu(null)}
                                    className="block rounded-md px-1.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                                  >
                                    {pick.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-yellow">Destacado</p>
                          <a
                            href="https://www.merez.co/"
                            onClick={() => setMenu(null)}
                            className="mt-1 flex items-center justify-between rounded-lg bg-night px-2 py-1.5 text-[11px] font-bold text-white hover:bg-night-700"
                          >
                            Merez
                            <span aria-hidden="true">→</span>
                          </a>
                        </div>
                      </div>
                    )}

                    <Link
                      href="/tools/"
                      onClick={() => setMenu(null)}
                      className="mt-2 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-sm font-bold text-yellow transition hover:bg-white/10"
                    >
                      Ver las {tools.length} herramientas
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/contact/"
            className="ml-2 inline-flex items-center rounded-lg bg-gradient-cta px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Cuéntanos tu proyecto
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10"
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

      {open && (
        <nav className="md:hidden border-t border-white/10 bg-night px-5 py-3" aria-label="Menú móvil">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-3 rounded-lg text-base font-semibold ${
                isActive(item.href) ? "text-yellow bg-white/5" : "text-slate-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center rounded-lg bg-gradient-cta px-4 py-3 text-base font-bold text-white"
          >
            Cuéntanos tu proyecto
          </Link>
        </nav>
      )}
    </header>
  );
}
