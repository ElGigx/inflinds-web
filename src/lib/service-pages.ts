export type ServiceSlug =
  | "diseno"
  | "desarrollo"
  | "automatizacion"
  | "inteligencia-artificial"
  | "consultoria"
  | "seo-geo";

export type ServiceProcessStep = {
  name: string;
  outcome: string;
};

export type ServiceProof = {
  client: string;
  sector: string;
  summary: string;
  facts: string[];
};

export type ServiceLimit = {
  title: string;
  reason: string;
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceCta = {
  title: string;
  text: string;
  label: string;
};

export type ServicePage = {
  slug: ServiceSlug;
  tag: string;
  title: string;
  promise: string;
  intro: string;
  signals: string[];
  deliverables: string[];
  process: ServiceProcessStep[];
  stack: string[];
  proof: ServiceProof;
  whenNot: ServiceLimit[];
  faq: ServiceFaq[];
  related: ServiceSlug[];
  cta: ServiceCta;
};

export const servicePages: ServicePage[] = [
  {
    slug: "diseno",
    tag: "Diseño",
    title: "Diseño de producto y experiencia",
    promise: "Que quien llega entienda qué vendes y pueda decidir sin preguntarte.",
    intro:
      "Diseñamos la experiencia antes de dibujar pantallas: qué necesita saber el cliente, en qué orden y qué lo hace dudar. Después queda una interfaz y un sistema de componentes que tu equipo puede reutilizar sin volver a empezar en cada página.",
    signals: [
      "Tus clientes preguntan por WhatsApp cosas que ya están escritas en el sitio.",
      "Cada página nueva se diseña desde cero porque no hay componentes ni reglas de estilo.",
      "El producto funciona, pero explicarlo toma más de una reunión.",
      "La marca se ve distinta en cada canal y nadie tiene la versión vigente.",
    ],
    deliverables: [
      "Entrevistas y pruebas con usuarios, con hallazgos priorizados por impacto.",
      "Arquitectura de información: sitemap, flujos y modelo de contenido.",
      "Wireframes y prototipo navegable para validar antes de construir.",
      "Interfaz final responsive, con estados vacíos, de error y de carga resueltos.",
      "Design system: tokens, tipografía, componentes y reglas de uso.",
      "Plantillas de página y de ficha que se llenan sin diseñador.",
      "Revisión de accesibilidad: contraste, foco, teclado y textos alternativos.",
      "Documento de traspaso a desarrollo con especificaciones y criterios de aceptación.",
    ],
    process: [
      { name: "Descubrimiento", outcome: "Queda escrito el problema, el objetivo y cómo se va a medir." },
      { name: "Investigación", outcome: "Sabes qué pregunta tu cliente y qué le impide decidir hoy." },
      { name: "Arquitectura", outcome: "Mapa de páginas, contenidos y flujos aprobado antes de diseñar." },
      { name: "Prototipo", outcome: "La experiencia se prueba con usuarios y se corrige sin costo de desarrollo." },
      { name: "Sistema", outcome: "Interfaz y componentes documentados para que el equipo los use solo." },
    ],
    stack: ["Figma", "Open Design (Claude)", "Tailwind CSS", "WCAG 2.2", "Git"],
    proof: {
      client: "Fusion Pipe Tools",
      sector: "Distribución industrial B2B",
      summary:
        "Rediseño del sitio y del catálogo de un distribuidor de tuberías de termofusión y electrofusión, para que el comprador técnico encuentre la referencia sin llamar.",
      facts: [
        "Rediseño UX/UI del sitio público, con arquitectura de información nueva.",
        "Catálogo de 41 fichas con sistema de atributos y variantes.",
        "Fichas técnicas interactivas dentro del catálogo.",
      ],
    },
    whenNot: [
      {
        title: "Ya tienes un design system vivo y solo falta una pantalla",
        reason:
          "Si el sistema existe, está documentado y el equipo lo usa, lo que necesitas es ejecución dentro de esas reglas, no un rediseño. Hacer la pantalla se puede; venderte un sistema nuevo, no.",
      },
      {
        title: "El problema es la oferta, no la interfaz",
        reason:
          "Si el producto no resuelve lo que el cliente necesita, una interfaz más clara solo hace que se note antes. Primero se arregla la oferta.",
      },
    ],
    faq: [
      {
        q: "¿Puedo contratar solo el diseño y desarrollar con mi equipo?",
        a: "Sí. Entregamos Figma, componentes y especificaciones para que tu equipo construya. Si después necesitas acompañamiento en la implementación, se suma por separado.",
      },
      {
        q: "¿Trabajan con la marca que ya tengo?",
        a: "Sí. Partimos de tu logo, colores y tipografía y los convertimos en reglas usables: qué combinación va en cada caso y qué no se toca. Si la marca no está definida, se ordena primero.",
      },
      {
        q: "¿Cuántas rondas de ajuste incluye?",
        a: "Las que estén escritas en la propuesta, con el alcance definido. Cada ronda se revisa sobre el prototipo o la pantalla concreta, no sobre opiniones sueltas.",
      },
      {
        q: "¿Qué necesitas de mi parte para empezar?",
        a: "Acceso a tus analíticas si existen, ejemplos de clientes reales y una persona con autoridad para aprobar. Sin eso, el diseño se decide por gusto.",
      },
    ],
    related: ["desarrollo", "consultoria"],
    cta: {
      title: "¿Tu sitio explica lo que vendes?",
      text: "Cuéntanos a quién le vendes y qué te preguntan antes de comprar. Con eso sabemos si hace falta rediseñar o solo ordenar.",
      label: "Revisar mi producto",
    },
  },
  {
    slug: "desarrollo",
    tag: "Desarrollo",
    title: "Desarrollo web y de plataformas",
    promise: "Sitios, tiendas y plataformas que aguantan la operación real, no solo la demo.",
    intro:
      "Construimos desde una landing hasta un panel administrativo con permisos, historial y cobros. Lo hacemos sobre Merez cuando el problema ya está resuelto ahí, y a la medida cuando la operación tiene reglas propias.",
    signals: [
      "El pedido se pierde entre el chat, la hoja de cálculo y el correo.",
      "Necesitas un panel para operar y hoy todo vive en Excel.",
      "Cada cambio en el sitio depende de alguien que ya no está en la empresa.",
      "Tu tienda vende, pero el inventario y los pedidos se concilian a mano.",
    ],
    deliverables: [
      "Sitio corporativo o landing con contenido editable y medición instalada.",
      "Tienda en línea con catálogo, pedidos, inventario y pagos.",
      "Plataforma administrativa con roles, permisos e historial de cambios.",
      "API y modelo de datos documentados, con migraciones y respaldos.",
      "Integración con los servicios que ya usas: correo, pagos y analítica.",
      "Ambiente de pruebas, despliegue y certificado SSL configurados.",
      "Manual de operación y traspaso de accesos al cliente.",
      "Soporte y evolución después del lanzamiento, si la relación sigue.",
    ],
    process: [
      { name: "Descubrimiento", outcome: "Alcance escrito: qué entra, qué no y qué depende de terceros." },
      { name: "Arquitectura", outcome: "Modelo de datos, permisos y flujos definidos antes de programar." },
      { name: "Construcción", outcome: "Entregas por partes que puedes probar, no una caja negra al final." },
      { name: "Pruebas", outcome: "QA funcional, accesibilidad y rendimiento en dispositivos reales." },
      { name: "Puesta en producción", outcome: "Deploy, dominio, SSL y respaldo; el sistema queda operando y documentado." },
    ],
    stack: ["PHP 8.2", "MySQL", "Tailwind CSS", "Next.js", "WordPress", "Shopify", "Hostinger"],
    proof: {
      client: "Acertar",
      sector: "Certificación y validación documental",
      summary:
        "Plataforma que emite, consulta y verifica certificados digitales, con consulta pública y panel administrativo.",
      facts: [
        "Consulta pública de certificados por número de documento.",
        "Verificación de autenticidad por código.",
        "Panel administrativo para emitir y gestionar certificados.",
        "Modelo de base de datos e integración API entre frontend y backend.",
      ],
    },
    whenNot: [
      {
        title: "Basta con una herramienta que ya existe",
        reason:
          "Si un CRM, una tienda o un formulario estándar resuelve el problema, montarlo cuesta menos que construir. Te lo decimos aunque signifique no vender desarrollo.",
      },
      {
        title: "No hay quién reciba el sistema",
        reason:
          "Una plataforma sin dueño interno se abandona. Si nadie va a operarla, primero se define quién la usa y qué decide con ella.",
      },
    ],
    faq: [
      {
        q: "¿Construyen sobre Merez o desde cero?",
        a: "Depende. Si el problema es catálogo, cotizaciones, pedidos, cobros o agentes, Merez ya lo resuelve y se configura. Si la operación tiene reglas que no caben, se construye a la medida.",
      },
      {
        q: "¿El código queda mío?",
        a: "Sí. Al cerrar el proyecto entregamos repositorio, accesos y documentación. Puedes seguir con tu equipo o con nosotros.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "Un sitio informativo toma semanas; una plataforma con permisos, datos y cobros toma meses. La propuesta dice el rango y qué lo mueve.",
      },
      {
        q: "¿Puedo empezar por un módulo?",
        a: "Sí. Se puede arrancar por la parte que más duele —catálogo, pedidos, cotizaciones— y crecer desde ahí.",
      },
    ],
    related: ["diseno", "automatizacion"],
    cta: {
      title: "¿Lo que necesitas ya existe o hay que construirlo?",
      text: "Descríbenos la operación como es hoy y te decimos qué se configura, qué se construye y qué no vale la pena.",
      label: "Contar mi operación",
    },
  },
  {
    slug: "automatizacion",
    tag: "Automatización",
    title: "Automatización de procesos",
    promise: "Que el trabajo repetitivo deje de depender de que alguien se acuerde.",
    intro:
      "Conectamos las herramientas que ya usas para que el dato pase solo de una a otra. Cada automatización nace de una tarea concreta, con un dueño y una forma de comprobar que corrió.",
    signals: [
      "Alguien copia datos entre dos herramientas todos los días.",
      "Las notificaciones dependen de que una persona se acuerde de enviarlas.",
      "Un mismo pedido se registra tres veces: en el chat, en la hoja y en el sistema.",
      "Te enteras de que el proceso falló cuando el cliente reclama.",
    ],
    deliverables: [
      "Mapa del proceso actual con pasos manuales, responsables y puntos de falla.",
      "Integraciones entre plataformas por API o webhook, con manejo de errores.",
      "Formularios que validan y escriben directo en la base, sin copiar y pegar.",
      "Notificaciones automáticas por correo o WhatsApp según el evento.",
      "Sincronización entre CRM, correo, facturación y catálogo.",
      "Registro de ejecuciones: qué corrió, cuándo y qué falló.",
      "Alertas cuando un flujo se cae, antes de que el cliente lo note.",
      "Manual del flujo y procedimiento para cambiarlo.",
    ],
    process: [
      { name: "Mapa", outcome: "El proceso actual queda dibujado y los pasos manuales, marcados." },
      { name: "Prioridad", outcome: "Se elige la tarea que más tiempo cuesta y menos riesgo tiene." },
      { name: "Conexión", outcome: "Las herramientas quedan integradas y el dato viaja sin intervención." },
      { name: "Prueba", outcome: "Se corre con casos reales hasta que el flujo aguanta." },
      { name: "Monitoreo", outcome: "Queda registro y alerta: si se detiene, alguien se entera." },
    ],
    stack: ["PHP 8.2", "MySQL", "API REST", "Webhooks", "PHPMailer (SMTP)", "Cron", "Merez"],
    proof: {
      client: "Fusion Pipe Tools",
      sector: "Distribución industrial B2B",
      summary:
        "Mini-CRM que unifica los leads del sitio, el correo del negocio y las cotizaciones en PDF, para que el pedido no se pierda en la bandeja.",
      facts: [
        "Los leads del sitio entran a un solo registro, no a una bandeja de correo.",
        "Correo del negocio integrado por IMAP y SMTP en el mismo panel.",
        "Cotizaciones formales en PDF generadas desde el mismo dato.",
        "Sitio, catálogo y CRM comparten el mismo dato, sin copiarlo a mano.",
      ],
    },
    whenNot: [
      {
        title: "El proceso cambia cada semana",
        reason:
          "Automatizar un proceso inestable congela el desorden. Primero se define cómo debe funcionar y quién decide las excepciones.",
      },
      {
        title: "El volumen no justifica el montaje",
        reason:
          "Si la tarea toma minutos al mes, automatizarla cuesta más de lo que ahorra. Se resuelve con una plantilla o una regla simple.",
      },
    ],
    faq: [
      {
        q: "¿Tengo que cambiar de herramientas?",
        a: "No es la idea. Se conectan las que ya usas; si una no permite integrarse, se dice antes de empezar y se propone la salida.",
      },
      {
        q: "¿Qué pasa si una automatización falla?",
        a: "Queda registro de la ejecución y alerta cuando falla. El flujo se puede volver a correr sin duplicar datos.",
      },
      {
        q: "¿Esto reemplaza a mi equipo?",
        a: "No. Quita la parte repetitiva para que el equipo haga lo que requiere criterio: excepciones, clientes difíciles, decisiones.",
      },
      {
        q: "¿Se puede empezar por una sola tarea?",
        a: "Sí, y es lo recomendable. Una tarea, medida, que corra bien; después se suman las siguientes.",
      },
    ],
    related: ["desarrollo", "inteligencia-artificial"],
    cta: {
      title: "¿Qué tarea se repite cada día?",
      text: "Nómbranos la tarea que más tiempo consume y cuántas personas la hacen. Con eso se estima si vale la pena automatizarla.",
      label: "Quiero quitarme lo manual",
    },
  },
  {
    slug: "inteligencia-artificial",
    tag: "Inteligencia Artificial",
    title: "Inteligencia artificial aplicada",
    promise: "IA que responde con tus datos y se detiene cuando hace falta una persona.",
    intro:
      "Usamos modelos generativos donde ahorran trabajo real: responder con el catálogo, preparar una cotización, clasificar lo que llega. La regla es la misma en todos los casos: la IA no inventa lo que no está en tu información y deja rastro de lo que hizo.",
    signals: [
      "El equipo usa IA para todo, pero nadie revisa ni mide cuánto cuesta.",
      "Quieres responder por el chat sin inventar precios ni disponibilidad.",
      "Tienes información en documentos y correos que nadie puede consultar rápido.",
      "Ya probaste un asistente y respondía con seguridad cosas falsas.",
    ],
    deliverables: [
      "Diagnóstico de dónde la IA aporta y dónde solo agrega riesgo.",
      "Agente de ventas en el chat del sitio, con tu catálogo y tus precios.",
      "Asistente interno que responde sobre tus documentos y procesos.",
      "Automatizaciones con modelos: clasificar, resumir, redactar y extraer datos.",
      "Reglas de escalamiento: cuándo responde la IA y cuándo pasa a una persona.",
      "Base de conocimiento curada: qué información puede usar y cuál no.",
      "Registro de conversaciones y respuestas para revisar y corregir.",
      "Medición de uso, costo y calidad de las respuestas.",
    ],
    process: [
      { name: "Caso", outcome: "Queda claro qué tarea se delega a la IA y cuál no." },
      { name: "Información", outcome: "Se ordena la fuente: catálogo, precios, documentos y reglas." },
      { name: "Prototipo", outcome: "El asistente se prueba con preguntas reales antes de publicarlo." },
      { name: "Integración", outcome: "La IA queda conectada al sitio o al proceso, con salida a una persona." },
      { name: "Revisión", outcome: "Se revisan conversaciones y se corrige la información, no solo el modelo." },
    ],
    stack: ["Claude Code", "APIs de modelos generativos", "Merez", "PHP 8.2", "MySQL"],
    proof: {
      client: "Merez",
      sector: "Producto propio",
      summary:
        "Agente de ventas para el chat del sitio que atiende con la información del negocio, capta el lead y lo entrega cuando hace falta una persona.",
      facts: [
        "Responde con el catálogo y los precios del negocio.",
        "Capta el lead y llena su ficha en el CRM.",
        "Se detiene y pasa a una persona cuando la pregunta excede lo que sabe.",
        "WhatsApp se suma cuando el negocio conecta su número.",
      ],
    },
    whenNot: [
      {
        title: "Tus datos están dispersos",
        reason:
          "Un asistente sobre información desordenada responde rápido y mal. Primero se ordena el catálogo, los precios y los documentos.",
      },
      {
        title: "La decisión es de alto riesgo y nadie revisa",
        reason:
          "Si un error cuesta caro y no hay quién audite las respuestas, la IA no debe decidir sola. En esos casos sirve para preparar el trabajo, no para cerrarlo.",
      },
    ],
    faq: [
      {
        q: "¿La IA puede inventar precios o disponibilidad?",
        a: "No debería, y se diseña para que no: responde con la información cargada y, cuando no la tiene, lo dice o pasa a una persona. Si el modelo no encuentra el dato, no lo improvisa.",
      },
      {
        q: "¿Necesito cambiar mi sitio?",
        a: "No siempre. Si el sitio es tuyo, se integra el agente al chat. Si está en una plataforma cerrada, se evalúa qué permite conectar antes de prometer.",
      },
      {
        q: "¿Qué pasa con los datos de mis clientes?",
        a: "Se define qué información usa el agente y dónde queda. Trabajamos con la política de privacidad del sitio y con acceso restringido a lo que no debe salir.",
      },
      {
        q: "¿Cómo sé si está funcionando?",
        a: "Se revisan conversaciones reales y se mide uso, costo y cuántas veces hizo falta una persona. Eso dice más que una demo.",
      },
    ],
    related: ["automatizacion", "desarrollo"],
    cta: {
      title: "¿Quieres IA que no invente?",
      text: "Trae las preguntas que más te llegan por el chat. Con esas probamos si un agente las responde bien antes de construirlo.",
      label: "Probar mi caso",
    },
  },
  {
    slug: "consultoria",
    tag: "Consultoría",
    title: "Consultoría y transformación digital",
    promise: "Decidir qué se construye, qué se compra y qué se deja quieto.",
    intro:
      "Antes de contratar desarrollo, conviene saber qué problema se está resolviendo y en qué orden. El diagnóstico termina en una hoja de ruta con prioridades, costos y una recomendación escrita: qué se hace, qué no y por qué.",
    signals: [
      "Hay diez iniciativas y no sabes cuál va primero.",
      "Necesitas decidir si algo se construye o se compra.",
      "Cada proveedor propone una tecnología distinta y las propuestas no se pueden comparar.",
      "El equipo pide herramientas nuevas, pero el problema no está claro.",
    ],
    deliverables: [
      "Diagnóstico del negocio y de la operación actual, con el problema formulado.",
      "Inventario de iniciativas con impacto, esfuerzo y dependencias.",
      "Hoja de ruta priorizada: qué va primero, qué espera y qué se descarta.",
      "Recomendación de stack y de arquitectura, con lo que cuesta sostenerlo.",
      "Estimación de alcance y costo por etapa, para comparar propuestas.",
      "Criterios de decisión escritos: cómo se sabrá si funcionó.",
      "Acompañamiento en la contratación o en la ejecución, si hace falta.",
      "Documento de traspaso para que el equipo siga sin nosotros.",
    ],
    process: [
      { name: "Diagnóstico", outcome: "El problema real queda escrito, no el síntoma que se siente." },
      { name: "Priorización", outcome: "Sabes qué atender primero y qué se resuelve sin desarrollo." },
      { name: "Arquitectura", outcome: "Queda una propuesta técnica que se puede sostener en el tiempo." },
      { name: "Hoja de ruta", outcome: "Recibes etapas, costos y dependencias para decidir con números." },
      { name: "Acompañamiento", outcome: "La decisión se ejecuta y se revisa, no se queda en el documento." },
    ],
    stack: ["Merez", "GA4", "Microsoft Clarity", "Figma", "PHP 8.2", "MySQL"],
    proof: {
      client: "Acertar",
      sector: "Certificación y validación documental",
      summary:
        "Consultoría tecnológica dentro de la plataforma de certificados: arquitectura, modelo de datos y decisiones de producto a lo largo del proyecto.",
      facts: [
        "Arquitectura de información y diseño funcional de la plataforma.",
        "Diseño de la base de datos que sostiene certificados, consultas y verificación.",
        "Integración API entre frontend y backend.",
        "Acompañamiento en las decisiones de alcance, producto y stack.",
      ],
    },
    whenNot: [
      {
        title: "Ya tienes la decisión tomada y solo necesitas ejecución",
        reason:
          "Si el alcance está claro y aprobado, pagar un diagnóstico es pagar por una opinión que no vas a usar. Ahí conviene pasar directo a diseño o desarrollo.",
      },
      {
        title: "Buscas a alguien que valide lo que ya decidiste",
        reason:
          "La consultoría sirve para decidir, no para firmar una decisión ajena. Si el resultado tiene que ser sí, el ejercicio no aporta.",
      },
    ],
    faq: [
      {
        q: "¿Cómo se entrega el diagnóstico?",
        a: "Por escrito, con la hoja de ruta y la recomendación, y se presenta en una sesión. Lo que queda es un documento que puedes usar con tu equipo o con otros proveedores.",
      },
      {
        q: "¿La consultoría incluye implementación?",
        a: "No por defecto. El entregable es la decisión y el plan. Si después quieres que ejecutemos, se cotiza como proyecto aparte.",
      },
      {
        q: "¿Qué diferencia hay con pedir tres propuestas?",
        a: "Que la comparación se hace con criterios escritos: alcance, costo de sostenerlo y qué pasa si no se hace. Tres propuestas sin criterios comparan precios, no decisiones.",
      },
      {
        q: "¿Trabajan con empresas pequeñas?",
        a: "Sí, siempre que haya una decisión pendiente y alguien con autoridad para tomarla. Sin eso, el diagnóstico no se puede ejecutar.",
      },
    ],
    related: ["diseno", "desarrollo"],
    cta: {
      title: "¿Diez iniciativas y ningún orden?",
      text: "Cuéntanos qué decisiones tienes pendientes este año. Salimos con una prioridad clara y lo que cuesta cada camino.",
      label: "Pedir diagnóstico",
    },
  },
  {
    slug: "seo-geo",
    tag: "Visibilidad",
    title: "SEO técnico y GEO: que te encuentren Google y los asistentes",
    promise: "Aparecer cuando buscan lo que vendes, también cuando preguntan a una IA.",
    intro:
      "El tráfico ya no empieza solo en Google: empieza en una pregunta a un asistente. Trabajamos las dos puertas con la misma base: un sitio que se puede rastrear, páginas que responden una intención concreta y datos estructurados que cualquier motor puede leer. Sin trucos ni contenido inflado.",
    signals: [
      "Buscas lo que vendes en Google y no apareces, o apareces por el nombre de tu competencia.",
      "Le preguntas a un asistente por tu categoría y no te menciona, o te confunde con otro negocio.",
      "Rediseñaste el sitio y el tráfico no se movió: no sabes qué páginas indexan ni por qué.",
      "Publicas contenido, pero no sabes qué consultas trae ni qué páginas convierten.",
    ],
    deliverables: [
      "Auditoría técnica: indexación, canónicos, sitemap, robots, redirecciones y rendimiento.",
      "Arquitectura de contenidos: qué página responde a cada intención y cómo se enlazan.",
      "Datos estructurados: Organization, Service, FAQPage, Breadcrumb y BlogPosting validados.",
      "Archivo llms.txt y política de rastreo para motores generativos, decidida y no por defecto.",
      "Contenido con fuente y fecha: hechos verificables que un asistente puede citar.",
      "Ficha de cada página: título, descripción, encabezados y enlaces internos.",
      "Medición: Search Console, analítica y seguimiento de menciones en asistentes.",
      "Informe mensual con qué se movió, qué no y qué se hace después.",
    ],
    process: [
      { name: "Auditoría", outcome: "Sabes qué está roto, qué falta y qué ya funciona antes de tocar nada." },
      { name: "Arquitectura", outcome: "Cada intención tiene una página y cada página tiene un propósito." },
      { name: "Implementación", outcome: "Rastreo, canónicos, sitemap y datos estructurados quedan validados." },
      { name: "Contenido", outcome: "Páginas que responden con hechos, fuentes y límites claros." },
      { name: "Medición", outcome: "Un tablero con consultas, páginas y menciones; decisiones con números." },
    ],
    stack: ["Google Search Console", "GA4", "schema.org", "llms.txt", "robots.txt", "Next.js", "Merez"],
    proof: {
      client: "Inflinds y Merez",
      sector: "Sitios propios del ecosistema",
      summary:
        "Aplicamos el método en nuestros propios sitios y queda verificable: sitemap con fecha real por URL, datos estructurados en casi todas las páginas, llms.txt y robots abierto a los rastreadores de IA.",
      facts: [
        "74 URLs en el sitemap de Merez y 62 en el de Inflinds, con lastmod por página.",
        "FAQPage, BreadcrumbList y Service/SoftwareApplication en las páginas que los necesitan.",
        "llms.txt en ambos sitios y política explícita para GPTBot, ClaudeBot, PerplexityBot y Google-Extended.",
        "Contenido con fuente, fecha y límites escritos en la sección de motores de Merez.",
      ],
    },
    whenNot: [
      {
        title: "Necesitas resultados en dos semanas",
        reason:
          "La indexación y la confianza tardan. Se puede mejorar la base rápido, pero prometer posiciones en dos semanas es vender humo. Si la urgencia es esa, conviene invertir en pauta mientras se construye la base.",
      },
      {
        title: "No hay una oferta clara que posicionar",
        reason:
          "Si el sitio no dice qué vende ni a quién, el SEO solo trae más gente a la misma confusión. Primero se ordena la oferta y el sitio.",
      },
    ],
    faq: [
      {
        q: "¿Qué es GEO y en qué se diferencia del SEO?",
        a: "GEO es optimizar para que un asistente te encuentre y te cite: datos estructurados, hechos con fuente, archivos de contexto como llms.txt y contenido que responde preguntas completas. El SEO clásico busca el clic en Google; GEO busca la mención en una respuesta. La base técnica es la misma.",
      },
      {
        q: "¿Garantizan la primera posición?",
        a: "No. Nadie que controle el algoritmo puede garantizarla. Lo que sí se garantiza es el trabajo: auditoría, implementación, contenido y medición con un informe que puedes revisar.",
      },
      {
        q: "¿Cuánto tarda en moverse?",
        a: "La base técnica se nota en semanas; el contenido y la autoridad toman entre tres y seis meses. El primer informe dice qué se movió y qué falta, con datos de Search Console, no con impresiones.",
      },
      {
        q: "¿Sirve si mi sitio está en WordPress o en Merez?",
        a: "Sí. El método es del sitio, no de la herramienta. En Merez el blog ya trae datos estructurados y sitemap; en WordPress se implementa con el tema y los plugins necesarios.",
      },
    ],
    related: ["diseno", "desarrollo", "inteligencia-artificial"],
    cta: {
      title: "¿No apareces, ni en Google ni en los asistentes?",
      text: "Pide una auditoría: revisamos rastreo, contenido y datos estructurados, y salimos con las cinco acciones que más mueven la aguja.",
      label: "Pedir auditoría de visibilidad",
    },
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}/`;
}
