"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type EvidenceImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption?: string;
};

type Props = {
  title: string;
  images: EvidenceImage[];
  tone?: "light" | "dark";
};

export default function EvidenceGallery({ title, images, tone = "light" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;
  const active = activeIndex === null ? null : images[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % Math.max(images.length, 1),
    );
  }, [images.length]);
  const prev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % Math.max(images.length, 1),
    );
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [close, isOpen, next, prev]);

  if (images.length === 0) return null;

  const currentIndex = activeIndex ?? 0;
  const dark = tone === "dark";
  const border = dark ? "border-white/10" : "border-line";
  const muted = dark ? "text-slate-400" : "text-muted";

  return (
    <div className="min-w-0">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          className={`group relative block aspect-[16/9] w-full overflow-hidden border ${border} bg-night text-left`}
          aria-label={`Abrir evidencia de ${title}: ${images[0].alt}`}
        >
          <img
            src={images[0].src}
            alt={images[0].alt}
            width={images[0].w}
            height={images[0].h}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-night/90 to-transparent px-3 pb-3 pt-10 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            <span>{images[0].caption ?? title}</span>
            <span className="text-yellow">Ver · {images.length}</span>
          </span>
        </button>

        {images.length > 1 && (
          <div className={`grid gap-2 ${images.length > 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {images.slice(1, 4).map((image, index) => {
              const isMore = index === 2 && images.length > 4;

              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index + 1)}
                  className={`group relative block aspect-[4/3] overflow-hidden border ${border} bg-night`}
                  aria-label={`Abrir evidencia de ${title}: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.w}
                    height={image.h}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {isMore ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-night/75 font-display text-sm font-black text-white">
                      +{images.length - 4} más
                    </span>
                  ) : (
                    image.caption && (
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent px-2 pb-2 pt-6 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                        {image.caption}
                      </span>
                    )
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setActiveIndex(0)}
        className={`mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] ${
          dark ? "text-yellow" : "text-brand-600"
        }`}
      >
        Abrir galería completa <span aria-hidden="true">→</span>
      </button>

      {isOpen && active && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-night/95 text-white backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Evidencia de ${title}`}
          onClick={close}
        >
          <div
            className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-yellow">
                Evidencia
              </p>
              <p className="truncate font-display text-sm font-bold text-white">{title}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono text-xs text-slate-400" aria-live="polite">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="inline-flex min-h-11 items-center rounded-lg border border-white/20 px-3 text-xs font-bold text-white transition-colors hover:border-white/50"
              >
                Cerrar ✕
              </button>
            </div>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center gap-2 px-2 py-4 sm:gap-6 sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Imagen anterior"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl text-white transition-colors hover:border-yellow hover:text-yellow"
            >
              ←
            </button>

            <figure className="flex min-w-0 flex-1 flex-col items-center">
              <img
                src={active.src}
                alt={active.alt}
                width={active.w}
                height={active.h}
                className="max-h-[68vh] w-auto max-w-full object-contain"
              />
              <figcaption className="mt-3 max-w-3xl text-center text-sm leading-relaxed text-slate-300">
                {active.caption ?? active.alt}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={next}
              aria-label="Imagen siguiente"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl text-white transition-colors hover:border-yellow hover:text-yellow"
            >
              →
            </button>
          </div>

          <div
            className="border-t border-white/10 px-4 py-3 sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ver imagen ${index + 1}: ${image.alt}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                  className={`relative h-14 w-24 shrink-0 overflow-hidden border transition-opacity ${
                    index === currentIndex ? "border-yellow opacity-100" : "border-white/15 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt=""
                    width={image.w}
                    height={image.h}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
            <p className={`mt-2 text-[10px] uppercase tracking-[0.14em] ${muted}`}>
              Usa ← → para navegar · Esc para cerrar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
