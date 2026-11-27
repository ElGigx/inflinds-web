import { MEREZ_API } from "@/lib/merez";

export type ColorContext = "logo" | "background" | "text" | "accent" | "border";

export const CONTEXT_LABELS: Record<ColorContext, string> = {
  logo: "el logo",
  background: "fondos",
  text: "textos",
  accent: "acentos y formas",
  border: "bordes",
};

export interface BrandColor {
  name: string;
  hex: string;
  contexts: ColorContext[];
  note: string;
}

export interface DesignSystemData {
  colors: BrandColor[];
  dont: string[];
  source: "merez" | "local";
}

const ALL: ColorContext[] = ["logo", "background", "text", "accent", "border"];

export const LOCAL_DESIGN_SYSTEM: DesignSystemData = {
  source: "local",
  colors: [
    { name: "Morado", hex: "#751CB4", contexts: ALL, note: "Color base de la marca." },
    { name: "Noche", hex: "#0E0A1B", contexts: ALL, note: "Fondo oscuro y tinta." },
    { name: "Gris", hex: "#343A40", contexts: ALL, note: "Gris oscuro dado por la marca, para texto." },
    { name: "Magenta", hex: "#F8049C", contexts: ALL, note: "Llamado a la acción." },
    {
      name: "Amarillo",
      hex: "#FFD80A",
      contexts: ["text", "accent"],
      note: "Solo sobre fondos oscuros, en titulares y acentos. Nunca como fondo.",
    },
    {
      name: "Naranja",
      hex: "#FF8E00",
      contexts: ["logo"],
      note: "El naranja vive solo dentro del logo. No se usa en fondos, textos ni piezas.",
    },
  ],
  dont: ["No cambies el logo: el naranja queda permitido solo dentro de él.", "No pongas texto amarillo sobre fondos claros."],
};

interface ApiColor {
  role?: string;
  hex?: string;
  contexts?: string[];
}

interface ApiRule {
  name?: string | null;
  values?: string[];
  contexts?: string[];
  note?: string | null;
}

const SITE = "inflinds";

function isContext(value: string): value is ColorContext {
  return (ALL as string[]).includes(value);
}

export async function loadDesignSystem(): Promise<DesignSystemData> {
  try {
    const response = await fetch(`${MEREZ_API}/public/sites/${SITE}/design-system`, { next: { revalidate: 3600 } });
    if (!response.ok) return LOCAL_DESIGN_SYSTEM;
    const data = ((await response.json()) as { data?: { colors?: ApiColor[]; rules?: { colors?: ApiRule[]; dont?: string[] } } }).data;
    const rules = data?.rules?.colors ?? [];
    if (!data || rules.length === 0) return LOCAL_DESIGN_SYSTEM;

    const colors: BrandColor[] = rules.flatMap((rule) =>
      (rule.values ?? []).slice(0, 1).map((hex) => ({
        name: rule.name ?? hex,
        hex,
        contexts: (rule.contexts ?? []).filter(isContext),
        note: rule.note ?? "",
      })),
    );
    const free: BrandColor[] = (data.colors ?? [])
      .filter((color) => color.hex && !colors.some((rule) => rule.hex.toUpperCase() === color.hex!.toUpperCase()))
      .map((color) => ({ name: color.role ?? color.hex!, hex: color.hex!, contexts: ALL, note: "" }));

    return { source: "merez", colors: [...free, ...colors], dont: data.rules?.dont ?? [] };
  } catch {
    return LOCAL_DESIGN_SYSTEM;
  }
}
