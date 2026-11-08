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

const BASE = "https://inflinds.com";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/herramientas/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/herramientas/iva-y-totales/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/porcentajes/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/divisas/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/dias-habiles/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/punto-de-reorden/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/precio-por-unidad/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/cuotas-de-credito/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/descuentos-en-cascada/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/propina-y-cuenta/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/costo-por-viaje/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/redondeo-de-precios/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/conversion-de-medidas/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/enlace-de-whatsapp/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/normalizar-telefonos/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/caracteres-para-redes/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/digito-de-verificacion-nit/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/firma-de-correo/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/comisiones-de-venta/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/dias-entre-fechas/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/edad-de-cartera/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/costo-promedio-ponderado/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/margen-real/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/precio-por-libra/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/promedio-ventas/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/precio-de-venta/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/costo-real-de-un-crm/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/pasarela-o-breb/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/horas-que-se-pierden/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas/punto-de-equilibrio/", priority: 0.8, changeFrequency: "monthly" },
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
