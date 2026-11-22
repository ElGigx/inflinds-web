import { Container } from "@/components/ui";
import { ExternalLink } from "../../_components/parts";
import EvidenceGallery, { type EvidenceImage } from "./EvidenceGallery";

export type SelectedStudy = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  figures: { value: string; label: string }[];
  images: EvidenceImage[];
  note?: string;
  link?: { label: string; href: string };
};

export default function SelectedCase({ study, index }: { study: SelectedStudy; index: number }) {
  const flip = index % 2 === 1;

  return (
    <article id={study.id} className="scroll-mt-24 border-t border-line py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className={flip ? "lg:order-2" : ""}>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-magenta">
              {study.kicker}
            </p>
            <h3 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              {study.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-slate">{study.summary}</p>

            <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-4">
              {study.figures.slice(0, 3).map((figure) => (
                <div key={`${figure.value}-${figure.label}`}>
                  <dt className="font-display text-3xl font-black leading-none text-brand-600">
                    {figure.value}
                  </dt>
                  <dd className="mt-2 text-[11px] leading-snug text-slate">{figure.label}</dd>
                </div>
              ))}
            </dl>

            {study.note && (
              <p className="mt-5 border-l-2 border-yellow pl-3 text-xs leading-relaxed text-muted">
                {study.note}
              </p>
            )}

            {study.link && (
              <p className="mt-5">
                <ExternalLink
                  href={study.link.href}
                  className="inline-flex min-h-11 items-center font-display font-bold text-brand-600 underline-offset-4 hover:underline"
                >
                  {study.link.label}
                </ExternalLink>
              </p>
            )}
          </div>

          <div className={flip ? "lg:order-1" : ""}>
            <EvidenceGallery title={study.title} images={study.images} />
          </div>
        </div>
      </Container>
    </article>
  );
}
