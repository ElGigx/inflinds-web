import type { Metadata } from "next";
import Link from "next/link";
import { businessTools, dailyTools, type Tool } from "@/lib/tools";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Calculadoras de uso único para el día a día de un negocio: IVA, porcentajes, divisas, días hábiles, punto de reorden y precio por unidad. También las de decisión: margen, CRM, cobros y equilibrio. Sin cuenta.",
  alternates: { canonical: "https://inflinds.com/herramientas/" },
};

const CATEGORY_LABEL: Record<string, string> = {
  diario: "Día a día",
  negocio: "Decisión",
};

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/herramientas/${tool.slug}/`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition hover:border-magenta sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-yellow px-2 py-1 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
          {tool.eyebrow}
        </span>
        <span className="text-xs text-slate">
          {CATEGORY_LABEL[tool.category]} · {tool.minutes} min
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-black leading-tight text-ink group-hover:text-magenta">
        {tool.title}
      </h3>
      <p className="mt-2 text-sm font-semibold text-ink">{tool.promise}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate">{tool.description}</p>
      <span className="mt-auto pt-5 text-sm font-bold text-magenta">Abrir herramienta →</span>
    </Link>
  );
}

export default function ToolsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Eyebrow>Herramientas</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            Calcula una cosa. Sin crear cuenta.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            Primero las del día a día: el IVA, el plazo, la conversión, cuánto pedir. Abajo las de
            decidir: margen, costo real, cobros. Todas se usan una vez y no piden nada. Lo que
            necesita historial, campos propios o ciclos vive en Merez.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/contact/">Necesito ayuda con esto</PrimaryButton>
            <Link
              href="https://www.merez.co/pricing/"
              className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 font-bold text-ink transition hover:border-magenta"
            >
              Ver la plataforma
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl font-black text-ink">Para el día a día</h2>
            <p className="text-sm text-slate">Lo que se resuelve en el mostrador, en la oficina o en la bodega.</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dailyTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 pt-10">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-8">
            <h2 className="font-display text-2xl font-black text-ink">Para decidir</h2>
            <p className="text-sm text-slate">Las que se hacen una vez y mueven una decisión de plata.</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-night p-6 text-white sm:p-8">
            <p className="font-display text-xl font-black">¿Y si necesitas guardar el resultado?</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300/80">
              Las herramientas no piden cuenta a propósito. Cuando el número tiene que vivir con el
              cliente, el producto o el histórico de meses, eso ya es Merez: ahí se guarda, se cruza
              y se repite.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://www.merez.co/"
                className="inline-flex items-center rounded-xl bg-yellow px-5 py-3 text-sm font-bold text-ink transition hover:brightness-95"
              >
                Conocer Merez
              </a>
              <a
                href="https://app.merez.co"
                className="inline-flex items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-yellow/70"
              >
                Entrar al panel
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
