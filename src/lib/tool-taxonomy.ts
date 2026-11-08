export type FamilyKey = "accounts" | "operations" | "deadlines" | "sales" | "company" | "decisions";

export type Family = {
  key: FamilyKey;
  label: string;
  blurb: string;
  icon: string;
  iconClass: string;
  chip: string;
  tile: string;
  hover: string;
};

export const FAMILIES: Record<FamilyKey, Family> = {
  accounts: {
    key: "accounts",
    label: "Cuentas",
    blurb: "Impuestos, descuentos, margen, cuotas: la plata del día.",
    icon: "pie",
    iconClass: "text-magenta",
    chip: "bg-magenta/10 text-magenta",
    tile: "bg-magenta/10 text-magenta",
    hover: "hover:border-magenta",
  },
  operations: {
    key: "operations",
    label: "Operación",
    blurb: "Inventario, compras, viajes y lo que se mueve en la bodega.",
    icon: "layers",
    iconClass: "text-brand-700",
    chip: "bg-brand/10 text-brand-700",
    tile: "bg-brand/10 text-brand-700",
    hover: "hover:border-brand",
  },
  deadlines: {
    key: "deadlines",
    label: "Plazos",
    blurb: "Fechas, vencimientos y cartera.",
    icon: "calendar",
    iconClass: "text-orange-600",
    chip: "bg-orange/10 text-orange-600",
    tile: "bg-orange/10 text-orange-600",
    hover: "hover:border-orange",
  },
  sales: {
    key: "sales",
    label: "Ventas y datos",
    blurb: "Lo que se manda al cliente: enlaces, teléfonos, firmas, mensajes.",
    icon: "send",
    iconClass: "text-ink",
    chip: "bg-yellow text-ink",
    tile: "bg-yellow/25 text-ink",
    hover: "hover:border-yellow-600",
  },
  company: {
    key: "company",
    label: "Empresa y ley",
    blurb: "Contratar, liquidar, declarar y montar empresa en Colombia.",
    icon: "building",
    iconClass: "text-brand-800",
    chip: "bg-brand-100 text-brand-800",
    tile: "bg-brand-100 text-brand-800",
    hover: "hover:border-brand-400",
  },
  decisions: {
    key: "decisions",
    label: "Decisiones",
    blurb: "Las cuentas grandes: costo real, cobros, equilibrio.",
    icon: "target",
    iconClass: "text-night",
    chip: "bg-night/10 text-night",
    tile: "bg-night/10 text-night",
    hover: "hover:border-night",
  },
};

export const FAMILY_ORDER: FamilyKey[] = ["accounts", "operations", "deadlines", "sales", "company", "decisions"];

const BY_SLUG: Record<string, FamilyKey> = {
  "vat-and-totals": "accounts",
  porcentajes: "accounts",
  divisas: "accounts",
  "credit-installments": "accounts",
  "stacked-discounts": "accounts",
  "tip-and-bill": "accounts",
  "sales-commissions": "accounts",
  "real-margin": "accounts",
  "price-rounding": "accounts",
  "sale-price": "accounts",

  "reorder-point": "operations",
  "unit-price": "operations",
  "cost-per-trip": "operations",
  "weighted-average-cost": "operations",
  "unit-conversion": "operations",
  "price-per-pound": "operations",
  "sales-average": "operations",

  "business-days": "deadlines",
  "days-between-dates": "deadlines",
  "receivables-age": "deadlines",

  "whatsapp-link": "sales",
  "phone-normalizer": "sales",
  "social-character-count": "sales",
  "nit-check-digit": "sales",
  "email-signature": "sales",

  "hiring-cost": "company",
  "benefits-provision": "company",
  "vacation-payout": "company",
  "service-bonus": "company",
  "severance-and-interest": "company",
  "overtime": "company",
  "withholding-tax": "company",
  "ica-tax": "company",
  "invoice-with-withholdings": "company",
  "company-setup-cost": "company",
  "social-security": "company",
  "sgsst-cost": "company",

  "true-crm-cost": "decisions",
  "gateway-or-breb": "decisions",
  "lost-hours": "decisions",
  "break-even": "decisions",
};

export function familyOf(slug: string): FamilyKey {
  return BY_SLUG[slug] ?? "accounts";
}

