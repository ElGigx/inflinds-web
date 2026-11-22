import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { cases, merezFeatures, ogImage, profile, type CaseImage } from "../_data";
import { ExternalLink } from "../_components/parts";
import EvidenceGallery from "./_components/EvidenceGallery";
import SelectedCase, { type SelectedStudy } from "./_components/SelectedCase";

const title = "Portafolio — Miguel Angel Yañez";
const description =
  "Casos seleccionados de Miguel Angel Yañez: Merez, Fusion Pipe Tools, Kreditime y Acertar. Producto, diseño y código con evidencia visual.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gigx/portfolio/" },
  openGraph: {
    title,
    description,
    url: "/gigx/portfolio/",
    type: "website",
    siteName: "Inflinds",
    locale: "es_CO",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
};

const fusion = cases.find((study) => study.id === "fusion-pipe-tools")!;
const kreditime = cases.find((study) => study.id === "kreditime")!;

const toEvidence = (images: CaseImage[]) =>
  images.map(({ src, alt, w, h, caption }) => ({ src, alt, w, h, caption }));

const merezImages = [
  ...merezFeatures.map((feature) => ({
    src: feature.image.src,
    alt: feature.image.alt,
    w: feature.image.w,
    h: feature.image.h,
    caption: feature.title,
  })),
  {
    src: "/gigx/shots/merez-industrial.webp",
    alt: "Landing de Merez para distribuidores industriales",
    w: 1440,
    h: 680,
    caption: "Sitio publicado desde Merez",
  },
  {
    src: "/gigx/shots/merez-industrial-movil.webp",
    alt: "La landing de Merez en un teléfono",
    w: 390,
    h: 660,
    caption: "El sitio en móvil",
  },
];

const selectedStudies: SelectedStudy[] = [
  {
    id: fusion.id,
    kicker: fusion.kicker,
    title: fusion.title,
    summary: fusion.summary,
    figures: fusion.figures,
    images: toEvidence(fusion.images),
    link: fusion.links?.[0],
  },
  {
    id: kreditime.id,
    kicker: kreditime.kicker,
    title: kreditime.title,
    summary: kreditime.summary,
    figures: kreditime.figures,
    images: toEvidence(kreditime.images),
    note: kreditime.confidential,
  },
  {
    id: "acertar",
    kicker: "2021 · Cliente de UI · Portal y e-learning",
    title: "Acertar — certificados que se pueden verificar",
    summary:
      "Portal de certificados con consulta pública y verificación por código, y e-learning, sobre Merez. Diseñé la interfaz y el flujo de consulta y verificación.",
    figures: [
      { value: "3", label: "frentes: consulta, verificación y e-learning" },
      { value: "1", label: "portal público sobre Merez" },
    ],
    images: [
      {
        src: "/gigx/shots/acertar-home.webp",
        alt: "Portal de Acertar con consulta pública de certificados",
        w: 1440,
        h: 900,
        caption: "Consulta pública",
      },
      {
        src: "/gigx/shots/acertar-app.webp",
        alt: "Aplicación de Acertar con el flujo de verificación de certificados",
        w: 1440,
        h: 900,
        caption: "Verificación",
      },
      {
        src: "/gigx/shots/acertar-app-m.webp",
        alt: "Portal de Acertar en un teléfono",
        w: 780,
        h: 1688,
        caption: "En móvil",
      },
    ],
    note: "Cliente de UI: el portal vive sobre Merez.",
  },
];

const archiveIds = ["pantou", "arizas", "amatu", "wallo", "colibri", "greenforce"];
const archive = cases.filter((study) => archiveIds.includes(study.id));
const shortTitle = (value: string) => value.split(" — ")[0];

const merezFigures = [
  { value: "20", label: "módulos activables" },
  { value: "118", label: "versiones publicadas" },
  { value: "31", label: "herramientas de agente" },
  { value: "5", label: "niveles de riesgo" },
];

