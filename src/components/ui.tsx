import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block font-display font-bold text-xs uppercase tracking-[0.18em] text-magenta">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display font-black text-3xl sm:text-4xl leading-tight text-ink tracking-tight">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-slate leading-relaxed">{intro}</p>}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; className?: string };

// CTA principal (magenta) — la acción de conversión del sitio.
export function PrimaryButton({ href, children, className = "" }: BtnProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl bg-magenta px-6 py-3 font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-magenta-600 ${className}`}
    >
      {children}
    </Link>
  );
}

// Acción secundaria (contorno púrpura de marca).
export function SecondaryButton({ href, children, className = "" }: BtnProps) {
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
