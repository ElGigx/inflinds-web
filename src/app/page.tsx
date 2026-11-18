import Link from "next/link";
import { apps, clients, merezModules, services, toolbox } from "@/lib/site";
import { FAMILIES, FAMILY_ORDER, familyOf } from "@/lib/tool-taxonomy";
import Icon from "@/components/Icon";
import ToolMark from "@/components/tools/ToolMark";
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
  "seo-geo": "target",
};

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

/* ---------- Mockup del hero: los tres frentes + el puente a Merez ---------- */

function FrontsMockup() {
  return (
    <div className="relative hidden select-none lg:block" aria-hidden="true">
      <div className="absolute -inset-8 rounded-full bg-brand-600/25 blur-3xl" />
      <div className="relative space-y-3">
        <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-yellow/15 text-yellow">
                <Icon name="calculator" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Herramientas</p>
                <p className="font-display text-lg font-black leading-none text-white">
                  {toolbox.length}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-yellow/15 px-2 py-1 text-[10px] font-bold text-yellow">
              se cierran
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            IVA, nómina, precios, fechas... y también conversores y generadores. Muchas calculan;
            otras no.
          </p>
        </div>

        <div className="rounded-2xl border border-magenta/30 bg-night-800/90 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-magenta/15 text-magenta">
                <Icon name="receivables" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Aplicaciones</p>
                <p className="font-display text-lg font-black leading-none text-white">
                  {apps.length}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-magenta/15 px-2 py-1 text-[10px] font-bold text-magenta">
              se quedan abiertas
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            Cobro por tiempo y Cuentas claras: estado, export y PWA.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-night-800/90 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange/15 text-orange">
                <Icon name="code" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Servicios</p>
                <p className="font-display text-lg font-black leading-none text-white">
                  {services.length}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-orange/15 px-2 py-1 text-[10px] font-bold text-orange">
              a la medida
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            Diseño, desarrollo, automatización, IA, consultoría y SEO.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-night px-4 py-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-yellow font-display text-sm font-black text-ink">
            M
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-yellow">
              El puente
            </p>
            <p className="text-sm font-bold text-white">Merez: la operación que sí guarda el dato</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 hero-glow-night" aria-hidden="true" />
        <Container className="relative py-20 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow tone="dark">Herramientas · Aplicaciones · Servicios</Eyebrow>
              <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl xl:text-6xl leading-[1.05] tracking-tight">
                Calcula, opera y{" "}
                <span className="text-gradient-warm">construye</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-300">
                {toolbox.length} herramientas que abres, usas y cierras —muchas de ellas
                calculadoras—; {apps.length} aplicaciones que se quedan abiertas con tu operación; y{" "}
                {services.length} servicios para lo que no cabe en una herramienta. Todo empieza en
                tu navegador; lo que necesita vivir con el negocio, en Merez.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href="/tools/">
                  Explorar las {toolbox.length} herramientas
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </PrimaryButton>
                <SecondaryButton href="/apps/" tone="dark">
                  Ver las {apps.length} aplicaciones
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </SecondaryButton>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                <Link
                  href="/services/"
                  className="font-semibold text-slate-300 transition-colors hover:text-white"
                >
                  Servicios a la medida →
                </Link>
                <span className="text-slate-600">·</span>
                <Link
                  href="/contact/"
                  className="font-semibold text-slate-300 transition-colors hover:text-white"
                >
                  Hablemos →
                </Link>
              </div>
            </div>

            <FrontsMockup />
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
          <SectionHeading
            eyebrow="Tres frentes"
            title="Un mismo criterio, tres formas de resolver"
            intro="No todo se resuelve igual. Algunas cosas caben en una herramienta que se cierra; otras necesitan una aplicación que guarde el estado; otras, un proyecto a la medida."
          />
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
              <h3 className="mt-4 font-display text-xl font-black text-ink">Herramientas</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Calculadoras, conversores y generadores: se abren, resuelven y se cierran. Sin
                cuenta y sin dejar datos.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-slate">
                <li>IVA, nómina, precios, fechas...</li>
                <li>Enlaces de WhatsApp, firmas, teléfonos...</li>
                <li>Muchas calculan; otras generan.</li>
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4 transition-all group-hover:gap-2">
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
              <h3 className="mt-4 font-display text-xl font-black text-ink">Aplicaciones</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Las que tienen estado: abres al día siguiente y sigue todo. Instalables, sin cuenta
                y con los datos en tu navegador.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-slate">
                <li>Cobro por tiempo</li>
                <li>Cuentas claras</li>
                <li>Export a JSON y PWA</li>
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-magenta underline decoration-magenta decoration-[3px] underline-offset-4 transition-all group-hover:gap-2">
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
              <h3 className="mt-4 font-display text-xl font-black text-ink">Servicios</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Diseño, desarrollo, automatización, IA, consultoría y SEO: el trabajo que no cabe en
                una herramienta.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-slate">
                <li>Producto y sitios web</li>
                <li>Integraciones y automatización</li>
                <li>IA aplicada y visibilidad</li>
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange underline decoration-orange decoration-[3px] underline-offset-4 transition-all group-hover:gap-2">
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
            title="Las que no se cierran: se quedan con tu operación"
            intro="Dos apps instalables, sin cuenta y con los datos en tu navegador. Se abren al día siguiente con todo lo que dejaste."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {apps.map((app) => (
              <article
                key={app.slug}
                className="group overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative flex h-[340px] items-center justify-center overflow-hidden bg-night p-5">
                  <div className="absolute inset-0 hero-glow-night opacity-60" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/tools/${app.slug}/app-preview.png`}
                    alt={`Vista de la app ${app.title}`}
                    width={520}
                    height={844}
                    loading="lazy"
                    className="relative h-full w-auto rounded-2xl shadow-2xl ring-1 ring-white/10"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <ToolMark slug={app.slug} className="h-10 w-10" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-magenta">
                        {app.eyebrow}
                      </p>
                      <h3 className="font-display text-xl font-black leading-tight text-ink">
                        {app.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-ink">{app.promise}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{app.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
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

      {/* ---------- HERRAMIENTAS POR FAMILIA ---------- */}
      <section id="herramientas" className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Herramientas"
            title={`${toolbox.length} herramientas, muchas de ellas calculadoras`}
            intro="Agrupadas por el trabajo que resuelven. Se abren, resuelven y se cierran: sin cuenta y sin dejar datos en servidores."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FAMILY_ORDER.map((key) => {
              const meta = FAMILIES[key];
              const count = toolbox.filter((tool) => familyOf(tool.slug) === key).length;
              return (
                <Link
                  key={key}
                  href={`/tools/#familia-${key}`}
                  className={`group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${meta.hover}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${meta.tile}`}
                    >
                      <Icon name={meta.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-2xl font-black text-ink">{count}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-black text-ink">{meta.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{meta.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ink transition-all group-hover:gap-2">
                    Ver las {count} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <Link
              href="/tools/"
              className="inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
            >
              Ver el catálogo completo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- SERVICIOS ---------- */}
      <section id="servicios" className="bg-paper-soft py-20">
        <Container>
          <SectionHeading
            eyebrow="Servicios"
            title="Seis líneas de servicio, un solo criterio"
            intro="Diseño, desarrollo, automatización, inteligencia artificial, consultoría y visibilidad. Se combinan según lo que tu negocio realmente necesita."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  href={`/services/#${s.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4 transition-all group-hover:gap-2"
                >
                  Conocer más <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
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
          <div className="mt-6 flex flex-wrap gap-4">
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
        </Container>
      </section>

      {/* ---------- DETRÁS DEL ESTUDIO ---------- */}
      <section className="pb-4 pt-20">
        <Container>
          <div className="grid items-center gap-8 rounded-3xl border border-line bg-white p-6 sm:p-10 md:grid-cols-[220px_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gigx/miguel.jpg"
              alt="Miguel Yañez, fundador de Inflinds"
              width={400}
              height={400}
              loading="lazy"
              className="h-52 w-52 rounded-2xl object-cover ring-1 ring-line md:h-56 md:w-56"
            />
            <div>
              <Eyebrow>Detrás del estudio</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
                Miguel Yañez · Fundador y CTO de Inflinds, fundador de Merez.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
                Diseño producto y arquitectura la solución: la misma persona que entiende el negocio
                escribe el brief, decide el sistema y responde cuando algo falla. Orquesto modelos de
                IA como equipo de ingeniería, con verificación y costo medido — la IA potencia el
                criterio, no lo reemplaza.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/gigx/"
                  className="inline-flex items-center rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-magenta"
                >
                  Ver el perfil completo →
                </Link>
                <a
                  href="https://www.merez.co/about/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl px-2 py-2.5 text-sm font-bold text-magenta hover:underline"
                >
                  Cómo construyo Merez →
                </a>
              </div>
            </div>
          </div>
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
              <h2 className="font-display font-black text-2xl leading-tight text-white sm:text-3xl">
                ¿Tienes una idea o un problema que resolver?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                Cuéntanos qué necesitas. Te ayudamos a convertirlo en un producto digital que
                funcione y evolucione con tu negocio.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-wrap gap-4 lg:mt-0">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-xl bg-white px-7 py-3 font-bold text-brand-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Iniciar un proyecto <span aria-hidden="true" className="ml-2">→</span>
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
