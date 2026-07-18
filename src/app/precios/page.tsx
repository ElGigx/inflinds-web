import type { Metadata } from "next";
import { plans, customQuoted, futureServices } from "@/lib/site";
import Icon from "@/components/Icon";
import {
  Container,
  SectionHeading,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes y precios de Inflinds en pesos colombianos: landing page, sitio informativo, e-commerce y proyectos personalizados.",
};

// Razones de valor del hero (columna derecha).
const valueProps = [
  {
    icon: "trending",
    title: "No solo entregamos un producto, construimos crecimiento.",
    desc: "Estrategia, tecnología y diseño trabajando para tus objetivos.",
  },
  {
    icon: "zap",
    title: "Automatizamos y optimizamos para que ahorres tiempo y dinero.",
    desc: "Menos procesos manuales, más productividad.",
  },
  {
    icon: "sparkles",
    title: "Integramos IA y datos para decisiones más inteligentes.",
    desc: "Convierte información en ventajas competitivas.",
  },
  {
    icon: "users",
    title: "Te acompañamos en cada etapa.",
    desc: "No te dejamos solo después del lanzamiento.",
  },
];

const heroChecks = [
  { k: "Precios claros", v: "sin letras pequeñas" },
  { k: "Acompañamiento", v: "cercano y continuo" },
  { k: "Enfoque en resultados", v: "y crecimiento" },
];

export default function PreciosPage() {
  return (
    <>
      {/* ---------- HERO (oscuro) ---------- */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 hero-glow-night" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow tone="dark">Precios transparentes</Eyebrow>
              <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl leading-[1.08] tracking-tight">
                Soluciones a la medida de <span className="text-magenta">tu negocio</span> y tu
                etapa de <span className="text-orange">crecimiento</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Planes flexibles pensados para emprendedores, pymes y empresas que quieren
                resultados reales con tecnología, diseño e IA.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                {heroChecks.map((c) => (
                  <li key={c.k} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-yellow">
                      <Icon name="tick" className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-snug">
                      <strong className="block font-bold text-white">{c.k}</strong>
                      <span className="text-slate-400">{c.v}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-night-800/80 p-7 sm:p-8">
              <h2 className="font-display font-bold text-lg text-white">
                ¿Por qué nuestros precios son una inversión inteligente?
              </h2>
              <ul className="mt-6 space-y-5">
                {valueProps.map((v) => (
                  <li key={v.icon} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-magenta">
                      <Icon name={v.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white leading-snug">{v.title}</p>
                      <p className="mt-1 text-sm text-slate-400 leading-snug">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- PLANES ---------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Elige tu plan"
            title="Planes diseñados para cada etapa de tu negocio"
            intro="Precios base en pesos colombianos; se ajustan según el alcance y las necesidades reales de tu proyecto."
          />
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) =>
              plan.popular ? (
                /* Tarjeta destacada (oscura) */
                <div
                  key={plan.slug}
                  className="flex flex-col overflow-hidden rounded-3xl bg-night text-white shadow-[0_30px_70px_-20px_rgba(117,28,180,0.55)] xl:-my-5"
                >
                  <p className="bg-gradient-cta py-2.5 text-center font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                    Más popular
                  </p>
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-display font-black text-2xl">{plan.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{plan.desc}</p>
                    <p className="mt-6 text-xs text-slate-400">Desde</p>
                    <p className="font-display font-black text-[1.75rem] leading-tight text-magenta whitespace-nowrap">
                      {plan.price}{" "}
                      <span className="text-sm font-bold text-orange">COP</span>
                    </p>
                    <hr className="my-5 border-white/10" />
                    {plan.featuresIntro && (
                      <p className="text-sm font-bold text-white">{plan.featuresIntro}</p>
                    )}
                    <ul className="mt-3 flex-1 space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <span className="mt-0.5 text-magenta">
                            <Icon name="tick" className="h-4 w-4" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <PrimaryButton href="/contacto/" className="mt-7 w-full">
                      {plan.cta} <span aria-hidden="true" className="ml-2">→</span>
                    </PrimaryButton>
                  </div>
                </div>
              ) : (
                /* Tarjeta regular (clara) */
                <div
                  key={plan.slug}
                  className="flex flex-col rounded-3xl border border-line bg-white p-7"
                >
                  <h3 className="font-display font-black text-2xl text-ink">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{plan.desc}</p>
                  {plan.price ? (
                    <>
                      <p className="mt-6 text-xs text-muted">Desde</p>
                      <p className="font-display font-black text-[1.75rem] leading-tight text-magenta whitespace-nowrap">
                        {plan.price}{" "}
                        <span className="text-sm font-bold text-muted">COP</span>
                      </p>
                    </>
                  ) : (
                    <p className="mt-6 font-display font-black text-3xl text-brand-600">
                      A la medida
                    </p>
                  )}
                  <hr className="my-5 border-line" />
                  {plan.featuresIntro && (
                    <p className="text-sm font-bold text-ink">{plan.featuresIntro}</p>
                  )}
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate">
                        <span className="mt-0.5 text-magenta">
                          <Icon name="tick" className="h-4 w-4" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <SecondaryButton href="/contacto/" className="mt-7 w-full">
                    {plan.cta} <span aria-hidden="true" className="ml-2">→</span>
                  </SecondaryButton>
                </div>
              )
            )}
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted">
            <Icon name="check" className="h-4 w-4 shrink-0" />
            Todos los planes incluyen: acompañamiento, seguridad y respaldo, y mejora continua.
          </p>
        </Container>
      </section>

      {/* ---------- COTIZADOS A MEDIDA + FUTUROS ---------- */}
      <section className="bg-night py-16 text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow tone="dark">Cotizados a medida</Eyebrow>
              <h2 className="mt-3 font-display font-black text-3xl leading-tight">
                Proyectos sin tarifa fija
              </h2>
              <p className="mt-3 text-slate-300">
                Los proyectos con alcance particular se cotizan de forma independiente. El precio se
                construye alrededor del valor entregado, no del tiempo invertido.
              </p>
              <ul className="mt-6 space-y-4">
                {customQuoted.map((item) => (
                  <li key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-display font-bold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow tone="dark">En desarrollo</Eyebrow>
              <h2 className="mt-3 font-display font-black text-3xl leading-tight">
                Servicios que estamos preparando
              </h2>
              <p className="mt-3 text-slate-300">
                Líneas que estamos formalizando. Su precio se define cuando cada servicio alcance
                estado de producción; hoy están disponibles bajo cotización.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {futureServices.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <PrimaryButton href="/contacto/">Solicitar cotización</PrimaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- NOTAS / POLÍTICAS ---------- */}
      <section className="py-12">
        <Container>
          <div className="rounded-2xl border border-line bg-paper-soft p-6 text-sm text-slate leading-relaxed">
            <h2 className="font-display font-bold text-ink">Notas comerciales</h2>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>Todos los precios están expresados en pesos colombianos (COP) y son valores base de referencia.</li>
              <li>Los valores pueden ajustarse según alcance, complejidad y necesidades de cada cliente, y pueden cambiar sin previo aviso.</li>
              <li>Toda propuesta comercial firmada tiene prioridad sobre esta lista cuando existan acuerdos específicos.</li>
              <li>Los proyectos personalizados requieren cotización independiente.</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
