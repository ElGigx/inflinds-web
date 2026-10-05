import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PrimaryButton } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import Byline from "@/components/Byline";
import { allPosts, authorPath, CONTENT_TYPES, EMPTY_SLUG, longDate, postPage, postPath, typeOf, type Author } from "@/lib/content";

function person(a: Author) {
  return {
    "@type": "Person",
    name: a.name,
    url: `${BASE}${authorPath(a)}`,
    jobTitle: a.role ?? undefined,
    description: a.bio ?? undefined,
    image: a.photo_url ?? undefined,
    sameAs: a.same_as && a.same_as.length > 0 ? a.same_as : undefined,
    worksFor: { "@type": "Organization", name: "Inflinds", url: BASE },
  };
}

const BASE = "https://inflinds.com";

type Params = { category: string; slug: string };

export const dynamicParams = true;

export const revalidate = 300;

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
  const { post, contentHtml, readingMinutes, related, imageCredit } = page;
  const url = `${BASE}${postPath(post)}`;
  const faq = post.faq ?? [];
  const sources = post.sources ?? [];
  const type = typeOf(post);
  const byAuthor = post.written_by !== "ai" && post.author_profile;
  const organization = { "@type": "Organization", name: "Inflinds", url: BASE };

  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.meta_description ?? post.excerpt,
      image: post.featured_image ? [post.featured_image] : undefined,
      datePublished: post.published_at,
      dateModified: post.updated_at ?? post.published_at,
      author: byAuthor && post.author_profile ? person(post.author_profile) : organization,
      articleSection: CONTENT_TYPES[type].label,
      publisher: { "@type": "Organization", name: "Inflinds", url: BASE, logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` } },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
        reviewedBy: post.written_by === "ai" && post.reviewer ? person(post.reviewer) : undefined,
        lastReviewed: post.written_by === "ai" && post.reviewer ? (post.updated_at ?? undefined) : undefined,
      },
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
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-magenta">
              {CONTENT_TYPES[type].label}
              {type === "timely" && post.event_date ? ` · ${longDate(post.event_date)}` : ""}
            </p>
            <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-slate">
              <Byline post={post} /> · {longDate(post.published_at)} · {readingMinutes} min de lectura
            </p>
          </Container>
        </header>

        <Container className="max-w-3xl pb-16">
          {post.featured_image && (
            <figure className="mb-10">
              <img src={post.featured_image} alt={post.featured_image_alt ?? ""} className="w-full rounded-3xl border border-line object-cover" />
              {imageCredit && (
                <figcaption className="mt-2 text-xs text-slate">
                  {imageCredit.ai ? (
                    "Imagen generada con IA"
                  ) : imageCredit.author && imageCredit.provider ? (
                    <>
                      Foto de{" "}
                      {imageCredit.author_url ? (
                        <a href={imageCredit.author_url} target="_blank" rel="noopener" className="underline underline-offset-2">
                          {imageCredit.author}
                        </a>
                      ) : (
                        imageCredit.author
                      )}{" "}
                      en{" "}
                      <a href={imageCredit.source_url ?? imageCredit.provider_url} target="_blank" rel="noopener" className="underline underline-offset-2">
                        {imageCredit.provider}
                      </a>
                    </>
                  ) : (
                    imageCredit.text
                  )}
                </figcaption>
              )}
            </figure>
          )}
          <div className="article-prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {post.written_by === "ai" ? (
            <aside className="mt-10 rounded-2xl border border-line bg-paper-soft p-5 text-sm leading-relaxed text-slate">
              <strong className="text-ink">Cómo se hizo este artículo:</strong> lo redactamos con ayuda de inteligencia artificial a
              partir de nuestro trabajo y de las fuentes citadas
              {post.reviewer ? (
                <>
                  , y lo revisó{" "}
                  <Link href={authorPath(post.reviewer)} className="font-semibold text-ink hover:text-magenta">
                    {post.reviewer.name}
                  </Link>
                  {post.reviewer.role ? ` (${post.reviewer.role})` : ""} antes de publicarlo.
                </>
              ) : (
                "."
              )}
            </aside>
          ) : post.author_profile?.bio ? (
            <aside className="mt-10 flex gap-4 rounded-2xl border border-line bg-paper-soft p-5">
              {post.author_profile.photo_url && (
                <img src={post.author_profile.photo_url} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
              )}
              <div className="text-sm leading-relaxed text-slate">
                <Link href={authorPath(post.author_profile)} className="font-semibold text-ink hover:text-magenta">
                  {post.author_profile.name}
                </Link>
                {post.author_profile.role ? ` · ${post.author_profile.role}` : ""}
                <p className="mt-1">{post.author_profile.bio}</p>
              </div>
            </aside>
          ) : null}

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
