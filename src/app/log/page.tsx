import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { allEntries, entryPath, longDate, paragraphs } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Bitácora",
  description: "Los proyectos, lanzamientos y aprendizajes de Inflinds, contados a medida que pasan.",
};

export default async function LogPage() {
  const entries = await allEntries();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Bitácora de Inflinds",
          url: "https://inflinds.com/log/",
          hasPart: entries.slice(0, 30).map((e) => ({
            "@type": "BlogPosting",
            headline: e.headline,
            url: `https://inflinds.com${entryPath(e)}`,
            datePublished: e.happened_on,
          })),
        }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Eyebrow>Bitácora</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            Lo que vamos construyendo
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            Proyectos entregados, lanzamientos y aprendizajes del día a día. Para guías más largas, visita el{" "}
            <Link href="/blog/" className="font-semibold text-magenta underline underline-offset-2">
              blog
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="max-w-3xl">
          {entries.length === 0 ? (
            <p className="rounded-3xl border border-line bg-white p-8 text-slate">Muy pronto publicamos las primeras entradas.</p>
          ) : (
            <ol className="space-y-6">
              {entries.map((e) => (
                <li key={e.id} className="rounded-3xl border border-line bg-white p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wide text-magenta">
                    {e.type_label ?? "Bitácora"} · {longDate(e.happened_on)}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink">
                    <Link href={entryPath(e)} className="hover:text-magenta">
                      {e.headline}
                    </Link>
                  </h2>
                  {paragraphs(e.body)[0] && <p className="mt-3 leading-relaxed text-slate">{paragraphs(e.body)[0]}</p>}
                </li>
              ))}
            </ol>
          )}
        </Container>
      </section>
    </>
  );
}
