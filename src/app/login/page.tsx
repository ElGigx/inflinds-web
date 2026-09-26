import type { Metadata } from "next";
import ClientPortal from "@/components/ClientPortal";
import { Container, Eyebrow } from "@/components/ui";
import { PORTAL_PARTNER } from "@/lib/merez";

export const metadata: Metadata = {
  title: "Área de clientes",
  description: "Entra a tu área de cliente de Inflinds: tus servicios y vencimientos, lo que tienes por pagar, tus solicitudes y el chat con nosotros.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <Eyebrow>Clientes</Eyebrow>
        <p className="mt-3 max-w-2xl text-lg text-slate leading-relaxed">
          Tus servicios con nosotros y sus vencimientos, lo que tienes por pagar, tus solicitudes y un chat directo con el
          equipo. Entras con tu correo.
        </p>
        <div className="mt-8">
          <ClientPortal partner={PORTAL_PARTNER} />
        </div>
      </Container>
    </section>
  );
}
