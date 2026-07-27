import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos sobre tu proyecto: diseño, desarrollo, automatización o IA. Te respondemos para diseñar la solución correcta.",
};

export default function ContactoPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
          {/* Columna informativa */}
          <div>
            <Eyebrow>Contacto</Eyebrow>
            <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl leading-tight tracking-tight text-ink">
              Cuéntanos tu <span className="text-gradient">proyecto</span>
            </h1>
            <p className="mt-5 text-lg text-slate leading-relaxed max-w-md">
              Escríbenos qué necesitas y en qué punto estás. Te respondemos para entender el objetivo
              y proponerte el camino — sin compromiso.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="font-display font-bold text-ink">Cómo trabajamos</dt>
                <dd className="mt-1 text-sm text-slate leading-relaxed max-w-sm">
                  Empezamos por comprender tu negocio. Diseñamos antes de programar y documentamos
                  cada decisión. Un lanzamiento es el inicio de la evolución, no el final.
                </dd>
              </div>
              <div>
                <dt className="font-display font-bold text-ink">Estudio</dt>
                <dd className="mt-1 text-sm text-slate leading-relaxed">
                  {site.legalName} · NIT {site.nit}
                  <br />
                  {site.country}
                  <br />
                  <a href={site.website} className="text-brand-600 font-semibold hover:underline">
                    inflinds.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Formulario */}
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
