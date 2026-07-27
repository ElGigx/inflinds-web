// Fuente única de datos de contenido del sitio de Inflinds.
// Precios reales tomados de gigxOS/BRANDS/Inflinds/Pricing.md (v1.0.0, COP).

export const site = {
  name: "Inflinds",
  legalName: "INFLINDS S.A.S.",
  nit: "901.494.116-3",
  tagline: "Digital Product Studio",
  // Nota: el sitio en vivo actual es inflinds.com. Los canales de contacto
  // directo (correo/teléfono) no están confirmados en gigxOS todavía; el
  // formulario de /contacto es el canal funcional. Ver reporte de brechas.
  website: "https://inflinds.com",
  servicesPortal: "https://services.inflinds.com",
  country: "Colombia",
};

// Clientes reales del portafolio de Inflinds (fuente: /portafolio del sitio
// actual en vivo). Se muestran como marcas de texto hasta tener logos.
export const clients = [
  "Fusion Pipe Tools",
  "WonderSchool",
  "Acertar",
  "Amatu",
  "Capitalex",
  "Alternatura",
];

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/services/", label: "Servicios" },
  { href: "/pricing/", label: "Precios" },
  { href: "/contact/", label: "Contacto" },
];

// Las 5 líneas de servicio (Services.md).
export const services = [
  {
    slug: "diseno",
    tag: "Diseño",
    title: "Diseño de producto y experiencia",
    summary:
      "UX/UI, design systems y arquitectura de información. Diseñamos sistemas coherentes que escalan, no pantallas sueltas.",
    points: [
      "Investigación UX y arquitectura de información",
      "Wireframes, prototipos y validación con usuarios",
      "Interfaces UI accesibles y responsive (mobile first)",
      "Design systems y librerías de componentes reutilizables",
    ],
    accent: "brand" as const,
  },
  {
    slug: "desarrollo",
    tag: "Desarrollo",
    title: "Desarrollo web y de plataformas",
    summary:
      "Sitios web, landing pages, e-commerce, WordPress, Shopify, sistemas web a la medida, APIs y plataformas administrativas.",
    points: [
      "Landing pages y sitios corporativos optimizados",
      "E-commerce (WooCommerce, Shopify) y catálogos digitales",
      "Sistemas web a medida, paneles administrativos y APIs",
      "Rendimiento, SEO técnico y buenas prácticas de accesibilidad",
    ],
    accent: "magenta" as const,
  },
  {
    slug: "automatizacion",
    tag: "Automatización",
    title: "Automatización de procesos",
    summary:
      "Conectamos tus herramientas, eliminamos el trabajo manual repetitivo y montamos flujos digitales que trabajan solos.",
    points: [
      "Integraciones entre plataformas y servicios",
      "Formularios inteligentes conectados a tu operación",
      "Flujos de trabajo y notificaciones automáticas",
      "Sincronización de datos entre CRM, correo y facturación",
    ],
    accent: "orange" as const,
  },
  {
    slug: "inteligencia-artificial",
    tag: "Inteligencia Artificial",
    title: "Inteligencia artificial aplicada",
    summary:
      "Consultoría, automatizaciones con IA, asistentes conversacionales e integración de modelos generativos en tu negocio.",
    points: [
      "Consultoría de IA orientada a resultados de negocio",
      "Asistentes y agentes conversacionales (incluido WhatsApp)",
      "Automatizaciones potenciadas por modelos generativos",
      "Integración de modelos e IA en productos y procesos existentes",
    ],
    accent: "brand" as const,
  },
  {
    slug: "consultoria",
    tag: "Consultoría",
    title: "Consultoría y transformación digital",
    summary:
      "Estrategia, optimización de procesos y arquitectura tecnológica para tomar decisiones con criterio, no por moda.",
    points: [
      "Estrategia y hoja de ruta de transformación digital",
      "Optimización de procesos y arquitectura tecnológica",
      "Acompañamiento en decisiones de stack y producto",
      "Diagnóstico y priorización de iniciativas digitales",
    ],
    accent: "magenta" as const,
  },
];

