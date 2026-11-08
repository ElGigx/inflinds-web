export type FamilyKey = "cuentas" | "operacion" | "plazos" | "ventas" | "empresa" | "decisiones";

export type Family = {
  key: FamilyKey;
  label: string;
  blurb: string;
  icon: string;
  chip: string;
  tile: string;
  hover: string;
};

export const FAMILIES: Record<FamilyKey, Family> = {
  cuentas: {
    key: "cuentas",
    label: "Cuentas",
    blurb: "Impuestos, descuentos, margen, cuotas: la plata del día.",
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
    icon: "calendar",
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
  empresa: {
    key: "empresa",
    label: "Empresa y ley",
    blurb: "Contratar, liquidar, declarar y montar empresa en Colombia.",
    icon: "building",
    chip: "bg-brand-100 text-brand-800",
    tile: "bg-brand-100 text-brand-800",
    hover: "hover:border-brand-400",
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

export const FAMILY_ORDER: FamilyKey[] = ["cuentas", "operacion", "plazos", "ventas", "empresa", "decisiones"];

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

  "costo-de-contratar": "empresa",
  "provision-prestaciones": "empresa",
  "liquidacion-vacaciones": "empresa",
  "prima-de-servicios": "empresa",
  "cesantias-e-intereses": "empresa",
  "horas-extra": "empresa",
  "retencion-en-la-fuente": "empresa",
  "ica-y-reteica": "empresa",
  "factura-con-retenciones": "empresa",
  "costo-de-crear-empresa": "empresa",
  "aportes-seguridad-social": "empresa",
  "costo-sgsst": "empresa",

  "costo-real-de-un-crm": "decisiones",
  "pasarela-o-breb": "decisiones",
  "horas-que-se-pierden": "decisiones",
  "punto-de-equilibrio": "decisiones",
};

export function familyOf(slug: string): FamilyKey {
  return BY_SLUG[slug] ?? "cuentas";
}

/** Icono por herramienta, no solo por familia. */
const ICON_BY_SLUG: Record<string, string> = {
  "iva-y-totales": "percent",
  porcentajes: "percent",
  divisas: "banknote",
  "cuotas-de-credito": "card",
  "descuentos-en-cascada": "percent",
  "propina-y-cuenta": "users",
  "comisiones-de-venta": "trending",
  "margen-real": "pie",
  "redondeo-de-precios": "calculator",
  "precio-de-venta": "receipt",

  "punto-de-reorden": "layers",
  "precio-por-unidad": "scale",
  "costo-por-viaje": "truck",
  "costo-promedio-ponderado": "layers",
  "conversion-de-medidas": "scale",
  "precio-por-libra": "scale",
  "promedio-ventas": "bars",

  "dias-habiles": "calendar",
  "dias-entre-fechas": "calendar",
  "edad-de-cartera": "clock",

  "enlace-de-whatsapp": "chat",
  "normalizar-telefonos": "send",
  "caracteres-para-redes": "edit",
  "digito-de-verificacion-nit": "id-card",
  "firma-de-correo": "mail",

  "costo-de-contratar": "user-plus",
  "provision-prestaciones": "briefcase",
  "liquidacion-vacaciones": "calendar",
  "prima-de-servicios": "briefcase",
  "cesantias-e-intereses": "banknote",
  "horas-extra": "clock",
  "retencion-en-la-fuente": "receipt",
  "ica-y-reteica": "building",
  "factura-con-retenciones": "file",
  "costo-de-crear-empresa": "building",
  "aportes-seguridad-social": "shield",
  "costo-sgsst": "shield",

  "costo-real-de-un-crm": "users",
  "pasarela-o-breb": "card",
  "horas-que-se-pierden": "clock",
  "punto-de-equilibrio": "scale",
};

export function iconOf(slug: string): string {
  return ICON_BY_SLUG[slug] ?? FAMILIES[familyOf(slug)].icon;
}

/** Relaciones curadas: dos herramientas que se usan juntas en el mismo trabajo. */
const RELATED: Record<string, string[]> = {
  "precio-de-venta": ["margen-real", "descuentos-en-cascada", "redondeo-de-precios"],
  "iva-y-totales": ["factura-con-retenciones", "descuentos-en-cascada", "propina-y-cuenta"],
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
  "digito-de-verificacion-nit": ["firma-de-correo", "costo-de-crear-empresa"],
  "firma-de-correo": ["enlace-de-whatsapp", "digito-de-verificacion-nit"],
  "comisiones-de-venta": ["margen-real", "promedio-ventas"],
  "promedio-ventas": ["comisiones-de-venta", "punto-de-equilibrio"],
  "costo-por-viaje": ["precio-por-unidad", "costo-promedio-ponderado"],
  "conversion-de-medidas": ["precio-por-libra", "precio-por-unidad"],
  "costo-promedio-ponderado": ["punto-de-reorden", "costo-por-viaje"],
  "costo-real-de-un-crm": ["punto-de-equilibrio", "horas-que-se-pierden"],
  "pasarela-o-breb": ["factura-con-retenciones", "comisiones-de-venta"],
  "horas-que-se-pierden": ["costo-de-contratar", "costo-real-de-un-crm"],
  "punto-de-equilibrio": ["precio-de-venta", "costo-de-contratar"],
  porcentajes: ["iva-y-totales", "margen-real"],
  divisas: ["precio-por-unidad", "costo-por-viaje"],
  "propina-y-cuenta": ["iva-y-totales", "porcentajes"],
  "margen-real": ["precio-de-venta", "descuentos-en-cascada"],
  "redondeo-de-precios": ["precio-de-venta", "iva-y-totales"],

  "costo-de-contratar": ["aportes-seguridad-social", "provision-prestaciones", "horas-extra"],
  "provision-prestaciones": ["prima-de-servicios", "cesantias-e-intereses", "costo-de-contratar"],
  "liquidacion-vacaciones": ["prima-de-servicios", "cesantias-e-intereses"],
  "prima-de-servicios": ["cesantias-e-intereses", "liquidacion-vacaciones"],
  "cesantias-e-intereses": ["prima-de-servicios", "liquidacion-vacaciones"],
  "horas-extra": ["costo-de-contratar", "provision-prestaciones"],
  "retencion-en-la-fuente": ["factura-con-retenciones", "ica-y-reteica"],
  "ica-y-reteica": ["retencion-en-la-fuente", "factura-con-retenciones"],
  "factura-con-retenciones": ["retencion-en-la-fuente", "ica-y-reteica", "iva-y-totales"],
  "costo-de-crear-empresa": ["digito-de-verificacion-nit", "retencion-en-la-fuente"],
  "aportes-seguridad-social": ["costo-de-contratar", "costo-sgsst"],
  "costo-sgsst": ["aportes-seguridad-social", "costo-de-contratar"],
};

export function relatedSlugs(slug: string): string[] {
  return RELATED[slug] ?? [];
}
