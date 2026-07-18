import Link from "next/link";
import Logo from "./Logo";
import { nav, services, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-night text-slate-100 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-slate-300/80 max-w-xs">
              Digital Product Studio. Diseño, desarrollo, automatización e IA para
              acelerar tu transformación digital.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-magenta text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-300/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-magenta text-sm uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/servicios/"
                    className="text-slate-300/80 hover:text-white transition-colors"
                  >
                    {s.tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-magenta text-sm uppercase tracking-wider">
              Estudio
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300/80">
              <li>{site.legalName}</li>
              <li>NIT {site.nit}</li>
              <li>{site.country}</li>
              <li>
                <a href={site.website} className="hover:text-white transition-colors">
                  www.inflinds.com
                </a>
              </li>
            </ul>
            <Link
              href="/contacto/"
              className="mt-5 inline-flex items-center rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Iniciar un proyecto
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {year} {site.legalName}. Todos los derechos reservados.</p>
          <p>Parte del ecosistema Gigx.</p>
        </div>
      </div>
    </footer>
  );
}
