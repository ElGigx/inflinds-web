export const profile = {
  name: "Miguel Angel Yañez",
  // De lo más cercano a lo que hace hoy a lo menos.
  roles: ["Design Engineer", "Product Designer", "Forward Deployed Engineer"],
  photo: "/gigx/miguel.jpg",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/gigx" },
    { label: "GitHub", href: "https://github.com/ElGigx" },
    { label: "Behance", href: "https://www.behance.net/miguelyaeza" },
    { label: "X", href: "https://x.com/gigx" },
  ],
} as const;

// La imagen para compartir del sitio: al definir su propio openGraph, la página deja de heredarla.
export const ogImage = { url: "/opengraph-image.png", width: 1200, height: 630 };

export type Figure = { value: string; label: string };

export type CaseImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  size: "full" | "half" | "phone" | "thumb";
  caption?: string;
};

export type CaseStudy = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  problem: string;
  did: string[];
  figures: Figure[];
  images: CaseImage[];
  links?: { label: string; href: string }[];
  visual?: "tokens" | "ai";
  stack?: string[];
  footnote?: string;
};

export const cases: CaseStudy[] = [
  {
    id: "merez",
    kicker: "2026 · Fundador, diseño de producto, arquitectura y desarrollo",
    title: "Merez",
    summary:
      "Plataforma SaaS multi-tenant para pequeños negocios: sitio web, catálogo, CRM, cotizaciones, agente de ventas con IA y panel con asistente.",
    problem:
      "Los negocios pequeños pagan y conectan cinco herramientas que no se hablan entre sí.",
    did: [
      "Arquitectura modular multi-tenant: los módulos se activan por sitio.",
      "Agentes de IA propios sobre modelos de OpenAI y Anthropic: asistente del panel, investigador y agente de ventas por WhatsApp.",
      "Medición del costo de IA por llamada y por segmento, con techo para las cuentas en prueba.",
      "Plugin de WordPress y SDK en TypeScript para incrustar Merez en cualquier sitio.",
      "Consola de operador para el equipo.",
    ],
    figures: [
      { value: "31", label: "herramientas de agente" },
      { value: "5", label: "niveles de riesgo" },
      { value: "0,1", label: "créditos por completar una ficha" },
    ],
    images: [
      {
        src: "/gigx/shots/merez-home.webp",
        alt: "Página de inicio de Merez en escritorio, con el titular y los accesos al panel",
        w: 1440,
        h: 900,
        size: "full",
      },
      {
        src: "/gigx/shots/merez-home-m.webp",
        alt: "Página de inicio de Merez en un teléfono",
        w: 390,
        h: 844,
        size: "phone",
        caption: "Versión móvil",
      },
    ],
    links: [{ label: "Ver en vivo ↗", href: "https://merez.co" }],
    stack: ["Laravel 13", "PHP 8.3", "MySQL", "React 19", "Vite", "Refine", "Next.js 16", "Tailwind CSS 4", "OpenAI", "Anthropic", "WhatsApp", "GitHub Actions"],
  },
  {
    id: "fusion-pipe-tools",
    kicker: "2021 → 2026 · Diseño UX/UI, desarrollo y CRM",
    title: "Fusion Pipe Tools",
    summary:
      "Distribuidor industrial B2B de herramientas para termofusión y electrofusión.",
    problem:
      "El catálogo vivía en un PDF y cotizar dependía de llamadas y correos sueltos.",
    did: [
      "2021: primer sitio de la empresa.",
      "2026: rediseño completo, con el PDF convertido en 41 fichas técnicas filtrables por tecnología, medida y serie.",
      "Buscador por medida.",
      "Blog con SEO.",
      "Mini-CRM que une leads, correo y cotizaciones formales en PDF.",
    ],
    figures: [
      { value: "41", label: "fichas desde un PDF" },
      { value: "1", label: "flujo de cotización" },
      { value: "2021 → 2026", label: "de sitio a sistema" },
    ],
    images: [
      {
        src: "/gigx/shots/fusion-home.webp",
        alt: "Página de inicio de Fusion Pipe Tools con su catálogo de herramientas de termofusión",
        w: 1440,
        h: 900,
        size: "full",
      },
      {
        src: "/gigx/shots/fusion-ficha.webp",
        alt: "Ficha técnica de un producto de Fusion Pipe Tools con sus especificaciones",
        w: 1440,
        h: 900,
        size: "half",
        caption: "Ficha técnica",
      },
      {
        src: "/gigx/shots/fusion-store.webp",
        alt: "Listado del catálogo de Fusion Pipe Tools con filtros por tecnología y medida",
        w: 1440,
        h: 900,
        size: "half",
        caption: "Catálogo filtrable",
      },
      {
        src: "/gigx/legacy/fusion-pagina.jpg",
        alt: "Captura del primer sitio de Fusion Pipe Tools, publicado en 2021",
        w: 348,
        h: 464,
        size: "thumb",
        caption: "Antes (2021)",
      },
    ],
    links: [{ label: "Ver en vivo ↗", href: "https://fusionpipetools.com" }],
    stack: ["PHP", "API de Merez", "Hostinger", "Figma"],
  },
  {
    id: "panel",
    kicker: "2026 · Diseño de producto y design engineering",
    title: "Rediseño del panel de Merez y su sistema de diseño",
    summary:
      "Un sistema de tokens que ordena un panel que creció módulo a módulo.",
    problem:
      "El panel creció por módulos y cada pantalla hablaba su propio idioma.",
    did: [
      "Sistema de tokens (color por niveles de oscuridad, tipografía, radios) con una regla de build que rechaza colores sueltos.",
      "Navegación lateral en bloques y áreas.",
      "Inicio con el asistente como protagonista.",
      "Versión móvil con barra inferior.",
      "Puerta automática de fidelidad visual que compara la pantalla con el diseño: ≥ 90 a 1280 px y ≥ 80 a 375 px.",
    ],
    figures: [
      { value: "0", label: "colores fuera de token" },
      { value: "≥ 90", label: "fidelidad a 1280 px" },
      { value: "2", label: "versiones: escritorio y móvil" },
    ],
    images: [],
    visual: "tokens",
    stack: ["Figma", "React 19", "Tailwind CSS 4", "TypeScript", "Puppeteer", "Vitest"],
  },
  {
    id: "ia",
    kicker: "2026 · Método",
    title: "Desarrollo con IA orquestado y economía de tokens",
    summary:
      "Un modelo grande que diseña y revisa; modelos menores que implementan.",
    problem:
      "Con un solo modelo grande haciéndolo todo, el modelo caro tecleaba código que ya estaba diseñado.",
    did: [
      "Claude Opus, como orquestador, diseña, parte el trabajo, escribe encargos autocontenidos y revisa el diff.",
      "La implementación va a Claude Sonnet, Claude Haiku o DeepSeek según dificultad y costo.",
      "En Merez, modelos de OpenAI (GPT, imagen y transcripción) y de Anthropic (Claude), elegidos por tarea.",
      "Verificaciones automáticas (tipos, suite de pruebas, contrato de API, fidelidad visual) antes de dar algo por hecho.",
      "El contexto se reutiliza con caché.",
    ],
    figures: [
      { value: "−89 %", label: "salida diaria de Claude Opus (de ~0,94 M a ~0,10 M tokens/día)" },
      { value: "26 %", label: "de la salida la generan modelos menores (antes < 4 %)" },
      { value: "98 %", label: "del contexto leído de caché" },
    ],
    images: [],
    visual: "ai",
    stack: ["Claude Code", "Claude Opus", "Claude Sonnet", "Claude Haiku", "DeepSeek", "OpenAI", "Anthropic"],
    footnote:
      "Medido sobre el uso propio de desarrollo en Claude Code, ago–oct 2026. No incluye DeepSeek.",
  },
  {
    id: "acertar",
    kicker: "2021 → 2026 · UX/UI, desarrollo y administración",
    title: "Acertar",
    summary:
      "Empresa de capacitación y certificación en trabajo seguro en alturas.",
    problem:
      "Una empresa de formación necesitaba presencia empresarial y un modo confiable de emitir y comprobar certificados.",
    did: [
      "2021: sitio empresarial con cursos virtuales.",
      "2026: app.acertarsas.com, la app nueva que reemplaza el sitio anterior, con cursos en línea para los aprendices y certificados verificables (búsqueda pública por documento y verificación por código).",
      "Los cursos y certificados viven en Merez y la app solo los muestra, con sesión de servidor para que ninguna llave llegue al navegador.",
      "Descarga de certificados por enlace firmado y temporal.",
    ],
    figures: [
      { value: "1", label: "app nueva que reemplaza el sitio" },
      { value: "Cursos + certificados", label: "en una sola app" },
      { value: "Pública", label: "verificación de certificados" },
    ],
    images: [
      {
        src: "/gigx/shots/acertar-app.webp",
        alt: "App de Acertar con los cursos en línea y la verificación de certificados",
        w: 1440,
        h: 900,
        size: "full",
      },
      {
        src: "/gigx/shots/acertar-app-m.webp",
        alt: "App de Acertar en un teléfono",
        w: 390,
        h: 844,
        size: "phone",
        caption: "Versión móvil",
      },
      {
        src: "/gigx/shots/acertar-home.webp",
        alt: "Sitio anterior de Acertar, empresa de capacitación en trabajo seguro en alturas",
        w: 1440,
        h: 900,
        size: "thumb",
        caption: "Antes (sitio)",
      },
    ],
    links: [
      { label: "Ver la app ↗", href: "https://app.acertarsas.com" },
      { label: "Sitio ↗", href: "https://acertarsas.com" },
    ],
    stack: ["PHP", "API de Merez", "Hostinger"],
  },
];

