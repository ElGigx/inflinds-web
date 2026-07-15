import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática (SSG) para desplegar en Cloudflare Pages.
  // No usamos APIs exclusivas de Vercel ni backend en runtime.
  output: "export",
  // Con export estático el optimizador de imágenes de Next no está disponible.
  images: { unoptimized: true },
  // URLs con barra final -> genera /servicios/index.html, amistoso para hosting estático.
  trailingSlash: true,
};

export default nextConfig;
