import Link from "next/link";
import Logo from "./Logo";
import { apps, services, site, toolbox } from "@/lib/site";

const fronts = [
  {
    href: "/tools/",
    title: "Herramientas",
    desc: "Calculadoras, conversores y generadores",
    count: toolbox.length,
    tone: "text-yellow",
  },
  {
    href: "/apps/",
    title: "Aplicaciones",
    desc: "Cobro por tiempo y Cuentas claras",
    count: apps.length,
    tone: "text-pink-300",
  },
  {
    href: "/services/",
    title: "Servicios",
    desc: "Diseño, desarrollo, automatización, IA y visibilidad",
    count: services.length,
    tone: "text-orange-300",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night text-slate-100">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        {/* Cierre: CTA + tres frentes */}
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-yellow">
              El siguiente frente
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-black leading-[1.05] text-white sm:text-4xl">
              ¿Qué construimos <span className="text-yellow">ahora</span>?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              Herramientas para hoy, aplicaciones para operar o servicios para crecer. Si no sabes
              por dónde entrar, lo vemos juntos.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Hablemos
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Link>
              <Link
                href="/pricing/"
                className="text-sm font-semibold text-slate-300 underline decoration-yellow decoration-2 underline-offset-4 transition-colors hover:text-white"
              >
                Ver precios
              </Link>
            </div>
          </div>

          <div className="grid gap-2 self-end">
            {fronts.map((front) => (
              <Link
                key={front.href}
                href={front.href}
                className="group grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span>
                  <span className="block font-display text-lg font-black text-white">
                    {front.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">
                    {front.desc}
                  </span>
                </span>
                <span className={`font-display text-2xl font-black ${front.tone}`}>{front.count}</span>
                <span
                  aria-hidden="true"
                  className="text-slate-500 transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300/80">
              Digital Product Studio. Diseño, desarrollo, automatización e IA para los frentes de tu
              negocio.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://x.com/Gigx"
                target="_blank"
                rel="noreferrer"
                aria-label="X de Inflinds"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 font-display text-sm font-bold text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                X
              </a>
              <span className="text-xs text-slate-500">@Gigx</span>
              <Link
                href="/gigx/"
                className="ml-auto text-xs font-semibold text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
              >
                El estudio →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-magenta">
              Merez
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://www.merez.co/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  La plataforma
                </a>
              </li>
              <li>
                <a
                  href="https://www.merez.co/pricing/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  Precios
                </a>
              </li>
              <li>
                <a
                  href="https://app.merez.co"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  Entrar al panel
                </a>
              </li>
              <li>
                <a
                  href="https://docs.merez.co"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  Documentación
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-magenta">
              Recursos
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/blog/"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/log/"
                  className="inline-flex items-center gap-2 text-slate-300/80 transition-colors hover:text-white"
                >
                  Bitácora
                  <span className="rounded-full bg-yellow/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-yellow">
                    Nuevo
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gigx/"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  Gigx
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/login/"
                  className="text-slate-300/80 transition-colors hover:text-white"
                >
                  Área de clientes
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-magenta">
              Estudio
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300/80">
              <li>{site.legalName}</li>
              <li>NIT {site.nit}</li>
              <li>{site.country}</li>
              <li>
                <a href={site.website} className="transition-colors hover:text-white">
                  inflinds.com
                </a>
              </li>
              <li>
                <Link href="/gigx/" className="transition-colors hover:text-white">
                  Miguel Yañez · Founder
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-400">Hecho en {site.country}</span>
            <Link href="/privacy/" className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              Privacidad
            </Link>
            <Link href="/terms/" className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              Términos
            </Link>
            <details className="relative">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center transition-colors hover:text-white">
                Ecosistema
              </summary>
              <div className="absolute bottom-full right-0 z-10 mb-2 min-w-[210px] overflow-hidden rounded-lg border border-white/10 bg-night py-1 shadow-lg">
                <a
                  href="https://www.merez.co"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-3 py-2 text-slate-200 hover:bg-white/5"
                >
                  Plataforma · Merez
                </a>
                <a
                  href="https://app.merez.co"
                  target="_blank"
                  rel="noreferrer"
                  className="block border-t border-white/10 px-3 py-2 text-slate-200 hover:bg-white/5"
                >
                  Panel · app.merez.co
                </a>
                <a
                  href="https://docs.merez.co"
                  target="_blank"
                  rel="noreferrer"
                  className="block border-t border-white/10 px-3 py-2 text-slate-200 hover:bg-white/5"
                >
                  Documentación · docs.merez.co
                </a>
                <a
                  href="https://api.merez.co"
                  target="_blank"
                  rel="noreferrer"
                  className="block border-t border-white/10 px-3 py-2 text-slate-200 hover:bg-white/5"
                >
                  API · api.merez.co
                </a>
                <a
                  href="https://x.com/Gigx"
                  target="_blank"
                  rel="noopener me"
                  className="block border-t border-white/10 px-3 py-2 text-slate-200 hover:bg-white/5"
                >
                  Diseño · gigx
                </a>
                <a
                  href="/humans.txt"
                  className="block border-t border-white/10 px-3 py-2 text-slate-400 hover:bg-white/5"
                >
                  humans.txt
                </a>
              </div>
            </details>
          </div>
        </div>
      </div>
    </footer>
  );
}
