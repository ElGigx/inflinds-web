import type { MetadataRoute } from "next";

/**
 * Sitemap del sitio. Se genera en build (export estático → sitemap.xml).
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
// Obligatorio con `output: export`: sin esto Next trata la ruta como dinámica
// y el build falla. El sitemap se hornea en cada build, que es lo que queremos.
export const dynamic = "force-static";

const BASE = "https://inflinds.com";

const RUTAS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return RUTAS.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