export type TimelineEntry = { year: string; title: string; items: string[] };

export const timeline: TimelineEntry[] = [
  { year: "2019", title: "Diseño gráfico", items: ["Piezas para telecomunicaciones y primeros encargos."] },
  {
    year: "2020",
    title: "Primeros sitios y marcas",
    items: ["Wonder School (sitio)", "Wallo (prototipo de app de envíos)", "Marcas para Nicolás Rocha y Green Force"],
  },
  {
    year: "2021",
    title: "Nace Inflinds S.A.S.",
    items: [
      "Fusion Pipe Tools",
      "Green Work",
      "Motor Clean",
      "Llévalo (e-commerce avanzado)",
      "Arizas Tools",
      "Acertar (sitio + e-learning)",
    ],
  },
  { year: "2022", title: "Más sitios y tiendas", items: ["Amatu", "César el Tributarista", "CEAMAC", "Estructálica"] },
  { year: "2023", title: "Comercio electrónico", items: ["Suplementos Green Spot (e-commerce)"] },
  {
    year: "2024",
    title: "Plataformas y marcas",
    items: ["Capitalex (app web, prototipo)", "Plantación Tenampa", "Alternatura", "Ndevsoft", "La Imperial"],
  },
  {
    year: "2026",
    title: "Producto propio",
    items: [
      "Merez en producción",
      "Fusion Pipe Tools rehecho con CRM",
      "Sistema de diseño del panel",
      "Desarrollo con IA orquestado",
    ],
  },
];

