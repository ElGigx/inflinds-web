import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import ServiceArt from "@/components/services/ServiceArt";
import ServiceProcess from "@/components/services/ServiceProcess";
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from "@/components/ui";
import { getServicePage, servicePages, servicePath, type ServicePage } from "@/lib/service-pages";

const BASE = "https://inflinds.com";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: "Servicios", robots: { index: false } };

  const url = `${BASE}${servicePath(page.slug)}`;
  return {
    title: page.title,
    description: page.promise,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${page.title} · Inflinds`,
      description: page.promise,
      url,
      siteName: "Inflinds",
      locale: "es_CO",
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const url = `${BASE}${servicePath(page.slug)}`;
  const position = servicePages.findIndex((item) => item.slug === page.slug) + 1;
  const related = page.related
    .map((relatedSlug) => getServicePage(relatedSlug))
    .filter((item): item is ServicePage => item !== undefined);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.promise,
      serviceType: page.tag,
      url,
      provider: {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: "Inflinds",
        url: BASE,
      },
      areaServed: "CO",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Entregables",
        itemListElement: page.deliverables.map((item, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: { "@type": "Service", name: item },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-10 sm:py-14">
          <nav aria-label="Ruta de navegación">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate">
              <li>
                <Link href="/" className="hover:text-ink">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-brand-300">
                /
              </li>
              <li>
                <Link href="/services/" className="hover:text-ink">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true" className="text-brand-300">
                /
              </li>
              <li aria-current="page" className="font-semibold text-ink">
                {page.tag}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow>{page.tag}</Eyebrow>
              <h1 className="mt-3 max-w-2xl font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg font-semibold leading-relaxed text-ink">{page.promise}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-slate">{page.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/contact/">{page.cta.label}</PrimaryButton>
                <SecondaryButton href="/pricing/">Ver precios</SecondaryButton>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-paper p-4 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-slate">
                  {String(position).padStart(2, "0")} · {page.tag}
                </span>
                <span className="h-2 w-2 rounded-full bg-magenta" />
              </div>
              <div className="mt-2 h-52 sm:h-60">
                <ServiceArt slug={page.slug} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Señales</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Lo notas cuando…</h2>
            <p className="mt-2 text-slate">Si te reconoces en dos o más, esta línea es por donde entrar.</p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {page.signals.map((signal) => (
              <li key={signal} className="flex gap-3 rounded-2xl border border-line bg-paper p-4">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" />
                <p className="text-sm leading-relaxed text-ink">{signal}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Entregables</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Qué queda en tus manos</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
                Cada punto es algo que se entrega y se puede revisar; no una lista aspiracional.
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {page.deliverables.map((item) => (
                <li key={item} className="flex gap-2.5 rounded-xl border border-line bg-paper-soft p-3.5">
                  <Icon name="tick" className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                  <span className="text-sm leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Proceso</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Cómo avanza</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
                Cinco pasos. Cada uno deja algo concreto, no una reunión más.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5 sm:p-7">
              <ServiceProcess steps={page.process} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Stack</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Con qué se construye</h2>
            <p className="mt-2 text-slate">Herramientas y estándares reales, no una lista de deseos.</p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {page.stack.map((tool) => (
              <li key={tool} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink">
                {tool}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Prueba</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Dónde ya está en producción</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
                Un caso real de esta línea: qué se hizo y sobre qué se construyó.
              </p>
            </div>
            <article className="rounded-2xl border border-line bg-paper p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-wide text-magenta">{page.proof.sector}</p>
              <h3 className="mt-2 font-display text-xl font-black text-ink sm:text-2xl">{page.proof.client}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{page.proof.summary}</p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {page.proof.facts.map((fact) => (
                  <li key={fact} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-magenta" />
                    {fact}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Límites</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Cuándo no aplica</h2>
            <p className="mt-2 text-slate">Decirlo también es parte del trabajo. Si te reconoces aquí, esta no es la entrada.</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {page.whenNot.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-paper-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-orange-600">No aplica</p>
                <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.reason}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Preguntas</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Preguntas que llegan</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
                Si tu duda no está, se responde en la primera conversación.
              </p>
            </div>
            <div className="divide-y divide-line rounded-2xl border border-line bg-paper px-5 sm:px-6">
              {page.faq.map((item) => (
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
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Se combina con</h2>
            <Link href="/services/" className="text-sm font-bold text-magenta hover:underline">
              Ver las cinco líneas →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={servicePath(item.slug)}
                className="group flex gap-4 rounded-2xl border border-line bg-paper p-4 transition hover:border-magenta"
              >
                <span className="block h-20 w-24 shrink-0 rounded-xl border border-line bg-paper-soft p-2">
                  <ServiceArt slug={item.slug} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate">{item.tag}</span>
                  <span className="mt-1 block font-display text-base font-black leading-tight text-ink">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate">{item.promise}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="rounded-3xl bg-gradient-banner p-6 text-white sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-wide text-white/80">Siguiente paso</p>
                <p className="mt-3 font-display text-2xl font-black leading-tight sm:text-3xl">{page.cta.title}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">{page.cta.text}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/contact/" className="inline-flex items-center justify-center rounded-xl bg-paper px-6 py-3 font-bold text-ink">
                  {page.cta.label}
                </Link>
                <Link
                  href="/pricing/"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Ver precios
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
