import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad y Tratamiento de Datos Personales de Inflinds, conforme a la Ley 1581 de 2012 de Colombia (Habeas Data).",
};

const ACTUALIZADO = "22 de julio de 2026";
const CONTACTO = "contacto@inflinds.com";

export default function PrivacidadPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl leading-tight tracking-tight text-ink">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="mt-4 text-sm text-slate">Última actualización: {ACTUALIZADO}</p>

          <div className="legal-prose mt-10 space-y-6 text-slate">
            <p>
              La presente Política regula el tratamiento de los datos personales
              que realiza <strong>{site.legalName}</strong> (NIT {site.nit}),
              estudio digital que opera la marca <strong>Inflinds</strong>{" "}
              (en adelante, “Inflinds”, “nosotros”), domiciliado en Colombia, en
              cumplimiento de la Ley 1581 de 2012, el Decreto 1074 de 2015 y
              demás normas sobre protección de datos personales (Habeas Data).
            </p>

            <h2>1. Responsable del tratamiento</h2>
            <p>
              {site.legalName}, NIT {site.nit}, es responsable del tratamiento de
              los datos que los usuarios entregan a través de{" "}
              <code>inflinds.com</code>, de nuestros canales de contacto y de
              nuestro agente de atención por WhatsApp. Contacto:{" "}
              <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a>.
            </p>

            <h2>2. Datos que recolectamos</h2>
            <ul>
              <li>
                <strong>Datos de contacto</strong> que nos entregas al escribir
                por el formulario o por WhatsApp: nombre, correo electrónico,
                teléfono, empresa y el contenido de tu mensaje.
              </li>
              <li>
                <strong>Datos de la conversación</strong> que mantienes con
                nuestro asistente para atender tu solicitud y darte seguimiento.
              </li>
              <li>
                <strong>Datos de navegación</strong>: métricas de uso del sitio
                para medir y mejorar la experiencia.
              </li>
            </ul>

            <h2>3. Finalidades del tratamiento</h2>
            <ul>
              <li>Atender tus solicitudes, cotizaciones y proyectos.</li>
              <li>
                Orientarte hacia la mejor solución, ya sea un servicio de
                Inflinds o nuestra plataforma de software Merez.
              </li>
              <li>Dar seguimiento comercial y soporte.</li>
              <li>
                Enviarte comunicaciones relacionadas y, cuando lo autorices,
                información que puedes rechazar en cualquier momento.
              </li>
            </ul>

            <h2>4. Mensajería de WhatsApp e inteligencia artificial</h2>
            <p>
              Nuestro asistente de WhatsApp recibe tus mensajes a través de la{" "}
              <strong>WhatsApp Business Platform de Meta Platforms, Inc.</strong>{" "}
              y los procesa para registrar tu solicitud y responderte. Para
              redactar las respuestas podemos usar proveedores de{" "}
              <strong>inteligencia artificial</strong> (por ejemplo, OpenAI).
              Solo se procesa la información necesaria para atender la
              conversación; no se emplea para fines ajenos a la atención. El uso
              de WhatsApp se rige además por las políticas de Meta/WhatsApp.
            </p>

            <h2>5. Encargados y terceros</h2>
            <p>
              Nos apoyamos en proveedores que procesan datos por nuestra cuenta
              bajo estándares de seguridad, entre ellos: infraestructura y
              hosting (Vercel, Hostinger), mensajería (Meta/WhatsApp),
              inteligencia artificial (OpenAI) y analítica. Algunos pueden estar
              fuera de Colombia, por lo que puede existir transferencia o
              transmisión internacional de datos con las garantías que exige la
              ley.
            </p>

            <h2>6. Derechos del titular (Habeas Data)</h2>
            <p>Como titular de tus datos tienes derecho a:</p>
            <ul>
              <li>Conocer, actualizar y rectificar tus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado sobre el uso de tus datos.</li>
              <li>
                Presentar quejas ante la Superintendencia de Industria y
                Comercio (SIC).
              </li>
              <li>
                Revocar la autorización y/o solicitar la supresión de tus datos
                cuando no exista un deber legal o contractual de conservarlos.
              </li>
              <li>Acceder de forma gratuita a tus datos personales.</li>
            </ul>

            <h2 id="eliminacion">7. Eliminación de datos</h2>
            <p>
              Puedes solicitar la eliminación de tus datos personales, incluidos
              los recibidos a través de WhatsApp, escribiéndonos a{" "}
              <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a> o por nuestro{" "}
              <a href="/contact/">formulario de contacto</a>, indicando
              “Solicitud de eliminación de datos”. Atenderemos tu solicitud en
              los términos y plazos de la ley colombiana, salvo que exista una
              obligación legal de conservar la información.
            </p>

            <h2>8. Seguridad de la información</h2>
            <p>
              Aplicamos medidas técnicas y administrativas razonables —control de
              acceso, cifrado de credenciales sensibles y buenas prácticas de
              desarrollo— para proteger los datos contra acceso no autorizado,
              pérdida o alteración.
            </p>

            <h2>9. Vigencia y cambios</h2>
            <p>
              Esta Política rige desde su publicación y puede actualizarse; los
              cambios se publicarán en esta misma página con su fecha de
              actualización.
            </p>

            <h2>10. Contacto</h2>
            <p>
              Para ejercer tus derechos o resolver dudas, escríbenos a{" "}
              <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a> o usa nuestro{" "}
              <a href="/contact/">formulario de contacto</a>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
