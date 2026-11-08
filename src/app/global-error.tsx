"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0a0a0f",
          color: "#f1f1f4",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <main
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "64px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, letterSpacing: 2, color: "#f8049c" }}>ERROR 500</p>
          <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.1, fontWeight: 800 }}>
            Algo se rompió de nuestro lado.
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "#c9c9d2", maxWidth: 520 }}>
            No es tu conexión: es un fallo del sitio. Reintenta; si sigue, escríbenos con la
            hora y lo miramos.
          </p>
          {error.digest && (
            <p style={{ margin: 0, fontSize: 12, color: "#7a7a86" }}>Referencia: {error.digest}</p>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#f8049c",
                color: "#0a0a0f",
                border: 0,
                borderRadius: 12,
                padding: "12px 20px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
            <a
              href="/"
              style={{
                border: "1px solid rgba(255,255,255,.2)",
                color: "#f1f1f4",
                borderRadius: 12,
                padding: "12px 20px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Volver al inicio
            </a>
          </div>
          <nav style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 24, fontSize: 14 }}>
            <a href="https://merez.co" style={{ color: "#f8049c" }}>
              Merez
            </a>
            <a href="https://app.merez.co" style={{ color: "#f8049c" }}>
              Panel
            </a>
            <a href="https://docs.merez.co" style={{ color: "#f8049c" }}>
              Documentación
            </a>
            <a href="https://api.merez.co" style={{ color: "#f8049c" }}>
              API
            </a>
          </nav>
        </main>
      </body>
    </html>
  );
}
