import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import { ChipRow, ExternalLink, Kicker } from "./_components/parts";
import { doing, faq, featured, ogImage, path, profile, stack, teaching } from "./_data";

const title = "Miguel Angel Yañez — Founder & Product Designer · Design Engineer";
const description =
  "Founder & Product Designer y Design Engineer en Bogotá. Cinco años y medio diseñando producto digital: design systems para siete marcas, identidad y empaque, investigación con usuarios, producto propio con agentes de IA y más de 30 proyectos en producción.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gigx/" },
  openGraph: { title, description, url: "/gigx/", type: "profile", siteName: "Inflinds", locale: "es_CO", images: [ogImage] },
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

const stats = [
  { value: "5", label: "disciplinas: producto, marca y empaque, código, IA y contenido" },
  { value: "6", label: "marcas con design system propio en PANTou" },
  { value: "1", label: "SaaS multi-tenant en producción" },
];

const principles = [
  "Entiendo el negocio antes que la tecnología.",
  "Diseño y construyo, no entrego solo maquetas.",
  "Orquesto modelos de IA como un equipo, con verificación y costo medido.",
  "Mido antes de afirmar: pruebas, contratos de API y fidelidad visual automáticas.",
  "Documento las decisiones para que el equipo —humano o IA— no las repita.",
];

const ctaClass =
  "inline-flex items-center justify-center rounded-xl bg-gradient-cta px-6 py-3 font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-110";

