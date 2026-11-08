"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="bg-night text-slate-100">
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-magenta">Error 500</p>
        <p className="mt-2 font-display text-[6rem] font-black leading-none text-white/15 md:text-[9rem]">
          500
        </p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-black leading-tight md:text-5xl">
          Algo se rompió de nuestro lado.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300/80">
          No es tu conexión: es un fallo del sitio. Reintenta; si sigue, escríbenos con la
          hora y lo miramos.
        </p>
        {error.digest && <p className="mt-3 font-mono text-xs text-slate-500">Referencia: {error.digest}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-magenta px-5 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-slate-100 transition hover:border-magenta/70"
          >
            Volver al inicio
          </a>
          <a
            href="/contact/"
            className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-slate-100 transition hover:border-magenta/70"
          >
            Escribir al estudio
          </a>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
          <a href="https://merez.co" className="hover:text-white">
            Merez
          </a>
          <a href="https://app.merez.co" className="hover:text-white">
            Panel
          </a>
          <a href="https://docs.merez.co" className="hover:text-white">
            Documentación
          </a>
          <a href="https://api.merez.co" className="hover:text-white">
            API
          </a>
        </div>
      </section>
    </div>
  );
}
