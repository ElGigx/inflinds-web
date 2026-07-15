import type { Metadata } from "next";
import { services, methodology } from "@/lib/site";
import {
  Container,
  SectionHeading,
  Eyebrow,
  PrimaryButton,
  AccentTag,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño UX/UI, desarrollo web y de plataformas, automatización de procesos, inteligencia artificial aplicada y consultoría de transformación digital.",
};

export default function ServiciosPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Eyebrow>Servicios</Eyebrow>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl leading-tight tracking-tight text-ink max-w-3xl">
            De la estrategia al producto en producción
          </h1>
          <p className="mt-5 text-lg text-slate leading-relaxed max-w-2xl">
            Cinco líneas de servicio que se combinan según el problema. No empezamos por la
            tecnología: empezamos por entender el negocio y diseñar la solución correcta.
          </p>
        </Container>
      </section>

      {/* DETALLE DE CADA LÍNEA */}
      <section className="pb-8">
        <Container>
          <div className="space-y-6">
            {services.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                className="scroll-mt-24 rounded-3xl border border-line bg-white p-8 sm:p-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]"
              >
                <div>
                  <AccentTag accent={s.accent}>{`0${i + 1} · ${s.tag}`}</AccentTag>
                  <h2 className="mt-4 font-display font-black text-2xl sm:text-3xl text-ink leading-tight">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-slate leading-relaxed">{s.summary}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 content-start">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 rounded-xl bg-paper-soft border border-line p-4 text-sm text-ink"
                    >
                      <span
                        className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-gradient-brand grid place-items-center text-white text-xs font-black"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESO */}
      <section className="py-20 bg-paper-soft mt-8">
        <Container>
          <SectionHeading
            eyebrow="Metodología"
            title="Cómo entregamos, fase por fase"
            intro="El mismo proceso de 10 fases sin importar el tamaño del proyecto. Cada fase deja documentación, no solo entregables."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {methodology.map((step) => (
              <div key={step.n} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-brand shrink-0 w-10">
                  {String(step.n).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display font-bold text-ink">{step.name}</h3>
                  <p className="mt-1 text-sm text-slate leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container className="text-center">
          <h2 className="font-display font-black text-3xl text-ink">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="mt-3 text-slate text-lg max-w-xl mx-auto">
            Cuéntanos tu objetivo y te proponemos el camino. La primera conversación no cuesta nada.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/contacto/">Hablemos de tu proyecto</PrimaryButton>
          </div>
        </Container>
      </section>
    </>
  );
}
