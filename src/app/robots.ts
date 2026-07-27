import type { MetadataRoute } from "next";

/**
 * robots.txt. Se genera en build (export estático).
 *
 * Todo indexable: es un sitio de marketing, no hay áreas privadas. Lo que sí
 * aporta es declarar el sitemap, que es como el buscador lo encuentra sin
 * depender de que alguien lo registre a mano en Search Console.
 */
// Obligatorio con `output: export` (igual que en sitemap.ts).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://inflinds.com/sitemap.xml",
    host: "https://inflinds.com",
  };
}
