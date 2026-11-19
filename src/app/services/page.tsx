import type { Metadata } from "next";
import Link from "next/link";
import { clients, services } from "@/lib/site";
import ProcessStrip from "@/components/ProcessStrip";
import ServiceArt from "@/components/services/ServiceArt";
import ServiceFinder from "@/components/services/ServiceFinder";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño, desarrollo, automatización, IA, consultoría y visibilidad en buscadores: seis líneas que se combinan según el problema.",
  alternates: { canonical: "https://inflinds.com/services/" },
};

const cases = [
  {
    name: "Fusion Pipe Tools",
    sector: "Distribución industrial",
    fact: "Catálogo de 41 fichas, sitio público y un mini-CRM para cotizar, sobre el mismo dato.",
    image: "/gigx/shots/fusion-home.webp",
  },
  {
    name: "Acertar",
    sector: "Certificación documental",
    fact: "Portal de certificados con consulta pública y verificación por código, sobre Merez.",
    image: "/gigx/shots/acertar-home.webp",
  },
  {
    name: "Merez",
    sector: "Producto propio",
    fact: "Plataforma multi-tenant que reúne catálogo, cotizaciones, pedidos, cobros y agentes.",
    image: "/gigx/shots/merez-industrial.webp",
  },
];

const faqs = [
  {
    q: "¿Trabajan por proyecto o por acompañamiento?",
    a: "Las dos. Un sitio o una plataforma se cotizan por proyecto con alcance y fechas; el acompañamiento mensual existe para productos que siguen evolucionando.",
  },
  {
    q: "¿Puedo empezar solo con una parte?",
    a: "Sí. Se puede empezar por el diagnóstico, por el diseño o por un módulo concreto. Lo que no hacemos es prometer un producto completo sin haber entendido la operación.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del alcance. Un sitio informativo toma semanas; una plataforma con permisos, datos y cobros toma meses. La propuesta dice el rango y qué lo mueve.",
  },
  {
    q: "¿Qué pasa después de entregar?",
    a: "Queda documentado y con accesos del cliente. Si sigue la relación, hay soporte y evolución; si no, el cliente puede operarlo con su equipo.",
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            serviceType: service.tag,
            provider: { "@type": "Organization", name: "Inflinds", url: "https://inflinds.com" },
            areaServed: "CO",
            url: `https://inflinds.com/services/#${service.slug}`,
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 hero-glow-night" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow tone="dark">Servicios</Eyebrow>
              <h1 className="mt-3 max-w-2xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Seis formas de construir producto. Una sola conversación.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
                No vendemos una lista de servicios: elegimos la línea que resuelve el problema.
                Diseño, desarrollo, automatización, IA y consultoría se combinan según lo que el
                negocio necesite, no según lo que sepamos hacer.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/contact/">Cuéntanos tu proyecto</PrimaryButton>
                <Link
                  href="/pricing/"
                  className="inline-flex items-center rounded-xl border-2 border-white/25 px-6 py-3 font-bold text-white transition hover:border-white/60 hover:bg-white/5"
                >
                  Ver precios
                </Link>
              </div>
              <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-5">
                <div>
                  <dt className="text-xs text-slate-400">Líneas</dt>
                  <dd className="font-display text-2xl font-black text-white">{services.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Clientes</dt>
                  <dd className="font-display text-2xl font-black text-white">{clients.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Casos</dt>
                  <dd className="font-display text-2xl font-black text-white">{cases.length}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white p-4 shadow-2xl sm:p-5">
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/`}
                    className="group rounded-2xl border border-line bg-white p-3 transition hover:border-magenta"
                  >
                    <span className="block h-20 w-full">
                      <ServiceArt slug={service.slug} />
                    </span>
                    <span className="mt-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink">{service.tag}</span>
                      <span
                        aria-hidden="true"
                        className="text-slate-400 transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <ServiceFinder />
        </Container>
      </section>

      <section className="bg-paper-soft py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Las seis líneas</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Lo que podemos construir.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Cada línea tiene su ficha completa: qué incluye, cuándo se nota y cómo se trabaja.
              </p>
              <Link
                href="/contact/"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
              >
                ¿No sabes cuál? Hablemos <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="border-t border-line">
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  id={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group grid scroll-mt-24 grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-6"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
                    <ServiceArt slug={service.slug} compact />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-black leading-tight text-ink transition-colors group-hover:text-magenta sm:text-2xl">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate">
                      {service.summary}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden font-display text-3xl font-black text-ink/10 sm:block sm:text-4xl"
                  >
                    0{index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-slate-400 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-night py-16 text-white sm:py-20">
        <div
          className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">Cómo se trabaja</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl">
              Cuatro etapas. Diez fases. Cero cajas negras.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Cada etapa deja algo que puedes revisar: alcance, pantallas, código, pruebas y
              accesos. Tú ves el avance, no solo el resultado.
            </p>
          </div>
          <div className="mt-10">
            <ProcessStrip />
          </div>
          <div className="mt-8 flex justify-end">
            <Link
              href="/contact/"
              className="text-sm font-bold text-yellow transition-colors hover:text-white"
            >
              Hablemos de tu proyecto <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>En producción</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Lo que ya está en producción.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                No son mockups: son sitios y plataformas que están operando hoy.
              </p>
            </div>
            <Link
              href="/gigx/portfolio/"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
            >
              Ver el portafolio <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-4">
            {cases.map((item, index) => (
              <Link
                key={item.name}
                href="/gigx/portfolio/#casos"
                className="group grid overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lg md:grid-cols-[400px_1fr]"
              >
                <div className="relative h-52 overflow-hidden bg-night md:h-[250px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.name}, en producción`}
                    width={1440}
                    height={900}
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-magenta">0{index + 1}</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-magenta">
                      {item.sector}
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-black text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.fact}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-magenta">
                    Ver en el portafolio <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-night p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-black">¿Antes de contratar, quieres probar?</p>
              <p className="mt-1 text-sm text-slate-300/80">
                41 herramientas, muchas de ellas calculadoras, sin cuenta y sin guardar datos.
              </p>
            </div>
            <Link
              href="/tools/"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-yellow px-5 py-3 text-sm font-bold text-ink"
            >
              Ver herramientas
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">Preguntas que llegan</h2>
              <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white px-6">
                {faqs.map((item) => (
                  <details key={item.q} className="group py-4">
                    <summary className="cursor-pointer list-none font-semibold text-ink">
                      <span className="flex items-start justify-between gap-4">
                        {item.q}
                        <span aria-hidden="true" className="shrink-0 text-magenta transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-banner p-6 text-white sm:p-8">
              <h2 className="font-display text-2xl font-black leading-tight">Si el problema no cabe en una línea, lo partimos.</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                La primera conversación sirve para eso: entender qué se resuelve con lo que ya tienes,
                qué se construye y qué no vale la pena.
              </p>
              <Link
                href="/contact/"
                className="mt-5 inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-ink"
              >
                Hablar con el estudio
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

