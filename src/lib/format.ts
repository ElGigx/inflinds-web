export type ToolFormat = "cop" | "units" | "percent";

export function cop(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function num(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 1 }).format(value);
}

export function pct(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${num(value * 100)} %`;
}
