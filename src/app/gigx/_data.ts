export const profile = {
  name: "Miguel Angel Yañez",
  // El cargo que se ofrece primero: lo que hará en el equipo, no la jerarquía que tiene.
  title: "Founder & Product Designer",
  roles: ["Product Designer", "Design Engineer", "UX/UI"],
  // A lo que está abierto, que es más ancho que los tres cargos de arriba.
  openTo: ["Product Designer", "UX/UI Designer", "Design Systems", "Design Engineer", "Implementation / Solutions"],
  cv: "/gigx/miguel-yanez-cv.pdf",
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
  /** Cómo se cobra el producto: parejas etiqueta/valor. */
  model?: { label: string; value: string }[];
  /** Línea de evolución del producto. */
  evolution?: { when: string; what: string }[];
  /** Caso de cliente con acuerdo de confidencialidad: se cuenta, no se ilustra. */
  confidential?: string;
};

export const cases: CaseStudy[] = [
  {
    id: "merez",
    kicker: "2026 · Fundador, diseño de producto, negocio y arquitectura",
    title: "Merez — el sistema operativo que un negocio pequeño no puede pagar",
    summary:
      "Nació de una pregunta: por qué un negocio de barrio paga cinco herramientas que no se hablan entre sí. Hoy es una plataforma multi-tenant con veinte módulos, agentes de IA y un modelo de cobro por créditos, en producción.",
    problem:
      "Un negocio pequeño no tiene sistema: tiene un WordPress para el sitio, un Excel para el catálogo, un cuaderno para las cotizaciones, WhatsApp para vender y una agencia para todo lo demás. Nada se habla, y cada cosa nueva es otro proveedor. Montar el sistema de una empresa mediana cuesta lo que ese negocio factura en un año.",
    did: [
      "Un solo producto modular: sitio, catálogo, CRM, cotizaciones, pedidos, pagos, inventario, correo, blog y agentes. Los módulos se activan por sitio; el negocio paga por lo que usa, no por un paquete cerrado.",
      "Arquitectura multi-tenant con frontera de módulos: cada capacidad es una pieza que se enciende sin tocar el núcleo, y ninguna importa a otra.",
      "Agentes con herramientas y niveles de riesgo: leer es libre, escribir se propone y una persona lo aprueba en el mismo chat. Castor opera el panel, Búho investiga afuera, Colibrí vende por WhatsApp.",
      "Créditos prepagados en vez de suscripción por asiento: cada proceso de IA se cobra por lo que cuesta. Un motor deriva el precio de cada tarifa y compara lo derivado con lo cobrado; si no cuadra, falla.",
      "Studio: el estudio de marca dentro del panel. La IA aprende el logo, los colores y la voz del negocio, y con eso se componen piezas y se distribuyen en el sitio y en las redes sin salir del producto.",
      "IA híbrida: lo que el cliente ya paga —WhatsApp, pasarela— lo conecta con su propia cuenta; lo que no, lo cubre Merez con créditos. Así el costo variable no se come el margen.",
      "Ciclo de entrega propio: 118 versiones publicadas, cada una con changelog, pruebas automáticas y puertas de contrato de API antes de desplegar.",
    ],
    figures: [
      { value: "118", label: "versiones publicadas, de la 0.1.0 a la 0.88.0" },
      { value: "1.162", label: "commits en el backend; 91.000 líneas de PHP" },
      { value: "31", label: "herramientas de agente en cinco niveles de riesgo" },
    ],
    evolution: [
      { when: "2026-07", what: "Concepto y documentos: qué es, a quién le sirve y cuánto cuesta. Primer modelo de negocio antes de la primera línea de producto." },
      { when: "jul 2026", what: "v0.1.0, compilación 58. Medición de IA por llamada y agente de WhatsApp conectado." },
      { when: "ago–sep", what: "Los módulos que un negocio pide de verdad: catálogo, CRM, cotizaciones, pagos, inventario y correo. El sitio deja de ser un tema aparte y pasa a ser otro módulo." },
      { when: "oct 2026", what: "Agentes con riesgo por herramienta, créditos por proceso y Studio. v0.88.0, compilación 331." },
      { when: "nov 2026", what: "El producto deja de pintar sitios: cada sitio vive en su repositorio y lee a Merez por la API pública. Se retiran 4.778 líneas." },
    ],
    model: [
      { label: "Planes", value: "Raíz, Semilla, Cosecha, Dorado y A medida. El plan define cupo de créditos; los módulos se activan aparte." },
      { label: "Plazo", value: "Seis meses en pago único, o un año en cuatro cuotas sin interés. El descuento anual es del 15 %. No hay cobro mes a mes." },
      { label: "Créditos", value: "Prepagados: cada proceso de IA y cada activación de módulo tiene tarifa. Se acabaron los créditos, se compran más; no hay sorpresa en la factura." },
      { label: "Dominio", value: "Incluido en .com y atado al compromiso anual: el negocio no tiene que contratar hosting ni DNS por su cuenta." },
      { label: "Tradicional vs IA", value: "Antes: cinco proveedores y una agencia por tarea. Con Merez: un panel, un crédito por proceso y un agente que propone; la persona aprueba." },
    ],
    images: [
      {
        src: "/gigx/shots/merez-industrial.webp",
        alt: "Landing de Merez para distribuidores industriales: cotiza, vende y cobra desde un solo lugar",
        w: 1440,
        h: 680,
        size: "full",
        caption: "Landing industrial",
      },
      {
        src: "/gigx/shots/merez-industrial-movil.webp",
        alt: "La misma landing de Merez en un teléfono",
        w: 390,
        h: 660,
        size: "phone",
        caption: "En móvil",
      },
    ],
    links: [{ label: "Ver en vivo ↗", href: "https://merez.co" }],
    stack: ["Laravel 13", "PHP 8.3", "MySQL", "React 19", "Vite", "Refine", "Next.js 16", "Tailwind CSS 4", "OpenAI", "Anthropic", "WhatsApp", "GitHub Actions"],
  },
  {
    id: "colibri",
    kicker: "2021 · Publicidad y campaña de producto",
    title: "Colibri — la campaña que puso el sobre a competir",
    summary:
      "El empaque no lo diseñé yo: hice la publicidad. Portada, perfil y piezas de campaña para una línea de jabón líquido que se vende en sachet de 100 ml.",
    problem:
      "El sachet es el formato que más se ve y menos se recuerda: compite en una vitrina llena de bolsas parecidas y en un feed donde nadie lee. La marca tenía que reconocerse en un segundo.",
    did: [
      "Jerarquía de campaña: qué se lee primero en cada pieza —marca, producto y beneficio— y a qué tamaño.",
      "El color como diferenciador de referencia: azul, ropa y multiusos, cada uno con su paleta, para que el cliente reconozca la que ya usa.",
      "Portada y perfil de Facebook pensados para el recorte: la marca sobrevive al formato cuadrado del avatar.",
      "Piezas de campaña con el producto en uso, no el sobre flotando: el sachet se entiende cuando se ve el resultado.",
    ],
    figures: [
      { value: "3", label: "referencias, cada una con su color" },
      { value: "2", label: "formatos: portada y pieza de feed" },
      { value: "100 ml", label: "el formato que hay que hacer recordar" },
    ],
    images: [
      {
        src: "/gigx/colibri/portada-facebook.webp",
        alt: "Portada de Facebook de la campaña de Colibri, con la marca y el producto",
        w: 1600,
        h: 835,
        size: "full",
        caption: "Portada · campaña",
      },
      {
        src: "/gigx/colibri/pieza-facebook.webp",
        alt: "Pieza de feed de la campaña de Colibri",
        w: 1080,
        h: 1080,
        size: "half",
        caption: "Pieza de feed",
      },
      {
        src: "/gigx/colibri/sobre.webp",
        alt: "Sobre de 100 ml de la línea Colibri, como referencia del producto que se anunciaba",
        w: 1500,
        h: 1500,
        size: "half",
        caption: "El producto (empaque de otro equipo)",
      },
    ],
    stack: ["Photoshop", "Illustrator", "Meta Ads", "Redes"],
  },
  {
    id: "greenforce",
    kicker: "2020 · Identidad y manual de marca",
    title: "Green Force — la marca y las reglas para usarla",
    summary:
      "Logotipo, versiones y las láminas de uso correcto e incorrecto: lo que un equipo necesita para no romper la marca cuando ya no está el diseñador.",
    problem:
      "Una marca que solo existe como archivo de logo se rompe en la primera campaña: cada pieza usa otra versión, otro color y otro espacio. El manual no es un adorno, es lo que evita eso.",
    did: [
      "Tres versiones del logotipo según el fondo donde va a vivir: color, monocromo y escala de grises.",
      "Láminas comparadas de uso correcto e incorrecto: la regla se explica con el ejemplo al lado, no con un párrafo.",
      "Aplicación a piezas de campaña para redes, integrando la marca a la fotografía en vez de pegarla encima.",
      "Entrega en vectorial y PNG por versión, para que el logo sirva igual en imprenta y en pantalla.",
    ],
    figures: [
      { value: "3", label: "versiones del logotipo" },
      { value: "2", label: "láminas de uso: correcto e incorrecto" },
      { value: "1", label: "manual que el equipo puede aplicar sin mí" },
    ],
    images: [
      {
        src: "/gigx/marca/logo.webp",
        alt: "Logotipo de Green Force en su versión principal",
        w: 1400,
        h: 1684,
        size: "full",
        caption: "Logotipo · versión principal",
      },
      {
        src: "/gigx/marca/uso-correcto.webp",
        alt: "Lámina de uso correcto del logotipo de Green Force sobre fotografía",
        w: 1600,
        h: 900,
        size: "half",
        caption: "Uso correcto",
      },
      {
        src: "/gigx/marca/uso-incorrecto.webp",
        alt: "Lámina de uso incorrecto del logotipo de Green Force",
        w: 1600,
        h: 900,
        size: "half",
        caption: "Uso incorrecto",
      },
    ],
    stack: ["Illustrator", "Photoshop", "Manual de marca", "Vectorial"],
  },
  {
    id: "arizas",
    kicker: "2021–2022 · Marca, catálogo y video",
    title: "Arizas Tools — la marca y el producto en movimiento",
    summary:
      "Identidad, catálogo técnico y piezas de video para un distribuidor de herramientas: la misma marca sirviendo en una ficha, en un flyer y en un short de 25 segundos.",
    problem:
      "Una herramienta se vende por lo que hace, no por su logo. La marca tenía que sostenerse en el catálogo, en la pieza de campaña y en el video, sin que cada soporte pareciera de otra empresa.",
    did: [
      "Logotipo y aplicaciones: tarjetas, flyers y piezas de campaña con la misma retícula.",
      "Portafolio y fichas técnicas del catálogo, con el producto fotografiado y especificado.",
      "Ocho shorts verticales y un corporativo de 1:18: piezas que muestran la herramienta trabajando.",
      "Piezas cortas para WhatsApp, el canal donde de verdad se comparte el catálogo en Colombia.",
    ],
    figures: [
      { value: "9", label: "piezas de video: ocho shorts y un corporativo" },
      { value: "1:18", label: "el corporativo; los shorts, 25 segundos" },
      { value: "1", label: "marca que aguanta ficha, flyer y video" },
    ],
    images: [
      {
        src: "/gigx/video/corp-35.jpg",
        alt: "Fotograma del video corporativo de Arizas Tools con una herramienta en primer plano",
        w: 1200,
        h: 676,
        size: "full",
        caption: "Corporativo · 1:18",
      },
      {
        src: "/gigx/video/arizas-short-1.jpg",
        alt: "Fotograma de un short vertical de Arizas Tools",
        w: 1600,
        h: 900,
        size: "half",
        caption: "Short · 25 s",
      },
      {
        src: "/gigx/video/arizas-short-3.jpg",
        alt: "Fotograma de otro short de Arizas Tools",
        w: 1600,
        h: 900,
        size: "half",
        caption: "Short · producto en uso",
      },
    ],
    stack: ["Illustrator", "Premiere", "After Effects", "Fotografía de producto"],
  },
  {
    id: "wallo",
    kicker: "2020–2021 · Producto digital y UX",
    title: "Wallo — tarjetas de membresía en el teléfono",
    summary:
      "Una app para llevar las tarjetas de fidelidad del bolsillo al teléfono, con activación por NFC: el flujo completo, del registro al primer uso.",
    problem:
      "Las tarjetas de membresía se pierden, y el negocio no tiene forma de saber quién volvió. La app tenía que resolver el registro sin fricción y llegar rápido al momento en que la tarjeta sirve.",
    did: [
      "Flujo de entrada completo: registro con correo o redes, verificación por SMS y creación de PIN.",
      "Activación de la tarjeta por NFC explicada en pantalla, en un paso, sin manual.",
      "Inicio con las membresías como protagonistas: color por tarjeta y acceso en un toque.",
      "Pantallas de estado para cada paso: código enviado, cuenta creada, huella autorizada.",
      "Sistema visual mínimo —tipografía, color y componentes— para que las pantallas se sintieran de la misma app.",
    ],
    figures: [
      { value: "35", label: "pantallas del flujo completo" },
      { value: "6", label: "secciones: inicio, membresías, tarjeta, documentos, personalizado y tema oscuro" },
      { value: "NFC", label: "activación de la tarjeta desde el teléfono" },
    ],
    images: [
      {
        src: "/gigx/wallo/flujo-inicio.webp",
        alt: "Flujo de registro y activación de la app Wallo: registro, verificación por SMS, cuenta creada, NFC y PIN",
        w: 2200,
        h: 889,
        size: "full",
        caption: "Registro y activación",
      },
      {
        src: "/gigx/wallo/membresias.webp",
        alt: "Pantalla de membresías de Wallo con las tarjetas por color",
        w: 2200,
        h: 1365,
        size: "half",
        caption: "Membresías",
      },
      {
        src: "/gigx/wallo/tarjeta.webp",
        alt: "Pantalla de detalle de una tarjeta de membresía en Wallo",
        w: 2200,
        h: 1365,
        size: "half",
        caption: "La tarjeta",
      },
    ],
    stack: ["Figma", "Prototipo", "iOS", "Android", "NFC"],
  },
  {
    id: "pantou",
    kicker: "2023–2024 · Diseño UX/UI y design systems",
    title: "PANTou — un sistema, seis marcas",
    summary:
      "Onda de Mar, Festina, Invicta, Technomarine, Kreditime y Toktok: seis tiendas con equipos pequeños y un sistema de diseño por marca, documentado para que el equipo lo mantuviera sin mí.",
    problem:
      "Cada marca rehacía lo mismo: componentes, estilos y patrones propios, sin base común y sin documentación. El costo no era diseñar: era repetirlo seis veces y volver a decidirlo cada vez.",
    did: [
      "Un sistema por marca: tokens, componentes y hoja de estilos, con las reglas escritas para que sobrevivieran a mi salida.",
      "Mapa de pantallas de la tienda completa: el universo entero en un plano, antes de tocar ningún detalle.",
      "Tokens en CSS implementables en Angular y Shopify, no solo dibujados en Figma.",
      "Investigación con usuarios: mapas de calor, pruebas de usabilidad y grabaciones en Clarity, más card sorting para la arquitectura de información.",
      "Plantillas de correo en HTML y MJML, parte del mismo sistema.",
      "Archivos de Figma entregados editables: el sistema quedó como archivo vivo, no como lámina.",
    ],
    figures: [
      { value: "6", label: "marcas con hoja de componentes" },
      { value: "14", label: "meses, de febrero de 2023 a marzo de 2024" },
      { value: "3", label: "plataformas: Angular, Shopify y correo" },
    ],
    images: [
      {
        src: "/gigx/pantou-detalle.webp",
        alt: "Detalle del sistema de navegación de una de las tiendas: menús, categorías y estructura",
        w: 900,
        h: 813,
        size: "full",
        caption: "Detalle · navegación y arquitectura",
      },
    ],
    confidential:
      "Solo se publica un detalle, igual que en Behance. Las hojas de componentes, el mapa de pantallas y los archivos de Figma se muestran en entrevista.",
    stack: ["Figma", "Tokens CSS", "Angular", "Shopify", "MJML", "Clarity"],
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
  {
    year: "2023–2024",
    title: "Design systems en PANTou",
    items: [
      "Siete marcas: OndadeMar, Festina, Invicta, Technomarine, Sometimes, Lokiero y Kreditime",
      "Hoja de componentes y tokens CSS por marca, para Angular y Shopify",
      "Investigación con Clarity, mapas de calor y card sorting",
    ],
  },
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
  { name: "CEAMAC", year: 2022, type: "Sitio empresarial", image: shot("site-ceamac"), href: "https://ceamac.edu.co" },
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
  { title: "Diseño de producto", text: "Investigación con usuarios, arquitectura de información, flujos, prototipos en Figma y pruebas de usabilidad con datos: mapas de calor, grabaciones y card sorting.", short: "Investigación, flujos, prototipos en Figma y pruebas de usabilidad." },
  { title: "Design systems", text: "Tokens, componentes y hoja de estilos por marca, documentados para que el equipo los mantenga sin mí. En PANTou, siete tiendas de relojería, moda y crédito; en Merez, el sistema del panel con una regla de build que rechaza colores sueltos.", short: "Tokens, componentes y documentación por marca; siete e-commerce y el panel de Merez." },
  { title: "Marca y empaque", text: "Identidad de principio a fin: logotipo y variantes, manual de uso, aplicaciones y piezas. Empaque con arte final, troquel y preimpresión listos para imprenta.", short: "Identidad, manual de marca y empaque con arte final." },
  { title: "Ingeniería", text: "Aplicaciones web de punta a punta: React y Next.js en TypeScript, Laravel en PHP, MySQL, APIs, arquitectura multi-tenant, despliegue continuo con GitHub Actions y pruebas automáticas.", short: "React y Next.js en TypeScript, Laravel y MySQL; multi-tenant, GitHub Actions y pruebas." },
  { title: "IA aplicada", text: "Agentes sobre OpenAI y Anthropic con herramientas y políticas de aprobación, memoria por cliente, extracción de datos desde documentos y fotos, costo medido por llamada.", short: "Agentes sobre OpenAI y Anthropic con aprobación humana, memoria por cliente y costo medido." },
  { title: "Contenido y video", text: "Guion, edición y piezas verticales para redes: videos de producto, cortos de campaña y portadas. El mismo criterio de jerarquía que en una pantalla, aplicado a un formato que se ve sin sonido.", short: "Guion, edición y piezas verticales para redes." },
];

export const featured = [
  { title: "Merez", text: "Plataforma SaaS con agentes de IA: veinte modulos, un modelo de cobro por creditos y 118 versiones en produccion.", href: "/gigx/portfolio/#merez", image: { src: "/gigx/shots/merez-industrial.webp", alt: "Landing de Merez para distribuidores industriales", w: 1440, h: 680 } },
  { title: "Fusion Pipe Tools", text: "Un catalogo en PDF convertido en 41 fichas tecnicas y un flujo de cotizacion con CRM.", href: "/gigx/portfolio/#fusion-pipe-tools", image: { src: "/gigx/shots/fusion-home.webp", alt: "Pagina de inicio de Fusion Pipe Tools", w: 1440, h: 900 } },
  { title: "Kreditime", text: "Compra ahora y paga despues: el sistema de diseno aplicado a credito dentro de las tiendas de retail.", href: "/gigx/portfolio/#pantou", image: { src: "/gigx/kreditime-detalle.webp", alt: "Landing de Kreditime: compra ahora y paga despues, dentro de una tienda de retail", w: 1000, h: 514 } },
];

export const path = [
  { year: "2021", text: "Funda Inflinds" },
  { year: "2022–2023", text: "+20 sitios y tiendas" },
  { year: "2023–2024", text: "Design systems en PANTou" },
  { year: "2026", text: "Merez en producción" },
];

export const stack = [
  { name: "Diseño", items: ["Figma", "Sistemas de tokens", "Prototipos", "Investigación con usuarios"] },
  { name: "Diseño gráfico", items: ["Illustrator", "Photoshop", "InDesign", "Arte final y preimpresión"] },
  { name: "Video", items: ["Premiere", "After Effects", "DaVinci Resolve", "Piezas verticales"] },
  { name: "Frontend", items: ["TypeScript", "React", "Next.js", "Vite", "Refine", "Tailwind CSS", "Tiptap", "Vitest"] },
  { name: "Backend y datos", items: ["PHP", "Laravel", "MySQL", "APIs REST", "PHPUnit"] },
  { name: "IA", items: ["OpenAI", "Anthropic", "Claude Code", "DeepSeek", "Agentes con herramientas"] },
  { name: "Infraestructura", items: ["GitHub Actions", "Vercel", "Hostinger", "Cloudflare"] },
  { name: "Integraciones", items: ["WhatsApp", "WordPress", "HubSpot", "Meta Conversions API"] },
];

// Lo que ha enseñado, con la evidencia que hay en su CV.
export const teaching = [
  {
    place: "Universidad UNAN — Nicaragua",
    what: "Capacitación a dos grupos de estudiantes en producción de multimedia.",
  },
  {
    place: "Acertar",
    what: "Formación de aprendices en trabajo seguro en alturas, dentro del producto que construí.",
  },
];
