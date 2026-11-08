import type { MetadataRoute } from "next";
import { allAuthors, allEntries, allPosts, authorPath, entryPath, postPath } from "@/lib/content";

/**
 * Sitemap del sitio. Se regenera cada 5 minutos para incluir lo que se publica en Merez.
 *
 * El host es el CANÓNICO: el apex `inflinds.com`. `www` redirige 308 aquí, así
 * que listar www duplicaría cada URL a ojos del buscador.
 *
 * Las rutas llevan barra final porque `trailingSlash: true` en next.config: la
 * URL sin barra redirige, y un sitemap que apunta a URLs que redirigen es un
 * sitemap mal hecho.
 *
 * ⚠️ Al añadir una página nueva, añadirla aquí. No se descubre sola.
 */
export const revalidate = 300;

import { CONTENT_DATES } from "@/lib/content-dates";

const BASE = "https://inflinds.com";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/diseno/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/desarrollo/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/automatizacion/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/inteligencia-artificial/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/consultoria/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/vat-and-totals/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/percentages/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/currency/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/business-days/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/reorder-point/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/unit-price/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/hiring-cost/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/benefits-provision/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/vacation-payout/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/service-bonus/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/severance-and-interest/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/overtime/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/withholding-tax/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/ica-tax/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/invoice-with-withholdings/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/company-setup-cost/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/social-security/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/sgsst-cost/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/credit-installments/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/stacked-discounts/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/tip-and-bill/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/cost-per-trip/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/price-rounding/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/unit-conversion/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/whatsapp-link/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/phone-normalizer/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/social-character-count/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/nit-check-digit/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/email-signature/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/sales-commissions/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/days-between-dates/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/receivables-age/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/weighted-average-cost/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/real-margin/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/price-per-pound/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/sales-average/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/sale-price/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/true-crm-cost/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/gateway-or-breb/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/lost-hours/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/break-even/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/log/", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/gigx/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/gigx/portfolio/", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [posts, entries, authors] = await Promise.all([allPosts(), allEntries(), allAuthors()]);

  return [
    ...ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...posts.map((p) => ({
      url: `${BASE}${postPath(p)}`,
      lastModified: new Date(p.updated_at ?? p.published_at ?? lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...authors.map((a) => ({
      url: `${BASE}${authorPath(a)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...entries.map((e) => ({
      url: `${BASE}${entryPath(e)}`,
      lastModified: new Date(e.updated_at ?? e.happened_on),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
