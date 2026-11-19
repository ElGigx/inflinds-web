import type { Metadata } from "next";
import Link from "next/link";
import { apps } from "@/lib/site";
import { tools } from "@/lib/tools";
import Icon from "@/components/Icon";
import ToolMark from "@/components/tools/ToolMark";
import {
  Container,
  Eyebrow,
  SectionHeading,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui";

const CANONICAL = "https://inflinds.com/apps/";

export const metadata: Metadata = {
  title: "Aplicaciones",
  description:
    "Dos aplicaciones que se quedan abiertas: Cobro por tiempo y Cuentas claras. Instalables, sin cuenta y con los datos en tu navegador. Export a JSON y puente a Merez.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Aplicaciones · Inflinds",
    description:
      "Cobro por tiempo y Cuentas claras: las dos apps que no se cierran. Local-first, PWA y export.",
    url: CANONICAL,
    type: "website",
  },
};

const appDetails: Record<string, string[]> = {
  "time-billing": [
    "Sesiones con inicio y fin, cliente y trabajo",
    "Tope de 12 h por sesión y tarifa por día",
    "Total por cliente y por trabajo, sin hojas de cálculo",
    "Exporta e importa JSON para no perder el histórico",
  ],
  "accounts-receivable": [
    "Quién te debe, cuánto y desde cuándo",
    "Abonos, saldo y semáforo de vencimiento",
    "Ordenado por deuda, no por nombre",
    "Exporta e importa JSON para respaldar la cartera",
  ],
};

const common = [
  {
    icon: "check",
    title: "Local-first",
    text: "Los datos viven en el localStorage de tu navegador. No viajan a un servidor nuestro ni piden cuenta.",
  },
  {
    icon: "grid",
    title: "PWA instalable",
    text: "Se instalan desde el navegador y abren como una app. En el celular quedan a un toque.",
  },
  {
    icon: "file",
    title: "Export a JSON",
    text: "Todo se puede descargar y volver a importar. Si cambias de equipo, el histórico va contigo.",
  },
  {
    icon: "zap",
    title: "Puente a Merez",
    text: "Cuando el dato tiene que vivir con el cliente y el equipo, Merez es el siguiente paso natural.",
  },
  {
    icon: "users",
    title: "Sin cuenta",
    text: "No hay registro, correo ni contraseña. Abres la app y trabajas.",
  },
];

const faqs = [
  {
    q: "¿Se guardan mis datos en la nube?",
    a: "No. Las dos apps guardan en el localStorage de tu navegador. Si cambias de equipo, borras los datos del sitio o quieres respaldo, usas el export a JSON.",
  },
  {
    q: "¿Cuánto cuestan?",
    a: "Nada. Son gratis y no piden cuenta. Merez es aparte: se paga cuando el negocio necesita clientes, histórico, equipo y la operación completa en un solo lugar.",
  },
  {
    q: "¿Funcionan sin internet?",
    a: "Una vez instaladas, sí: la PWA queda en caché y abre sin conexión. La primera visita y la instalación necesitan internet.",
  },
  {
    q: "¿Puedo pasar los datos a Merez?",
    a: "El export es JSON y hoy se importa en la misma app. Llevar la cartera o las horas a Merez es el siguiente paso del puente y se hace acompañado, para que el histórico quede bien.",
  },
];

const relatedSlugs = ["receivables-age", "lost-hours", "break-even"];

const relatedTools = relatedSlugs
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Aplicaciones de Inflinds",
  itemListElement: apps.map((app, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: app.title,
      description: app.description,
      url: `https://inflinds.com/tools/${app.slug}/`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "COP" },
    },
  })),
};

