import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { allAuthors, authorPage, authorPath, CONTENT_TYPES, EMPTY_SLUG, longDate, postPath, typeOf, type PostCard } from "@/lib/content";

const BASE = "https://inflinds.com";

type Params = { slug: string };

export const dynamicParams = true;

export const revalidate = 300;

export async function generateStaticParams(): Promise<Params[]> {
  const authors = await allAuthors();
  if (authors.length === 0) return [{ slug: EMPTY_SLUG }];
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = slug === EMPTY_SLUG ? null : await authorPage(slug);
  if (!page) return { title: "Autor", robots: { index: false } };
  const { author } = page;

  return {
    title: `${author.name}${author.role ? `, ${author.role}` : ""}`,
    description: author.bio ?? `Artículos de ${author.name} en el blog de Inflinds.`,
    alternates: { canonical: authorPath(author) },
    openGraph: { type: "profile", title: author.name, images: author.photo_url ? [author.photo_url] : undefined },
  };
}

function PostList({ title, posts }: { title: string; posts: PostCard[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-black text-ink">{title}</h2>
      <ul className="mt-4 divide-y divide-line rounded-3xl border border-line bg-white">
        {posts.map((p) => (
          <li key={p.id} className="p-5">
            <span className="text-xs font-bold uppercase tracking-wide text-magenta">{CONTENT_TYPES[typeOf(p)].label}</span>
            <Link href={postPath(p)} className="mt-1 block font-semibold text-ink hover:text-magenta">
              {p.title}
            </Link>
            <span className="text-xs text-slate">{longDate(p.published_at)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = slug === EMPTY_SLUG ? null : await authorPage(slug);
  if (!page) notFound();
  const { author, written, reviewed } = page;
  const url = `${BASE}${authorPath(author)}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url,
          mainEntity: {
            "@type": "Person",
            name: author.name,
            url,
            jobTitle: author.role ?? undefined,
            description: author.bio ?? undefined,
            knowsAbout: author.expertise ?? undefined,
            image: author.photo_url ?? undefined,
            sameAs: author.same_as && author.same_as.length > 0 ? author.same_as : undefined,
            worksFor: { "@type": "Organization", name: "Inflinds", url: BASE },
          },
        }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative max-w-3xl py-16">
          <Eyebrow>Autor</Eyebrow>
          <div className="mt-4 flex items-center gap-5">
            {author.photo_url && <img src={author.photo_url} alt={author.name} className="h-20 w-20 rounded-full object-cover" />}
            <div>
              <h1 className="font-display text-4xl font-black leading-tight text-ink">{author.name}</h1>
              {author.role && <p className="mt-1 text-slate">{author.role}</p>}
            </div>
          </div>
          {author.bio && <p className="mt-6 text-lg leading-relaxed text-slate">{author.bio}</p>}
          {author.expertise && <p className="mt-4 leading-relaxed text-slate">{author.expertise}</p>}
          {author.same_as && author.same_as.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {author.same_as.map((link) => (
                <li key={link}>
                  <a href={link} target="_blank" rel="noopener me" className="text-magenta underline underline-offset-2">
                    {new URL(link).hostname.replace(/^www\./, "")}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
      <Container className="max-w-3xl pb-20">
        <PostList title={`Escritos por ${author.name}`} posts={written} />
        <PostList title="Escritos con IA que revisó" posts={reviewed} />
      </Container>
    </>
  );
}
