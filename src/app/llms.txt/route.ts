import { services, site } from "@/lib/site";
import { allEntries, allPosts, entryPath, postPath } from "@/lib/content";

export const dynamic = "force-static";

const BASE = "https://inflinds.com";

export async function GET() {
  const [posts, entries] = await Promise.all([allPosts(), allEntries()]);

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} (${site.legalName}) es un ${site.tagline} en ${site.country}: diseño, desarrollo web y de plataformas, automatización e inteligencia artificial aplicada para empresas y emprendedores. Construye sobre Merez, su plataforma de gestión para negocios.`,
    "",
    "## Servicios",
    ...services.map((s) => `- [${s.title}](${BASE}/services/#${s.slug}): ${s.summary}`),
    "",
    "## Páginas",
    `- [Precios](${BASE}/pricing/): planes y precios de desarrollo a la medida y sobre Merez.`,
    `- [Contacto](${BASE}/contact/): cómo empezar un proyecto con ${site.name}.`,
    `- [Blog](${BASE}/blog/): guías y análisis.`,
    `- [Bitácora](${BASE}/log/): proyectos entregados y novedades.`,
  ];

  if (posts.length > 0) {
    lines.push("", "## Artículos", ...posts.map((p) => `- [${p.title}](${BASE}${postPath(p)})${p.excerpt ? `: ${p.excerpt}` : ""}`));
  }
  if (entries.length > 0) {
    lines.push("", "## Bitácora", ...entries.slice(0, 50).map((e) => `- [${e.headline}](${BASE}${entryPath(e)})`));
  }

  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
