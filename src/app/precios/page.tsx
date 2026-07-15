import type { Metadata } from "next";
import { pricingTables, customQuoted, futureServices } from "@/lib/site";
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
    "Precios base de Inflinds en pesos colombianos: desarrollo web, hosting, dominios, seguridad, correos, licencias, soporte y marketing digital.",
};

// Tablas que se destacan como oferta principal (desarrollo).
const featured = pricingTables[0];
const rest = pricingTables.slice(1);

export default function PreciosPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Eyebrow>Precios</Eyebrow>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl leading-tight tracking-tight text-ink max-w-3xl">
            Precios claros, en pesos, sin sorpresas
          </h1>
          <p className="mt-5 text-lg text-slate leading-relaxed max-w-2xl">
            No vendemos horas: vendemos soluciones. Estos son los precios base de referencia —
            se ajustan según el alcance, la complejidad y las necesidades reales de cada proyecto.
          </p>
        </Container>
      </section>

      {/* DESARROLLO (destacado) */}
      <section className="pb-6">
        <Container>
          <SectionHeading eyebrow={featured.title} title="Desarrollo de tu presencia digital" intro={featured.subtitle} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featured.rows.map((row, idx) => (
              <div
                key={row.name}
                className={`rounded-3xl border p-8 flex flex-col ${
                  idx === 1 ? "border-magenta/40 bg-white shadow-lg" : "border-line bg-white"
                }`}
              >
                {idx === 1 && (
                  <span className="self-start rounded-full bg-pink-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-magenta">
                    Más completo
                  </span>
                )}
                <h3 className="mt-2 font-display font-black text-2xl text-ink">{row.name}</h3>
                <p className="mt-2 font-display font-black text-3xl text-gradient inline-block w-max">
                  {row.price}
                </p>
                {row.note && <p className="mt-4 text-sm text-slate leading-relaxed flex-1">{row.note}</p>}
                <div className="mt-6">
                  <SecondaryButton href="/contacto/" className="w-full">
                    Solicitar propuesta
                  </SecondaryButton>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TABLAS DE SERVICIOS RECURRENTES */}
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Servicios y planes"
            title="Hosting, dominios, correo, soporte y más"
            intro="Todo lo que un proyecto necesita para vivir en línea, con tarifas de referencia por año o por mes."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((table) => (
              <div key={table.title} className="rounded-2xl border border-line bg-white overflow-hidden flex flex-col">
                <div className="bg-paper-soft px-5 py-4 border-b border-line">
                  <h3 className="font-display font-black text-ink">{table.title}</h3>
                  {table.subtitle && <p className="mt-1 text-xs text-slate">{table.subtitle}</p>}
                </div>
                <ul className="divide-y divide-line flex-1">
                  {table.rows.map((row) => (
                    <li key={row.name} className="px-5 py-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-ink">{row.name}</span>
                        <span className="text-sm font-display font-black text-brand-600 whitespace-nowrap">
                          {row.price}
                        </span>
                      </div>
                      {row.note && <p className="mt-1 text-xs text-slate leading-relaxed">{row.note}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* COTIZADOS A MEDIDA + FUTUROS */}
      <section className="py-16 bg-ink-900 text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block font-display font-bold text-xs uppercase tracking-[0.18em] text-orange">
                Cotizados a medida
              </span>
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
              <span className="inline-block font-display font-bold text-xs uppercase tracking-[0.18em] text-orange">
                En desarrollo
              </span>
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

      {/* NOTAS / POLÍTICAS */}
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
