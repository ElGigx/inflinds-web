export type Tool = {
  slug: string;
  title: string;
  eyebrow: string;
  promise: string;
  description: string;
  category: "dinero" | "operación" | "web";
  minutes: number;
  inflinds: { title: string; text: string; href: string };
  merez: { title: string; text: string; href: string };
};

export const tools: Tool[] = [
  {
    slug: "precio-de-venta",
    title: "Precio de venta y margen",
    eyebrow: "Precio",
    promise: "Cuánto cobrar para que el margen no se lo coma el descuento.",
    description:
      "Parte del costo real, define el margen que quieres y mira cuánto queda si el cliente pide descuento. Sin cuenta y sin instalar nada.",
    category: "dinero",
    minutes: 1,
    inflinds: {
      title: "Precios y oferta",
      text: "Si el problema es cómo se presenta el precio en tu sitio, eso lo armamos con la línea de diseño y desarrollo.",
      href: "/services/#diseno",
    },
    merez: {
      title: "Cotizaciones que no pierden plata",
      text: "En Merez la cotización sale del catálogo y queda con su margen a la vista; Cóndor frena lo que va por debajo del costo.",
      href: "https://www.merez.co/agents/condor/",
    },
  },
  {
    slug: "costo-real-de-un-crm",
    title: "Costo real de un CRM",
    eyebrow: "CRM",
    promise: "La factura a doce meses, no el precio de la lista.",
    description:
      "Suma licencia por usuario, implementación y horas del equipo. Es la cuenta que no aparece en la página de precios del proveedor.",
    category: "dinero",
    minutes: 2,
    inflinds: {
      title: "Implementación y datos",
      text: "Si necesitas migrar datos, integrar sistemas o montar el flujo completo, entra el equipo de desarrollo.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Sin cobro por usuario",
      text: "Merez cobra por negocio, no por persona. La comparación honesta está en la página de precios y en la comparativa.",
      href: "https://www.merez.co/compare/crm-per-user/",
    },
  },
  {
    slug: "pasarela-o-breb",
    title: "Pasarela o Bre-B",
    eyebrow: "Cobros",
    promise: "Cuánto cuesta cobrar con pasarela y cuándo Bre-B deja de alcanzar.",
    description:
      "Compara la comisión de una pasarela con la verificación manual de Bre-B, incluido el tiempo de la persona que confirma pagos.",
    category: "dinero",
    minutes: 2,
    inflinds: {
      title: "Checkout y sitio",
      text: "El checkout, la tienda y la integración con tu operación los construimos desde el sitio.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Los dos modos de cobro",
      text: "Merez trae Bre-B y pasarela en el mismo pedido; cambias de modo cuando el volumen lo pide.",
      href: "https://www.merez.co/integrations/",
    },
  },
  {
    slug: "horas-que-se-pierden",
    title: "Horas que se pierden",
    eyebrow: "Automatización",
    promise: "Qué cuesta seguir haciendo a mano lo que se puede automatizar.",
    description:
      "Ponle tarifa a las horas repetidas de tu equipo. El resultado es el dinero que se va en tareas que una automatización puede absorber.",
    category: "operación",
    minutes: 2,
    inflinds: {
      title: "Automatización e IA",
      text: "Diseñamos el flujo, lo conectamos con tus herramientas y lo dejamos funcionando.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Automatizaciones dentro del CRM",
      text: "Merez ejecuta las reglas sobre el mismo dato del negocio: recordatorios, seguimientos y tareas.",
      href: "https://www.merez.co/how-it-works/",
    },
  },
  {
    slug: "punto-de-equilibrio",
    title: "Punto de equilibrio",
    eyebrow: "Operación",
    promise: "Cuánto hay que vender para no perder.",
    description:
      "Con costos fijos, precio y costo variable, el número de unidades y de ventas que cubre la operación del mes.",
    category: "operación",
    minutes: 1,
    inflinds: {
      title: "Modelo y tablero",
      text: "Si quieres el tablero con tus números reales y no una calculadora suelta, lo montamos.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "El margen en la cotización",
      text: "Cóndor revisa cada línea contra el costo real antes de que la cotización salga.",
      href: "https://www.merez.co/agents/condor/",
    },
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
