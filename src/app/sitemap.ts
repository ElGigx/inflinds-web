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
  { path: "/pricing/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/log/", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
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
