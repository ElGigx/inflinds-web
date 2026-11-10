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
  visual?: "tokens" | "ai" | "system";
  stack?: string[];
  footnote?: string;
  /** Cómo se cobra el producto: parejas etiqueta/valor. */
  model?: { label: string; value: string }[];
  /** Tablas de referencia: cabecera y filas. */
  tables?: { title: string; head: string[]; rows: string[][] }[];
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
    id: "kreditime",
    kicker: "2023–2024 · Fintech de compra a cuotas",
    title: "Kreditime — compra ahora, paga después",
    summary:
      "De lo que más se construyó en PANTOU y de lo que menos se puede enseñar: la fintech de crédito que se metía dentro de las tiendas de retail, con su propio sistema, su solicitud y su cobro.",
    problem:
      "Meter crédito dentro de una tienda cambia tres cosas a la vez: el cliente que compra, el comercio que cobra y la entidad que arriesga. Si el flujo se siente como un formulario de banco, nadie lo termina; si se siente demasiado fácil, el riesgo se dispara.",
    did: [
      "Sistema de diseño documentado de punta a punta: tipografía con sus pesos y etiquetas, paleta con principales, neutros y estados, y la escala de color completa.",
      "Las reglas que sostienen el sistema cuando no estoy: media queries con metodología first mobile y breakpoints en 320, 375, 480, 1024, 1280 y 1440; grosor de línea, elevación con sombras y opacidades, y espaciado en rem y píxeles con su equivalencia.",
      "El flujo de solicitud completo: registro con validación, verificación de identidad y estados de respuesta.",
      "El autoservicio del cliente, con los tres estados que de verdad importan: al día, en mora y después de pagar. Es donde el crédito deja de ser un formulario y se vuelve una cuota que se entiende.",
      "La pieza dentro de la tienda: «compra ahora, paga después» en el carrito, junto al producto que se está mirando.",
    ],
    figures: [
      { value: "6", label: "paneles de sistema: tipografía, color, grid, grosor, elevación y espaciado" },
      { value: "6", label: "breakpoints definidos, de 320 a 1440" },
      { value: "3", label: "estados del crédito: al día, en mora, pagado" },
    ],
    images: [
      {
        src: "/gigx/kreditime/estilos.webp",
        alt: "Documentación del sistema de Kreditime: tipografía, colores, media queries, grosor, elevaciones y espaciados",
        w: 1800,
        h: 412,
        size: "full",
        caption: "El sistema · documentado",
      },
      {
        src: "/gigx/kreditime/aplicaciones.webp",
        alt: "Aplicación del sistema en móvil y escritorio, con las pantallas del producto",
        w: 800,
        h: 1393,
        size: "half",
        caption: "Aplicado · móvil y escritorio",
      },
      {
        src: "/gigx/kreditime-detalle.webp",
        alt: "Compra ahora y paga después de Kreditime dentro de la tienda de TechnoMarine",
        w: 1000,
        h: 514,
        size: "half",
        caption: "Dentro de la tienda",
      },
    ],
    confidential:
      "Del sistema y de la pasarela solo se publican estos detalles, igual que en Behance. El resto se enseña en entrevista.",
    stack: ["Figma", "Tokens", "Documentación de sistema", "Pasarela de pago", "Autoservicio"],
  },
  {
    id: "medicion",
    kicker: "2026 · Medición de producto y decisiones",
    title: "Medir antes de diseñar — cinco hallazgos que cambiaron la decisión",
    summary:
      "Antes de construir, contar. Así se cayeron tres supuestos propios y se corrigieron dos piezas de software que ya estaban en producción.",
    problem:
      "Un diseñador puede pasar semanas afinando una pantalla que nadie usa, o un modelo de precios que el mercado no paga como uno cree. La diferencia entre criterio y opinión es un número, y ese número casi nunca está en el chat: está en la base de datos, en el servidor o en el vocabulario de quien usa el producto.",
    did: [
      "Contar antes de creer: un COUNT(*) contra producción mostró 43 productos, 3 pedidos y cero leads. El sitio que se creía «la tienda» era un escaparate, y el código que se creía desplegado no era el que servía.",
      "Mirar el recurso que de verdad se agota: en el panel de hosting no era el disco ni la memoria, eran los inodos, al 87 %. Eso invalidó las dos propuestas que había para el eje de precios y dejó uno solo: créditos.",
      "Leer el chat real de los clientes: una acción del agente era imposible de alcanzar —solo funcionaba para un cliente reconocido y solo por WhatsApp—. No fallaba el modelo; fallaba el camino hasta él.",
      "Escuchar el vocabulario del oficio: en tubería, una pulgada nominal son 32 mm y no 25,4. El catálogo no necesitaba otra etiqueta, necesitaba otro dato: medida, norma y sinónimos.",
      "Probar el producto como usuario: «lo veo como si me lo dejara guardar, pero recargo la página y el dato no aparece». La pantalla nunca había leído nada; el guardado era mudo.",
      "Y dejar escrito lo que no se sabe: la encuesta de disposición a pagar está diseñada y **no ejecutada**. El documento dice, con esas palabras, que aún no hay dato primario.",
    ],
    figures: [
      { value: "5", label: "hallazgos que cambiaron una decisión, no solo una pantalla" },
      { value: "3", label: "supuestos propios que se cayeron al contar" },
      { value: "0", label: "datos inventados: lo que no se midió, se declara" },
    ],
    tables: [
      {
        title: "De la medición a la decisión",
        head: ["Qué se midió", "Qué encontró", "Qué cambió"],
        rows: [
          ["COUNT(*) en producción", "43 productos, 3 pedidos, 0 leads", "El sitio es escaparate, no tienda; se corrigió el despliegue"],
          ["Panel de hosting", "El 87 % del recurso agotado son inodos", "Se cayó el eje de precios propuesto: queda uno, créditos"],
          ["Chat real de clientes", "La acción del agente era inalcanzable", "Solicitud del cliente con tipo, dueño y fecha, en dos canales"],
          ["El vocabulario del oficio", "1\" de tubo son 32 mm, no 25,4", "El catálogo cambió de modelo de datos, no de etiqueta"],
          ["Prueba manual del panel", "El guardado no leía lo que escribía", "La pantalla se conectó y el guardado dejó de ser mudo"],
        ],
      },
      {
        title: "Lo que esta práctica no es",
        head: ["No es", "Por qué se dice"],
        rows: [
          ["Investigación con usuarios", "No hay entrevistas ni pruebas de usabilidad registradas. Hay medición de producto, que es otra cosa y sirve para otras preguntas."],
          ["Un tablero de métricas", "Cada número de esta lista terminó cambiando una decisión concreta; los que no cambiaron nada no aparecen."],
          ["Datos completos", "La encuesta de disposición a pagar está diseñada y sin ejecutar. Se declara en el documento, no se disimula."],
        ],
      },
    ],
    images: [
      {
        src: "/gigx/medicion-cadena.svg",
        alt: "Cadena de evidencia: qué se midió, qué encontró y qué cambió en cuatro casos",
        w: 1200,
        h: 430,
        size: "full",
        caption: "La cadena · medición, hallazgo y decisión",
      },
    ],
    footnote:
      "Regla de la casa: si un número no se puede verificar en un archivo o en un sitio en vivo, no se publica.",
    stack: ["SQL", "Producción", "Analítica", "Documentación de hallazgos"],
  },
  {
    id: "studio",
    kicker: "2026 · Arquitectura de estados y prototipos versionados",
    title: "Los estados, una vez — y quince prototipos para no discutirlos dos veces",
    summary:
      "Ocho estados, su copy exacto y quién decide cuál se pinta. Aprobado una sola vez, las seis plantillas lo consumen sin volver a discutirlo, y las 44 superficies de error escritas a mano pasan a ser una.",
    problem:
      "Cuando cada pantalla decide por su cuenta qué mostrar cuando falta un permiso, cuando carga o cuando algo falla, aparecen cuarenta y cuatro maneras de decir lo mismo. El problema no es visual: es que nadie sabe cuál gana cuando dos condiciones se cumplen a la vez.",
    did: [
      "Un modelo de ocho estados, con su copy exacto y la regla de quién decide cuál se pinta. Es lo que se aprueba una vez y consumen las seis plantillas.",
      "**El orden de las comprobaciones es el diseño**: permiso primero —si no se puede ver, lo demás sobra—, módulo antes que carga, error y carga solo si no hay nada, y el filtro antes que el «no hay resultados». Ese orden vive en una función pura, y es lo que prueban las 27 pruebas.",
      "44 superficies de error escritas a mano, cada una con su texto, convertidas en una sola salida del modelo. Menos código y, sobre todo, un solo lugar donde cambiarlo.",
      "Quince prototipos en un proyecto, repartidos en versiones con nombre y alcance: v0.1 los estados e inventario, v0.2 seis frentes, v0.2.1 el modo ficha, v0.2.2 Studio con la ayuda en el ícono de información —23 en la ficha y 7 en Studio—.",
      "Revisión de lo que un agente construyó a partir de esos prototipos: siete desviaciones documentadas, cada una con su motivo, no un «se ve distinto».",
      "Y las herramientas que faltaban: el diseño en un archivo de datos, una prueba que compara el código contra él, y una página de muestra en dos temas, escritorio y celular, para comparar contra capturas.",
    ],
    figures: [
      { value: "8", label: "estados definidos una vez, consumidos por seis plantillas" },
      { value: "44 → 1", label: "superficies de error escritas a mano, convertidas en una" },
      { value: "27", label: "pruebas sobre el orden de las comprobaciones" },
    ],
    tables: [
      {
        title: "El orden de las comprobaciones es el diseño",
        head: ["Orden", "Regla", "Por qué"],
        rows: [
          ["1 · Permiso", "Si no se puede ver, lo demás sobra", "Mostrar «cargando» a quien no tiene acceso es mentirle"],
          ["2 · Módulo", "Sin módulo no se pide nada", "Un esqueleto prometiendo datos que no vienen"],
          ["3 · Error y carga", "Solo si no hay nada que mostrar", "Con contenido en pantalla son avisos, no estados"],
          ["4 · Filtro", "Antes que «no hay resultados»", "Un filtro vacío no es un catálogo vacío, y confundirlos hace perder datos"],
        ],
      },
      {
        title: "Los quince prototipos, por versión",
        head: ["Versión", "Páginas"],
        rows: [
          ["v0.1", "Los estados, una vez · Inventario y exploración"],
          ["v0.2", "Inicio · Móvil · Superficie de operador · Inventario · Ajustes · Funnel de venta · Sidebar compacto"],
          ["v0.2.1", "Modo ficha · Studio pantallas · Studio plantillas"],
          ["v0.2.2", "Modo ficha · Studio pantallas · Studio plantillas"],
        ],
      },
      {
        title: "Las siete desviaciones que encontró la revisión",
        head: ["#", "Qué fallaba"],
        rows: [
          ["1", "La ficha no existía: seguía el formulario viejo, sin la barra de acciones ni el ícono de ayuda."],
          ["2", "Un servicio aparecía «sin ficha técnica» aunque tuviera beneficios."],
          ["3", "La IA escribía directo sobre el producto, sin pasar por la propuesta que se acepta o descarta."],
          ["4", "Seguía diciendo «IA» en textos que ve el cliente."],
          ["5", "Los textos de ayuda de cada campo eran inventados."],
          ["6", "La categoría no contaba como dato faltante."],
          ["7", "Faltaban las nueve plantillas nuevas de Studio."],
        ],
      },
    ],
    images: [
      {
        src: "/gigx/studio-versiones.svg",
        alt: "Escalera de versiones de los prototipos: v0.1, v0.2, v0.2.1 y v0.2.2, con lo que cambió en cada una",
        w: 1200,
        h: 470,
        size: "full",
        caption: "Las versiones · qué cambió en cada una",
      },
    ],
    stack: ["Claude Design", "Prototipos HTML", "Figma", "React", "Pruebas de fidelidad"],
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
    id: "ardipieles",
    kicker: "2019–2021 · E-commerce, en Ecomm Agency",
    title: "Ardipieles — la tienda que se sostuvo tres años",
    summary:
      "Calzado en cuero que vendía por WhatsApp y por catálogo suelto. Monté la tienda sobre WooCommerce, con sus categorías, sus banners y su fotografía, y la sostuve en producción tres años.",
    problem:
      "El catálogo existía en fotos y en conversaciones. Sin tienda, cada venta dependía de que alguien contestara el mensaje, y el inventario se actualizaba de memoria.",
    did: [
      "Montaje de la tienda sobre WooCommerce: tema, categorías, fichas de producto y flujo de compra.",
      "Banners por línea de producto —bolsos, calzado—, cada uno con su jerarquía y su color.",
      "Fotografía y retoque de producto, suficiente para que la ficha no dependiera de la descripción.",
      "Tres años de mantenimiento: cambios de temporada, campañas y lo que se rompía.",
      "Cuando el negocio creció, la tienda pasó a otro equipo con lo que ya estaba montado.",
    ],
    figures: [
      { value: "2019–2021", label: "tres años en producción" },
      { value: "WooCommerce", label: "tienda montada desde cero" },
      { value: "3", label: "líneas de producto con banner propio" },
    ],
    images: [
      {
        src: "/gigx/ardipieles/banner-bolsos.webp",
        alt: "Banner de la línea de bolsos de Ardipieles",
        w: 1170,
        h: 450,
        size: "full",
        caption: "Banner de línea",
      },
      {
        src: "/gigx/ardipieles/banner-bolsos-2.webp",
        alt: "Segundo banner de la línea de bolsos de Ardipieles",
        w: 1170,
        h: 450,
        size: "full",
        caption: "Otra temporada, mismo sistema",
      },
    ],
    stack: ["WooCommerce", "WordPress", "Photoshop", "Fotografía de producto"],
  },
  {
    id: "amatu",
    kicker: "2022 · E-commerce y calculadora a medida",
    title: "Amatu — la calculadora que evita que el cliente compre mal",
    summary:
      "Comida natural para perros que se vende por peso. El problema no era la tienda: era que nadie sabe cuánto come su perro. Construí la calculadora de ración, con sus dos caminos.",
    problem:
      "Si el cliente no sabe cuánta comida necesita su perro, escoge por precio o por tamaño del empaque, y el perro come mal. Una tienda de comida a peso vive o muere en esa cuenta: acertar la ración fideliza, equivocarla devuelve el producto.",
    did: [
      "La calculadora como función propia, no un formulario de contacto: mascota, salud, peso ideal, tamaño adulto, raza, etapa y actividad.",
      "Los dos caminos separados desde la primera pregunta. Si la salud es normal, la calculadora devuelve la ración diaria; si no, no inventa una cifra.",
      "Los comodines que evitan el abandono: «Criollo» y «No tengo idea» en la raza, y una tabla de peso al lado del campo para quien no lo sabe.",
      "El camino de salud termina en una solicitud: qué problema tiene, datos de contacto y el aviso de que el veterinario arma la dieta —recetas magistrales, no alimento medicado—.",
      "Etapas con rango explícito —cachorro de 2 a 12 meses, adulto de 1 a 6 años, senior de 7 o más— y actividad con descripción, no solo la palabra.",
    ],
    figures: [
      { value: "2", label: "caminos: ración calculada o dieta con veterinario" },
      { value: "8", label: "variables de entrada, con dos comodines" },
      { value: "0", label: "cifras inventadas cuando la salud no es normal" },
    ],
    images: [
      {
        src: "/gigx/amatu/calculadora.webp",
        alt: "Calculadora de ración de Amatu en el sitio: elige tu mascota y avisa que faltan datos",
        w: 1440,
        h: 1000,
        size: "full",
        caption: "La calculadora, en vivo",
      },
      {
        src: "/gigx/amatu/camino-sano.webp",
        alt: "Formulario de la calculadora cuando el perro tiene salud normal: peso ideal, tamaño, raza, etapa y actividad",
        w: 900,
        h: 1377,
        size: "half",
        caption: "Camino normal · calcula la ración",
      },
      {
        src: "/gigx/amatu/camino-salud.webp",
        alt: "Camino de salud de la calculadora: problema, datos de contacto y solicitud de dieta al veterinario",
        w: 900,
        h: 1377,
        size: "half",
        caption: "Camino de salud · deriva al veterinario",
      },
    ],
    links: [{ label: "Ver la calculadora ↗", href: "https://amatumascota.co/calculadora/" }],
    stack: ["WooCommerce", "WordPress", "Diseño de flujos", "Formularios", "Figma"],
  },
  {
    id: "arizas",
    kicker: "2021–2022 · Portafolio, sitio y manual de venta",
    title: "Arizas Tools — el portafolio que vendía herramientas, y el manual de venta que no llegó a implementarse",
    summary:
      "Un distribuidor de herramientas para fusión de tuberías que vendía con un PDF suelto. Le construí el portafolio comercial, las fichas de cada línea y el sitio. Y diseñé, además, el manual completo de venta por canal: ese no llegó a implementarse.",
    problem:
      "La herramienta se vende por lo que hace, y el vendedor la mostraba en un PDF que se veía igual en cualquier pantalla. Pero el problema estaba antes del catálogo: la venta ocurría en WhatsApp, sin etapas, sin respuestas preparadas y sin forma de saber en qué punto se caía el cliente.",
    did: [
      "Portafolio comercial: la línea completa presentada como catálogo, no como lista de precios. Fichas gráficas por producto con referencia, medida y uso, en una pieza que se envía por WhatsApp.",
      "Sitio con el portafolio dentro: catálogo, servicios y contacto en el mismo lugar, con su propio botón de portafolio.",
      "**El copy de publicación, escrito para cada canal**: título con la norma técnica en el nombre, descripción con materiales y aplicaciones, características verificables y precio con IVA.",
      "**Respuestas preparadas para las preguntas que siempre llegan** —disponibilidad, garantía, ubicación, envíos, a qué se dedican— con el tono de la empresa y sin improvisar.",
      "**Calificación antes de cotizar**: NIT, orden de compra, disponibilidad de pago y confirmación para separar producción. Sin eso, cotizar es trabajar gratis.",
      "**El traspaso a WhatsApp con mensaje de redirección y enlace directo**, y la razón anotada al lado: mover la conversación a WhatsApp aumenta la probabilidad de cierre.",
      "**Seguimiento a las 24–48 horas** con un mensaje que retoma la cotización pendiente y ayuda a elegir el modelo, más cross-selling de lo que también cargan cuando hay confianza.",
      "El tablero parte de un diagnóstico —un «detector de fugas» sobre conversaciones reales de WhatsApp— y no de una plantilla.",
    ],
    figures: [
      { value: "8", label: "etapas del manual de venta, del copy al seguimiento" },
      { value: "1", label: "diagnóstico previo sobre conversaciones reales" },
      { value: "0", label: "etapas implementadas: se diseñó y no se lanzó" },
    ],
    tables: [
      {
        title: "El manual de venta, etapa por etapa",
        head: ["Etapa", "Qué incluye", "Por qué está"],
        rows: [
          ["1 · Copy de publicación", "Título con la norma en el nombre, descripción con materiales, características verificables y precio con IVA", "Que lleguen consultas útiles, no cualquier consulta"],
          ["2 · Respuesta rápida", "Plantillas para disponibilidad, garantía, ubicación, envíos y «a qué se dedican»", "Contestar en segundos lo que siempre se pregunta"],
          ["3 · Preguntas clave", "¿Es para una empresa? ¿En qué ciudad están?", "Dos preguntas que separan al curioso del comprador"],
          ["4 · Calificación", "NIT, orden de compra, disponibilidad de pago, confirmación para separar producción", "No cotizar sin saber si puede comprar"],
          ["5 · Traspaso a WhatsApp", "Mensaje de redirección, enlace directo con texto precargado", "Mover la conversación al canal donde se cierra"],
          ["6 · Presentación", "Ficha técnica, fotos, precio según trabajo, disponibilidad, pago, envío y tiempo de respuesta", "Una sola entrega ordenada, no siete mensajes sueltos"],
          ["7 · Seguimiento 24–48 h", "Retomar la cotización pendiente y ayudar a elegir el modelo", "El mensaje que casi nadie manda y donde se pierde la venta"],
          ["8 · Cross-selling", "Lo que también cargan, cuando ya hay confianza", "Subir el ticket sin ensuciar la venta principal"],
        ],
      },
    ],
    images: [
      {
        src: "/gigx/arizas/web.webp",
        alt: "Sitio de Arizas Tools con el acceso al portafolio comercial",
        w: 1440,
        h: 820,
        size: "full",
        caption: "El sitio · portafolio incluido",
      },
      {
        src: "/gigx/video/corp-35.jpg",
        alt: "Fotograma de una pieza de video de Arizas Tools con una herramienta en primer plano",
        w: 1200,
        h: 676,
        size: "half",
        caption: "Video de apoyo",
      },
      {
        src: "/gigx/video/arizas-short-1.jpg",
        alt: "Fotograma de un short de producto de Arizas Tools",
        w: 1600,
        h: 900,
        size: "half",
        caption: "Pieza corta",
      },
    ],
    links: [{ label: "Ver el sitio ↗", href: "https://arizas.co" }],
    footnote:
      "El manual se detuvo en el traspaso a WhatsApp: para diseñar el paso siguiente hacía falta información que solo tenía el equipo del cliente. La pedí varias veces y no llegó. Sin ese dato no se puede diseñar, así que se abandonó. El sitio y el portafolio sí se entregaron.",
    stack: ["FigJam", "Illustrator", "Photoshop", "WordPress", "Premiere"],
  },
  {
    id: "wallo",
    kicker: "2020–2021 · Producto digital y UX, en Ecomm Agency",
    title: "Wallo — tarjetas de membresía en el teléfono",
    summary:
      "Una app para llevar las tarjetas de fidelidad del bolsillo al teléfono, con activación por NFC: el flujo completo, del registro al primer uso. Se hizo dentro del equipo de Ecomm Agency.",
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
      { value: "62", label: "pantallas e imágenes del proyecto" },
      { value: "6", label: "secciones: inicio, membresías, tarjeta, documentos, personalizado y tema oscuro" },
      { value: "NFC", label: "activación de la tarjeta desde el teléfono" },
    ],
    images: [
      {
        src: "/gigx/wallo/tablero.webp",
        alt: "Tableros de sección del proyecto Wallo: inicio, membresías, tarjetas, documentos, personalizado, procesamiento y tema oscuro, cada uno con decenas de pantallas",
        w: 1352,
        h: 2272,
        size: "full",
        caption: "El proyecto entero · siete secciones, decenas de vistas",
      },
    ],
    stack: ["Figma", "Prototipo", "iOS", "Android", "NFC"],
  },
  {
    id: "pantou",
    kicker: "2023–2024 · Diseño UX/UI y design systems",
    title: "PANTOU — un sistema, seis marcas",
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
        src: "/gigx/pantou-estilos.webp",
        alt: "Guía de estilos del sistema: paletas tonales por nivel (primaria, secundaria, peligro y neutra) y la tipografía con sus pesos",
        w: 1200,
        h: 1872,
        size: "full",
        caption: "Sistema · paletas y tipografía",
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
      "Distribuidor industrial B2B de herramientas para termofusión y electrofusión. El catálogo vivía en un PDF; hoy es un buscador que piensa como el técnico que va a comprar.",
    problem:
      "El catálogo era un PDF de 41 fichas y cotizar dependía de llamadas y correos sueltos. Pero el problema de fondo era otro: un instalador no busca «raspador», busca la herramienta que le sirva para un tubo de media pulgada. Si el catálogo no lo deja filtrar por eso, tiene que abrir el PDF, leer la ficha y adivinar si le sirve.",
    did: [
      "El PDF convertido en 41 fichas técnicas filtrables, cada una con los atributos que de verdad se usan: tecnología, medida y serie. Sin ese dato, buscar es imposible.",
      "Buscador por medida con las cinco que se venden —1/2\" (20 mm), 3/4\" (25 mm), 1\" (32 mm), 2\" (63 mm) y 110 mm—, mostrando la equivalencia en pulgadas y en milímetros, porque el técnico piensa en pulgadas y el catálogo está en milímetros.",
      "La medida vive en la dirección (`/store/?medida=63`), no en el estado del navegador: el vendedor le manda el enlace al cliente por WhatsApp y el cliente cae en el mismo resultado, filtrado. Un filtro que no se puede compartir no sirve en una venta que se hace por chat.",
      "Filtro por serie y por tecnología, para el que ya sabe qué referencia quiere y no quiere leer fichas.",
      "Blog con SEO: cada medida y cada tecnología tiene su página, y la búsqueda orgánica llega por ahí.",
      "Mini-CRM que une leads, correo y cotizaciones formales en PDF, para que la cotización deje de depender de un correo suelto.",
    ],
    figures: [
      { value: "41", label: "fichas desde un PDF, con atributos filtrables" },
      { value: "5", label: "medidas, en pulgadas y milímetros" },
      { value: "1", label: "enlace que se comparte con el filtro puesto" },
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
        alt: "Catálogo de Fusion Pipe Tools filtrado por medida y tecnología",
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
    id: "gigxos",
    kicker: "2026 · Sistema propio, en uso diario",
    title: "gigxOS — la memoria que sobrevive a cada sesión",
    summary:
      "No es una app: es el sistema con el que trabajo con IA sin perder el hilo. Un vault como fuente única, decisiones que quedan escritas y una puerta automática que impide que la deuda de documentación crezca.",
    problem:
      "Trabajar con agentes de IA tiene un fallo de origen: la sesión termina y el contexto se va. Se repiten decisiones ya tomadas, se contradice lo aprobado la semana pasada y cada sesión vuelve a empezar de cero. Un asistente sin memoria no es un equipo: es un becario nuevo todos los días.",
    did: [
      "Un vault como fuente única de verdad: 1.101 notas donde el proyecto vive, no en el chat. Cada documento de entidad declara ocho campos obligatorios, entre ellos en qué estado está y cuánto se puede confiar en él.",
      "88 decisiones de arquitectura con contexto, alternativas descartadas y consecuencias. Un ADR aceptado no se edita para cambiar de opinión: se escribe otro que lo marca como reemplazado.",
      "71 checkpoints como traspaso entre sesiones. El borrador lo emite un script leyendo el git de cada repositorio —ramas, commits sin empujar, archivos sucios— y después se cura a mano, porque el git dice qué se hizo y no por qué.",
      "22 playbooks con procedimientos ya pagados: desplegar, migrar un DNS con correo vivo, montar un sitio de cliente. Lo que se resolvió una vez no se vuelve a improvisar.",
      "Un buzón entre agentes con 296 entradas: 143 cerradas y 101 pendientes. Tiene protocolo —una sola sesión escribe a la vez, nunca se edita una entrada ajena— y un hook que inyecta los pendientes al empezar cada sesión.",
      "Una puerta de ocho reglas que corre en cada push y cada pull request. No exige cero hallazgos: exige que ningún conteo supere la línea base guardada en el repositorio. Si un número mejora, la línea baja sola y pide commitear el ajuste, para que el trinquete no devuelva margen.",
      "50 skills como instrucciones reutilizables: 14 de diseño en el proyecto y 36 de infraestructura, producto y contenido en el perfil. El procedimiento se escribe una vez y se ejecuta igual cada vez, por mí o por un agente.",
    ],
    figures: [
      { value: "1.101", label: "notas: el proyecto vive en el vault, no en el chat" },
      { value: "88", label: "decisiones con contexto, alternativas y consecuencias" },
      { value: "8", label: "reglas en cada push, con trinquete contra la línea base" },
    ],
    tables: [
      {
        title: "El ciclo de una sesión",
        head: ["Paso", "Qué pasa"],
        rows: [
          ["1 · Arranque", "Se lee el Context Pack de la entidad: 7 packs con el estado compacto de cada proyecto."],
          ["2 · Coordinación", "Un hook inyecta al contexto las entradas pendientes del buzón dirigidas a esa sesión."],
          ["3 · Trabajo", "Se abre el documento fuente; el modelo no responde de memoria."],
          ["4 · Verificación", "La puerta mira el vault entero y compara cada conteo contra la línea base."],
          ["5 · Cierre", "Un checkpoint deja el traspaso: ramas, commits, pendientes y cómo retomar."],
          ["6 · Decisión", "Si hubo una decisión de peso, queda como ADR con su motivo."],
        ],
      },
      {
        title: "Los ocho campos que declara cada entidad",
        head: ["Campo", "Valores o función"],
        rows: [
          ["numeric_id y slug", "Identidad estable: el número no cambia aunque cambie el nombre."],
          ["supername", "El nombre legible del documento."],
          ["domain", "A qué parte del ecosistema pertenece: IDENTITY, BRANDS, VENTURES, SPEC, SYSTEM…"],
          ["lifecycle", "draft · active · deprecated · archived — en construcción, vigente, en desuso o retirado."],
          ["trust_level", "speculative · provisional · verified — hipótesis, a medias, o comprobado contra fuente."],
          ["created y updated", "La fecha de creación no cambia nunca; la de actualización, solo en cambios sustantivos."],
        ],
      },
      {
        title: "Las ocho reglas y la deuda que la puerta acepta hoy",
        head: ["Regla", "Qué rechaza", "Norma", "Hoy"],
        rows: [
          ["R1", "Documento de entidad sin frontmatter", "GOS-005", "75"],
          ["R2", "Enlace que no resuelve, en Markdown o en wikilink", "ADR-003 / ADR-013", "7"],
          ["R3", "`supersedes` que apunta a un documento que no existe", "ADR-008", "0"],
          ["R4", "Carpeta sin README", "Constitución, art. 8", "6"],
          ["R5", "`lifecycle` o `trust_level` fuera del vocabulario", "GOS-001 / ADR-004", "5"],
          ["R6", "Documento vigente que enlaza a uno retirado sin marcarlo", "ADR-008", "0"],
          ["R7", "Contenido retirado que no bajó su señal de confianza", "ADR-008, enmienda", "0"],
          ["R8", "Dato de tercera parte fuera de la carpeta privada", "Arq-Business-OS § 11", "0"],
        ],
      },
      {
        title: "Lo que el sistema no hace, y por qué",
        head: ["Decisión", "Motivo"],
        rows: [
          ["No distingue error de advertencia", "Solo cuenta. Bloquear por severidad obligaría a apagar reglas; el trinquete deja la deuda existente y prohíbe crecer."],
          ["No tiene pre-commit", "El commit no se frena: la puerta corre en CI y en el cierre de jornada. Un check que estorba se termina desactivando."],
          ["El índice de ADR no se escribe a mano", "Lo genera un script leyendo el frontmatter, porque el índice manual se detuvo en el ADR-032 y quedó mintiendo."],
        ],
      },
    ],
    images: [
      {
        src: "/gigx/gigxos-mapa.svg",
        alt: "Mapa conceptual del vault: context packs, decisions, checkpoints, playbooks, buzón, marcas, automatización, contrato de IA, ontología, constitución y archivo",
        w: 1200,
        h: 460,
        size: "full",
        caption: "El mapa · qué guarda cada parte",
      },
    ],
    footnote:
      "La puerta no se cree al README: cuenta el arbol. Hoy la prosa dice \"siete reglas\" y hay ocho, y la linea base declara 753 documentos cuando hay 967. El mecanismo sigue exacto porque mide archivos, no lo que dicen de si mismos.",
    stack: ["Markdown", "Git", "Python", "GitHub Actions", "Agentes de IA"],
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
  {
    id: "wompi",
    kicker: "2026 · UX/UI de una integración de pagos",
    title: "Wompi — la pantalla que se volvió simple quitando piezas",
    summary:
      "Conectar una pasarela de pagos no es llenar un formulario: son dos ambientes, cuatro llaves, secretos que no se pueden volver a mostrar y el riesgo de cobrar en pruebas o probar en producción. La versión final se siente obvia porque casi todo lo que tenía antes desapareció.",
    problem:
      "La primera versión heredaba el patrón del resto del panel: una lista de integraciones que se desplegaba como acordeón. Con ocho integraciones, configurar Wompi era bajar por la lista, abrir la tarjeta, encontrar el campo entre los demás, guardar y volver a subir para ver qué había pasado. El riesgo no era estético: una llave pegada a medias o un modo equivocado se ve igual que una configuración correcta hasta que alguien intenta pagar.",
    did: [
      "La lista dejó de configurarse en línea. Cada integración tiene su propia página: una sola tarea, un solo Guardar y una vuelta clara a Integraciones.",
      "Los dos ambientes —producción y pruebas— conviven en paralelo, con el modo activo marcado en el título. Se quitó el selector superior porque repetía lo que las tarjetas ya decían y competía por la misma decisión. El modo se cambia desde el bloque; al guardar, el que deja de estar activo pierde «En uso» y el nuevo lo gana.",
      "Cada llave muestra su prefijo real por ambiente —pub_prod_, prv_test_, prod_events_, test_integrity_— en el propio campo, no en una ayuda aparte. El prefijo es la primera pista de que se está pegando la llave correcta.",
      "Las llaves guardadas nunca vuelven al navegador. El servidor descifra en memoria, envía solo un fragmento enmascarado y el panel permite ver un poco más bajo demanda. No se puede comparar lo que no se expone.",
      "Editar una llave es un clic: el campo entra en edición con el cursor dentro, listo para pegar. Se eliminaron los botones «Cambiar» y «Cancelar» al lado del input; el ojo para revelar y la X para cancelar viven dentro del campo.",
      "La URL de eventos dejó de ser un dato escondido en la documentación: está visible, con botón de copiar y, en móvil, se despliega con «Ver más» para no robar espacio.",
      "La navegación se ordenó por niveles: Ajustes → Integraciones → Wompi. En móvil hay un solo volver y hace una sola cosa; el sitio se eligió una vez y se quitó el que se repetía en el encabezado.",
      "El texto que explicaba cada pantalla pasó a un icono de información con tooltip. La explicación sigue ahí cuando se busca, pero deja de ocupar una línea permanente en todas las pantallas de ajustes.",
      "El chip «Modo pruebas» quedó solo en el listado y solo cuando esa integración tiene activo su modo de pruebas. La cinta diagonal que lo repetía se eliminó: el estado se lee una vez.",
    ],
    figures: [
      { value: "2", label: "ambientes en la misma pantalla, sin selector aparte" },
      { value: "4", label: "llaves con prefijo propio por ambiente" },
      { value: "1", label: "clic para editar una llave" },
    ],
    tables: [
      {
        title: "Lo que se quitó y por qué",
        head: ["Lo que había", "La decisión", "El motivo"],
        rows: [
          ["Acordeón dentro de la lista", "Página por integración", "Ocho tarjetas abiertas compiten entre sí; una página enfoca una sola tarea."],
          ["Selector de modo arriba", "Cambio desde el bloque y «En uso» en el título", "Dos controles para la misma decisión obligan a pensar cuál manda."],
          ["Botones «Cambiar» y «Cancelar» al lado", "Campo editable en un clic, acciones dentro del input", "El botón lateral rompía la lectura y añadía un paso a la intención real: pegar."],
          ["«Guardado y cifrado» en cada campo", "Fragmento enmascarado y una sola nota de seguridad", "Repetir la misma frase cuatro veces informa menos que mostrar la llave."],
          ["URL de eventos en la documentación", "URL visible con copiar y despliegue en móvil", "Si hay que buscarla fuera, se copia mal."],
          ["Dos volver en móvil", "Un volver por nivel", "Dos botones que hacen lo mismo son una decisión pendiente para el usuario."],
        ],
      },
    ],
    images: [
      {
        src: "/gigx/shots/wompi-panel.webp",
        alt: "Detalle de Wompi en el panel de Merez: llaves de producción y pruebas en paralelo, modo en uso y URL de eventos",
        w: 1440,
        h: 1000,
        size: "full",
        caption: "La integración · dos ambientes a la vista",
      },
      {
        src: "/gigx/shots/wompi-keys.webp",
        alt: "Campo de llave privada en edición dentro del panel, con el prefijo del ambiente y las acciones dentro del campo",
        w: 1600,
        h: 717,
        size: "full",
        caption: "Editar una llave · un clic y el cursor dentro",
      },
      {
        src: "/gigx/shots/wompi-mobile.webp",
        alt: "La misma integración en móvil, con un solo volver y los campos de producción",
        w: 390,
        h: 844,
        size: "phone",
        caption: "Móvil · un volver por nivel",
      },
    ],
    footnote:
      "Lo que parece simple es lo que queda después de quitar: dos ambientes sin selector, cuatro llaves sin exponerlas, una URL sin buscarla y un solo camino de vuelta. La simplicidad no fue el punto de partida; fue el resultado de cada decisión sobre qué no mostrar.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Laravel", "Wompi", "Diseño de producto"],
  },
];

