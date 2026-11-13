import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import ToolMark from "@/components/tools/ToolMark";
import { Container, Eyebrow } from "@/components/ui";
import { getTool } from "@/lib/tools";
import { FAMILIES, familyOf, iconOf, relatedSlugs } from "@/lib/tool-taxonomy";

const CANONICAL = "https://inflinds.com/tools/time-billing/";
const APP = "/tools/time-billing/app.html";

export const metadata: Metadata = {
  title: "Cobro por tiempo",
  description:
    "Cobra por hora, por bloque o por día desde el teléfono. Sin cuenta y sin señal: los datos se quedan en tu teléfono. Para parqueadero, inflables o alquiler.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Cobro por tiempo · Inflinds",
    description:
      "Cobra por hora, por bloque o por día desde el teléfono. Sin cuenta y sin señal.",
    url: CANONICAL,
    type: "website",
  },
};

const FAQ = [
  {
    q: "¿Necesito crear una cuenta?",
    a: "No. Se abre y se usa. La cuenta solo hace falta para guardar el historial en Merez.",
  },
  {
    q: "¿Se guarda lo que registro?",
    a: "Sí, en tu teléfono. No se envía a nuestros servidores ni queda asociado a tu nombre. Si cambias de teléfono o borras los datos del navegador, se pierde; para eso está la versión con cuenta en Merez.",
  },
  {
    q: "¿Sirve para inflables?",
    a: "Sí. La tarifa por bloque cubre 15 o 20 minutos, y se extiende con otro bloque cuando el cliente se queda más.",
  },
  {
    q: "¿Y si me pagan después?",
    a: "Al cerrar eliges «Cobrar después». Queda en la lista de por cobrar y se liquida el día que pagan, sin perder el día en que se prestó el servicio.",
  },
  {
    q: "¿Funciona sin internet?",
    a: "Sí, una vez cargada. No pide red para entrar ni para cobrar; los datos viven en el teléfono.",
  },
];

const CHECKS = [
  ["Entrar en dos toques.", "Tarifa, placa opcional y listo: el reloj arranca."],
  ["El monto con su cuenta.", "2h12 son 3 horas y el desglose se ve antes de cobrar."],
  ["Por cobrar que se cobra.", "Queda la deuda y se liquida el día que pagan."],
  ["Cierre del día.", "Efectivo esperado contra lo que hay en la caja."],
] as const;

export default function TimeBillingPage() {
  const tool = getTool("time-billing");
  if (!tool) notFound();

  const family = FAMILIES[familyOf(tool.slug)];
  const related = relatedSlugs(tool.slug)
    .map((slug) => getTool(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${CANONICAL}#tool`,
        name: tool.title,
        description: tool.description,
        url: CANONICAL,
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
          { "@type": "ListItem", position: 2, name: "Herramientas", item: "https://inflinds.com/tools/" },
          { "@type": "ListItem", position: 3, name: tool.title, item: CANONICAL },
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
    <div className="pb-32 md:pb-0" data-time-billing>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-9 sm:py-12">
          <nav aria-label="Ruta" className="flex items-center gap-1.5 text-xs font-semibold text-slate">
            <Link href="/" className="hover:text-ink">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/tools/" className="hover:text-ink">
              Herramientas
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{tool.title}</span>
          </nav>

          <div className="mt-5 flex items-center gap-3">
            <ToolMark slug={tool.slug} className="h-11 w-11" />
            <Eyebrow>{tool.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            {tool.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-ink">{tool.promise}</p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">{tool.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${family.chip}`}
            >
              <Icon name={iconOf(tool.slug)} className="h-3 w-3" />
              {family.label}
            </span>
            <span>Sin cuenta · se queda abierta todo el día · los datos no salen de tu navegador</span>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="hidden lg:block">
              <div className="mx-auto w-[390px] max-w-full rounded-[2rem] bg-night p-2 shadow-2xl">
                <Image
                  src="/tools/time-billing/app-preview.png"
                  alt="La herramienta en el teléfono, después de configurarla"
                  width={390}
                  height={844}
                  className="block h-auto w-full rounded-[1.6rem]"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-xs text-slate">
                La herramienta, en el teléfono. En escritorio abre a pantalla completa.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-black text-ink">Qué resuelve</h2>
              <ul className="mt-4 space-y-3">
                {CHECKS.map(([title, text]) => (
                  <li key={title} className="flex gap-2.5 text-[15px] leading-relaxed">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-magenta" />
                    <span>
                      <strong className="font-bold text-ink">{title}</strong> {text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-line bg-paper-soft p-4 text-sm leading-relaxed text-slate">
                <strong className="text-ink">Esto sí se guarda, pero en tu teléfono.</strong> No viaja
                a ningún servidor. Si se rompe o lo cambias, se pierde: para eso está la versión con
                cuenta.
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={APP}
                  className="inline-flex items-center rounded-xl bg-magenta px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
                >
                  Usar la herramienta
                </a>
                <a
                  href="https://app.merez.co"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-magenta"
                >
                  Guardar en Merez
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-9 sm:py-12">
        <Container>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-magenta">
            Cómo se conecta
          </p>
          <h2 className="mt-3 font-display text-2xl font-black text-ink sm:text-3xl">
            La herramienta cobra; Merez recuerda.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-line bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-magenta">Con Inflinds</p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{tool.inflinds.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{tool.inflinds.text}</p>
              <Link
                href={tool.inflinds.href}
                className="mt-4 inline-block text-sm font-bold text-magenta hover:underline"
              >
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
                Entrar a Merez →
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
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-magenta transition-transform group-open:rotate-45"
                        >
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
                Se usa junto con
              </p>
              <div className="mt-4 space-y-2">
                {related.map((item) => {
                  const meta = FAMILIES[familyOf(item.slug)];
                  return (
                    <Link
                      key={item.slug}
                      href={`/tools/${item.slug}/`}
                      className="group flex items-start gap-3 rounded-xl border border-line bg-white p-3.5 transition hover:border-magenta"
                    >
                      <span
                        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${meta.tile}`}
                      >
                        <Icon name={meta.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-ink group-hover:text-magenta">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate">
                          {item.promise}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="text-[11px] leading-tight text-slate">
          <strong className="block text-sm text-ink">Gratis</strong>
          sin cuenta
        </div>
        <a
          href={APP}
          className="flex-1 rounded-xl bg-magenta px-4 py-3 text-center text-sm font-bold text-white"
        >
          Usar la herramienta
        </a>
      </div>
    </div>
  );
}
