import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Container, Eyebrow, SecondaryButton } from "@/components/ui";
import CaseSection from "../_components/CaseSection";
import MerezInside from "../_components/MerezInside";
import { Design, Products, Sites, Timeline } from "../_components/Sections";
import { ChipRow, ExternalLink } from "../_components/parts";
import { cases, ogImage, profile } from "../_data";

const title = "Portafolio — Miguel Angel Yañez";
const description =
  "Portafolio de Miguel Angel Yañez, Design Engineer, Product Designer y Forward Deployed Engineer: casos de estudio, línea de tiempo, sitios, producto y diseño, de una idea a software en producción.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gigx/portfolio/" },
  openGraph: { title, description, url: "/gigx/portfolio/", type: "website", siteName: "Inflinds", locale: "es_CO", images: [ogImage] },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
};

const index = [
  { text: "Casos", href: "#casos" },
  { text: "Merez por dentro", href: "#merez-por-dentro" },
  { text: "Línea de tiempo", href: "#linea-de-tiempo" },
  { text: "Sitios", href: "#sitios" },
  { text: "Producto", href: "#producto" },
  { text: "Diseño", href: "#diseno" },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Link href="/gigx/" className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline">
            ← Miguel Angel Yañez
          </Link>
          <div className="mt-6">
            <Eyebrow>Portafolio</Eyebrow>
          </div>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl leading-tight tracking-tight text-ink max-w-3xl">
            De una idea a software en producción
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            Cinco casos a fondo, siete años de trabajo y el archivo de lo que se construyó en el camino:
            sitios, tiendas, prototipos y marca.
          </p>
          <p className="mt-3 font-display font-bold text-brand-600">{profile.roles.join(" · ")}</p>
          <div className="mt-8">
            <ChipRow items={index} label="Índice del portafolio" />
          </div>
        </Container>
      </section>

      <section id="casos" className="scroll-mt-24">
        <Container>
          <p className="pb-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink">
            Casos de estudio
          </p>
        </Container>
        {cases.map((c, i) => (
          <Fragment key={c.id}>
            <CaseSection study={c} index={i} />
            {c.id === "merez" && <MerezInside />}
          </Fragment>
        ))}
      </section>

      <Timeline />
      <Sites />
      <Products />
      <Design />

      <section className="bg-night py-16 sm:py-20">
        <Container>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">¿Hablamos?</h2>
          <p className="mt-3 max-w-xl text-lg text-slate-300">
            Si tienes un problema de negocio que merece software, cuéntamelo.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {profile.links
              .filter((l) => l.label !== "Behance")
              .map((l) => (
                <li key={l.label}>
                  <ExternalLink
                    href={l.href}
                    className="font-display font-bold text-yellow underline-offset-4 hover:underline"
                  >
                    {l.label} ↗
                  </ExternalLink>
                </li>
              ))}
          </ul>
          <div className="mt-8">
            <SecondaryButton href="/gigx/" tone="dark">
              Volver a mi perfil
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </>
  );
}
