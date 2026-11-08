import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/site";
import ProcessStrip from "@/components/ProcessStrip";
import ServiceArt from "@/components/services/ServiceArt";
import ServiceFinder from "@/components/services/ServiceFinder";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño de producto, desarrollo, automatización, IA y consultoría: cinco líneas que se combinan según el problema de tu negocio.",
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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-12 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow>Servicios</Eyebrow>
              <h1 className="mt-3 max-w-2xl font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Cinco formas de construir producto. Una sola conversación.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">
                No vendemos una lista de servicios: elegimos la línea que resuelve el problema.
                Diseño, desarrollo, automatización, IA y consultoría se combinan según lo que el
                negocio necesite, no según lo que sepamos hacer.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/contact/">Cuéntanos tu proyecto</PrimaryButton>
                <Link
                  href="/pricing/"
                  className="inline-flex items-center rounded-xl border border-line bg-white px-6 py-3 font-bold text-ink transition hover:border-magenta"
                >
                  Ver precios
                </Link>
              </div>
              <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-5">
                <div>
                  <dt className="text-xs text-slate">Líneas</dt>
                  <dd className="font-display text-2xl font-black text-ink">5</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate">Organizaciones</dt>
                  <dd className="font-display text-2xl font-black text-ink">10</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate">En producción</dt>
                  <dd className="font-display text-2xl font-black text-ink">4</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-line bg-white p-4 shadow-sm sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`#${service.slug}`}
                    className="rounded-2xl border border-line p-3 transition hover:border-magenta"
                  >
                    <span className="block h-16 w-full">
                      <ServiceArt slug={service.slug} />
                    </span>
                    <span className="mt-1 block text-xs font-bold text-ink">{service.tag}</span>
                  </Link>
                ))}
                <div className="flex flex-col justify-center rounded-2xl bg-night p-3 text-white">
                  <span className="font-display text-xl font-black">5</span>
                  <span className="text-[11px] leading-tight text-slate-300/80">líneas que se combinan</span>
                </div>
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

      <section className="pb-16">
        <Container>
          <div className="space-y-6">
            {services.map((service, index) => {
              const detail = details[service.slug];
              const reverse = index % 2 === 1;
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="scroll-mt-24 rounded-3xl border border-line bg-white p-5 sm:p-8"
                >
                  <div className={`grid gap-8 lg:grid-cols-[0.9fr_1.1fr] ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="rounded-2xl border border-line bg-paper-soft p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
                          0{index + 1} · {service.tag}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-magenta" />
                      </div>
                      <div className="mt-2 h-44 sm:h-52">
                        <ServiceArt slug={service.slug} />
                      </div>
                    </div>

                    <div>
                      <h2 className="font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">{service.summary}</p>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Incluye</p>
                          <ul className="mt-2 space-y-1.5">
                            {service.points.map((point) => (
                              <li key={point} className="flex gap-2 text-xs leading-relaxed text-slate">
                                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-magenta" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Lo notas cuando</p>
                          <ul className="mt-2 space-y-1.5">
                            {detail.signal.map((signal) => (
                              <li key={signal} className="flex gap-2 text-xs leading-relaxed text-slate">
                                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-yellow-600" />
                                {signal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl bg-paper-soft p-3 text-xs leading-relaxed text-slate">
                        {detail.proof}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <Link
                          href={`/services/${service.slug}/`}
                          className="inline-flex items-center gap-1 text-sm font-bold text-magenta hover:underline"
                        >
                          Ver servicio completo →
                        </Link>
                        <Link
                          href="/contact/"
                          className="inline-flex items-center gap-1 text-sm font-bold text-ink transition hover:text-magenta"
                        >
                          {detail.cta} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">Cómo se trabaja</h2>
            <p className="max-w-md text-sm text-slate">
              Diez fases, de la idea a la evolución. Cada una deja algo que se puede revisar.
            </p>
          </div>
          <div className="mt-8">
            <ProcessStrip />
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
                41 calculadoras de uso único, sin cuenta y sin guardar datos.
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