export default function GigxPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-16 sm:py-24">
          <img
            src={profile.photo}
            alt="Retrato de Miguel Angel Yañez"
            width={400}
            height={400}
            className="h-28 w-28 rounded-full border border-line object-cover"
          />
          <div className="mt-8">
            <Eyebrow>Gigx</Eyebrow>
          </div>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-6xl leading-tight tracking-tight text-ink">
            {profile.name}
          </h1>
          <p className="mt-3 font-display font-bold text-lg text-brand-600">
            {profile.title} · Design Engineer
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Diseño el problema, el producto y el sistema que lo construye. Cinco años y medio llevando negocios
            de una idea a software en producción: más de 30 proyectos entre producto, marca, empaque,
            comercio electrónico, plataformas y un SaaS propio.
          </p>

          <div className="mt-8">
            <Kicker>Abierto a</Kicker>
            <div className="mt-3">
              <ChipRow
                label="Abierto a"
                items={profile.openTo.map((text) => ({ text }))}
              />
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate">
              Del sistema de diseño a la implementación: entiendo la operación del cliente, levanto lo que
              necesita y lo llevo a producción.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <PrimaryButton href="/gigx/portfolio/">Ver portafolio</PrimaryButton>
            <ExternalLink
              href={profile.cv}
              className="inline-flex items-center justify-center rounded-xl border-2 border-brand-200 bg-white px-6 py-3 font-bold text-brand-600 transition-all hover:border-brand-600 hover:bg-brand-50"
            >
              Descargar CV (PDF)
            </ExternalLink>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <ExternalLink
                    href={l.href}
                    className="font-display font-bold text-brand-600 underline-offset-4 hover:underline"
                  >
                    {l.label} ↗
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-soft py-6">
        <Container>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <Kicker>Ahora</Kicker>
            <span className="text-lg text-ink">
              Construyo Merez, una plataforma SaaS con agentes de IA para pequeños negocios, y dirijo Inflinds.
            </span>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Kicker>Qué hago</Kicker>
          {/* En móvil, fila deslizable (se ve un bloque y asoma el siguiente); en escritorio, tres columnas. */}
          <ol className="-mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-0 md:overflow-visible md:px-0 md:pb-0">
            {doing.map((d, i) => (
              <li key={d.title} className="w-[82%] shrink-0 snap-start border-t border-line py-4 md:w-auto md:py-6">
                <div className="flex items-baseline gap-3 md:block">
                  <span className="font-display font-black text-3xl leading-none text-brand-600 md:text-5xl">0{i + 1}</span>
                  <h2 className="font-display font-black text-xl text-ink md:mt-4 md:text-2xl">{d.title}</h2>
                </div>
                <p className="mt-2 leading-relaxed text-slate md:hidden">{d.short}</p>
                <p className="mt-3 hidden leading-relaxed text-slate md:block">{d.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Kicker>Herramientas</Kicker>
            <dl className="mt-4">
              {stack.map((g) => (
                <div key={g.name} className="grid gap-2 border-t border-line py-4 md:grid-cols-[12rem_1fr] md:items-center">
                  <dt className="font-display font-bold text-ink">{g.name}</dt>
                  <dd className="min-w-0">
                    <ChipRow label={g.name} items={g.items.map((text) => ({ text }))} wrap />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <Kicker>Trabajo destacado</Kicker>
          <ul className="mt-6 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {featured.map((f) => (
              <li key={f.title} className="border-t border-line pt-4">
                <Link href={f.href} className="group block">
                  <img
                    src={f.image.src}
                    alt={f.image.alt}
                    width={f.image.w}
                    height={f.image.h}
                    loading="lazy"
                    className="aspect-[16/10] w-full border border-line object-cover object-top"
                  />
                  <h3 className="mt-4 font-display font-black text-2xl text-ink group-hover:text-brand-600">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-slate">{f.text}</p>
                  <span className="mt-2 inline-block font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                    Ver el caso →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <Kicker>Trayectoria</Kicker>
          <ol className="-mx-5 mt-6 flex overflow-x-auto px-5 pb-2">
            {path.map((p) => (
              <li key={p.year} className="w-44 shrink-0 border-t border-ink pr-4 pt-3">
                <p className="font-display font-black text-2xl text-brand-600">{p.year}</p>
                <p className="mt-1 text-sm text-slate">{p.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link
              href="/gigx/portfolio/#linea-de-tiempo"
              className="font-display font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              Ver la línea de tiempo completa →
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <Kicker>Formación</Kicker>
          <dl className="mt-4">
            {teaching.map((t) => (
              <div key={t.place} className="grid gap-2 border-t border-line py-4 md:grid-cols-[16rem_1fr] md:items-baseline">
                <dt className="font-display font-bold text-ink">{t.place}</dt>
                <dd className="min-w-0 text-slate">{t.what}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <dl className="grid sm:grid-cols-3 sm:gap-8">
            {stats.map((s) => (
              <div key={s.value} className="border-t border-line py-5">
                <dt className="font-display font-black text-6xl leading-none text-brand-600">{s.value}</dt>
                <dd className="mt-3 text-slate">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <Kicker>Preguntas que me hacen</Kicker>
          <dl className="mt-6 max-w-3xl">
            {faq.map((f) => (
              <div key={f.q} className="border-t border-line py-5 last:border-b">
                <dt className="font-display font-black text-xl text-ink">{f.q}</dt>
                <dd className="mt-2 text-slate leading-relaxed">{f.a}</dd>
                <dd className="mt-2">
                  <Link
                    href={f.href}
                    className="font-display text-xs font-bold uppercase tracking-[0.16em] text-brand-600 underline-offset-4 hover:underline"
                  >
                    {f.link} →
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-night py-16 sm:py-20">
        <Container>
          <Kicker dark>Cómo trabajo</Kicker>
          <ol className="mt-6 max-w-3xl">
            {principles.map((p, i) => (
              <li key={p} className="flex gap-5 border-t border-white/10 py-5">
                <span className="font-display font-black text-3xl text-yellow">0{i + 1}</span>
                <span className="text-lg leading-relaxed text-white">{p}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-ink">¿Hablamos?</h2>
          <p className="mt-3 max-w-xl text-lg text-slate">
            Si tienes un problema de negocio que merece software, cuéntamelo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ExternalLink href="https://www.linkedin.com/in/gigx" className={ctaClass}>
              LinkedIn ↗
            </ExternalLink>
            <ExternalLink
              href="https://x.com/gigx"
              className="inline-flex items-center justify-center rounded-xl border-2 border-brand-200 bg-white px-6 py-3 font-bold text-brand-600 transition-all hover:border-brand-600 hover:bg-brand-50"
            >
              X ↗
            </ExternalLink>
            <ExternalLink
              href="https://github.com/ElGigx"
              className="font-display font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              GitHub ↗
            </ExternalLink>
            <ExternalLink
              href="https://www.behance.net/miguelyaeza"
              className="font-display font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              Behance ↗
            </ExternalLink>
          </div>
        </Container>
      </section>
    </>
  );
}
