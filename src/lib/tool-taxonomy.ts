export type FamilyKey = "cuentas" | "operacion" | "plazos" | "ventas" | "decisiones";

export type Family = {
  key: FamilyKey;
  label: string;
  blurb: string;
  icon: string;
  /** Chip cerrado: fondo + texto con contraste. */
  chip: string;
  /** Cuadrado del icono en la tarjeta. */
  tile: string;
  /** Color del borde al pasar el ratón. */
  hover: string;
};

export const FAMILIES: Record<FamilyKey, Family> = {
  cuentas: {
    key: "cuentas",
    label: "Cuentas",
    blurb: "Lo que se calcula con plata: impuestos, descuentos, margen, cuotas.",
    icon: "pie",
    chip: "bg-magenta/10 text-magenta",
    tile: "bg-magenta/10 text-magenta",
    hover: "hover:border-magenta",
  },
  operacion: {
    key: "operacion",
    label: "Operación",
    blurb: "Inventario, compras, viajes y lo que se mueve en la bodega.",
    icon: "layers",
    chip: "bg-brand/10 text-brand-700",
    tile: "bg-brand/10 text-brand-700",
    hover: "hover:border-brand",
  },
  plazos: {
    key: "plazos",
    label: "Plazos",
    blurb: "Fechas, vencimientos y cartera.",
    icon: "flag",
    chip: "bg-orange/10 text-orange-600",
    tile: "bg-orange/10 text-orange-600",
    hover: "hover:border-orange",
  },
  ventas: {
    key: "ventas",
    label: "Ventas y datos",
    blurb: "Lo que se manda al cliente: enlaces, teléfonos, firmas, mensajes.",
    icon: "send",
    chip: "bg-yellow text-ink",
    tile: "bg-yellow/25 text-ink",
    hover: "hover:border-yellow-600",
  },
  decisiones: {
    key: "decisiones",
    label: "Decisiones",
    blurb: "Las cuentas grandes: costo real, cobros, equilibrio.",
    icon: "target",
    chip: "bg-night/10 text-night",
    tile: "bg-night/10 text-night",
    hover: "hover:border-night",
  },
};

export const FAMILY_ORDER: FamilyKey[] = ["cuentas", "operacion", "plazos", "ventas", "decisiones"];

const BY_SLUG: Record<string, FamilyKey> = {
  "iva-y-totales": "cuentas",
  porcentajes: "cuentas",
  divisas: "cuentas",
  "cuotas-de-credito": "cuentas",
  "descuentos-en-cascada": "cuentas",
  "propina-y-cuenta": "cuentas",
  "comisiones-de-venta": "cuentas",
  "margen-real": "cuentas",
  "redondeo-de-precios": "cuentas",
  "precio-de-venta": "cuentas",

  "punto-de-reorden": "operacion",
  "precio-por-unidad": "operacion",
  "costo-por-viaje": "operacion",
  "costo-promedio-ponderado": "operacion",
  "conversion-de-medidas": "operacion",
  "precio-por-libra": "operacion",
  "promedio-ventas": "operacion",

  "dias-habiles": "plazos",
  "dias-entre-fechas": "plazos",
  "edad-de-cartera": "plazos",

  "enlace-de-whatsapp": "ventas",
  "normalizar-telefonos": "ventas",
  "caracteres-para-redes": "ventas",
  "digito-de-verificacion-nit": "ventas",
  "firma-de-correo": "ventas",

  "costo-real-de-un-crm": "decisiones",
  "pasarela-o-breb": "decisiones",
  "horas-que-se-pierden": "decisiones",
  "punto-de-equilibrio": "decisiones",
};

export function familyOf(slug: string): FamilyKey {
  return BY_SLUG[slug] ?? "cuentas";
}

/** Relaciones curadas: dos herramientas que se usan juntas en el mismo trabajo. */
const RELATED: Record<string, string[]> = {
  "precio-de-venta": ["margen-real", "descuentos-en-cascada", "redondeo-de-precios"],
  "iva-y-totales": ["descuentos-en-cascada", "precio-de-venta", "propina-y-cuenta"],
  "descuentos-en-cascada": ["iva-y-totales", "margen-real", "redondeo-de-precios"],
  "precio-por-unidad": ["precio-por-libra", "costo-promedio-ponderado", "costo-por-viaje"],
  "precio-por-libra": ["precio-por-unidad", "conversion-de-medidas"],
  "punto-de-reorden": ["costo-promedio-ponderado", "dias-entre-fechas"],
  "dias-habiles": ["dias-entre-fechas", "edad-de-cartera"],
  "edad-de-cartera": ["dias-entre-fechas", "cuotas-de-credito"],
  "cuotas-de-credito": ["margen-real", "punto-de-equilibrio"],
  "enlace-de-whatsapp": ["normalizar-telefonos", "caracteres-para-redes", "firma-de-correo"],
  "normalizar-telefonos": ["enlace-de-whatsapp", "digito-de-verificacion-nit"],
  "caracteres-para-redes": ["firma-de-correo", "enlace-de-whatsapp"],
  "digito-de-verificacion-nit": ["firma-de-correo", "normalizar-telefonos"],
  "firma-de-correo": ["enlace-de-whatsapp", "digito-de-verificacion-nit"],
  "comisiones-de-venta": ["margen-real", "promedio-ventas"],
  "promedio-ventas": ["comisiones-de-venta", "punto-de-equilibrio"],
  "costo-por-viaje": ["precio-por-unidad", "costo-promedio-ponderado"],
  "conversion-de-medidas": ["precio-por-libra", "precio-por-unidad"],
  "costo-promedio-ponderado": ["punto-de-reorden", "costo-por-viaje"],
  "costo-real-de-un-crm": ["punto-de-equilibrio", "horas-que-se-pierden"],
  "pasarela-o-breb": ["iva-y-totales", "comisiones-de-venta"],
  "horas-que-se-pierden": ["costo-real-de-un-crm", "comisiones-de-venta"],
  "punto-de-equilibrio": ["precio-de-venta", "cuotas-de-credito"],
  porcentajes: ["iva-y-totales", "margen-real"],
  divisas: ["precio-por-unidad", "costo-por-viaje"],
  "propina-y-cuenta": ["iva-y-totales", "porcentajes"],
  "margen-real": ["precio-de-venta", "descuentos-en-cascada"],
  "redondeo-de-precios": ["precio-de-venta", "iva-y-totales"],
};

export function relatedSlugs(slug: string): string[] {
  return RELATED[slug] ?? [];
}