export default function AppsPage() {
  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 hero-glow-night" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Eyebrow tone="dark">Aplicaciones</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Dos aplicaciones que se quedan abiertas.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Las herramientas se abren y se cierran. Estas dos no: tienen estado, se instalan y
            siguen ahí al día siguiente. Sin cuenta, con los datos en tu navegador y con export
            cuando quieras moverlos.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="/tools/accounts-receivable/">
              Abrir Cuentas claras
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </PrimaryButton>
            <SecondaryButton href="/tools/time-billing/" tone="dark">
              Abrir Cobro por tiempo
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </SecondaryButton>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <Link href="/tools/" className="font-semibold text-slate-300 hover:text-white">
              O vuelve a las {tools.length - apps.length} herramientas →
            </Link>
            <span className="text-slate-600">·</span>
            <span>Instalables · sin cuenta · local-first</span>
          </div>
        </Container>
      </section>

      {/* ---------- LAS DOS APPS ---------- */}
      <section className="py-20">
        <Container>
          <div className="grid gap-6">
            {apps.map((app) => (
              <article
                key={app.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:shadow-lg md:flex-row"
              >
                <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-night-800 p-8 md:w-[300px]">
                  <div className="absolute inset-0 hero-glow-night opacity-70" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/tools/${app.slug}/icons/icon-512.png`}
                    alt={`Logo de ${app.title}`}
                    width={512}
                    height={512}
                    className="relative h-40 w-40 rounded-[32px] shadow-2xl ring-1 ring-white/20 transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-magenta">
                      {app.eyebrow} · app
                    </p>
                    <span className="rounded-full bg-magenta/10 px-2.5 py-1 text-[10px] font-bold text-magenta">
                      PWA
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
                    {app.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-ink">{app.promise}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{app.description}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {appDetails[app.slug].map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Link
                      href={`/tools/${app.slug}/app.html`}
                      className="inline-flex items-center rounded-xl bg-night px-5 py-3 text-sm font-bold text-white transition hover:bg-night-700"
                    >
                      Abrir la app <span aria-hidden="true" className="ml-1">→</span>
                    </Link>
                    <Link
                      href={`/tools/${app.slug}/`}
                      className="inline-flex items-center rounded-xl border border-line px-5 py-3 text-sm font-bold text-ink transition hover:border-magenta"
                    >
                      Ver la ficha
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- QUÉ TIENEN EN COMÚN ---------- */}
      <section className="bg-paper-soft py-20">
        <Container>
          <SectionHeading
            eyebrow="En común"
            title="Qué comparten las dos"
            intro="No son dos experimentos sueltos: salen del mismo criterio de producto."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {common.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-ink">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                <h3 className="mt-3 font-display font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- EL PUENTE A MEREZ ---------- */}
      <section className="py-20">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-night p-8 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <Eyebrow tone="dark">El puente</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black leading-tight sm:text-3xl">
                Cuando el dato tiene que vivir con el negocio
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Las apps son el extremo simple: instalan, funcionan y se exportan. Merez es el otro
                extremo: el cliente, el histórico y el equipo en el mismo lugar, con la operación
                completa. No compiten: se conectan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.merez.co/"
                className="inline-flex items-center rounded-xl bg-yellow px-5 py-3 text-sm font-bold text-ink transition hover:brightness-95"
              >
                Conocer Merez <span aria-hidden="true" className="ml-2">→</span>
              </a>
              <Link
                href="/pricing/"
                className="inline-flex items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-yellow/70"
              >
                Ver precios
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            eyebrow="Dudas"
            title="Lo que suelen preguntar"
            intro="Sin letra pequeña: así funcionan las apps por dentro."
          />
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-line bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <Icon
                    name="chevron-down"
                    className="h-4 w-4 shrink-0 text-slate transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- HERRAMIENTAS RELACIONADAS ---------- */}
      <section className="bg-paper-soft py-20">
        <Container>
          <SectionHeading
            eyebrow="Antes de la app"
            title="Si todavía no necesitas estado, empieza por una herramienta"
            intro="Estas tres resuelven la cuenta suelta y no guardan nada. Son el paso previo natural a una app."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <ToolMark slug={tool.slug} className="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{tool.title}</p>
                  <p className="truncate text-[11px] text-slate">{tool.promise}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/tools/"
              className="inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
            >
              Ver las {tools.length - apps.length} herramientas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-banner px-8 py-10 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <h2 className="font-display font-black text-2xl leading-tight text-white sm:text-3xl">
                ¿Necesitas una app a la medida?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                Si la herramienta o la app no alcanzan, lo construimos: producto, desarrollo,
                integraciones e IA, con el mismo criterio.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-wrap gap-4 lg:mt-0">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-xl bg-white px-7 py-3 font-bold text-brand-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Hablemos <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <Link
                href="/services/"
                className="inline-flex items-center rounded-xl border-2 border-white/70 px-7 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                Ver servicios <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
