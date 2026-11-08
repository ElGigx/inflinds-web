import type { Metadata } from "next";
import { tools } from "@/lib/tools";
import { familyOf } from "@/lib/tool-taxonomy";
import { Container, Eyebrow, PrimaryButton } from "@/components/ui";
import ToolsExplorer from "@/components/tools/ToolsExplorer";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Calculadoras de uso único para el día a día de un negocio: IVA, porcentajes, divisas, plazos, inventario, teléfonos, WhatsApp y más. También las de decisión: margen, CRM, cobros y equilibrio. Sin cuenta.",
  alternates: { canonical: "https://inflinds.com/herramientas/" },
};

export default function ToolsPage() {
  const explorerTools = tools.map((tool) => ({
    slug: tool.slug,
    title: tool.title,
    eyebrow: tool.eyebrow,
    promise: tool.promise,
    description: tool.description,
    minutes: tool.minutes,
    family: familyOf(tool.slug),
  }));

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-14 sm:py-16">
          <Eyebrow>Herramientas</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            Busca la cuenta que necesitas. Sin crear cuenta.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            {tools.length} herramientas de uso único, agrupadas por el trabajo que resuelven. Primero
            las del día a día; abajo las de decidir. Todas calculan en tu navegador: no piden cuenta y
            no se guardan nada.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton href="/contact/">Necesito ayuda con esto</PrimaryButton>
            <a
              href="https://www.merez.co/pricing/"
              className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 font-bold text-ink transition hover:border-magenta"
            >
              Ver la plataforma
            </a>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <ToolsExplorer tools={explorerTools} />

          <div className="mt-12 rounded-2xl bg-night p-6 text-white sm:p-8">
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
