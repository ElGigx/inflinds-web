import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PrimaryButton } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { allPosts, EMPTY_SLUG, longDate, postPage, postPath } from "@/lib/content";

const BASE = "https://inflinds.com";

type Params = { category: string; slug: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await allPosts();
  if (posts.length === 0) return [{ category: "blog", slug: EMPTY_SLUG }];
  return posts.map((p) => ({ category: p.category?.slug ?? "blog", slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const page = slug === EMPTY_SLUG ? null : await postPage(category, slug);
  if (!page) return { title: "Blog", robots: { index: false } };
  const { post } = page;
  const image = post.og_image ?? post.featured_image ?? undefined;

  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.excerpt ?? undefined,
    alternates: { canonical: postPath(post) },
    openGraph: {
      type: "article",
      title: post.meta_title ?? post.title,
      description: post.meta_description ?? post.excerpt ?? undefined,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const page = slug === EMPTY_SLUG ? null : await postPage(category, slug);
  if (!page) notFound();
  const { post, contentHtml, readingMinutes, related } = page;
  const url = `${BASE}${postPath(post)}`;
  const faq = post.faq ?? [];
  const sources = post.sources ?? [];

  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.meta_description ?? post.excerpt,
      image: post.featured_image ? [post.featured_image] : undefined,
      datePublished: post.published_at,
      dateModified: post.updated_at ?? post.published_at,
      author: { "@type": "Organization", name: post.author ?? "Inflinds", url: BASE },
      publisher: { "@type": "Organization", name: "Inflinds", url: BASE, logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.target_keyword ?? undefined,
      inLanguage: "es-CO",
      citation: sources.map((s) => s.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (faq.length > 0) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    });
  }

  return (
    <>
      <JsonLd data={graph} />
      <article>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 hero-glow" aria-hidden="true" />
          <Container className="relative max-w-3xl py-14 sm:py-16">
            <nav className="text-sm text-slate">
              <Link href="/blog/" className="hover:text-ink">
                Blog
              </Link>
              {post.category && <span> / {post.category.name}</span>}
            </nav>
            <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-slate">
              {post.author ?? "Inflinds"} · {longDate(post.published_at)} · {readingMinutes} min de lectura
            </p>
          </Container>
        </header>

        <Container className="max-w-3xl pb-16">
          {post.featured_image && (
            <img src={post.featured_image} alt={post.featured_image_alt ?? ""} className="mb-10 w-full rounded-3xl border border-line object-cover" />
          )}
          <div className="article-prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {faq.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-2xl font-black text-ink">Preguntas frecuentes</h2>
              <div className="mt-6 space-y-4">
                {faq.map((f) => (
                  <details key={f.question} className="rounded-2xl border border-line bg-white p-5">
                    <summary className="cursor-pointer font-semibold text-ink">{f.question}</summary>
                    <p className="mt-3 leading-relaxed text-slate">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {sources.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-lg font-bold text-ink">Fuentes</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-6 text-sm text-slate">
                {sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener" className="text-magenta underline underline-offset-2">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className="mt-14 rounded-3xl border border-line bg-paper-soft p-8">
            <p className="font-display text-xl font-bold text-ink">¿Quieres aplicarlo en tu negocio?</p>
            <p className="mt-2 text-slate">Cuéntanos qué necesitas y te decimos por dónde empezar.</p>
            <PrimaryButton href="/contact/" className="mt-5">
              Hablemos
            </PrimaryButton>
          </div>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-lg font-bold text-ink">Sigue leyendo</h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={postPath(r)} className="font-semibold text-ink hover:text-magenta">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </article>
    </>
  );
}