// Metodología / Workflow (Workflow.md — 10 fases).
export const methodology = [
  { n: 1, name: "Descubrimiento", desc: "Comprender el negocio, el problema y los objetivos reales." },
  { n: 2, name: "Investigación", desc: "Benchmark, competencia y referencias para encontrar oportunidades." },
  { n: 3, name: "Definición", desc: "Objetivos, KPIs, alcance y hoja de ruta del proyecto." },
  { n: 4, name: "Arquitectura", desc: "Arquitectura de información, flujos, sitemap y modelo de datos." },
  { n: 5, name: "UX", desc: "Wireframes, prototipos y validación de la experiencia." },
  { n: 6, name: "UI", desc: "Componentes, sistema visual, responsive y accesibilidad." },
  { n: 7, name: "Desarrollo", desc: "Frontend, backend, CMS, APIs y base de datos." },
  { n: 8, name: "Pruebas", desc: "QA, corrección de errores, optimización y validación." },
  { n: 9, name: "Implementación", desc: "Deploy, dominio, hosting, SSL y puesta en producción." },
  { n: 10, name: "Evolución", desc: "Soporte, nuevas funcionalidades, IA y mejora continua." },
];

// Módulos que Inflinds construye y opera dentro de Merez (su propio SaaS).
// Se presentan como capacidad de plataforma, NO como pricing de Merez.
export const merezModules = [
  { name: "CRM Inteligente", desc: "Pipeline de leads, seguimiento y gestión comercial centralizada." },
  { name: "Agentes de IA (WhatsApp)", desc: "Asistentes conversacionales que atienden y califican clientes." },
  { name: "Automatizaciones", desc: "Flujos que eliminan tareas manuales y conectan tu operación." },
  { name: "Cotizaciones PDF", desc: "Generación de cotizaciones formales con consecutivo y control." },
  { name: "Email Marketing", desc: "Campañas segmentadas y comunicación masiva medible." },
  { name: "Blog / SEO", desc: "Motor de contenido con validación SEO para tráfico orgánico." },
  { name: "Analítica", desc: "Métricas de embudo, conversión y actividad en un solo lugar." },
  { name: "Segmentación", desc: "Segmentación avanzada de contactos para acciones precisas." },
  { name: "Integraciones", desc: "Conectores con Siigo, Meta, GA4 y Clarity." },
  { name: "Pagos", desc: "Cobro en línea integrado (Wompi) conciliado con tus ventas." },
];

// Planes de proyecto para la página de precios. Los precios con cifra vienen
// de Pricing.md v1.0.0 (precio base, ajustable por alcance); e-commerce y
// personalizado no tienen tarifa fija -> se cotizan (price: null).
export type Plan = {
  slug: string;
  name: string;
  desc: string;
  price: string | null; // null = a la medida
  featuresIntro?: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "landing",
    name: "Landing Page",
    desc: "Ideal para emprendedores que están comenzando.",
    price: "$ 690.000",
    features: [
      "Página única enfocada en conversión",
      "Diseño responsive",
      "Desarrollo y publicación",
      "Optimización básica",
      "Formulario de contacto",
    ],
    cta: "Comenzar ahora",
  },
  {
    slug: "sitio-informativo",
    name: "Sitio informativo",
    desc: "Para negocios que quieren verse profesionales y escalar.",
    price: "$ 1.000.000",
    popular: true,
    featuresIntro: "Todo lo de Landing, más:",
    features: [
      "Diseño personalizado",
      "Múltiples páginas",
      "Desarrollo WordPress",
      "Optimización y configuración inicial",
      "Listo para crecer con tu negocio",
    ],
    cta: "Quiero este plan",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    desc: "Para vender en línea con catálogo y pagos.",
    price: null,
    featuresIntro: "Todo lo de Sitio informativo, más:",
    features: [
      "Tienda en WooCommerce o Shopify",
      "Catálogo y gestión de productos",
      "Pagos en línea",
      "SEO técnico y rendimiento",
      "Integraciones según tu operación",
    ],
    cta: "Comenzar ahora",
  },
  {
    slug: "personalizado",
    name: "Personalizado",
    desc: "Soluciones a la medida para grandes desafíos.",
    price: null,
    featuresIntro: "Según tu proyecto:",
    features: [
      "Sistemas y plataformas a medida",
      "APIs e integraciones",
      "Automatización e IA aplicada",
      "Arquitectura y stack a tu medida",
      "Acompañamiento estratégico",
    ],
    cta: "Hablemos de tu proyecto",
  },
];