export type Site = {
  name: string;
  year: number;
  type: string;
  image?: { src: string; w: number; h: number };
  href?: string;
};

const shot = (file: string) => ({ src: `/gigx/shots/${file}.webp`, w: 1440, h: 900 });

export const sites: Site[] = [
  { name: "Wonder School", year: 2020, type: "Sitio estándar", image: shot("site-wonderschool"), href: "https://wonderschool.edu.co" },
  { name: "Green Work", year: 2021, type: "E-commerce intermedio", image: { src: "/gigx/legacy/GreenWork-pagina.jpg", w: 348, h: 464 }, href: "https://greenworksas.com" },
  { name: "Motor Clean", year: 2021, type: "Landing", image: { src: "/gigx/legacy/motorclean-site.jpg", w: 511, h: 683 } },
  { name: "Llévalo", year: 2021, type: "E-commerce avanzado", image: { src: "/gigx/legacy/Llevalo-pagina-2.jpg", w: 512, h: 683 } },
  { name: "Arizas Tools", year: 2021, type: "E-commerce", image: shot("site-arizas"), href: "https://arizas.co" },
  { name: "CEAMAC", year: 2022, type: "Sitio empresarial" },
  { name: "Amatu", year: 2022, type: "E-commerce", image: shot("site-amatumascota"), href: "https://amatumascota.co" },
  { name: "César el Tributarista", year: 2022, type: "Landing", image: shot("site-cesareltributarista"), href: "https://cesareltributarista.com" },
  { name: "Estructálica", year: 2022, type: "Landing", image: shot("site-estructalica"), href: "https://estructalica.com.co" },
  { name: "P&R Consultoría", year: 2022, type: "Sitio" },
  { name: "Suplementos Green Spot", year: 2023, type: "E-commerce" },
  { name: "Plantación Tenampa", year: 2024, type: "Sitio informativo", image: shot("site-plantaciontenampa"), href: "https://plantaciontenampa.com" },
  { name: "Alternatura", year: 2024, type: "E-commerce", image: shot("site-alternaturafr"), href: "https://alternaturafr.com" },
  { name: "Ndevsoft", year: 2024, type: "Sitio informativo" },
  { name: "La Imperial", year: 2024, type: "E-commerce" },
];

