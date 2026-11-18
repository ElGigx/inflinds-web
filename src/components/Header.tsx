"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import { apps, services, toolbox } from "@/lib/site";
import { FAMILIES, FAMILY_ORDER, familyOf } from "@/lib/tool-taxonomy";

type MenuKey = "soluciones" | "merez" | "recursos";

const merezLinks = [
  {
    label: "La plataforma",
    desc: "Qué es Merez y qué resuelve",
    href: "https://www.merez.co/",
    icon: "sparkles",
    external: true,
  },
  {
    label: "Precios",
    desc: "Planes y módulos",
    href: "https://www.merez.co/pricing/",
    icon: "banknote",
    external: true,
  },
  {
    label: "Entrar al panel",
    desc: "app.merez.co",
    href: "https://app.merez.co",
    icon: "grid",
    external: true,
  },
  {
    label: "Clientes",
    desc: "Acceso y soporte",
    href: "/login/",
    icon: "users",
    external: false,
  },
  {
    label: "Documentación",
    desc: "Guías de la plataforma",
    href: "https://docs.merez.co",
    icon: "file",
    external: true,
  },
];

const recursosLinks = [
  { label: "Blog", desc: "Ideas y criterios de trabajo", href: "/blog/", icon: "edit" },
  { label: "Log", desc: "Lo que construimos y aprendimos", href: "/log/", icon: "file" },
  { label: "Gigx", desc: "El estudio detrás de Inflinds", href: "/gigx/", icon: "users" },
  { label: "Contacto", desc: "Hablemos de tu proyecto", href: "/contact/", icon: "mail" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const solucionesActive = ["/tools/", "/apps/", "/services/", "/pricing/"].some((href) =>
    pathname.startsWith(href),
  );
  const merezActive = pathname.startsWith("/login/");
  const recursosActive = ["/blog/", "/log/", "/gigx/"].some((href) =>
    pathname.startsWith(href),
  );
  const contactoActive = pathname.startsWith("/contact/");

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
    count: toolbox.filter((tool) => familyOf(tool.slug) === key).length,
  }));

  const linkBase = "rounded-lg px-3 py-2 text-sm font-semibold transition-colors";
  const inactive = "text-slate-300 hover:text-white hover:bg-white/5";
  const active = "text-yellow bg-white/5";

  return (
    <header className="sticky top-0 z-50 bg-night/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Logo light />

        <nav className="hidden xl:flex items-center gap-1" aria-label="Principal">
          {/* Soluciones */}
          <div
            className="relative"
            onMouseEnter={() => enter("soluciones")}
            onMouseLeave={leave}
          >
            <button
              type="button"
              aria-expanded={menu === "soluciones"}
              aria-haspopup="true"
              onClick={() => setMenu(menu === "soluciones" ? null : "soluciones")}
              className={`inline-flex items-center gap-1 ${linkBase} ${
                solucionesActive || menu === "soluciones" ? active : inactive
              }`}
            >
              Soluciones
              <Icon
                name="chevron-down"
                className={`h-3.5 w-3.5 transition-transform ${
                  menu === "soluciones" ? "rotate-180" : ""
                }`}
              />
            </button>

            {menu === "soluciones" && (
              <div className="fixed left-1/2 top-16 z-50 max-h-[calc(100vh-5rem)] w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-night-800 p-3 shadow-2xl">
                <div className="grid grid-cols-[1.1fr_0.9fr_1fr] gap-2">
                  {/* Herramientas */}
                  <div className="rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-yellow/15 text-yellow">
                        <Icon name="calculator" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-white">Herramientas</p>
                        <p className="text-[11px] text-slate-400">
                          {toolbox.length} · muchas calculadoras
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-0.5">
                      {counts.map(({ key: familyKey, count }) => {
                        const meta = FAMILIES[familyKey];
                        return (
                          <Link
                            key={familyKey}
                            href={`/tools/#familia-${familyKey}`}
                            onClick={() => setMenu(null)}
                            className="flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 hover:bg-white/10"
                          >
                            <Icon name={meta.icon} className={`h-3.5 w-3.5 ${meta.iconClass}`} />
                            <span className="text-[11px] font-semibold text-slate-200">
                              {meta.label}
                            </span>
                            <span className="ml-auto text-[10px] text-slate-500">{count}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/tools/"
                      onClick={() => setMenu(null)}
                      className="mt-2 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2 text-[11px] font-bold text-yellow hover:bg-white/10"
                    >
                      Ver las {toolbox.length} herramientas
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Aplicaciones */}
                  <div className="rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-magenta/15 text-magenta">
                        <Icon name="receivables" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-white">Aplicaciones</p>
                        <p className="text-[11px] text-slate-400">
                          {apps.length} · se quedan abiertas
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {apps.map((app) => (
                        <Link
                          key={app.slug}
                          href={`/tools/${app.slug}/`}
                          onClick={() => setMenu(null)}
                          className="block rounded-lg px-2 py-2 hover:bg-white/10"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-white">{app.title}</span>
                            <span className="rounded-full bg-magenta/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-magenta">
                              Nuevo
                            </span>
                          </span>
                          <span className="mt-0.5 block text-[10px] leading-snug text-slate-400">
                            {app.promise}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/apps/"
                      onClick={() => setMenu(null)}
                      className="mt-2 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2 text-[11px] font-bold text-magenta hover:bg-white/10"
                    >
                      Ver las {apps.length} aplicaciones
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Servicios */}
                  <div className="rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange/15 text-orange">
                        <Icon name="code" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-white">Servicios</p>
                        <p className="text-[11px] text-slate-400">
                          {services.length} · a la medida
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-0.5">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/#${service.slug}`}
                          onClick={() => setMenu(null)}
                          className="block rounded-lg px-2 py-1.5 hover:bg-white/10"
                        >
                          <span className="block text-[11px] font-semibold leading-tight text-white">
                            {service.tag}
                          </span>
                          <span className="block truncate text-[10px] text-slate-400">
                            {service.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/services/"
                      onClick={() => setMenu(null)}
                      className="mt-2 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2 text-[11px] font-bold text-orange hover:bg-white/10"
                    >
                      Ver los {services.length} servicios
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-night px-3 py-2.5">
                  <Link
                    href="/pricing/"
                    onClick={() => setMenu(null)}
                    className="text-[12px] font-bold text-slate-200 hover:text-white"
                  >
                    Precios <span className="text-slate-500">·</span>{" "}
                    <span className="font-normal text-slate-400">proyectos y planes</span>
                  </Link>
                  <a
                    href="https://www.merez.co/"
                    onClick={() => setMenu(null)}
                    className="inline-flex items-center gap-1 text-[12px] font-bold text-yellow hover:underline"
                  >
                    Merez, la plataforma <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Merez */}
          <div
            className="relative"
            onMouseEnter={() => enter("merez")}
            onMouseLeave={leave}
          >
            <button
              type="button"
              aria-expanded={menu === "merez"}
              aria-haspopup="true"
              onClick={() => setMenu(menu === "merez" ? null : "merez")}
              className={`inline-flex items-center gap-1 ${linkBase} ${
                merezActive || menu === "merez" ? active : inactive
              }`}
            >
              Merez
              <Icon
                name="chevron-down"
                className={`h-3.5 w-3.5 transition-transform ${
                  menu === "merez" ? "rotate-180" : ""
                }`}
              />
            </button>

            {menu === "merez" && (
              <div className="absolute left-0 top-full mt-2 w-[320px] rounded-2xl border border-white/10 bg-night-800 p-2 shadow-2xl">
                {merezLinks.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMenu(null)}
                      className="flex items-start gap-2 rounded-xl px-3 py-2 hover:bg-white/5"
                    >
                      <Icon name={item.icon} className="mt-0.5 h-4 w-4 shrink-0 text-yellow" />
                      <span>
                        <span className="block text-sm font-semibold text-white">{item.label}</span>
                        <span className="block text-[11px] text-slate-400">{item.desc}</span>
                      </span>
                      <span aria-hidden="true" className="ml-auto text-slate-500">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenu(null)}
                      className="flex items-start gap-2 rounded-xl px-3 py-2 hover:bg-white/5"
                    >
                      <Icon name={item.icon} className="mt-0.5 h-4 w-4 shrink-0 text-yellow" />
                      <span>
                        <span className="block text-sm font-semibold text-white">{item.label}</span>
                        <span className="block text-[11px] text-slate-400">{item.desc}</span>
                      </span>
                    </Link>
                  ),
                )}
                <div className="mt-1 rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-yellow">
                    Merez
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    La operación completa, sin cobro por usuario.
                  </p>
                  <a
                    href="https://www.merez.co/"
                    onClick={() => setMenu(null)}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-yellow hover:underline"
                  >
                    Conocer Merez <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Recursos */}
          <div
            className="relative"
            onMouseEnter={() => enter("recursos")}
            onMouseLeave={leave}
          >
            <button
              type="button"
              aria-expanded={menu === "recursos"}
              aria-haspopup="true"
              onClick={() => setMenu(menu === "recursos" ? null : "recursos")}
              className={`inline-flex items-center gap-1 ${linkBase} ${
                recursosActive || menu === "recursos" ? active : inactive
              }`}
            >
              Recursos
              <Icon
                name="chevron-down"
                className={`h-3.5 w-3.5 transition-transform ${
                  menu === "recursos" ? "rotate-180" : ""
                }`}
              />
            </button>

            {menu === "recursos" && (
              <div className="absolute left-0 top-full mt-2 w-[280px] rounded-2xl border border-white/10 bg-night-800 p-2 shadow-2xl">
                {recursosLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenu(null)}
                    className="flex items-start gap-2 rounded-xl px-3 py-2 hover:bg-white/5"
                  >
                    <Icon name={item.icon} className="mt-0.5 h-4 w-4 shrink-0 text-yellow" />
                    <span>
                      <span className="block text-sm font-semibold text-white">{item.label}</span>
                      <span className="block text-[11px] text-slate-400">{item.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contacto */}
          <Link
            href="/contact/"
            className={`${linkBase} ${contactoActive ? active : inactive}`}
          >
            Contacto
          </Link>

          <Link
            href="/contact/"
            className="ml-2 inline-flex items-center rounded-lg bg-gradient-cta px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Hablemos
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className="xl:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10"
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
        <nav
          className="xl:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-night px-5 py-3"
          aria-label="Menú móvil"
        >
          <details className="group border-b border-white/5 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
              Herramientas
              <span className="flex items-center gap-2 text-xs font-normal text-slate-400">
                {toolbox.length}
                <Icon name="chevron-down" className="h-4 w-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>
            <div className="pb-2 pl-3">
              {FAMILY_ORDER.map((key) => {
                const meta = FAMILIES[key];
                return (
                  <Link
                    key={key}
                    href={`/tools/#familia-${key}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    <Icon name={meta.icon} className={`h-4 w-4 ${meta.iconClass}`} />
                    {meta.label}
                  </Link>
                );
              })}
              <Link
                href="/tools/"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg px-2 py-2 text-sm font-bold text-yellow"
              >
                Ver las {toolbox.length} herramientas →
              </Link>
            </div>
          </details>

          <details className="group border-b border-white/5 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
              Aplicaciones
              <span className="flex items-center gap-2 text-xs font-normal text-slate-400">
                {apps.length}
                <Icon name="chevron-down" className="h-4 w-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>
            <div className="pb-2 pl-3">
              {apps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/tools/${app.slug}/`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 hover:bg-white/5"
                >
                  <span className="text-sm font-semibold text-white">{app.title}</span>
                  <span className="block text-[11px] text-slate-400">{app.promise}</span>
                </Link>
              ))}
              <Link
                href="/apps/"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg px-2 py-2 text-sm font-bold text-magenta"
              >
                Ver las {apps.length} aplicaciones →
              </Link>
            </div>
          </details>

          <details className="group border-b border-white/5 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
              Servicios
              <span className="flex items-center gap-2 text-xs font-normal text-slate-400">
                {services.length}
                <Icon name="chevron-down" className="h-4 w-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>
            <div className="pb-2 pl-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/#${service.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {service.tag}
                </Link>
              ))}
              <Link
                href="/services/"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg px-2 py-2 text-sm font-bold text-orange"
              >
                Ver los {services.length} servicios →
              </Link>
            </div>
          </details>

          <details className="group border-b border-white/5 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
              Merez
              <Icon name="chevron-down" className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-2 pl-3">
              {merezLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </details>

          <details className="group border-b border-white/5 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
              Recursos
              <Icon name="chevron-down" className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-2 pl-3">
              {recursosLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className={`block px-3 py-3 rounded-lg text-base font-semibold ${
              contactoActive ? "text-yellow bg-white/5" : "text-slate-300"
            }`}
          >
            Contacto
          </Link>
          <Link
            href="/pricing/"
            onClick={() => setOpen(false)}
            className={`block px-3 py-3 rounded-lg text-base font-semibold ${
              isActive("/pricing/") ? "text-yellow bg-white/5" : "text-slate-300"
            }`}
          >
            Precios
          </Link>
          <Link
            href="/login/"
            onClick={() => setOpen(false)}
            className={`block px-3 py-3 rounded-lg text-base font-semibold ${
              isActive("/login/") ? "text-yellow bg-white/5" : "text-slate-300"
            }`}
          >
            Clientes
          </Link>
          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center rounded-lg bg-gradient-cta px-4 py-3 text-base font-bold text-white"
          >
            Hablemos
          </Link>
        </nav>
      )}
    </header>
  );
}
