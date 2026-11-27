import type { Metadata } from "next";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui";
import { CONTEXT_LABELS, loadDesignSystem, type ColorContext } from "@/lib/design-system";

export const metadata: Metadata = {
  title: "Sistema de diseño",
  description: "Los colores, la tipografía, el logo y las reglas de uso de la marca Inflinds: qué sí y qué no.",
  robots: { index: false, follow: true },
};

const ALL_CONTEXTS = Object.keys(CONTEXT_LABELS) as ColorContext[];

function onColor(hex: string): string {
  const value = parseInt(hex.slice(1), 16);
  const channel = (n: number) => {
    const c = n / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel((value >> 16) & 255) + 0.7152 * channel((value >> 8) & 255) + 0.0722 * channel(value & 255);
  return luminance > 0.4 ? "#0E0A1B" : "#FFFFFF";
}

function labels(contexts: ColorContext[]): string {
  return contexts.map((context) => CONTEXT_LABELS[context]).join(", ");
}

export default async function DesignSystemPage() {
  const system = await loadDesignSystem();
  const banned = (contexts: ColorContext[]) => ALL_CONTEXTS.filter((context) => !contexts.includes(context));
  const noList = [
    ...system.colors.filter((color) => banned(color.contexts).length > 0).map((color) => `${color.name} (${color.hex}) no se usa en ${labels(banned(color.contexts))}.`),
    ...system.dont,
  ];

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Marca"
          title="Sistema de diseño de Inflinds"
          intro="Cómo se ve Inflinds y las reglas para usar sus colores, su letra y su logo."
        />

        <section aria-labelledby="ds-colors" className="mt-16">
          <h2 id="ds-colors" className="font-display text-2xl font-black text-ink">
            Colores y dónde se usan
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {system.colors.map((color) => (
              <li key={color.hex} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line pt-4">
                <span
                  className="flex min-h-24 items-end rounded-lg border border-line p-2 font-mono text-xs"
                  style={{ background: color.hex, color: onColor(color.hex) }}
                >
                  {color.hex}
                </span>
                <div>
                  <h3 className="font-display text-lg font-black text-ink">{color.name}</h3>
                  <p className="mt-1 text-sm text-slate">Sí: {labels(color.contexts) || "en ningún lugar"}.</p>
                  {banned(color.contexts).length > 0 && (
                    <p className="mt-1 text-sm font-bold text-ink">No: {labels(banned(color.contexts))}.</p>
                  )}
                  {color.note && <p className="mt-1 text-sm text-slate">{color.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ds-type" className="mt-16">
          <h2 id="ds-type" className="font-display text-2xl font-black text-ink">
            Tipografía
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div className="border-t border-line pt-4">
              <p className="font-mono text-xs uppercase tracking-widest text-slate">Títulos · Raleway 900, en mayúscula</p>
              <p className="mt-3 font-display text-4xl font-black uppercase leading-none text-ink">Crece con tu marca</p>
            </div>
            <div className="border-t border-line pt-4">
              <p className="font-mono text-xs uppercase tracking-widest text-slate">Texto · Lato</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">
                El texto corrido se lee cómodo, con párrafos cortos. Aa Bb Cc 0123456789
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="ds-logo" className="mt-16">
          <h2 id="ds-logo" className="font-display text-2xl font-black text-ink">
            Logo
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex min-h-36 items-center justify-center rounded-lg border border-line bg-white p-6">
              <Image src="/brand/logo.svg" alt="Logo de Inflinds" width={215} height={54} unoptimized />
            </div>
            <div className="flex min-h-36 items-center justify-center rounded-lg bg-night p-6">
              <Image src="/brand/logo-blanco.svg" alt="Logo de Inflinds sobre fondo oscuro" width={215} height={54} unoptimized />
            </div>
          </div>
        </section>

        <section aria-labelledby="ds-rules" className="mt-16">
          <h2 id="ds-rules" className="font-display text-2xl font-black text-ink">
            Qué sí y qué no
          </h2>
          <div className="mt-6 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-black text-ink">Sí</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate">
                {system.colors.map((color) => (
                  <li key={color.hex}>
                    {color.name} ({color.hex}) se usa en {labels(color.contexts)}.
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-black text-ink">No</h3>
              {noList.length > 0 ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate">
                  {noList.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-slate">La marca no declara prohibiciones de color.</p>
              )}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