export type ProductItem = {
  name: string;
  years: string;
  type: string;
  image?: { src: string; alt: string; w: number; h: number };
};

export const products: ProductItem[] = [
  {
    name: "Wallo",
    years: "2020–2021",
    type: "Prototipo de app de envíos",
    image: { src: "/gigx/legacy/flujo-wallo-cel.jpg", alt: "Flujo de pantallas del prototipo de la app de envíos Wallo en un teléfono", w: 512, h: 683 },
  },
  { name: "Capitalex", years: "2024", type: "App web, prototipo" },
  {
    name: "Llévalo app",
    years: "2021",
    type: "App de comercio electrónico",
    image: { src: "/gigx/legacy/llevaapp-img-2.jpg", alt: "Pieza gráfica de la app de Llévalo con pantallas de la tienda", w: 1080, h: 1080 },
  },
];

export type Piece = { src: string; alt: string; w: number; h: number; caption: string };

export const pieces: Piece[] = [
  { src: "/gigx/legacy/Wonder-piezas2.jpg", alt: "Piezas gráficas diseñadas para Wonder School", w: 1080, h: 1080, caption: "Wonder School · piezas" },
  { src: "/gigx/legacy/portafolio-arizas.jpg", alt: "Portafolio de diseño de Arizas Tools en formato vertical", w: 512, h: 683, caption: "Arizas Tools · portafolio" },
  { src: "/gigx/legacy/Piezafacebookvender.jpg", alt: "Pieza para redes sociales orientada a la venta", w: 1080, h: 1080, caption: "Pieza para redes" },
  { src: "/gigx/legacy/INFLINDS-ADS-005.jpg", alt: "Anuncio gráfico de Inflinds", w: 1080, h: 1080, caption: "Inflinds · anuncio" },
  { src: "/gigx/legacy/nicorochac4.png", alt: "Identidad de marca de Nicolás Rocha", w: 1600, h: 486, caption: "Nicolás Rocha · marca" },
];

