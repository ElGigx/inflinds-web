import type { Metadata } from "next";
import { Raleway, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MerezAnalytics from "@/components/MerezAnalytics";
import MerezSdk from "@/components/MerezSdk";

// Display: Raleway (usamos hasta el peso Black 900 para titulares).
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

// Cuerpo: Lato.
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inflinds.com"),
  title: {
    default: "Inflinds — Digital Product Studio",
    template: "%s · Inflinds",
  },
  description:
    "Inflinds es un Digital Product Studio: diseño, desarrollo, automatización e IA para acelerar la transformación digital de empresas y emprendedores.",
  // Canónico por página, resuelto contra `metadataBase` (el apex, que es el host
  // canónico: `www` redirige 308 aquí). Sin esto no se emitía NINGÚN
  // `<link rel="canonical">` y el buscador tenía que adivinar entre los dos
  // hosts, que sirven exactamente lo mismo.
  alternates: { canonical: "./" },
  keywords: [
    "digital product studio",
    "diseño UX/UI",
    "desarrollo web",
    "automatización",
    "inteligencia artificial",
    "Colombia",
  ],
  openGraph: {
    title: "Inflinds — Digital Product Studio",
    description:
      "Diseño, desarrollo, automatización e IA. Construimos productos digitales, no solo páginas web.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${raleway.variable} ${lato.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <MerezSdk />
        <MerezAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