// --- PRECIOS (Pricing.md v1.0.0, COP) ---
export type PriceRow = { name: string; price: string; note?: string };
export type PriceTable = { title: string; subtitle?: string; rows: PriceRow[] };

export const pricingTables: PriceTable[] = [
  {
    title: "Desarrollo web",
    subtitle: "Precio base; se ajusta según alcance y complejidad.",
    rows: [
      {
        name: "Landing Page",
        price: "690.000 COP",
        note: "Diseño responsive, desarrollo, optimización básica, formulario de contacto y publicación.",
      },
      {
        name: "Sitio Web Corporativo",
        price: "1.000.000 COP",
        note: "Diseño personalizado, desarrollo WordPress, múltiples páginas, optimización y configuración inicial.",
      },
    ],
  },
  {
    title: "Hosting",
    subtitle: "Tarifa anual.",
    rows: [
      { name: "Hosting Estático", price: "150.000 COP/año" },
      { name: "Hosting Común", price: "200.000 COP/año" },
      { name: "Hosting Robusto", price: "295.000 COP/año" },
      { name: "Cloud Hosting", price: "1.300.000 COP/año" },
    ],
  },
  {
    title: "Dominios",
    subtitle: "Registro anual.",
    rows: [
      { name: ".COM", price: "95.000 COP/año" },
      { name: ".CO", price: "165.000 COP/año" },
    ],
  },
  {
    title: "Seguridad",
    rows: [{ name: "Certificado SSL", price: "65.000 COP/año" }],
  },
  {
    title: "Correos corporativos",
    rows: [
      { name: "Correo 1 GB", price: "35.000 COP/año" },
      { name: "Correo 15 GB", price: "84.000 COP/año" },
      { name: "Google Workspace", price: "870.000 COP/año" },
    ],
  },
  {
    title: "Licencias",
    rows: [{ name: "Elementor PRO", price: "572.000 COP/año" }],
  },
  {
    title: "Soporte",
    rows: [
      {
        name: "Plan de Soporte",
        price: "21.000 COP/mes",
        note: "Actualizaciones menores, revisión general y soporte básico.",
      },
    ],
  },
  {
    title: "Páginas adicionales",
    subtitle: "Para ampliar un sitio existente.",
    rows: [
      { name: "Página Simple", price: "95.000 COP" },
      { name: "Página Normal", price: "147.500 COP" },
      { name: "Página Especial", price: "505.000 COP" },
    ],
  },
  {
    title: "Marketing digital",
    rows: [
      {
        name: "Gestión de Campañas",
        price: "500.000 COP/mes",
        note: "Duración mínima recomendada: 3 meses.",
      },
      {
        name: "Presupuesto sugerido de pauta (Facebook Ads)",
        price: "600.000 COP/mes",
        note: "Independiente del servicio de gestión.",
      },
    ],
  },
];

// Cotizados a medida (sin tarifa fija).
export const customQuoted = [
  {
    name: "Desarrollo personalizado",
    desc: "Según alcance, complejidad, tiempo, tecnologías, integraciones, automatizaciones y uso de IA.",
  },
  {
    name: "Consultoría (tecnológica, UX, IA)",
    desc: "Según objetivos, duración, nivel de especialización y alcance del proyecto.",
  },
  {
    name: "Mantenimiento",
    desc: "Actualizaciones, backups, optimización, seguridad, soporte y evolución funcional; cada plan se cotiza aparte.",
  },
];

// Servicios en desarrollo (sin precio aún).
export const futureServices = [
  "Consultoría en IA",
  "Implementación de agentes IA",
  "Automatización empresarial",
  "Arquitectura digital",
  "Diseño de productos SaaS",
  "Auditorías UX",
  "Optimización de conversión",
  "Integraciones API",
];

export const projectTypes = [
  "Landing page",
  "Sitio web corporativo",
  "E-commerce / tienda en línea",
  "Sistema o plataforma web a medida",
  "Automatización de procesos",
  "Proyecto con IA / agentes",
  "Consultoría / estrategia digital",
  "Otro",
];