export const logos: Piece[] = [
  { src: "/gigx/legacy/GREENFORCE-V2.png", alt: "Logotipo de Green Force", w: 70, h: 84, caption: "Green Force" },
  { src: "/gigx/legacy/arizas7_cuadrado.png", alt: "Logotipo cuadrado de Arizas Tools", w: 1080, h: 1080, caption: "Arizas Tools" },
  { src: "/gigx/legacy/LOGO-nicorochac.png", alt: "Logotipo de Nicolás Rocha", w: 600, h: 600, caption: "Nicolás Rocha" },
];

export type Feature = {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  image: { src: string; alt: string; w: number; h: number };
  phone?: { src: string; alt: string; w: number; h: number };
  large?: boolean;
};

export const merezFeatures: Feature[] = [
  {
    id: "inicio",
    kicker: "Panel",
    title: "Inicio con asistente",
    body: [
      "El negocio arranca con su asistente al frente.",
      "Métricas, plan y próximos pasos a su alrededor.",
      "En móvil, barra inferior con el asistente a un toque.",
    ],
    image: { src: "/gigx/merez/panel-home.webp", alt: "Inicio del panel de Merez con el asistente al frente, métricas y próximos pasos", w: 1440, h: 900 },
    phone: { src: "/gigx/merez/panel-home-m.webp", alt: "Inicio del panel de Merez en un teléfono, con la barra inferior", w: 390, h: 844 },
  },
  {
    id: "ficha",
    kicker: "Lo más propio",
    title: "La ficha que se completa sola",
    body: [
      "La ficha detecta lo que le falta para verse completa en el sitio: descripción, ficha técnica, imagen y categoría. La IA lo completa con un clic por 0,1 créditos.",
      "Sugiere la categoría y redacta la descripción con la voz de la marca. Una vista previa muestra cómo abre en el sitio.",
      "Precio y referencia quedan marcados «solo tú»: la IA no los toca.",
    ],
    image: { src: "/gigx/merez/panel-ficha.webp", alt: "Ficha de un producto en el panel de Merez con los campos que la IA puede completar", w: 1440, h: 1100 },
    phone: { src: "/gigx/merez/panel-ficha-m.webp", alt: "Ficha de un producto en el panel de Merez en un teléfono", w: 390, h: 844 },
    large: true,
  },
  {
    id: "catalogo",
    kicker: "Catálogo",
    title: "Productos y servicios a la medida",
    body: [
      "Productos y servicios en un mismo catálogo.",
      "Campos personalizados por negocio, sinónimos de búsqueda y variantes.",
    ],
    image: { src: "/gigx/merez/panel-products.webp", alt: "Listado de productos del catálogo en el panel de Merez", w: 1440, h: 900 },
  },
  {
    id: "marca",
    kicker: "Marca",
    title: "Entrenar la marca",
    body: [
      "La IA lee el sitio web y aprende el logo, los colores, cómo habla la marca y qué vende.",
      "Las fotos reales aprobadas sirven de referencia de estilo.",
    ],
    image: { src: "/gigx/merez/panel-brand.webp", alt: "Pantalla de entrenamiento de marca en el panel de Merez", w: 1440, h: 900 },
  },
  {
    id: "sitio",
    kicker: "Sitio",
    title: "Tu sitio",
    body: [
      "Catálogo, páginas y formulario de contacto se publican desde el mismo panel.",
      "Cada visitante que escribe entra como lead.",
    ],
    image: { src: "/gigx/merez/panel-site.webp", alt: "Editor del sitio publicado desde el panel de Merez", w: 1440, h: 900 },
  },
];

export const agents = [
  { name: "Castor", role: "Asistente del panel", text: "Opera leads, cotizaciones e inventario." },
  { name: "Búho", role: "Investigador", text: "Sale a la web por proveedores, precios y competencia." },
  { name: "Colibrí", role: "Agente de ventas", text: "En WhatsApp atiende, cotiza y deja el lead listo." },
];

