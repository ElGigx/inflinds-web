import Link from "next/link";
import { services, merezModules, clients } from "@/lib/site";
import Icon from "@/components/Icon";
import ProcessStrip from "@/components/ProcessStrip";
import {
  Container,
  SectionHeading,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui";

const serviceIcons: Record<string, string> = {
  diseno: "pen",
  desarrollo: "code",
  automatizacion: "settings",
  "inteligencia-artificial": "sparkles",
  consultoria: "target",
};

const merezIcons: Record<string, string> = {
  "CRM Inteligente": "users",
  "Agentes de IA (WhatsApp)": "chat",
  Automatizaciones: "zap",
  "Cotizaciones PDF": "file",
  "Email Marketing": "mail",
  "Blog / SEO": "edit",
  Analítica: "bars",
  Segmentación: "pie",
  Integraciones: "grid",
  Pagos: "card",
};

/* ---------- Mockup decorativo del hero (dashboard ilustrativo, datos ficticios) ---------- */

function HeroMockup() {
  return (
    <div className="relative hidden lg:block select-none" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="relative flex items-start gap-3">
        {/* Barra lateral */}
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-night-800/90 p-2">
          {["users", "chat", "zap", "file", "bars", "grid"].map((n, i) => (
            <span
              key={n}
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                i === 0 ? "bg-magenta text-white" : "text-slate-400"
              }`}
            >
              <Icon name={n} className="h-4 w-4" />
            </span>
          ))}
        </div>

        {/* Tarjeta principal con gráfica */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-night-800/90 p-4">
          <p className="text-sm font-bold text-white">Resumen del proyecto</p>
          <svg viewBox="0 0 260 110" className="mt-3 w-full">
            <defs>
              <linearGradient id="mock-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#751cb4" />
                <stop offset="0.55" stopColor="#f8049c" />
                <stop offset="1" stopColor="#ff8e00" />
              </linearGradient>
              <linearGradient id="mock-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f8049c" stopOpacity="0.22" />
                <stop offset="1" stopColor="#f8049c" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                x2="260"
                y1={20 + i * 25}
                y2={20 + i * 25}
                stroke="rgba(255,255,255,0.07)"
              />
            ))}
            <path
              d="M0 92 C28 88 40 72 66 78 C92 84 104 58 132 54 C158 50 172 64 196 42 C216 24 240 18 260 10 L260 110 L0 110 Z"
              fill="url(#mock-fill)"
            />
            <path
              d="M0 92 C28 88 40 72 66 78 C92 84 104 58 132 54 C158 50 172 64 196 42 C216 24 240 18 260 10"
              fill="none"
              stroke="url(#mock-line)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-500">
            {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-night/70 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-cta text-white">
              <Icon name="zap" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Automatización activa</p>
              <p className="text-sm font-bold text-white">
                24 procesos <span className="font-normal text-slate-400">ahorrando tiempo</span>
              </p>
            </div>
          </div>
        </div>

        {/* Columna de métricas */}
        <div className="w-44 shrink-0 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
            <p className="text-xs text-slate-400">Ventas totales</p>
            <p className="mt-1 font-display font-black text-lg text-white">$ 124.580.000</p>
            <p className="mt-1 text-[11px] font-bold text-yellow">↑ 24% vs mes anterior</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
            <div className="flex -space-x-2">
              {["bg-brand-400", "bg-magenta", "bg-orange", "bg-brand-300"].map((c, i) => (
                <span
                  key={i}
                  className={`h-8 w-8 rounded-full border-2 border-night-800 ${c}`}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
            <p className="text-xs text-slate-400">Usuarios activos</p>
            <p className="mt-1 font-display font-black text-lg text-white">1.428</p>
            <p className="mt-1 text-[11px] font-bold text-yellow">↑ 16% vs mes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- HERO (oscuro) ---------- */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 hero-glow-night" aria-hidden="true" />
        <Container className="relative py-20 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow tone="dark">Digital Product Studio</Eyebrow>
              <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl xl:text-6xl leading-[1.05] tracking-tight">
                Diseñamos y construimos{" "}
                <span className="text-gradient-warm">productos digitales</span>, no solo páginas
                web.
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-300">
                Combinamos negocio, diseño, tecnología e inteligencia artificial para acelerar la
                transformación digital de empresas y emprendedores. Un lanzamiento nunca es el
                final del proyecto: es donde empieza la evolución.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href="/contacto/">
                  Cuéntanos tu proyecto <span aria-hidden="true" className="ml-2">→</span>
                </PrimaryButton>
                <SecondaryButton href="/servicios/" tone="dark">
                  Ver servicios <span aria-hidden="true" className="ml-2">→</span>
                </SecondaryButton>
              </div>
            </div>

            <HeroMockup />
          </div>
        </Container>
      </section>

      {/* ---------- FRANJA DE CONFIANZA (clientes reales) ---------- */}
      <section className="bg-night text-white border-t border-white/10">
        <Container className="py-10 flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
          <p className="max-w-[230px] shrink-0 text-sm leading-snug text-slate-400">
            Con la confianza de empresas y emprendedores que evolucionan cada día.
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <li key={c} className="font-display font-bold tracking-wide text-white/55">
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- POSICIONAMIENTO ---------- */}
      <section className="bg-night pb-20 pt-10 text-white">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-night-800/80 p-8 sm:flex-row sm:items-center sm:p-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-cta text-white">
              <Icon name="zap" className="h-6 w-6" />
            </span>
            <p className="font-display font-bold text-xl sm:text-2xl leading-snug">
              No vendemos horas ni plantillas: resolvemos problemas de negocio. Somos el estudio
              digital detrás de proyectos de{" "}
              <span className="text-magenta">
                e-commerce, CRM, automatización y plataformas a la medida
              </span>{" "}
              — y construimos y operamos nuestro propio SaaS,{" "}
              <span className="text-orange">Merez</span>.
            </p>
          </div>
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((s) => (
              <article
                key={s.slug}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-ink">
                  <Icon name={serviceIcons[s.slug]} />
                </span>
                <h3 className="mt-4 font-display font-black text-lg leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{s.summary}</p>
                <Link
                  href="/servicios/"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4 transition-all group-hover:gap-2"
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
      <section className="relative overflow-hidden bg-night py-20 text-white">
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">Construimos plataforma</Eyebrow>
            <h2 className="mt-3 font-display font-black text-3xl sm:text-4xl leading-tight tracking-tight">
              Lo que construimos con <span className="text-gradient-warm">Merez</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Inflinds no solo integra y configura: diseñamos, desarrollamos y operamos nuestra
              propia plataforma SaaS, <strong className="text-white">Merez</strong>. Eso significa
              que dominamos de punta a punta cada uno de estos módulos y podemos construirlos o
              adaptarlos a la medida de cada proyecto.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {merezModules.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-magenta">
                  <Icon name={merezIcons[m.name]} className="h-4 w-4" />
                </span>
                <h3 className="mt-3 font-display font-bold text-white">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-slate-400">
            Todos estos módulos se pueden activar por separado o integrarse entre sí. Así
            construimos soluciones escalables, medibles y realmente conectadas.
          </p>
        </Container>
      </section>

      {/* ---------- METODOLOGÍA ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Un proceso de 10 fases, de la idea a la evolución"
            intro="Transparencia, método e iteración constante para entregar resultados reales."
          />
          <div className="mt-12">
            <ProcessStrip />
          </div>
        </Container>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-banner px-8 py-10 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight text-white">
                ¿Tienes una idea o un problema que resolver?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
                Cuéntanos qué necesitas. Te ayudamos a convertirlo en un producto digital que
                funcione y evolucione con tu negocio.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-wrap gap-4 lg:mt-0">
              <Link
                href="/contacto/"
                className="inline-flex items-center rounded-xl bg-white px-7 py-3 font-bold text-brand-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Iniciar un proyecto <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <Link
                href="/precios/"
                className="inline-flex items-center rounded-xl border-2 border-white/70 px-7 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                Ver precios <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
