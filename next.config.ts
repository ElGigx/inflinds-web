import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // En Vercel: las páginas de marketing salen estáticas y el blog y la bitácora
  // se regeneran solos (ISR) cuando se publica algo en Merez. Sin hooks ni tokens.
  images: { unoptimized: true },
  // URLs con barra final -> genera /servicios/index.html, amistoso para hosting estático.
  trailingSlash: true,
};

export default nextConfig;