const ICON_BY_SLUG: Record<string, string> = {
  "vat-and-totals": "percent",
  porcentajes: "percent",
  divisas: "banknote",
  "credit-installments": "card",
  "stacked-discounts": "percent",
  "tip-and-bill": "users",
  "sales-commissions": "trending",
  "real-margin": "pie",
  "price-rounding": "calculator",
  "sale-price": "receipt",

  "reorder-point": "layers",
  "unit-price": "scale",
  "cost-per-trip": "truck",
  "weighted-average-cost": "layers",
  "unit-conversion": "scale",
  "price-per-pound": "scale",
  "sales-average": "bars",

  "business-days": "calendar",
  "days-between-dates": "calendar",
  "receivables-age": "clock",

  "whatsapp-link": "chat",
  "phone-normalizer": "send",
  "social-character-count": "edit",
  "nit-check-digit": "id-card",
  "email-signature": "mail",

  "hiring-cost": "user-plus",
  "benefits-provision": "briefcase",
  "vacation-payout": "calendar",
  "service-bonus": "briefcase",
  "severance-and-interest": "banknote",
  "overtime": "clock",
  "withholding-tax": "receipt",
  "ica-tax": "building",
  "invoice-with-withholdings": "file",
  "company-setup-cost": "building",
  "social-security": "shield",
  "sgsst-cost": "shield",

  "true-crm-cost": "users",
  "gateway-or-breb": "card",
  "lost-hours": "clock",
  "break-even": "scale",
};

export function iconOf(slug: string): string {
  return ICON_BY_SLUG[slug] ?? FAMILIES[familyOf(slug)].icon;
}

const RELATED: Record<string, string[]> = {
  "sale-price": ["real-margin", "stacked-discounts", "price-rounding"],
  "vat-and-totals": ["invoice-with-withholdings", "stacked-discounts", "tip-and-bill"],
  "stacked-discounts": ["vat-and-totals", "real-margin", "price-rounding"],
  "unit-price": ["price-per-pound", "weighted-average-cost", "cost-per-trip"],
  "price-per-pound": ["unit-price", "unit-conversion"],
  "reorder-point": ["weighted-average-cost", "days-between-dates"],
  "business-days": ["days-between-dates", "receivables-age"],
  "receivables-age": ["days-between-dates", "credit-installments"],
  "credit-installments": ["real-margin", "break-even"],
  "whatsapp-link": ["phone-normalizer", "social-character-count", "email-signature"],
  "phone-normalizer": ["whatsapp-link", "nit-check-digit"],
  "social-character-count": ["email-signature", "whatsapp-link"],
  "nit-check-digit": ["email-signature", "company-setup-cost"],
  "email-signature": ["whatsapp-link", "nit-check-digit"],
  "sales-commissions": ["real-margin", "sales-average"],
  "sales-average": ["sales-commissions", "break-even"],
  "cost-per-trip": ["unit-price", "weighted-average-cost"],
  "unit-conversion": ["price-per-pound", "unit-price"],
  "weighted-average-cost": ["reorder-point", "cost-per-trip"],
  "true-crm-cost": ["break-even", "lost-hours"],
  "gateway-or-breb": ["invoice-with-withholdings", "sales-commissions"],
  "lost-hours": ["hiring-cost", "true-crm-cost"],
  "break-even": ["sale-price", "hiring-cost"],
  porcentajes: ["vat-and-totals", "real-margin"],
  divisas: ["unit-price", "cost-per-trip"],
  "tip-and-bill": ["vat-and-totals", "percentages"],
  "real-margin": ["sale-price", "stacked-discounts"],
  "price-rounding": ["sale-price", "vat-and-totals"],

  "hiring-cost": ["social-security", "benefits-provision", "overtime"],
  "benefits-provision": ["service-bonus", "severance-and-interest", "hiring-cost"],
  "vacation-payout": ["service-bonus", "severance-and-interest"],
  "service-bonus": ["severance-and-interest", "vacation-payout"],
  "severance-and-interest": ["service-bonus", "vacation-payout"],
  "overtime": ["hiring-cost", "benefits-provision"],
  "withholding-tax": ["invoice-with-withholdings", "ica-tax"],
  "ica-tax": ["withholding-tax", "invoice-with-withholdings"],
  "invoice-with-withholdings": ["withholding-tax", "ica-tax", "vat-and-totals"],
  "company-setup-cost": ["nit-check-digit", "withholding-tax"],
  "social-security": ["hiring-cost", "sgsst-cost"],
  "sgsst-cost": ["social-security", "hiring-cost"],
};

export function relatedSlugs(slug: string): string[] {
  return RELATED[slug] ?? [];
}

