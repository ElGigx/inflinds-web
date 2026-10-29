import type { ReactNode } from "react";

export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`font-display font-bold text-xs uppercase tracking-[0.18em] ${
        dark ? "text-yellow" : "text-brand-600"
      }`}
    >
      {children}
    </p>
  );
}

export function ChipRow({ items, label }: { items: { text: string; href?: string }[]; label: string }) {
  const base =
    "inline-block whitespace-nowrap rounded-full border border-line px-4 py-2 font-display font-bold text-xs uppercase tracking-[0.18em] text-ink";
  return (
    <ul aria-label={label} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
      {items.map((it) => (
        <li key={it.text} className="shrink-0">
          {it.href ? (
            <a href={it.href} className={`${base} transition-colors hover:border-brand-600 hover:text-brand-600`}>
              {it.text}
            </a>
          ) : (
            <span className={base}>{it.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener me" className={className}>
      {children}
    </a>
  );
}
