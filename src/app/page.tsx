import Link from "next/link";
import { services, methodology, merezModules } from "@/lib/site";
import {
  Container,
  SectionHeading,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  AccentTag,
} from "@/components/ui";

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Digital Product Studio</Eyebrow>
            <h1 className="mt-4 font-display font-black text-4xl sm:text-6xl leading-[1.05] tracking-tight text-ink">
              Diseñamos y construimos{" "}
              <span className="text-gradient">productos digitales</span>, no solo páginas web.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate leading-relaxed max-w-2xl">
              Inflinds combina negocio, diseño, tecnología e inteligencia artificial para acelerar
              la transformación digital de empresas y emprendedores. Un lanzamiento nunca es el
              final del proyecto: es donde empieza la evolución.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href="/contacto/">Cuéntanos tu proyecto</PrimaryButton>
              <SecondaryButton href="/servicios/">Ver servicios</SecondaryButton>
            </div>
          </div>

          {/* Posicionamiento en tres pilares */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3 max-w-3xl">
            {[
              { k: "Negocio → IA", v: "Negocio, diseño, tecnología, documentación e IA, en ese orden." },
              { k: "Producto, no páginas", v: "Pensamos cada proyecto como un producto digital que escala." },
              { k: "Evolución continua", v: "Soporte, mejora y automatización después del lanzamiento." },
            ].map((item) => (
              <div key={item.k} className="rounded-2xl border border-line bg-white/70 backdrop-blur p-5">
                <p className="font-display font-black text-brand-600">{item.k}</p>
                <p className="mt-2 text-sm text-slate leading-relaxed">{item.v}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- POSICIONAMIENTO ---------- */}
      <section className="border-y border-line bg-paper-soft">
        <Container className="py-14">
          <p className="font-display font-bold text-xl sm:text-2xl text-ink leading-snug max-w-4xl">
            No vendemos horas ni plantillas: resolvemos problemas de negocio. Somos el estudio digital
            detrás de proyectos de{" "}
            <span className="text-brand-600">e-commerce, CRM, automatización y plataformas a la medida</span>{" "}
            — y construimos y operamos nuestro propio SaaS, <span className="text-magenta">Merez</span>.
          </p>
        </Container>
      </section>

      {/* ---------- SERVICIOS ---------- */}
      <section id="servicios" className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Qué hacemos"
            title="Cinco líneas de servicio, un solo criterio"
            intro="Diseño, desarrollo, automatización, inteligencia artificial y consultoría. Se combinan según lo que tu negocio realmente necesita."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.slug}
                className="group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <AccentTag accent={s.accent}>{s.tag}</AccentTag>
                <h3 className="mt-4 font-display font-black text-xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">{s.summary}</p>
                <Link
                  href="/servicios/"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-600 group-hover:gap-2 transition-all"
                >
                  Conocer más
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- PROFUNDIDAD DE PLATAFORMA (MEREZ) ---------- */}
      <section className="py-20 bg-ink-900 text-white relative overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-30 bg-gradient-brand"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <span className="inline-block font-display font-bold text-xs uppercase tracking-[0.18em] text-orange">
              Profundidad de plataforma
            </span>
            <h2 className="mt-3 font-display font-black text-3xl sm:text-4xl leading-tight tracking-tight">
              Lo que construimos con <span className="text-gradient">Merez</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Inflinds no solo integra software de terceros: diseñamos, desarrollamos y operamos
              nuestra propia plataforma SaaS, <strong className="text-white">Merez</strong>. Eso
              significa que dominamos de punta a punta cada uno de estos módulos y podemos
              construirlos o desplegarlos dentro del proyecto a la medida de un cliente.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {merezModules.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
              >
                <h3 className="font-display font-bold text-white">{m.name}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-400 max-w-2xl">
            Merez opera como producto propio con su propia marca y planes. Aquí lo mostramos como
            prueba de nuestra capacidad full-stack para construir plataformas completas.
          </p>
        </Container>
      </section>

      {/* ---------- METODOLOGÍA ---------- */}
      <section className="py-20 bg-paper-soft">
        <Container>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Un proceso de 10 fases, de la idea a la evolución"
            intro="Comprender antes de construir, diseñar antes de programar y documentar todo. La IA participa en cada etapa como acelerador."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {methodology.map((step) => (
              <li key={step.n} className="rounded-2xl border border-line bg-white p-5">
                <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-brand">
                  {String(step.n).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display font-bold text-ink">{step.name}</h3>
                <p className="mt-1 text-xs text-slate leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl bg-gradient-brand px-8 py-14 sm:px-14 text-center relative overflow-hidden">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
              ¿Tienes una idea o un problema que resolver?
            </h2>
            <p className="mt-4 text-white/90 text-lg max-w-2xl mx-auto">
              Cuéntanos qué necesitas. Te ayudamos a convertirlo en un producto digital que funcione
              y evolucione con tu negocio.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contacto/"
                className="inline-flex items-center rounded-xl bg-white px-7 py-3 font-bold text-brand-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Iniciar un proyecto
              </Link>
              <Link
                href="/precios/"
                className="inline-flex items-center rounded-xl border-2 border-white/70 px-7 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                Ver precios
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
