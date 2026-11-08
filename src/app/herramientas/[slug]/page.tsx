import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolBody from "@/components/tools/ToolBody";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { getTool, tools } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `https://inflinds.com/herramientas/${slug}/`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: { title: tool.title, description: tool.description, url, type: "website" },
  };
}

const FAQ = [
  {
    q: "¿Necesito crear una cuenta para usar la herramienta?",
    a: "No. Se abre, se usan los números y se cierra. Las cuentas existen para lo que necesita historial: cruzar información, campos propios, ciclos y comparar meses.",
  },
  {
    q: "¿Se guarda lo que escribo?",
    a: "No. El cálculo ocurre en tu navegador: los valores no se envían a ningún servidor ni quedan asociados a ti.",
  },
  {
    q: "¿Puedo usar el resultado en una propuesta?",
    a: "Sí, es para eso. Si necesitas que el número viva con el cliente, se repita cada mes o se cruce con el catálogo, eso ya es Merez.",
  },
];

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const url = `https://inflinds.com/herramientas/${slug}/`;
  const related = tools.filter((item) => item.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#tool`,
        name: tool.title,
        description: tool.description,
        url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "es-CO",
        offers: { "@type": "Offer", price: "0", priceCurrency: "COP" },
        publisher: { "@id": "https://inflinds.com/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://inflinds.com/" },
          { "@type": "ListItem", position: 2, name: "Herramientas", item: "https://inflinds.com/herramientas/" },
          { "@type": "ListItem", position: 3, name: tool.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
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

      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-12 sm:py-16">
          <nav aria-label="Ruta" className="flex items-center gap-1.5 text-xs font-semibold text-slate">
            <Link href="/" className="hover:text-ink">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/herramientas/" className="hover:text-ink">
              Herramientas
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{tool.title}</span>
          </nav>
          <div className="mt-6">
            <Eyebrow>{tool.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            {tool.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-ink">{tool.promise}</p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">{tool.description}</p>
          <p className="mt-4 text-sm text-slate">
            Sin cuenta · {tool.minutes} min · los datos no salen de tu navegador
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <ToolBody slug={tool.slug} />
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-12 sm:py-16">
        <Container>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-magenta">
            Cómo se conecta
          </p>
          <h2 className="mt-3 font-display text-2xl font-black text-ink sm:text-3xl">
            El número sirve; el siguiente paso también.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-line bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-magenta">Con Inflinds</p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{tool.inflinds.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{tool.inflinds.text}</p>
              <Link href={tool.inflinds.href} className="mt-4 inline-block text-sm font-bold text-magenta hover:underline">
                Ver el servicio →
              </Link>
            </article>
            <article className="rounded-2xl border border-line bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Con Merez</p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{tool.merez.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{tool.merez.text}</p>
              <a
                href={tool.merez.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-bold text-magenta hover:underline"
              >
                Ver en merez.co →
              </a>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                Preguntas
              </p>
              <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white px-6">
                {FAQ.map((item) => (
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

            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                Otras herramientas
              </p>
              <div className="mt-4 space-y-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/herramientas/${item.slug}/`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-magenta"
                  >
                    {item.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-night p-6 text-white">
                <p className="font-display text-lg font-black">¿Quieres guardar esto?</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
                  El histórico, los campos propios y los ciclos viven en Merez. La herramienta es
                  para decidir hoy; la plataforma, para que no se pierda mañana.
                </p>
                <PrimaryButton href="https://www.merez.co/" className="mt-4">
                  Conocer Merez
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
