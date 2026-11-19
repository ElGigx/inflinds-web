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

const details: Record<string, { signal: string[]; proof: string; cta: string }> = {
  diseno: {
    signal: [
      "La gente entra y no entiende qué vendes",
      "Cada página se ve distinta y el equipo no encuentra dónde cambiar algo",
    ],
    proof: "Así se ordenó el catálogo de Fusion Pipe Tools: 41 fichas y una ficha técnica que se entiende sin llamar.",
    cta: "Quiero ordenar el producto",
  },
  desarrollo: {
    signal: [
      "El pedido se pierde entre el chat, la hoja y el correo",
      "Necesitas un panel para operar y hoy todo vive en Excel",
    ],
    proof: "El sitio y el mini-CRM de Fusion Pipe Tools corren sobre el mismo dato; Acertar resuelve certificados sobre Merez.",
    cta: "Necesito construirlo",
  },
  automatizacion: {
    signal: [
      "Alguien copia datos entre dos herramientas todos los días",
      "Las notificaciones dependen de que una persona se acuerde",
    ],
    proof: "Cada automatización arranca con una tarea concreta y una medida: cuántas veces se hace y cuánto tarda.",
    cta: "Quiero quitarme lo manual",
  },
  "inteligencia-artificial": {
    signal: [
      "El equipo usa IA para todo, pero nadie verifica ni mide el costo",
      "Quieres responder por el chat sin inventar precios ni disponibilidad",
    ],
    proof: "El agente de Merez responde con el catálogo del negocio y se detiene cuando hace falta una persona.",
    cta: "Quiero IA con criterio",
  },
  consultoria: {
    signal: [
      "Hay diez iniciativas y no sabes cuál primero",
      "Necesitas decidir si algo se construye o se compra",
    ],
    proof: "El diagnóstico termina en una hoja de ruta con costos y una recomendación: qué se hace, qué no, y por qué.",
    cta: "Necesito rumbo",
  },
  "seo-geo": {
    signal: [
      "Buscas lo que vendes en Google y no apareces",
      "Le preguntas a un asistente por tu categoría y no te menciona",
    ],
    proof: "Lo aplicamos en nuestros sitios: 74 y 62 URLs con lastmod por página, datos estructurados y llms.txt verificables hoy.",
    cta: "Quiero aparecer",
  },
};

const cases = [
  {
    name: "Fusion Pipe Tools",
    sector: "Distribución industrial",
    fact: "Catálogo de 41 fichas, sitio público y un mini-CRM para cotizar, sobre el mismo dato.",
  },
  {
    name: "Acertar",
    sector: "Certificación documental",
    fact: "Portal de certificados con consulta pública y verificación por código, sobre Merez.",
  },
  {
    name: "Merez",
    sector: "Producto propio",
    fact: "Plataforma multi-tenant que reúne catálogo, cotizaciones, pedidos, cobros y agentes.",
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

      <section className="pb-10">
        <Container>
          <ServiceFinder />
        </Container>
      </section>

      <section className="bg-paper-soft py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Las seis líneas</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Lo que podemos construir.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate">
              Cada línea tiene su ficha completa: qué incluye, cuándo se nota y cómo se trabaja.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const detail = details[service.slug];
              return (
                <Link
                  key={service.slug}
                  id={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40 border-b border-line bg-paper-soft p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
                      0{index + 1} · {service.tag}
                    </span>
                    <div className="mt-1 h-28">
                      <ServiceArt slug={service.slug} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-xl font-black leading-tight text-ink transition-colors group-hover:text-magenta">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{service.summary}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-400">{detail.signal[0]}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-magenta">
                      Ver servicio completo <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-night py-16 text-white sm:py-20">
        <div
          className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
              Cómo se trabaja
            </h2>
            <p className="max-w-md text-sm text-slate-400">
              Diez fases, de la idea a la evolución. Cada una deja algo que se puede revisar.
            </p>
          </div>
          <div className="mt-8">
            <ProcessStrip tone="dark" />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">Lo que ya está en producción</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {cases.map((item) => (
              <article key={item.name} className="rounded-2xl border border-line bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-magenta">{item.sector}</p>
                <h3 className="mt-2 font-display text-lg font-black text-ink">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.fact}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-night p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-black">¿Antes de contratar, quieres hacer una cuenta?</p>
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

