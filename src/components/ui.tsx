import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>;
}

// tone = fondo sobre el que se posa el componente.
// "light": el amarillo #FFD80A no contrasta sobre blanco como texto, así que
// se usa de fondo de chip con texto oscuro encima (contraste AAA).
// "dark": amarillo puro como texto sobre superficie noche.
export type Tone = "light" | "dark";

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  if (tone === "dark") {
    return (
      <span className="inline-block font-display font-bold text-xs uppercase tracking-[0.18em] text-yellow">
        {children}
      </span>
    );
  }
  return (
    <span className="inline-block rounded-md bg-yellow px-2.5 py-1 font-display font-bold text-xs uppercase tracking-[0.18em] text-ink">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  tone?: Tone;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-3 font-display font-black text-3xl sm:text-4xl leading-tight tracking-tight ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-slate-300" : "text-slate"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; className?: string };

// CTA principal (degradado magenta -> naranja) — la acción de conversión del sitio.
export function PrimaryButton({ href, children, className = "" }: BtnProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-cta px-6 py-3 font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-110 ${className}`}
    >
      {children}
    </Link>
  );
}

// Acción secundaria (contorno). tone="dark" para superficies noche.
export function SecondaryButton({ href, children, className = "", tone = "light" }: BtnProps & { tone?: Tone }) {
  if (tone === "dark") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-xl border-2 border-white/25 px-6 py-3 font-bold text-white transition-all hover:border-white/60 hover:bg-white/5 ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl border-2 border-brand-200 bg-white px-6 py-3 font-bold text-brand-600 transition-all hover:border-brand-600 hover:bg-brand-50 ${className}`}
    >
      {children}
    </Link>
  );
}

// Chip de acento según la línea de servicio.
const accentMap = {
  brand: "bg-brand-50 text-brand-600",
  magenta: "bg-pink-50 text-magenta",
  orange: "bg-orange-50 text-orange-600",
} as const;

export function AccentTag({ accent, children }: { accent: keyof typeof accentMap; children: ReactNode }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${accentMap[accent]}`}>
      {children}
    </span>
  );
}