export type TimelineEntry = { year: string; title: string; items: string[] };

export const timeline: TimelineEntry[] = [
  {
    year: "2013",
    title: "Primer trabajo",
    items: ["Auxiliar contable en Calzado Caprino, en contrato de prácticas: seis meses."],
  },
  {
    year: "2014–2015",
    title: "Diseñador gráfico",
    items: [
      "Maquinaria en Línea: rediseño del marketplace y manejo de sus redes.",
      "Language Products, en paralelo.",
    ],
  },
  {
    year: "2016–2018",
    title: "Contenido y mercados hispanos",
    items: ["Representante de talento en BroadcastTV: creadores y audiencia hispana."],
  },
  {
    year: "2019–2021",
    title: "ECOMM Agency",
    items: [
      "Tráfico, diseño web y dirección de contenidos.",
      "Más de 30 sitios en WordPress y 10 campañas de Facebook Ads.",
      "Wallo: prototipo de la app de membresías, 128 vistas en Figma.",
      "Capacitación a dos grupos de la Universidad UNAN, Nicaragua.",
    ],
  },
  { year: "2021", title: "Nace Inflinds S.A.S.", items: ["Fusion Pipe Tools", "Acertar (sitio + e-learning)", "Llévalo", "Arizas Tools"] },
  {
    year: "2022–2023",
    title: "Pausa profesional",
    items: ["Nueve meses dedicados al cuidado de mis hijos."],
  },
  {
    year: "2023–2024",
    title: "Design systems en PANTOU",
    items: [
      "Seis marcas: Onda de Mar, Festina, Invicta, Technomarine, Kreditime y Toktok",
      "Hoja de componentes y tokens CSS por marca, para Angular y Shopify",
      "Investigación con Clarity, mapas de calor y card sorting",
    ],
  },
  { year: "2022–2024", title: "Más sitios y tiendas", items: ["Amatu", "César el Tributarista", "CEAMAC", "Estructálica", "Plantación Tenampa"] },
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
  { year: "2014", text: "Primeros diseños" },
  { year: "2019–2021", text: "ECOMM Agency" },
  { year: "2021", text: "Funda Inflinds" },
  { year: "2023–2024", text: "Design systems en PANTOU" },
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
export const faq = [
  {
    q: "¿Diseñas o también construyes?",
    a: "Las dos. Diseño el producto y lo llevo a producción: React, Next y Laravel. Merez es el caso completo, de la primera pantalla al último despliegue.",
    href: "/gigx/portfolio/#merez",
    link: "Ver Merez",
  },
  {
    q: "¿Has hecho investigación con usuarios?",
    a: "Medición de producto, sí, y con decisiones detrás. Investigación formal con usuarios la hice en PANTOU —pruebas de usabilidad, mapas de calor y card sorting en Clarity— y de eso no se puede publicar el material. Prefiero decirlo así antes que adornarlo.",
    href: "/gigx/portfolio/#medicion",
    link: "Ver medición",
  },
  {
    q: "¿Cómo trabajas con el equipo de ingeniería?",
    a: "Con el diseño escrito donde se puede comparar. Reviso lo construido contra los prototipos y documento cada desviación; de ahí salen pruebas que comparan el código con el diseño, en vez de depender de que alguien lo note.",
    href: "/gigx/portfolio/#studio",
    link: "Ver el proceso",
  },
  {
    q: "¿Cómo sabes si un diseño funcionó?",
    a: "Midiendo antes y después. Un COUNT(*) contra producción cambió el rumbo de un proyecto; contar inodos cambió un modelo de precios. Los cinco hallazgos están en el portafolio con la decisión que provocaron.",
    href: "/gigx/portfolio/#medicion",
    link: "Ver los cinco hallazgos",
  },
  {
    q: "¿Qué pasa cuando un proyecto no sale?",
    a: "Se dice. En Arizas el flujo de venta quedó diseñado y no se implementó porque faltaba información que solo tenía el equipo del cliente: la pedí varias veces y no llegó. El sitio y el portafolio sí se entregaron.",
    href: "/gigx/portfolio/#arizas",
    link: "Ver Arizas",
  },
  {
    q: "¿Cuál es tu relación con la IA?",
    a: "Construyo con ella, no la uso de adorno: agentes con herramientas y aprobación humana, costo medido por proceso, y un sistema que hace que cada sesión no empiece de cero.",
    href: "/gigx/portfolio/#gigxos",
    link: "Ver gigxOS",
  },
];

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
