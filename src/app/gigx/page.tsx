import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { ExternalLink, Kicker } from "./_components/parts";
import { doing, faq, featured, ogImage, path, profile, stack, teaching } from "./_data";

const title = "Miguel Angel Yañez — Founder & Product Designer";
const description =
  "Portafolio de Miguel Angel Yañez, founder y product designer en Bogotá: diseño y construyo producto digital, design systems, sitios, plataformas y agentes de IA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gigx/" },
  openGraph: {
    title,
    description,
    url: "/gigx/",
    type: "profile",
    siteName: "Inflinds",
    locale: "es_CO",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.roles,
    worksFor: { "@type": "Organization", name: "Inflinds", url: "https://inflinds.com" },
    image: "https://inflinds.com/gigx/miguel.jpg",
    url: "https://inflinds.com/gigx/",
    sameAs: [
      "https://www.linkedin.com/in/gigx",
      "https://github.com/ElGigx",
      "https://www.behance.net/miguelyaeza",
      "https://x.com/gigx",
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const stats = [
  { value: "5", label: "disciplinas: producto, marca y empaque, código, IA y contenido" },
  { value: "6", label: "marcas con design system propio en PANTOU" },
  { value: "1", label: "SaaS multi-tenant en producción" },
];

const principles = [
  "Entiendo el negocio antes que la tecnología.",
  "Diseño y construyo, no entrego solo maquetas.",
  "Orquesto modelos de IA como un equipo, con verificación y costo medido.",
  "Mido antes de afirmar: pruebas, contratos de API y fidelidad visual automáticas.",
  "Documento las decisiones para que el equipo —humano o IA— no las repita.",
];

const socialClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-display font-bold text-brand-600 underline-offset-4 transition-colors hover:text-brand-700 hover:underline";

export default function GigxPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="flex items-center gap-5 lg:block">
              <img
                src={profile.photo}
                alt="Retrato de Miguel Angel Yañez"
                width={400}
                height={400}
                className="h-28 w-28 rounded-[1.75rem] border border-line object-cover sm:h-40 sm:w-40"
              />
              <div className="lg:mt-5">
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  Bogotá · Colombia
                </p>
                <p className="mt-1 text-sm text-slate">Disponible para proyectos y roles.</p>
              </div>
            </div>

            <div>
              <Eyebrow>Portafolio</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-3 font-display text-lg font-bold text-brand-600">
                {profile.title} · Design Engineer
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
                Diseño el problema, el producto y el sistema que lo construye. Cinco años y medio
                llevando negocios de una idea a software en producción: más de 30 proyectos entre
                producto, marca, empaque, comercio electrónico, plataformas y un SaaS propio.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton href="#trabajo">Ver trabajo</PrimaryButton>
                <ExternalLink
                  href={profile.cv}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-brand-200 bg-white px-6 py-3 font-bold text-brand-600 transition-colors hover:border-brand-600 hover:bg-brand-50"
                >
                  Descargar CV (PDF)
                </ExternalLink>
              </div>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1" aria-label="Perfiles">
                {profile.links.map((link) => (
                  <li key={link.label}>
                    <ExternalLink href={link.href} className={socialClass}>
                      {link.label} ↗
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="trabajo" className="scroll-mt-24 border-t border-line py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Kicker>Trabajo</Kicker>
              <h2 className="mt-2 max-w-2xl font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Tres cosas que están en producción.
              </h2>
            </div>
            <Link
              href="/gigx/portfolio/"
              className="inline-flex min-h-11 items-center font-display font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              Ver el portafolio completo →
            </Link>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {featured.map((item, index) => (
              <Link key={item.title} href={item.href} className="group flex flex-col border-t border-line pt-4">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.w}
                  height={item.image.h}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="aspect-[16/10] w-full border border-line object-cover object-top transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-magenta">
                  {item.result}
                </p>
                <h3 className="mt-1 font-display text-2xl font-black text-ink group-hover:text-brand-600">
                  {item.title}
                </h3>
                <p className="mt-1 text-slate">{item.text}</p>
                <span className="mt-3 inline-block font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                  Ver el caso →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-6">
        <Container>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <Kicker>Ahora</Kicker>
            <span className="text-lg text-ink">
              Construyo Merez, una plataforma SaaS con agentes de IA para pequeños negocios, y dirijo
              Inflinds.
            </span>
            <Link
              href="/services/"
              className="inline-flex min-h-11 items-center font-display font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              El estudio →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Qué hago</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Cinco disciplinas, un mismo criterio.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Del problema al sistema: investigación, identidad, código, IA y contenido con el mismo
                estándar.
              </p>
              <Link
                href="/gigx/portfolio/"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
              >
                Ver el portafolio completo <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="border-t border-line">
              {doing.map((item, index) => (
                <div
                  key={item.title}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow/30 font-display text-sm font-black text-ink">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-black leading-tight text-ink sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{item.short}</p>
                  </div>
                </div>
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
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow tone="dark">Herramientas</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl">
                Con qué trabajo.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                El stack cambia según el problema; estas son las piezas que uso para diseñar,
                construir y medir.
              </p>
            </div>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {stack.map((group) => (
                <div key={group.name} className="border-t border-white/10 py-4">
                  <dt className="font-display text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {group.name}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slate-200">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Trayectoria</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                De 2014 a Merez.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Una línea continua: primero el diseño, después el código, y siempre el mismo criterio
                de producto.
              </p>
              <Link
                href="/gigx/portfolio/#linea-de-tiempo"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-yellow decoration-[3px] underline-offset-4"
              >
                Ver la línea completa <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="border-t border-line">
              {path.map((item) => (
                <div
                  key={item.year}
                  className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <p className="font-display text-lg font-black leading-none text-brand-600 sm:text-2xl">
                    {item.year}
                  </p>
                  <p className="font-display text-lg font-bold text-ink">{item.text}</p>
                </div>
              ))}
              {teaching.map((item) => (
                <div
                  key={item.place}
                  className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line bg-paper-soft py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-magenta">
                    Clases
                  </p>
                  <div>
                    <p className="font-display font-bold text-ink">{item.place}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{item.what}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
            <div>
              <Eyebrow>En números</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
                Lo que hay detrás.
              </h2>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.value} className="border-t border-line pt-4">
                  <dt className="font-display text-5xl font-black leading-none text-brand-600">
                    {stat.value}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-slate">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Eyebrow>Preguntas</Eyebrow>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Lo que me preguntan antes de empezar.
              </h2>
              <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white px-6">
                {faq.map((item) => (
                  <details key={item.q} className="group py-2">
                    <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                      <span className="font-semibold text-ink">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-magenta transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{item.a}</p>
                    <Link
                      href={item.href}
                      className="mt-2 inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.14em] text-brand-600 underline-offset-4 hover:underline"
                    >
                      {item.link} →
                    </Link>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-banner p-6 text-white sm:p-8 lg:sticky lg:top-24 lg:self-start">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                Siguiente
              </p>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight">
                Si el problema no cabe en una pregunta, lo partimos.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                La primera conversación sirve para eso: entender qué se resuelve con lo que ya
                tienes, qué se construye y qué no vale la pena.
              </p>
              <ol className="mt-5 space-y-3 border-t border-white/20 pt-4">
                {["Qué ya tienes", "Qué se construye", "Qué no vale la pena"].map(
                  (step, index) => (
                    <li key={step} className="flex items-center gap-3 text-sm font-semibold">
                      <span className="font-mono text-[10px] text-white/60">0{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ),
                )}
              </ol>
              <Link
                href="/contact/"
                className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-white px-6 py-3 font-bold text-ink"
              >
                Hablemos <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-night py-16 sm:py-20">
        <Container>
          <Kicker dark>Cómo trabajo</Kicker>
          <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">
            Cinco reglas.
          </h2>
          <ol className="mt-6 max-w-3xl">
            {principles.map((principle, index) => (
              <li key={principle} className="flex gap-5 border-t border-white/10 py-5">
                <span className="font-display text-3xl font-black text-yellow">0{index + 1}</span>
                <span className="text-lg leading-relaxed text-white">{principle}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <Kicker>Contacto</Kicker>
              <h2 className="mt-2 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                ¿Hablamos?
              </h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate">
                Si tienes un problema de negocio que merece software, cuéntamelo. Si buscas un perfil
                para tu equipo, también.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton href="/contact/">Cuéntame el proyecto</PrimaryButton>
                <Link
                  href="/gigx/portfolio/"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-brand-200 bg-white px-6 py-3 font-bold text-brand-600 transition-colors hover:border-brand-600 hover:bg-brand-50"
                >
                  Ver el portafolio
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-paper-soft p-6">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-magenta">
                Para equipos
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Disponible para roles de producto, UX/UI, design systems y design engineering.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1" aria-label="Perfiles y CV">
                <li>
                  <ExternalLink href={profile.cv} className={socialClass}>
                    Descargar CV ↗
                  </ExternalLink>
                </li>
                {profile.links.map((link) => (
                  <li key={link.label}>
                    <ExternalLink href={link.href} className={socialClass}>
                      {link.label} ↗
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
