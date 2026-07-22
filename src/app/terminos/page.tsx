import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones de los servicios de Inflinds (INFLINDS S.A.S.), Digital Product Studio en Colombia.",
};

const ACTUALIZADO = "22 de julio de 2026";
const CONTACTO = "contacto@inflinds.com";

export default function TerminosPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl leading-tight tracking-tight text-ink">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-sm text-slate">Última actualización: {ACTUALIZADO}</p>

          <div className="legal-prose mt-10 space-y-6 text-slate">
            <p>
              Estos Términos y Condiciones regulan la relación entre{" "}
              <strong>{site.legalName}</strong> (NIT {site.nit}), estudio que
              opera la marca <strong>Inflinds</strong>, domiciliado en Colombia,
              y las personas o empresas que usan su sitio web, sus canales de
              contacto o contratan sus servicios.
            </p>

            <h2>1. Objeto</h2>
            <p>
              Inflinds es un Digital Product Studio que presta servicios de
              diseño, desarrollo web y de software, automatización, inteligencia
              artificial y consultoría tecnológica. También comercializa y da
              acompañamiento sobre la plataforma de software Merez.
            </p>

            <h2>2. Cotizaciones y alcance</h2>
            <p>
              La información publicada en <code>inflinds.com</code> (planes,
              precios de referencia) es orientativa y puede ajustarse según el
              alcance, la complejidad y las necesidades de cada proyecto. El
              alcance, los entregables, los tiempos y el precio definitivos de
              cada trabajo se acuerdan en la <strong>propuesta o cotización</strong>{" "}
              aceptada por el cliente, que prevalece sobre estos Términos en lo
              específico del proyecto.
            </p>

            <h2>3. Contratación y pagos</h2>
            <p>
              La aceptación de una propuesta constituye un mensaje de datos con
              validez legal (Ley 527 de 1999). Las condiciones de pago, anticipos
              y entregas se definen en cada propuesta. Los valores se expresan en
              pesos colombianos (COP), salvo indicación distinta.
            </p>

            <h2>4. Entregables y propiedad intelectual</h2>
            <p>
              Salvo pacto en contrario en la propuesta, los entregables finales
              pagados en su totalidad son del cliente. Inflinds conserva los
              derechos sobre su metodología, componentes reutilizables y
              conocimiento previo, y puede referenciar el trabajo en su
              portafolio de forma general, salvo acuerdo de confidencialidad.
            </p>

            <h2>5. Responsabilidades del cliente</h2>
            <p>
              El cliente se compromete a entregar la información y los accesos
              necesarios de forma oportuna, y a contar con los derechos sobre los
              contenidos y datos que aporte al proyecto.
            </p>

            <h2>6. Garantía y límites de responsabilidad</h2>
            <p>
              Corregimos defectos atribuibles a nuestro trabajo dentro del
              alcance acordado. En la medida permitida por la ley, la
              responsabilidad de Inflinds se limita al valor efectivamente pagado
              por el servicio afectado. No respondemos por fallas de servicios de
              terceros (hosting, pasarelas, plataformas) ni por usos indebidos
              del entregable por parte del cliente.
            </p>

            <h2>7. Confidencialidad y datos personales</h2>
            <p>
              Tratamos la información del cliente de forma confidencial. El manejo
              de datos personales se rige por nuestra{" "}
              <a href="/privacidad/">Política de Privacidad y Tratamiento de Datos</a>.
            </p>

            <h2>8. Servicios de terceros</h2>
            <p>
              Algunas soluciones se apoyan en servicios de terceros (WhatsApp/
              Meta, proveedores de IA, hosting, pasarelas de pago), cuyo uso puede
              estar sujeto además a los términos de dichos proveedores.
            </p>

            <h2>9. Ley aplicable y atención al consumidor</h2>
            <p>
              Estos Términos se rigen por la ley colombiana. Para dudas, quejas o
              reclamos, escríbenos a <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a>{" "}
              o usa el <a href="/contacto/">formulario de contacto</a>. También
              puedes acudir a la Superintendencia de Industria y Comercio (SIC).
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
