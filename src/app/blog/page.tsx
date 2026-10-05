import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import Byline from "@/components/Byline";
import { allPosts, CONTENT_TYPES, longDate, postPath, TYPE_ORDER, typeOf, type PostCard } from "@/lib/content";

function Card({ p }: { p: PostCard }) {
  return (
    <li>
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-lg">
        <Link href={postPath(p)} className="flex flex-1 flex-col">
          {p.featured_image && (
            <img src={p.featured_image} alt={p.featured_image_alt ?? ""} className="aspect-[16/9] w-full object-cover" loading="lazy" />
          )}
          <div className="flex flex-1 flex-col p-6">
            <span className="text-xs font-bold uppercase tracking-wide text-magenta">
              {CONTENT_TYPES[typeOf(p)].label}
              {p.category ? ` · ${p.category.name}` : ""}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink">{p.title}</h3>
            {p.excerpt && <p className="mt-3 text-sm leading-relaxed text-slate">{p.excerpt}</p>}
          </div>
        </Link>
        <p className="px-6 pb-6 text-xs text-slate">
          <Byline post={p} /> · {longDate(p.published_at)}
          {p.reading_minutes ? ` · ${p.reading_minutes} min` : ""}
        </p>
      </article>
    </li>
  );
}

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guías y análisis de Inflinds sobre producto digital, desarrollo web, automatización e inteligencia artificial para empresas en Colombia.",
};

export default async function BlogPage() {
  const posts = await allPosts();
  const sections = TYPE_ORDER.map((type) => ({ type, items: posts.filter((p) => typeOf(p) === type) })).filter((s) => s.items.length > 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog de Inflinds",
          url: "https://inflinds.com/blog/",
          publisher: { "@type": "Organization", name: "Inflinds", url: "https://inflinds.com" },
          blogPost: posts.slice(0, 20).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `https://inflinds.com${postPath(p)}`,
            datePublished: p.published_at,
          })),
        }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            Lo que aprendemos construyendo productos digitales
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            Guías prácticas y análisis para decidir mejor sobre tu web, tus procesos y la inteligencia artificial en tu
            negocio. También puedes ver{" "}
            <Link href="/log/" className="font-semibold text-magenta underline underline-offset-2">
              la bitácora
            </Link>{" "}
            con los proyectos que vamos entregando.
          </p>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {posts.length === 0 ? (
            <p className="rounded-3xl border border-line bg-white p-8 text-slate">Muy pronto publicamos los primeros artículos.</p>
          ) : (
            <div className="space-y-16">
              {sections.map(({ type, items }) => (
                <section key={type} aria-labelledby={`seccion-${type}`}>
                  <h2 id={`seccion-${type}`} className="font-display text-2xl font-black text-ink">
                    {CONTENT_TYPES[type].section}
                  </h2>
                  <p className="mt-1 text-slate">{CONTENT_TYPES[type].blurb}</p>
                  <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <Card key={p.id} p={p} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