export const toolGroups = [
  { name: "Catálogo", items: ["Crear y actualizar productos en lote", "Buscar en el catálogo", "Consultar inventario", "Extraer un catálogo desde un PDF o una foto"] },
  { name: "CRM", items: ["Crear y actualizar leads", "Detectar duplicados", "Fusionar duplicados", "Buscar en el CRM"] },
  { name: "Ventas", items: ["Crear y revisar cotizaciones", "Crear pedidos", "Registrar pagos y cobrar", "Crear suscripciones", "Agendar citas"] },
  { name: "Contenido", items: ["Redactar artículos del blog", "Convertir un enlace en una entrada de bitácora", "Componer piezas de marca"] },
  { name: "Operación", items: ["Crear, listar y resolver tareas", "Resumir conversaciones", "Clasificar correos", "Redactar respuestas", "Buscar en todo"] },
];

export const riskLevels = ["Lectura", "Escritura reversible", "Escritura sensible", "Acción externa", "Infraestructura"];

export const memoryPoints = [
  "Cada cliente, cotización o pedido tiene su propia conversación con la IA, compartida por el equipo.",
  "Pegar un chat o un correo deja notas, tareas y propone los cambios de datos.",
  "Acepta notas de voz y foto de tarjeta.",
];

export const doing = [
  { title: "Diseño de producto", text: "Investigación con usuarios, arquitectura de información, flujos, prototipos en Figma y sistemas de diseño con tokens.", short: "Investigación, flujos, prototipos en Figma y sistemas de diseño con tokens." },
  { title: "Ingeniería", text: "Aplicaciones web de punta a punta: React y Next.js en TypeScript, Laravel en PHP, MySQL, APIs, arquitectura multi-tenant, despliegue continuo con GitHub Actions y pruebas automáticas.", short: "React y Next.js en TypeScript, Laravel y MySQL; multi-tenant, GitHub Actions y pruebas." },
  { title: "IA aplicada", text: "Agentes sobre OpenAI y Anthropic con herramientas y políticas de aprobación, memoria por cliente, extracción de datos desde documentos y fotos, costo medido por llamada.", short: "Agentes sobre OpenAI y Anthropic con aprobación humana, memoria por cliente y costo medido." },
];

export const featured = [
  { title: "Merez", text: "Plataforma SaaS con agentes de IA para pequeños negocios.", href: "/gigx/portfolio/#merez", image: { src: "/gigx/merez/panel-ficha.webp", alt: "Ficha de producto en el panel de Merez", w: 1440, h: 1100 } },
  { title: "Fusion Pipe Tools", text: "Un catálogo en PDF convertido en 41 fichas y un flujo de cotización.", href: "/gigx/portfolio/#fusion-pipe-tools", image: { src: "/gigx/shots/fusion-home.webp", alt: "Página de inicio de Fusion Pipe Tools", w: 1440, h: 900 } },
  { title: "Acertar", text: "Cursos en línea y certificados verificables en una app propia.", href: "/gigx/portfolio/#acertar", image: { src: "/gigx/shots/acertar-app.webp", alt: "App de Acertar con cursos y certificados", w: 1440, h: 900 } },
];

export const path = [
  { year: "2019", text: "Diseño gráfico" },
  { year: "2020", text: "Primeros sitios" },
  { year: "2021", text: "Funda Inflinds" },
  { year: "2022–2024", text: "+20 sitios y tiendas" },
  { year: "2026", text: "Merez en producción" },
];

export const stack = [
  { name: "Diseño", items: ["Figma", "Sistemas de tokens", "Prototipos"] },
  { name: "Frontend", items: ["TypeScript", "React", "Next.js", "Vite", "Refine", "Tailwind CSS", "Tiptap", "Vitest"] },
  { name: "Backend y datos", items: ["PHP", "Laravel", "MySQL", "APIs REST", "PHPUnit"] },
  { name: "IA", items: ["OpenAI", "Anthropic", "Claude Code", "DeepSeek", "Agentes con herramientas"] },
  { name: "Infraestructura", items: ["GitHub Actions", "Vercel", "Hostinger", "Cloudflare"] },
  { name: "Integraciones", items: ["WhatsApp", "WordPress", "HubSpot", "Meta Conversions API"] },
];
