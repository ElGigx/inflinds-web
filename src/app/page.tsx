import Link from "next/link";
import { apps, clients, merezModules, plans, services, toolbox } from "@/lib/site";
import { FAMILIES, FAMILY_ORDER, familyOf } from "@/lib/tool-taxonomy";
import Icon from "@/components/Icon";
import {
  Container,
  SectionHeading,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui";

const merezIcons: Record<string, string> = {
  "CRM Inteligente": "users",
  "Agente de ventas": "chat",
  Automatizaciones: "zap",
  "Cotizaciones PDF": "file",
  "Email Marketing": "mail",
  "Blog / SEO": "edit",
  Analítica: "bars",
  Segmentación: "pie",
  Integraciones: "grid",
  Pagos: "card",
};

/* ---------- Mockup decorativo del hero (datos reales del catálogo) ---------- */

function HeroMockup() {
  const familyCounts = FAMILY_ORDER.map((key) => ({
    key,
    meta: FAMILIES[key],
    count: toolbox.filter((tool) => familyOf(tool.slug) === key).length,
  }));
  const maxFamily = Math.max(...familyCounts.map((family) => family.count));

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

        {/* Tarjeta principal: los fuertes reales */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-night-800/90 p-4">
          <p className="text-sm font-bold text-white">Nuestros fuertes</p>
          <p className="text-[10px] text-slate-400">Lo que ya tenemos montado</p>
          <div className="mt-3 space-y-1.5">
            {familyCounts.map(({ key, meta, count }) => (
              <div key={key} className="flex items-center gap-2">
                <Icon name={meta.icon} className={`h-3.5 w-3.5 shrink-0 ${meta.iconClass}`} />
                <span className="w-[70px] shrink-0 text-[10px] font-semibold text-slate-300">
                  {meta.label}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-brand-400 via-magenta to-orange"
                    style={{ width: `${Math.max(8, (count / maxFamily) * 100)}%` }}
                  />
                </span>
                <span className="w-4 text-right text-[10px] font-bold text-white">{count}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-night/70 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-cta text-white">
              <Icon name="sparkles" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Merez · operación</p>
              <p className="text-sm font-bold text-white">{merezModules.length} módulos</p>
            </div>
          </div>
        </div>

        {/* Columna de datos reales */}
        <div className="w-44 shrink-0 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
            <p className="text-xs text-slate-400">Herramientas</p>
            <p className="mt-1 font-display text-lg font-black text-white">{toolbox.length}</p>
            <p className="mt-1 text-[11px] font-bold text-yellow">
              {FAMILY_ORDER.length} familias
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
            <p className="text-xs text-slate-400">Aplicaciones</p>
            <p className="mt-1 font-display text-lg font-black text-white">{apps.length}</p>
            <p className="mt-1 text-[11px] font-bold text-magenta">con estado</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
            <p className="text-xs text-slate-400">Servicios</p>
            <p className="mt-1 font-display text-lg font-black text-white">{services.length}</p>
            <p className="mt-1 text-[11px] font-bold text-orange">a la medida</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const processSteps = [
  {
    title: "Entendemos el negocio",
    desc: "Qué te cuesta hoy, qué quieres mover y qué no vale la pena tocar.",
  },
  {
    title: "Diseñamos la solución",
    desc: "Alcance, arquitectura y pantallas antes de escribir una línea de código.",
  },
  {
    title: "Construimos y probamos",
    desc: "Entregas revisables, QA y puesta en producción sin sorpresas.",
  },
  {
    title: "Evolucionamos",
    desc: "Medición, soporte y nuevas funciones cuando el negocio cambia.",
  },
];

export default function Home() {
  const landing = plans.find((plan) => plan.slug === "landing");

  return (
    <>
      {/* ---------- HERO ---------- */}
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
                <PrimaryButton href="/contact/">
                  Cuéntanos tu proyecto
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </PrimaryButton>
                <SecondaryButton href="/services/" tone="dark">
                  Ver servicios
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </SecondaryButton>
              </div>
            </div>

            <HeroMockup />
          </div>
        </Container>
      </section>

      {/* ---------- CLIENTES ---------- */}
      <section className="border-t border-white/10 bg-night text-white">
        <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:gap-12">
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

      {/* ---------- TRES FRENTES ---------- */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Tres frentes"
              title="Empieza por donde más te duele"
              intro="Una calculadora para hoy, una app para tu operación, un proyecto para crecer. No todo se resuelve igual: por eso hay tres formas de entrar."
            />
            <Link
              href="/pricing/"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4 transition-all hover:gap-2"
            >
              Ver precios <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Link
              href="/tools/"
              className="group flex flex-col rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-yellow-600 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow/30 text-ink">
                  <Icon name="calculator" />
                </span>
                <span className="font-display text-4xl font-black text-ink">{toolbox.length}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-black text-ink">Herramientas</h3>
              <p className="mt-2 text-base font-semibold leading-snug text-ink">
                Resuelve hoy lo que te está quitando la tarde.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                41 calculadoras, conversores y generadores que abres, usas y cierras. Sin cuenta y
                sin dejar datos.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                  Sin registro
                </span>
                <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                  En tu navegador
                </span>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4 transition-all group-hover:gap-2">
                Ver las {toolbox.length} herramientas <span aria-hidden="true">→</span>
              </span>
            </Link>

            <Link
              href="/apps/"
              className="group flex flex-col rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-magenta hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-magenta/10 text-magenta">
                  <Icon name="receivables" />
                </span>
                <span className="font-display text-4xl font-black text-ink">{apps.length}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-black text-ink">Aplicaciones</h3>
              <p className="mt-2 text-base font-semibold leading-snug text-ink">
                Tu operación, fuera de la hoja de cálculo.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                2 apps que guardan el estado: cobra por tiempo y sabe quién te debe desde cuándo.
                Sin instalar nada.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                  Offline
                </span>
                <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                  Export
                </span>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-magenta underline decoration-magenta decoration-[3px] underline-offset-4 transition-all group-hover:gap-2">
                Ver las {apps.length} aplicaciones <span aria-hidden="true">→</span>
              </span>
            </Link>

            <Link
              href="/services/"
              className="group flex flex-col rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-orange hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <Icon name="code" />
                </span>
                <span className="font-display text-4xl font-black text-ink">{services.length}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-black text-ink">Servicios</h3>
              <p className="mt-2 text-base font-semibold leading-snug text-ink">
                Cuando el problema es del negocio, no de la herramienta.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                6 líneas para diseñar, construir y automatizar lo que tu operación necesita de
                verdad.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                  A la medida
                </span>
                <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                  Con IA
                </span>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-orange underline decoration-orange decoration-[3px] underline-offset-4 transition-all group-hover:gap-2">
                Ver los {services.length} servicios <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- APLICACIONES ---------- */}
      <section id="aplicaciones" className="bg-paper-soft py-20">
        <Container>
          <SectionHeading
            eyebrow="Aplicaciones"
            title="Dos apps que no se cierran: se quedan con tu operación"
            intro="Cobra por hora y sabe quién te debe. Sin cuenta, sin instalar y con los datos en tu navegador: abre al día siguiente y sigue todo."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {apps.map((app) => (
              <article
                key={app.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lg sm:flex-row"
              >
                <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-night-800 p-6 sm:w-[200px]">
                  <div className="absolute inset-0 hero-glow-night opacity-70" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/tools/${app.slug}/icons/icon-512.png`}
                    alt={`Logo de ${app.title}`}
                    width={512}
                    height={512}
                    className="relative h-28 w-28 rounded-[26px] shadow-2xl ring-1 ring-white/20 transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-magenta">
                      {app.eyebrow} · app
                    </p>
                    <span className="rounded-full bg-magenta/10 px-2.5 py-1 text-[10px] font-bold text-magenta">
                      PWA
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-black leading-tight text-ink">
                    {app.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-snug text-ink">{app.promise}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{app.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                      Sin cuenta
                    </span>
                    <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                      Funciona sin señal
                    </span>
                    <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold text-slate">
                      Export
                    </span>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                    <Link
                      href={`/tools/${app.slug}/`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4 transition-all group-hover:gap-2"
                    >
                      Abrir la app <span aria-hidden="true">→</span>
                    </Link>
                    <Link href="/apps/" className="text-sm font-semibold text-slate hover:text-ink">
                      Cómo funciona
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/apps/"
              className="inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-magenta decoration-[3px] underline-offset-4"
            >
              Ver las {apps.length} aplicaciones <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- HERRAMIENTAS ---------- */}
      <section id="herramientas" className="relative overflow-hidden bg-night py-20 text-white">
        <div
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-magenta/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="min-w-0">
            <Eyebrow tone="dark">Herramientas</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl">
              Lo que hoy te quita la tarde, resuelto en minutos.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-300">
              {toolbox.length} herramientas para las cuentas, los plazos y las decisiones del día a
              día. Muchas son calculadoras; otras generan lo que necesitas. Se abren, resuelven y
              se cierran.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PrimaryButton href="/tools/">Explorar las {toolbox.length} herramientas</PrimaryButton>
              <Link
                href="/tools/"
                className="inline-flex items-center gap-1 text-sm font-bold text-slate-300 transition-colors hover:text-white"
              >
                Ver por familia <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="grid min-w-0 gap-2 sm:grid-cols-2">
            {FAMILY_ORDER.map((key) => {
              const meta = FAMILIES[key];
              const count = toolbox.filter((tool) => familyOf(tool.slug) === key).length;
              return (
                <Link
                  key={key}
                  href={`/tools/#familia-${key}`}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.tile}`}
                  >
                    <Icon name={meta.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-white">{meta.label}</span>
                    <span className="block text-[11px] leading-snug text-slate-400">
                      {meta.blurb}
                    </span>
                  </span>
                  <span className="font-display text-lg font-black text-white">{count}</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------- SERVICIOS ---------- */}
      <section id="servicios" className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Servicios</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Cuando la herramienta no alcanza, construimos.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Diseño, desarrollo, automatización, IA, consultoría y visibilidad. Se combinan
                según lo que tu negocio necesita, no según un paquete.
              </p>

              <div className="mt-6 rounded-2xl border border-line bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-magenta">
                  Destacado
                </p>
                <p className="mt-2 font-display text-xl font-black text-ink">
                  Merez · la plataforma
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  La operación completa, sin cobro por usuario.
                </p>
                <a
                  href="https://www.merez.co/"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-magenta hover:underline"
                >
                  Conocer Merez <span aria-hidden="true">→</span>
                </a>
                <PrimaryButton href="/contact/" className="mt-4 w-full justify-center">
                  Cuéntanos tu proyecto
                </PrimaryButton>
              </div>

              {landing?.price && (
                <div className="mt-4 rounded-2xl border border-line bg-paper-soft p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-magenta">
                    Para empezar
                  </p>
                  <p className="mt-2 font-display text-xl font-black text-ink">
                    Landing page desde {landing.price}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate">
                    Entrega en 10 días hábiles. Dominio, hosting y correo incluidos.
                  </p>
                  <Link
                    href="/pricing/"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
                  >
                    Ver planes y precios <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>

            <ol className="divide-y divide-line border-y border-line">
              {services.map((service, index) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/#${service.slug}`}
                    className="group flex items-start gap-5 py-5"
                  >
                    <span className="mt-1 font-display text-sm font-black text-magenta">
                      0{index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-black leading-snug text-ink transition-colors group-hover:text-magenta">
                        {service.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate">
                        {service.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-slate-400 transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ---------- MEREZ ---------- */}
      <section className="relative overflow-hidden bg-night py-20 text-white">
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">Construimos plataforma</Eyebrow>
            <h2 className="mt-3 font-display font-black text-3xl leading-tight tracking-tight sm:text-4xl">
              Lo que construimos con <span className="text-gradient-warm">Merez</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Inflinds no solo integra y configura: diseñamos, desarrollamos y operamos nuestra
              propia plataforma SaaS, <strong className="text-white">Merez</strong>. Eso significa
              que dominamos de punta a punta cada uno de estos módulos y podemos construirlos o
              adaptarlos a la medida de cada proyecto.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {merezModules.map((module) => (
              <div
                key={module.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-magenta">
                  <Icon name={merezIcons[module.name]} className="h-4 w-4" />
                </span>
                <h3 className="mt-3 font-display font-bold text-white">{module.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{module.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-slate-400">
              Todos estos módulos se pueden activar por separado o integrarse entre sí. Así
              construimos soluciones escalables, medibles y realmente conectadas.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.merez.co/"
                className="inline-flex items-center rounded-xl bg-yellow px-5 py-3 text-sm font-bold text-ink transition hover:brightness-95"
              >
                Conocer Merez <span aria-hidden="true" className="ml-2">→</span>
              </a>
              <Link
                href="/login/"
                className="inline-flex items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-yellow/70"
              >
                Entrar al panel
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- DETRÁS DEL ESTUDIO + CÓMO TRABAJAMOS ---------- */}
      <section className="bg-paper-soft py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <Eyebrow>Detrás del estudio</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/gigx/miguel.jpg"
                  alt="Miguel Yañez, fundador de Inflinds"
                  width={160}
                  height={160}
                  loading="lazy"
                  className="h-16 w-16 rounded-2xl object-cover ring-1 ring-line"
                />
                <div>
                  <p className="font-display text-lg font-black text-ink">Miguel Yañez</p>
                  <p className="text-sm text-slate">Fundador y CTO · fundador de Merez</p>
                </div>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                La misma persona que entiende el negocio escribe el brief, decide la arquitectura y
                responde cuando algo falla. Orquesto modelos de IA como equipo de ingeniería —con
                verificación y costo medido—: la IA potencia el criterio, no lo reemplaza.
              </p>
              <Link
                href="/gigx/"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
              >
                Ver el perfil completo <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div>
              <Eyebrow>Cómo trabajamos</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Cuatro pasos. Cero sorpresas.
              </h2>
              <ol className="mt-6 space-y-4">
                {processSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-night font-display text-xs font-black text-yellow">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-display font-black text-ink">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/services/"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
              >
                Ver el proceso completo de 10 fases <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-banner px-8 py-10 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                Siguiente paso
              </p>
              <h2 className="mt-2 font-display font-black text-2xl leading-tight text-white sm:text-3xl">
                ¿Qué te está costando dinero hoy?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                Una calculadora, una app o un proyecto a la medida. Cuéntanos el problema y te
                decimos por dónde empezar —sin compromiso.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-wrap gap-4 lg:mt-0">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-xl bg-white px-7 py-3 font-bold text-brand-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Cuéntanos tu proyecto <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <Link
                href="/pricing/"
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
