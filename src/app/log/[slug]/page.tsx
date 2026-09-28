import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PrimaryButton } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { allEntries, EMPTY_SLUG, entryPath, longDate, paragraphs } from "@/lib/content";

const BASE = "https://inflinds.com";

type Params = { slug: string };

export const dynamicParams = true;

export const revalidate = 300;

export async function generateStaticParams(): Promise<Params[]> {
  const entries = await allEntries();
  if (entries.length === 0) return [{ slug: EMPTY_SLUG }];
  return entries.map((e) => ({ slug: e.slug as string }));
}

async function entryFor(slug: string) {
  if (slug === EMPTY_SLUG) return null;
  return (await allEntries()).find((e) => e.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await entryFor(slug);
  if (!entry) return { title: "Bitácora", robots: { index: false } };
  const summary = paragraphs(entry.body)[0]?.slice(0, 155);

  return {
    title: entry.headline,
    description: summary,
    alternates: { canonical: entryPath(entry) },
    openGraph: { type: "article", title: entry.headline, description: summary, images: entry.main_image ? [entry.main_image] : undefined },
  };
}

export default async function LogEntryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = await entryFor(slug);
  if (!entry) notFound();
  const url = `${BASE}${entryPath(entry)}`;
  const sources = entry.sources ?? [];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: entry.headline,
            image: entry.main_image ? [entry.main_image] : undefined,
            datePublished: entry.happened_on,
            dateModified: entry.updated_at ?? entry.happened_on,
            author: { "@type": "Organization", name: "Inflinds", url: BASE },
            publisher: { "@type": "Organization", name: "Inflinds", url: BASE, logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` } },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            inLanguage: "es-CO",
            isBasedOn: entry.source_url ?? undefined,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE}/` },
              { "@type": "ListItem", position: 2, name: "Bitácora", item: `${BASE}/log/` },
              { "@type": "ListItem", position: 3, name: entry.headline, item: url },
            ],
          },
        ]}
      />
      <article>
        <Container className="max-w-3xl py-14 sm:py-16">
          <nav className="text-sm text-slate">
            <Link href="/log/" className="hover:text-ink">
              Bitácora
            </Link>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-magenta">
            {entry.type_label ?? "Bitácora"} · {longDate(entry.happened_on)}
          </p>
          <h1 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">{entry.headline}</h1>
          {entry.main_image && (
            <img src={entry.main_image} alt={entry.headline} className="mt-8 w-full rounded-3xl border border-line object-cover" />
          )}
          <div className="article-prose mt-8">
            {paragraphs(entry.body).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {entry.source_url && (
            <p className="mt-8 text-sm text-slate">
              Publicado originalmente en{" "}
              <a href={entry.source_url} target="_blank" rel="noopener" className="text-magenta underline underline-offset-2">
                nuestras redes
              </a>
              .
            </p>
          )}
          {sources.length > 1 && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold text-ink">Fuentes</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-6 text-sm text-slate">
                {sources.slice(1).map((s) => (
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
            <p className="font-display text-xl font-bold text-ink">¿Tienes un proyecto parecido?</p>
            <PrimaryButton href="/contact/" className="mt-5">
              Cuéntanos
            </PrimaryButton>
          </div>
        </Container>
      </article>
    </>
  );
}
