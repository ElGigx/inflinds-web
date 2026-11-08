import { allPosts, postPath } from "@/lib/content";

export const revalidate = 300;

const BASE = "https://inflinds.com";

export async function GET() {
  const posts = await allPosts();
  const items = posts
    .filter((post) => post.published_at)
    .slice(0, 40)
    .map((post) => {
      const url = `${BASE}${postPath(post)}`;
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.published_at ?? Date.now()).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt ?? ""}]]></description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de Inflinds</title>
    <link>${BASE}/blog/</link>
    <description>Guías, decisiones y aprendizajes del estudio.</description>
    <language>es-CO</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
