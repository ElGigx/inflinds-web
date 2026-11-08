import type { Tool } from "./tools";

export const batchB: Tool[] = [
  {
    slug: "enlace-de-whatsapp",
    title: "Enlace de WhatsApp",
    eyebrow: "Ventas",
    promise: "Un enlace que abre el chat con el mensaje ya escrito.",
    description:
      "Pega el número con espacios, guiones o +57 y escribe el mensaje. Te devuelve el enlace wa.me listo para un botón del sitio o una campaña.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Botón de contacto en el sitio",
      text: "Si el botón de WhatsApp vive en el sitio, el número y el mensaje se configuran una vez y no se copian a mano.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Del chat al pedido",
      text: "Merez lleva el catálogo y la cotización; WhatsApp queda como canal de entrada, no como el sistema donde se pierde el pedido.",
      href: "https://www.merez.co/integrations/",
    },
  },
  {
    slug: "normalizar-telefonos",
    title: "Normalizar teléfonos",
    eyebrow: "Datos",
    promise: "Una lista suelta convertida a un solo formato.",
    description:
      "Pega números separados por línea o coma y devuélvelos como +57 3XX XXX XXXX. Cuenta los válidos y deja aparte los que hay que revisar.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Contactos limpios",
      text: "Cuando los teléfonos llegan de un formulario o de una hoja, unificarlos evita duplicados y llamadas perdidas.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "El cliente en su ficha",
      text: "Merez guarda el contacto en la ficha del cliente, así el número no cambia según quién lo escribió.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "caracteres-para-redes",
    title: "Caracteres para redes",
    eyebrow: "Contenido",
    promise: "Cuánto falta o sobra para el límite de cada red.",
    description:
      "Escribe o pega el texto y compara el conteo con X, Instagram, LinkedIn y el estado de WhatsApp. Una barra por red y el número exacto.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Contenido que vive en el sitio",
      text: "Si el contenido se publica desde el sitio o se reutiliza entre canales, el formato deja de ser una copia manual.",
      href: "/services/#diseno",
    },
    merez: {
      title: "Descripciones del catálogo",
      text: "La descripción de un producto se escribe una vez y se reutiliza en la ficha y en la cotización.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "digito-de-verificacion-nit",
    title: "Dígito de verificación del NIT",
    eyebrow: "Trámites",
    promise: "El DV del NIT con el algoritmo de la DIAN.",
    description:
      "Pega la base del NIT y obtén el dígito de verificación y el NIT completo con guion. Sirve para revisar una factura o los datos de un proveedor.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Facturación desde el sitio",
      text: "Si la facturación sale del sitio, el NIT se puede validar al registrarlo y no después de emitir.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Datos del cliente",
      text: "Merez guarda el NIT en la ficha del cliente; conviene verificarlo al registrarlo, no cuando ya hay un pedido en curso.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "firma-de-correo",
    title: "Firma de correo",
    eyebrow: "Marca personal",
    promise: "Una firma en texto plano que se copia y se pega.",
    description:
      "Llena nombre, cargo, empresa, teléfono, correo y sitio. Te devuelve la firma sin HTML, para que se lea igual en cualquier cliente de correo.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Identidad y sitio",
      text: "La firma y el sitio deberían decir lo mismo: nombre, cargo y un contacto que funcione.",
      href: "/services/#diseno",
    },
    merez: {
      title: "Correos de cotización",
      text: "Merez genera la cotización con los datos del negocio; la firma personal del vendedor va aparte.",
      href: "https://www.merez.co/how-it-works/",
    },
  },
  {
    slug: "comisiones-de-venta",
    title: "Comisiones de venta",
    eyebrow: "Ventas",
    promise: "Comisión base, bono por meta y total a pagar.",
    description:
      "Pon las ventas del mes, el porcentaje de comisión, la meta y el bono. Mira cuánto se paga y qué porcentaje efectivo representa.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Metas y seguimiento",
      text: "Si la comisión se calcula a mano cada mes, un tablero puede hacerlo con las ventas que ya están registradas.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Ventas cerradas",
      text: "Merez registra pedidos y pagos; la comisión se calcula sobre lo que se cerró, no sobre lo que se prometió.",
      href: "https://www.merez.co/pricing/",
    },
  },
];