const merezProof = [
  {
    title: "Un solo sistema",
    text: "Sitio, catálogo, CRM, cotizaciones, pedidos y pagos en un panel multi-tenant. Los módulos se activan por negocio.",
  },
  {
    title: "Agentes con freno",
    text: "Treinta y una herramientas repartidas en cinco niveles. Leer es libre; escribir se propone y una persona lo aprueba.",
  },
  {
    title: "Producto y negocio",
    text: "Créditos por proceso en vez de suscripción por asiento, con 118 versiones y un ciclo de entrega propio.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-14 sm:py-20">
          <Link
            href="/gigx/"
            className="inline-flex min-h-11 items-center text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
          >
            ← Miguel Angel Yañez
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Eyebrow>Portafolio seleccionado</Eyebrow>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl">
                Producto que llega a producción.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
                Cuatro casos para ver cómo pienso y cómo construyo: un SaaS multi-tenant, un catálogo
                B2B, un sistema financiero y un portal de certificados. Diseño, código y decisiones
                documentadas.
              </p>
              <p className="mt-3 font-display font-bold text-brand-600">
                {profile.title} · Design Engineer
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PrimaryButton href="#merez">Ver Merez</PrimaryButton>
                <ExternalLink
                  href={profile.cv}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-brand-200 bg-white px-6 py-3 font-bold text-brand-600 transition-colors hover:border-brand-600 hover:bg-brand-50"
                >
                  Descargar CV
                </ExternalLink>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-xs font-bold uppercase tracking-[0.12em]">
                <a href="#merez" className="inline-flex min-h-11 items-center text-brand-600 hover:underline">
                  Merez
                </a>
                <a href="#trabajo" className="inline-flex min-h-11 items-center text-brand-600 hover:underline">
                  Trabajo
                </a>
                <a href="#archivo" className="inline-flex min-h-11 items-center text-brand-600 hover:underline">
                  Archivo
                </a>
                <ExternalLink
                  href="https://www.behance.net/miguelyaeza"
                  className="inline-flex min-h-11 items-center text-brand-600 hover:underline"
                >
                  Behance ↗
                </ExternalLink>
              </div>
            </div>

            <a
              href="#merez"
              className="group relative block overflow-hidden border border-line bg-night"
              aria-label="Ver el caso de Merez"
            >
              <img
                src="/gigx/shots/merez-industrial.webp"
                alt="Landing de Merez para distribuidores industriales"
                width={1440}
                height={680}
                className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-night/95 to-transparent px-4 pb-4 pt-16 sm:px-5">
                <span>
                  <span className="block font-display text-[10px] font-bold uppercase tracking-[0.18em] text-yellow">
                    Caso principal
                  </span>
                  <span className="mt-1 block font-display text-lg font-black text-white">
                    Merez · 20 módulos
                  </span>
                </span>
                <span className="font-display text-xs font-bold text-yellow">Ver →</span>
              </span>
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4">
            {[
              { value: "20", label: "módulos en Merez" },
              { value: "118", label: "versiones" },
              { value: "41", label: "fichas en Fusion" },
              { value: "6", label: "marcas en PANTOU" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="font-display text-3xl font-black leading-none text-brand-600">
                  {item.value}
                </dt>
                <dd className="mt-2 text-[11px] leading-snug text-slate">{item.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="merez" className="scroll-mt-24 bg-night py-16 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Eyebrow tone="dark">Caso principal · 2026</Eyebrow>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-black leading-[1.05] sm:text-4xl">
                Merez: el sistema operativo de un negocio pequeño.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
                Una plataforma multi-tenant con veinte módulos, agentes de IA y cobro por créditos.
                Diseñé el producto, la arquitectura y el modelo de negocio; está en producción.
              </p>
              <p className="mt-4 text-sm font-bold text-slate-400">
                Founder · Product Design · Design Engineering · Business
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                {merezFigures.map((figure) => (
                  <div key={figure.label}>
                    <dt className="font-display text-4xl font-black leading-none text-yellow">
                      {figure.value}
                    </dt>
                    <dd className="mt-2 text-xs leading-snug text-slate-300">{figure.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ExternalLink
                  href="https://merez.co"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-ink"
                >
                  Ver Merez ↗
                </ExternalLink>
                <ExternalLink
                  href="https://www.linkedin.com/in/gigx"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-6 py-3 font-bold text-white transition-colors hover:border-white/60 hover:bg-white/5"
                >
                  Hablemos por LinkedIn ↗
                </ExternalLink>
              </div>
            </div>

            <EvidenceGallery title="Merez" images={merezImages} tone="dark" />
          </div>

          <div className="mt-12 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
            {merezProof.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="trabajo" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Trabajo seleccionado</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Tres problemas distintos, la misma forma de trabajar.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Un catálogo industrial que tenía que pensar como el técnico, un sistema financiero
                que se mete en la tienda y un portal de certificados que se puede verificar.
              </p>
            </div>
            <a
              href="#archivo"
              className="inline-flex min-h-11 items-center font-display font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              Ver el archivo →
            </a>
          </div>
        </Container>

        {selectedStudies.map((study, index) => (
          <SelectedCase key={study.id} study={study} index={index} />
        ))}
      </section>

      <section id="archivo" className="scroll-mt-24 border-t border-line py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Archivo</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Otros frentes.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Marca, e-commerce, producto y sistemas de diseño. El registro completo vive en
                Behance.
              </p>
            </div>
            <ExternalLink
              href="https://www.behance.net/miguelyaeza"
              className="inline-flex min-h-11 items-center font-display font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              Ver más en Behance ↗
            </ExternalLink>
          </div>

          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((study) => (
              <li key={study.id} className="border-t border-line py-4">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-magenta">
                  {study.kicker}
                </p>
                <h3 className="mt-1 font-display text-lg font-black text-ink">
                  {shortTitle(study.title)}
                </h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-night py-16 text-white sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow tone="dark">Para equipos</Eyebrow>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-black leading-tight sm:text-4xl">
                ¿Buscas un perfil que diseñe y construya?
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
                El CV tiene el detalle; aquí están las decisiones. También puedes escribirme para
                hablar de un proyecto.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ExternalLink
                href={profile.cv}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-yellow px-6 py-3 font-bold text-ink"
              >
                Descargar CV
              </ExternalLink>
              <ExternalLink
                href="https://www.linkedin.com/in/gigx"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-6 py-3 font-bold text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                LinkedIn ↗
              </ExternalLink>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm">
            <Link href="/gigx/" className="inline-flex min-h-11 items-center text-slate-300 hover:text-white">
              Volver al perfil →
            </Link>
            <Link href="/contact/" className="inline-flex min-h-11 items-center text-slate-300 hover:text-white">
              Hablemos con Inflinds →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
