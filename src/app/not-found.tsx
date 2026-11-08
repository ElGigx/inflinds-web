import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", title: "Inicio", text: "El estudio y lo que hacemos." },
  { href: "/services/", title: "Servicios", text: "Diseño, desarrollo, automatización e IA." },
  { href: "/blog/", title: "Blog", text: "Notas y guías del estudio." },
  { href: "/contact/", title: "Contacto", text: "Hablemos de tu proyecto." },
  { href: "/gigx/", title: "Gigx", text: "Quién está detrás del estudio." },
];

export default function NotFound() {
  return (
    <div className="bg-night text-slate-100">
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Logo light />
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-magenta">Error 404</p>
        <p className="mt-2 font-display text-[6rem] font-black leading-none text-white/15 md:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-black leading-tight md:text-5xl">
          Esta página no existe.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300/80">
          El enlace está viejo o la dirección quedó mal escrita. Abajo está lo que sí
          existe; si venías de un documento, avísanos y lo corregimos.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-magenta px-5 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Volver al inicio
          </Link>
          <Link
            href="/contact/"
            className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-slate-100 transition hover:border-magenta/70"
          >
            Avisar de un enlace roto
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-magenta">
            Lo que sí existe
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-magenta/50"
              >
                <span className="block font-display text-lg font-bold text-white">{item.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-300/80">
                  {item.text}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-8 text-sm text-slate-400">
          <span className="font-semibold text-slate-200">Ecosistema</span>
          <a href="https://merez.co" className="hover:text-white">
            Merez
          </a>
          <a href="https://app.merez.co" className="hover:text-white">
            Panel
          </a>
          <a href="https://docs.merez.co" className="hover:text-white">
            Documentación
          </a>
          <a href="https://api.merez.co" className="hover:text-white">
            API
          </a>
        </div>
      </section>
    </div>
  );
}
