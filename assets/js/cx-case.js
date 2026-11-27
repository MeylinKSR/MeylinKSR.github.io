/*
  Caso de estudio de producto y servicio: Conexia.
  window.renderCXCase(p, nextHtml) devuelve el HTML; window.setupCXCase(root) añade la interacción.
  Todo el contenido sale de la memoria del proyecto y del prototipo web (demos/conexia).
*/
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function li(a) { return a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); }
  var IMG = "assets/img/conexia/";
  var APP = "demos/conexia-app/index.html";
  var WEB = "demos/conexia/index.html";

  var D = {
    meta: [
      ["Asignatura", "Servicios en Tecnología de la Información"],
      ["Grado", "Ciencia, Gestión e Ingeniería de Servicios · URJC"],
      ["Curso", "2025–2026 · 3 meses"],
      ["Equipo", "5 integrantes"],
      ["Estado", "Concepto, diseño del servicio y prototipos"],
      ["Herramientas", "Figma y FigJam, Claude, GitHub, Vercel"],
    ],
    chapters: [
      ["cxProblema", "Problema"], ["cxPersonas", "Cliente y usuarios"], ["cxMercado", "Mercado"], ["cxExperiencia", "Experiencia"],
      ["cxProducto", "Prototipos"], ["cxArquitectura", "Arquitectura"], ["cxNegocio", "Negocio"], ["cxItil", "ITIL 4"],
      ["cxImpacto", "Impacto esperado"], ["cxYo", "Mi parte"],
    ],
    channels: [["WhatsApp", "avisos mezclados con conversación"], ["Correo", "adjuntos perdidos en la bandeja"], ["Llamadas", "sin registro de lo que se dijo"], ["Tablón", "solo lo ve quien pasa por el portal"], ["Papeles sueltos", "actas y presupuestos repartidos"]],
    pains: ["Documentos difíciles de encontrar", "Incidencias sin seguimiento", "Las mismas preguntas una y otra vez al administrador", "Avisos importantes que no llegan", "Nadie sabe quién comunicó qué ni cuándo", "Más carga para quien gestiona"],
    actors: {
      adm: { n: "Administrador de fincas", r: "Cliente: decide y paga", needs: ["Llevar varias comunidades a la vez", "Recibir menos consultas repetidas", "Priorizar incidencias", "Coordinar proveedores", "Tener la documentación en un sitio", "Guardar el historial de cada actuación"] },
      vec: { n: "Vecinos", r: "Usuarios finales: propietarios e inquilinos, con permisos distintos", needs: ["Comunicar una incidencia", "Saber en qué estado está", "Consultar documentos", "Recibir los avisos que les afectan", "Estar al día sin depender del administrador"] },
      pro: { n: "Proveedores de mantenimiento", r: "Usuarios indirectos", needs: ["Reciben la incidencia asignada", "Hacen la reparación", "Devuelven el estado para cerrar el caso"] },
    },
    alt: [
      ["WhatsApp", "Rápido, familiar y lo usa todo el mundo", "Información desordenada, poca trazabilidad, difícil de consultar después", "Separar lo formal de lo informal"],
      ["Correo electrónico", "Canal formal que admite adjuntos", "Poca organización; los mensajes se pierden", "Reunir documentos y avisos"],
      ["Administración tradicional", "Conoce la comunidad y hay trato directo", "Todo depende de una persona; consultas lentas y repetidas", "Quitar carga operativa"],
      ["Software de administración de fincas", "Control interno de contabilidad y documentos", "Menos pensado para la experiencia del vecino", "Una interfaz mejor para el usuario final"],
      ["Apps de comunicación vecinal", "Comunicación sencilla e incidencias básicas", "Puede faltar profundidad en seguimiento y validación", "Añadir trazabilidad, permisos y verificación"],
    ],
    cjm: {
      vec: { who: "Ana, 43 · propietaria en una comunidad grande (perfil ficticio)", steps: [
        ["Detecta una avería en su portal y no sabe si ya está comunicada", "Portal, avería visible, vecinos", "«No sé si se ha avisado ni cuánto tardarán»", "Incertidumbre", 1],
        ["Abre la app para ver si hay información", "App, acceso, pantalla principal, avisos", "«A ver si aquí encuentro la información»", "Expectativa", 2],
        ["Registra la incidencia con foto y elige el portal afectado", "Formulario, cámara, selector de portal", "«Ahora sí queda registrado»", "Control", 3],
        ["Recibe confirmación y se avisa a los vecinos afectados", "Confirmación, notificaciones push, historial", "«Perfecto, esto ya está en marcha»", "Tranquilidad", 3.5],
        ["Sigue el estado y las actualizaciones del administrador", "Estado de la incidencia, avisos oficiales", "«Sé qué está pasando»", "Confianza", 4.2],
        ["Recibe la resolución y el cierre", "Notificación final, estado resuelto, histórico", "«Así da gusto»", "Satisfacción", 5],
      ] },
      adm: { who: "Carlos, 45 · administrador de varias comunidades (perfil ficticio)", steps: [
        ["Recibe una incidencia o aviso de un vecino", "Notificación, app, correo", "«Tengo muchos avisos y poco control»", "Saturación", 1],
        ["Entra en el sistema para revisarla", "Panel de gestión, listado de incidencias", "«Necesito entender qué está pasando»", "Organización", 2],
        ["Valida la información y clasifica la incidencia", "Detalle de incidencia, clasificación", "«Ahora está todo estructurado»", "Control", 3],
        ["Gestiona la comunicación con los vecinos afectados", "Notificaciones, comunicación segmentada", "«La comunicación es más clara»", "Tranquilidad", 3.5],
        ["Coordina la resolución con proveedores y presidencia", "Panel de gestión, contactos externos", "«Puedo gestionarlo mejor»", "Eficiencia", 4.2],
        ["Cierra la incidencia y actualiza el estado", "Sistema, estado, histórico", "«Todo queda registrado»", "Seguridad", 5],
      ] },
    },
    bp: {
      user: ["Detecta un problema en el edificio, en su portal o en zonas comunes, y decide comunicarlo", "Entra en Conexia y mira si ya hay un aviso. Si no, describe la avería, adjunta una foto y elige la ubicación", "Recibe la confirmación y puede consultar la incidencia creada", "Los vecinos afectados ven el aviso; el presidente puede revisar el contexto en persona", "Consulta la actualización oficial cuando el administrador publica un aviso", "Recibe la notificación de resolución y comprueba que la incidencia está cerrada"],
      touch: ["El propio edificio: origen de la avería", "Acceso, notificaciones, formulario de reporte y carga de imagen", "Mensaje de confirmación, notificaciones y panel de incidencias", "Notificación segmentada, detalle, comentarios y seguimiento", "Aviso oficial y canal de notificaciones", "Notificación, estado resuelto, histórico y aviso de cierre"],
      back: ["Antes, el administrador ha dado de alta a los vecinos, segmentados por edificio y portal", "Se autentica al usuario; el sistema registra la incidencia, la guarda, la categoriza y le asigna el estado «reportada»", "El sistema identifica qué vecinos están afectados por portal o zona común y envía la notificación", "El presidente puede confirmar la incidencia, aportar contexto o subir la prioridad; queda registrado", "El administrador se coordina con presidencia o aseguradoras, publica comunicaciones formales y actualiza la información", "El sistema publica el cierre, cambia el estado a «resuelta» y conserva el histórico"],
    },
    appGo: [["inicio", "Inicio"], ["incidencias", "Mis incidencias"], ["nueva-incidencia", "Nueva incidencia"], ["documentos", "Documentos"], ["avisos", "Avisos"], ["firma", "Firma (simulada)"]],
    appFeat: [["Inicio con información de la comunidad", 0], ["Nueva incidencia con formulario guiado por pasos", 0], ["Listado de incidencias con filtros por estado", 0], ["Seguimiento con línea temporal", 0], ["Documentos por categorías", 0], ["Avisos de la comunidad", 0], ["Firma digital con verificación OTP", 1]],
    webFeat: [
      ["dashboard", "Panel general", "Incidencias urgentes, cifras de la cartera, actividad y firmas en curso."],
      ["comunidades", "Comunidades", "Ocho fincas con su estructura, vecinos, incidencias abiertas y estado."],
      ["incidencias", "Incidencias", "Búsqueda y filtros por comunidad, estado y urgencia; detalle de cada caso."],
      ["documentos", "Documentos", "Actas, presupuestos y acuerdos por finca, con filtros por tipo."],
      ["firmas", "Firmas", "Quién ha firmado cada acta y a quién le falta. El flujo de firma es simulado."],
      ["nueva-comunidad", "Alta de comunidad", "Asistente en cinco pasos: datos, estructura, cargos, configuración y revisión."],
    ],
    front: [["Usuarios", "Vecinos y administrador"], ["App móvil", "Canal principal para incidencias, avisos y documentos"], ["Panel de gestión", "Publicar actas y avisos, gestionar documentación"], ["Notificaciones", "Avisos push para informar a los vecinos afectados"]],
    back: [["API Gateway", "Punto de entrada de las peticiones de la app, la web y el panel"], ["Servicios de aplicación", "Lógica de incidencias, avisos, segmentación, documentos y roles"], ["Base de datos", "Usuarios, comunidades, portales, incidencias, actas, archivos e historial"], ["Integraciones", "Notificaciones, almacenamiento de archivos e integraciones futuras"]],
    alta: ["El administrador crea la comunidad", "Registra cada vivienda con su contacto principal", "Invita a los usuarios con un enlace o código", "El usuario verifica su identidad", "Se le asigna un rol", "Cada rol tiene sus permisos"],
    bmc: [
      ["kp", "Socios clave", ["Proveedores cloud (AWS, Azure)", "Empresas de administración de fincas", "Proveedores tecnológicos", "Integraciones de notificaciones y pagos"]],
      ["ka", "Actividades clave", ["Desarrollar y mantener la plataforma", "Alta y configuración de comunidades", "Seguimiento de incidencias", "Soporte y mejora continua"]],
      ["kr", "Recursos clave", ["Plataforma (app y backend)", "Base de datos estructurada", "Infraestructura cloud", "Equipo de desarrollo y soporte"]],
      ["vp", "Propuesta de valor", ["Incidencias con estado y registro", "Fuera los canales no estructurados", "Menos carga operativa", "Más comunidades sin más carga"]],
      ["cr", "Relación", ["Onboarding inicial", "Soporte continuo", "Comunicación dentro de la plataforma"]],
      ["ch", "Canales", ["App móvil para vecinos", "Plataforma web para administradores", "Notificaciones en tiempo real"]],
      ["cs", "Beneficiarios", ["Administradores de fincas (principal)", "Comunidades de propietarios", "Vecinos: propietarios e inquilinos", "Empresas gestoras"]],
      ["co", "Costes", ["Desarrollo tecnológico", "Infraestructura cloud", "Personal", "Marketing y captación", "Mantenimiento y seguridad"]],
      ["rs", "Ingresos", ["Suscripción por comunidad", "Precio según número de viviendas", "Paga el administrador, que puede repercutirlo", "Escala con las comunidades gestionadas"]],
    ],
    fin: [["Desarrollo y adaptación de la plataforma", 2500, 4000], ["Infraestructura cloud y mantenimiento inicial", 1000, 1800], ["Seguridad y protección de datos", 700, 1200], ["Acciones comerciales", 800, 1000]],
    chain: [["Plan", "Detectar el problema y decidir qué servicio hace falta"], ["Engage", "Escuchar a vecinos y administradores"], ["Design & transition", "Definir app, panel, estados y notificaciones"], ["Obtain / build", "Desarrollar la app, la web, la nube y la base de datos"], ["Deliver & support", "Del reporte al aviso de cierre, día a día"], ["Improve", "KPIs y feedback para ajustar"]],
    dims: [
      ["Organizaciones y personas", "Vecino como origen del reporte, administrador como coordinador y equipo técnico como soporte.", "Ratio de comunidades por administrador"],
      ["Información y tecnología", "SaaS en la nube con una base de datos estructurada de incidencias: fecha, autor, categoría, estados y evidencias.", "Disponibilidad ≥ 99,5 % · latencia media < 300 ms"],
      ["Socios y proveedores", "Proveedores cloud (AWS o Azure) y servicios de notificación push, SMS o correo.", "% de incidencias que dependen de terceros"],
      ["Flujos de valor y procesos", "Un proceso común para que ninguna solicitud se quede olvidada.", "Tiempo medio en cada fase"],
    ],
    flow: [["Registro", "El vecino reporta desde la app con datos y fotos"], ["Clasificación", "Tipo y urgencia, con supervisión del administrador"], ["Asignación", "Técnico o proveedor responsable"], ["Resolución", "Se repara; el vecino ve «en proceso»"], ["Cierre", "Validación, aviso de cierre y valoración"]],
    sla: [["Crítica", "Caída total, no se pueden registrar incidencias o falla el acceso", "< 4 h", "< 24 h"], ["Alta", "Fallan las notificaciones, la carga de documentos o el panel", "< 8 h", "< 48 h"], ["Media", "Error en una incidencia concreta o en los permisos de un usuario", "< 24 h", "< 72 h"], ["Baja", "Dudas de uso, cambios menores o peticiones de mejora", "< 48 h", "Hasta 5 días laborables"]],
    support: [["Nivel 1 · Service Desk", "Registro de tickets, dudas, acceso y contraseñas"], ["Nivel 2 · Soporte funcional", "Roles, documentos mal asignados, duplicados, notificaciones"], ["Nivel 3 · Equipo técnico", "Caídas, errores de API, rendimiento, base de datos"], ["Proveedores externos", "Cloud, notificaciones, almacenamiento y mantenimiento"]],
    risks: [
      ["Caída del sistema", 2, 3, "Arquitectura con redundancia en la nube y copias de seguridad automáticas."],
      ["Fallo de notificaciones", 3, 2, "Plan alternativo: si falla el push, se envía correo o SMS automáticamente."],
      ["Baja adopción", 2, 2, "Guías de inicio rápido, formación y un diseño centrado en la usabilidad."],
      ["Dependencia del proveedor cloud", 1, 3, "Estrategia multirregión y una arquitectura portable para poder migrar."],
      ["SLAs incumplidos por proveedores", 2, 2, "Contratos con penalizaciones y proveedores alternativos ya validados."],
    ],
    kpis: [
      ["Tiempo medio de resolución (MTTR)", "Σ tiempos de resolución ÷ nº de incidencias", "Soporte"],
      ["Tiempo medio de primera respuesta", "Σ tiempos de primera respuesta ÷ nº de incidencias", "Soporte"],
      ["% de incidencias dentro del SLA", "Resueltas en plazo ÷ total × 100", "Soporte"],
      ["Disponibilidad", "(Tiempo total − tiempo de caída) ÷ tiempo total × 100", "Plataforma"],
      ["Tasa de resolución", "Si se acumulan incidencias sin cerrar", "Soporte"],
      ["NPS", "Percepción de vecinos y administradores", "Experiencia"],
      ["Consultas repetidas", "Preguntas sobre información ya publicada", "Experiencia"],
      ["Comunidades por administrador", "Comunidades gestionadas ÷ administradores", "Negocio"],
    ],
    goals: [["Comunicaciones duplicadas", 40, 60, "Mensajes antes y después de implantarlo"], ["Tiempo medio de resolución", 20, 30, "Por la priorización y el seguimiento"], ["Llamadas y contactos al administrador", 30, 50, "Porque el vecino ve el estado sin preguntar"]],
    hyp: [
      ["Vecino", "Reportar una incidencia en Conexia es más rápido que por WhatsApp", "Al menos 7 de cada 10 personas prefieren el flujo de Conexia y lo terminan sin abandonar", "Test de usabilidad comparativo con 8–10 vecinos"],
      ["Vecino", "Un documento se encuentra antes en la app que en el correo", "Menos de 30 segundos en Conexia frente a más de 2 minutos en el correo", "Prueba cronometrada con una tarea concreta"],
      ["Administrador", "Las comunidades con urgencias se ven desde el panel general", "Menos de 15 segundos en el 80 % de los casos", "Test cronometrado con 5 administradores"],
      ["Administrador", "El asistente permite dar de alta una comunidad sin formación", "Menos de 10 minutos y menos de un 20 % de abandono", "Test cronometrado con alguien que no conozca la herramienta"],
    ],
    me: "Mi principal aportación fue el diseño del servicio: decidir a quién se dirigía, qué necesidades tenía que resolver y cómo aportaba valor a cada parte, hasta llegar a las funciones y la experiencia que debían tener los prototipos. Participé en la creación de la app y del panel con herramientas de inteligencia artificial, definiendo sus requisitos, su estructura y cómo debía comportarse cada pantalla. También trabajé en el análisis de riesgos, las estimaciones económicas y la aplicación de ITIL 4 para decidir cómo se gestionaría el servicio, y coordiné al equipo hasta la documentación y la presentación final. El despliegue en Vercel no fue cosa mía.",
    meAreas: [
      ["Investigación y estrategia", "Problema e hipótesis, benchmark, propuesta de valor, Business Model Canvas"],
      ["Experiencia y producto", "Customer Journey Maps, prototipo móvil, panel web, prototipado con IA"],
      ["Tecnología y operación", "Arquitectura conceptual, ITIL 4, riesgos, estimación financiera"],
      ["Equipo", "Coordinación, documentación y presentación final"],
    ],
    skills: [["Producto y negocio", "Product Management · Business Analysis · Benchmarking · Business Model Canvas"], ["Servicio y experiencia", "Service Design · Customer Journey Mapping · Service Blueprint · UX/UI · prototipado con IA"], ["Gestión del servicio", "ITIL 4 · KPIs y SLAs · gestión de riesgos · coordinación de equipos"]],
    limits: ["Los prototipos son de fase de concepto y usan datos de demostración.", "No hay una implantación comercial real.", "Las hipótesis están pendientes de validar con usuarios.", "La arquitectura habría que construirla y verificarla.", "La estimación financiera necesita un análisis más detallado."],
    next: ["Un piloto con un administrador y una o dos comunidades.", "Validar la propuesta de valor y la disposición a pagar.", "Estudiar la viabilidad técnica y económica con costes reales de la nube."],
  };

  function head(id, n, h, lead) {
    return '<header class="cx-h"><p class="cx-h__n">' + n + '</p><h2 id="' + id + 'H">' + esc(h) + "</h2>" + (lead ? '<p class="cx-h__lead">' + lead + "</p>" : "") + "</header>";
  }
  function zoomBtn(src, alt, label) { return '<button type="button" class="mini-link" data-zoom-src="' + IMG + src + '" data-zoom-alt="' + esc(alt) + '">' + esc(label || "Ver la figura original") + "</button>"; }

  function hero(p) {
    return '<header class="cx-hero"><div class="wrap">' +
      '<a class="back" href="#proyectos"><span aria-hidden="true">←</span> Proyectos</a>' +
      '<div class="cx-hero__grid"><div class="cx-hero__txt">' +
      '<p class="eyebrow">Caso de estudio · Producto y servicio digital</p>' +
      '<h1 class="cx-hero__t"><img class="cx-hero__logo" src="' + IMG + 'icon.webp" alt="">Conexia</h1>' +
      '<p class="cx-hero__sub">Diseño de un servicio digital para la gestión de comunidades de vecinos.</p>' +
      '<p class="cx-hero__intro">Conexia nace como una propuesta para mejorar la comunicación y la gestión de incidencias en comunidades de vecinos. Planteamos una plataforma que conecta a residentes y administradores de fincas y reúne en un mismo servicio la información, los documentos y las incidencias.</p>' +
      '<div class="cx-hero__go"><a class="btn btn--small" href="#cxProducto" data-scroll="cxProducto">Probar los prototipos <span aria-hidden="true">↓</span></a><a class="btn btn--small btn--ghost" href="#cxYo" data-scroll="cxYo">Mi aportación</a></div>' +
      "</div>" +
      '<figure class="cx-duo" aria-label="Los dos prototipos">' +
      '<div class="bz"><div class="bz__bar" aria-hidden="true"><i></i><i></i><i></i><span>Panel web · administración de fincas</span></div><img src="' + IMG + 'panel-dashboard.webp" alt="Panel general del prototipo web: incidencias urgentes, cifras de la cartera y actividad reciente, con datos de demostración." width="1600" height="1000"></div>' +
      '<div class="ph ph--hero"><div class="ph__screen"><img class="ph__shot" src="' + IMG + 'app-inicio.webp" alt="Inicio de la app de vecinos: firma pendiente, incidencias abiertas y avisos recientes, con datos de demostración." width="600" height="1299"></div></div>' +
      '<figcaption>Panel web para administradores y app móvil para vecinos. Datos de demostración.</figcaption></figure>' +
      "</div>" +
      '<div class="cx-min"><div><h2>Qué es</h2><p>Un servicio SaaS con dos caras: un panel para quien administra varias fincas y una app para los vecinos. El administrador lo contrata; los vecinos lo usan a diario.</p></div>' +
      '<div><h2>Qué hice yo</h2><p>Diseño del servicio: usuarios y necesidades, propuesta de valor, modelo de negocio, funciones de los prototipos y cómo se gestionaría con ITIL 4.</p></div>' +
      '<div><h2>Qué demuestra</h2><p>Que puedo unir personas, tecnología y negocio en un mismo producto, desde el problema hasta su operación.</p></div></div>' +
      '<dl class="cx-meta">' + D.meta.map(function (m) { return "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>"; }).join("") + "</dl>" +
      "</div></header>";
  }

  function nav() {
    return '<nav class="cx-nav" aria-label="Capítulos del caso"><div class="wrap"><ol>' + D.chapters.map(function (c, i) { return '<li><a href="#' + c[0] + '" data-scroll="' + c[0] + '" data-c="' + c[0] + '"><span>' + String(i + 1).padStart(2, "0") + "</span>" + esc(c[1]) + "</a></li>"; }).join("") + "</ol></div></nav>";
  }

  function problema() {
    return '<section class="cx-sec" id="cxProblema" aria-labelledby="cxProblemaH"><div class="wrap">' + head("cxProblema", "01", "No faltaban herramientas: faltaba estructura", "En una comunidad, lo importante llega por cinco sitios distintos. Cada canal funciona por separado, pero ninguno permite ordenar, consultar y gestionar lo que pasa en el edificio.") +
      '<div class="flowin"><ul class="flowin__ch" aria-label="Canales actuales">' + D.channels.map(function (c, i) { return '<li style="--i:' + i + '"><b>' + esc(c[0]) + "</b><span>" + esc(c[1]) + "</span></li>"; }).join("") + "</ul>" +
      '<svg class="flowin__lines" viewBox="0 0 120 300" preserveAspectRatio="none" aria-hidden="true">' + [30, 90, 150, 210, 270].map(function (y) { return '<path d="M0,' + y + " C60," + y + " 60,150 120,150\"/>"; }).join("") + "</svg>" +
      '<div class="flowin__to"><img src="' + IMG + 'logo.webp" alt="Conexia" width="640" height="219"><p>Un único servicio donde cada aviso, documento e incidencia tiene su sitio, su estado y su historial.</p></div></div>' +
      '<div class="cx-pains"><p class="cx-k">Lo que provoca hoy</p><ol>' + li(D.pains) + "</ol></div>" +
      '<p class="cx-note">El mapa de empatía del propietario lo resume en frases como «eso ya se mandó por correo» o «estaba colgado en el tablón»: la información existe, pero no llega igual a todos. ' + zoomBtn("reto.webp", "Canvas de definición del reto", "Ver el canvas del reto") + "</p>" +
      "</div></section>";
  }

  function personas() {
    var A = D.actors;
    function col(k) { var a = A[k]; return '<div class="actor actor--' + k + '" data-a="' + k + '"><p class="actor__r">' + esc(a.r) + "</p><h3>" + esc(a.n) + "</h3><ul>" + li(a.needs) + "</ul></div>"; }
    return '<section class="cx-sec cx-sec--paper" id="cxPersonas" aria-labelledby="cxPersonasH"><div class="wrap">' + head("cxPersonas", "02", "Quien paga no es quien lo usa", "Esta fue la decisión que más condicionó el proyecto. El administrador decide la contratación y la implantación; los vecinos son quienes abren la app cada día. Si solo pensábamos en uno de los dos, el servicio no funcionaba.") +
      '<div class="tri">' + col("adm") +
      '<div class="tri__mid" aria-hidden="true"><svg viewBox="0 0 200 220"><circle cx="100" cy="110" r="44"/><text x="100" y="114">Conexia</text>' +
      '<path d="M56,110 H6" /><path d="M144,110 H194"/><path d="M100,154 V214" class="dash"/>' +
      '<text class="lbl" x="30" y="100">contrata</text><text class="lbl" x="170" y="100">usa</text><text class="lbl" x="134" y="200">participa</text></svg></div>' +
      col("vec") + "</div>" +
      '<div class="tri__pro">' + col("pro") + '<p class="cx-note">Por eso la propuesta de valor se diseñó dos veces, una para cada perfil, y el cambio de hábito se plantea a través del administrador: es quien implanta la herramienta y quien tiene un incentivo más claro para hacerlo.</p></div>' +
      "</div></section>";
  }

  function mercado() {
    return '<section class="cx-sec" id="cxMercado" aria-labelledby="cxMercadoH"><div class="wrap">' + head("cxMercado", "03", "Un mercado partido en dos", "Comparamos canales generalistas, software de administración de fincas y apps vecinales. Según nuestro análisis, unas herramientas se centran en el trabajo del administrador y otras en la comunicación entre vecinos.") +
      '<div class="mkt"><div class="mkt__side"><p class="cx-k">Orientadas al administrador</p><ul><li><b>Software de administración de fincas</b>Contabilidad, documentos, recibos, juntas o incidencias.</li><li><b>Fynkus</b>Se presenta como software para administración de fincas.</li><li><b>Onzane</b>Destaca la centralización de documentación con permisos de acceso para vecinos.</li></ul></div>' +
      '<div class="mkt__gap"><p class="cx-k">El hueco que vimos</p><p>Combinar la gestión operativa del administrador con una experiencia clara para el vecino, con permisos, seguimiento y verificación.</p><img src="' + IMG + 'logo.webp" alt="Conexia" width="640" height="219"></div>' +
      '<div class="mkt__side"><p class="cx-k">Orientadas a la comunicación vecinal</p><ul><li><b>Plusvecinos</b>Comunicación entre vecinos, presidencia y administración; incidencias, informes con fotos y avisos a proveedores.</li><li><b>Tucomunidad</b>Conecta administradores, propietarios y empresas de servicios.</li><li><b>Apps vecinales</b>Comunicación sencilla con incidencias básicas.</li></ul></div>' +
      '<p class="mkt__base"><b>Canales generalistas</b> WhatsApp, correo, llamadas y tablones: todo el mundo los conoce, pero no están pensados para gestionar una comunidad.</p></div>' +
      '<div class="alt" role="table" aria-label="Comparación de alternativas"><div class="alt__r alt__r--h" role="row"><span role="columnheader">Alternativa</span><span role="columnheader">Ventaja</span><span role="columnheader">Limitación que vimos</span><span role="columnheader">Oportunidad</span></div>' +
      D.alt.map(function (a) { return '<div class="alt__r" role="row"><b role="rowheader">' + esc(a[0]) + '</b><span role="cell" data-l="Ventaja">' + esc(a[1]) + '</span><span role="cell" data-l="Limitación">' + esc(a[2]) + '</span><span role="cell" data-l="Oportunidad" class="alt__o">' + esc(a[3]) + "</span></div>"; }).join("") + "</div>" +
      '<p class="cx-note">Son conclusiones de un análisis académico a partir de la información pública de cada producto, no una evaluación completa de sus funciones.</p>' +
      "</div></section>";
  }

  function experiencia() {
    return '<section class="cx-sec cx-sec--paper" id="cxExperiencia" aria-labelledby="cxExperienciaH"><div class="wrap">' + head("cxExperiencia", "04", "Dos recorridos para un mismo problema", "Hicimos un Customer Journey Map por perfil. El vecino pasa de no saber si alguien ha avisado a ver el estado de su incidencia; el administrador, de recibir avisos por todas partes a tenerlos ordenados en un panel.") +
      '<div class="cjm"><div class="seg" role="tablist" aria-label="Recorrido"><button type="button" role="tab" data-j="vec" aria-selected="true">Vecino</button><button type="button" role="tab" data-j="adm" aria-selected="false" tabindex="-1">Administrador</button></div>' +
      '<p class="cjm__who" id="cjmWho"></p><div class="cjm__scroll" tabindex="0" role="region" aria-label="Customer Journey Map"><div class="cjm__grid" id="cjmGrid"></div></div>' +
      '<p class="cx-note">La curva resume la evolución emocional descrita en el mapa; es cualitativa, no una medición. ' + zoomBtn("cjm-vecino.webp", "Customer Journey Map del vecino", "Original: vecino") + " · " + zoomBtn("cjm-admin.webp", "Customer Journey Map del administrador", "Original: administrador") + "</p></div>" +
      '<h3 class="cx-h3">Service Blueprint</h3><p class="cx-p">El blueprint añade lo que el vecino no ve: el alta previa, la autenticación, la segmentación por portal y la coordinación del administrador.</p>' +
      '<div class="bp" tabindex="0" role="region" aria-label="Service Blueprint"><div class="bp__grid">' +
      '<div class="bp__lane bp__lane--u">Acciones del vecino</div>' + D.bp.user.map(function (t, i) { return '<div class="bp__c bp__c--u"><span>' + (i + 1) + "</span>" + esc(t) + "</div>"; }).join("") +
      '<div class="bp__line">Línea de interacción</div>' +
      '<div class="bp__lane bp__lane--t">Puntos de contacto</div>' + D.bp.touch.map(function (t) { return '<div class="bp__c bp__c--t">' + esc(t) + "</div>"; }).join("") +
      '<div class="bp__line bp__line--v">Línea de visibilidad</div>' +
      '<div class="bp__lane bp__lane--b">Procesos internos y soporte</div>' + D.bp.back.map(function (t) { return '<div class="bp__c bp__c--b">' + esc(t) + "</div>"; }).join("") +
      "</div></div>" +
      '<p class="cx-note">Reconstruido a partir del original. ' + zoomBtn("blueprint.webp", "Service Blueprint de Conexia", "Ampliar el original") + ' · <a class="mini-link" href="https://www.figma.com/board/2n59oOTTAGNlXwucsprOt4/SERVICE-BLUEPRINT-CONEXIA?node-id=0-1" target="_blank" rel="noopener">Abrir en FigJam <span aria-hidden="true">↗</span></a></p>' +
      "</div></section>";
  }

  function producto() {
    return '<section class="cx-sec cx-sec--night" id="cxProducto" aria-labelledby="cxProductoH"><div class="wrap">' + head("cxProducto", "05", "Pruébalos aquí", "Los dos prototipos se hicieron con herramientas de IA a partir de los requisitos que definimos: qué pantallas, qué datos y cómo debía comportarse cada flujo. Son independientes entre sí, no comparten base de datos y todo lo que muestran es de demostración. Los dos están alojados en este portfolio.") +
      '<div class="lab">' +
      '<div class="lab__app"><div class="ph" id="phApp"><div class="ph__screen"><img class="ph__shot" src="' + IMG + 'app-incidencias.webp" alt="" width="600" height="1299"><button type="button" class="btn btn--small ph__load" id="appLoad">Cargar la app aquí</button></div></div>' +
      '<div class="lab__info"><p class="cx-k">App móvil · vecinos</p><ul class="feat">' + D.appFeat.map(function (f) { return "<li>" + esc(f[0]) + (f[1] ? ' <em class="sim">simulado</em>' : "") + "</li>"; }).join("") + "</ul>" +
      '<div class="tour tour--app" role="group" aria-label="Pantallas de la app">' + D.appGo.map(function (f) { return '<button type="button" data-a="' + f[0] + '"><b>' + esc(f[1]) + "</b></button>"; }).join("") + '</div><p class="lab__links"><a href="' + APP + '" target="_blank" rel="noopener">Abrir la app en otra pestaña <span aria-hidden="true">↗</span></a></p></div></div>' +
      '<div class="lab__web"><div class="bz bz--live" id="bzWeb"><div class="bz__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span>Panel web · administración de fincas</span><button type="button" class="bz__max" id="webMax" aria-pressed="false">Ampliar</button></div>' +
      '<div class="bz__view" id="webView"><img src="' + IMG + 'panel-dashboard.webp" alt="" width="1600" height="1000"><button type="button" class="btn btn--small bz__load" id="webLoad">Cargar el panel aquí</button></div></div>' +
      '<div class="lab__tour"><p class="cx-k">Ir directamente a</p><div class="tour" role="group" aria-label="Pantallas del panel">' + D.webFeat.map(function (f) { return '<button type="button" data-v="' + f[0] + '"><b>' + esc(f[1]) + "</b><span>" + esc(f[2]) + "</span></button>"; }).join("") + "</div>" +
      '<p class="lab__links"><a href="' + WEB + '" target="_blank" rel="noopener">Abrir el panel en otra pestaña <span aria-hidden="true">↗</span></a> · Comunicaciones y Ajustes están marcados como «en preparación».</p></div></div>' +
      "</div>" +
      '<p class="cx-note cx-note--night">Prototipos hechos con HTML, CSS y JavaScript sin frameworks y datos de ejemplo en un archivo aparte. La firma digital y la verificación OTP son simulaciones: no hay conexión con ningún proveedor de firma electrónica.</p>' +
      "</div></section>";
  }

  function arquitectura() {
    function row(a, cls) { return '<ol class="arq__row arq__row--' + cls + '">' + a.map(function (x) { return "<li><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></li>"; }).join("") + "</ol>"; }
    return '<section class="cx-sec" id="cxArquitectura" aria-labelledby="cxArquitecturaH"><div class="wrap">' + head("cxArquitectura", "06", "Cómo funcionaría por dentro", "Una plataforma SaaS en la nube, pensada para muchas comunidades a la vez. Es la arquitectura que propusimos para una versión real; los prototipos actuales no la usan.") +
      '<div class="arq"><p class="arq__k">Front · lo que se ve</p>' + row(D.front, "f") + '<p class="arq__k">Back · lo que lo hace posible</p>' + row(D.back, "b") +
      '<p class="cx-note">' + zoomBtn("arq-front.webp", "Arquitectura front", "Esquema front original") + " · " + zoomBtn("arq-back.webp", "Arquitectura back", "Esquema back original") + "</p></div>" +
      '<div class="cx-two"><div><h3 class="cx-h3">Alta controlada y permisos por rol</h3><p class="cx-p">No cualquiera puede registrarse con un correo: así sabemos que quien reporta vive en la comunidad. Un propietario puede ver actas y documentación económica; un inquilino, los avisos, las incidencias y las normas del edificio.</p><ol class="steps">' + li(D.alta) + "</ol></div>" +
      '<aside class="chain-aside"><p class="cx-k">Alternativa evaluada, no implementada</p><h3>Blockchain para dejar constancia</h3><p>Estudiamos usarlo solo como registro inalterable de algunos hechos: cuándo se crea una incidencia, quién la reporta, sus cambios de estado, el cierre y la publicación de actas.</p><p>Los datos personales irían en una base de datos segura; en la cadena solo quedarían identificadores o huellas de cada evento.</p></aside></div>' +
      "</div></section>";
  }

  function negocio() {
    var max = 4000;
    return '<section class="cx-sec cx-sec--paper" id="cxNegocio" aria-labelledby="cxNegocioH"><div class="wrap">' + head("cxNegocio", "07", "Por qué alguien pagaría por ello", "Suscripción mensual o anual por comunidad gestionada. El administrador paga; los vecinos usan. El negocio crece con las comunidades de cada administrador, no con usuarios sueltos.") +
      '<div class="val"><div><p class="cx-k">Para el administrador</p><ul>' + li(["Toda la información de sus comunidades en un sitio", "Menos tareas repetitivas", "Incidencias ordenadas y priorizadas", "Un historial que le respalda ante reclamaciones", "Más comunidades sin que la carga crezca al mismo ritmo"]) + '</ul>' + zoomBtn("vp-admin.webp", "Canvas de propuesta de valor del administrador", "Lienzo de propuesta de valor") + "</div>" +
      '<div><p class="cx-k">Para el vecino</p><ul>' + li(["Consultar información y documentos por su cuenta", "Ver en qué punto está su incidencia", "Saber qué pasa en el edificio", "Una comunicación más ordenada"]) + "</ul>" + zoomBtn("vp-vecino.webp", "Canvas de propuesta de valor del vecino", "Lienzo de propuesta de valor") + "</div>" +
      '<div class="val__q"><p class="cx-k">¿Por qué dejar WhatsApp?</p><p>No por comodidad: WhatsApp es más rápido. Un mensaje no tiene estado, no sabes si lo leyó quien debía y se pierde entre conversaciones. Conexia compite en orden y en registro, sobre todo para el administrador.</p></div></div>' +
      '<h3 class="cx-h3">Business Model Canvas, simplificado</h3><div class="cbmc">' + D.bmc.map(function (b) { return '<div class="cbmc__b cbmc__b--' + b[0] + '"><b>' + esc(b[1]) + "</b><ul>" + li(b[2]) + "</ul></div>"; }).join("") + '</div><p class="cx-note">' + zoomBtn("bmc.webp", "Business Model Canvas de Conexia", "Ver el canvas completo") + "</p>" +
      '<h3 class="cx-h3">Inversión inicial estimada</h3><p class="cx-p">Estimación académica preliminar para lanzar una primera versión. No es una inversión realizada ni un presupuesto técnico validado, y no fijamos precios de suscripción.</p>' +
      '<table class="fin"><thead><tr><th scope="col">Concepto</th><th scope="col">Estimación</th><th scope="col"><span class="sr">Rango</span></th></tr></thead><tbody>' +
      D.fin.map(function (f) { return '<tr><th scope="row">' + esc(f[0]) + "</th><td>" + f[1].toLocaleString("es-ES") + "–" + f[2].toLocaleString("es-ES") + ' €</td><td aria-hidden="true"><span class="fin__bar"><i style="left:' + (f[1] / max * 100) + "%;width:" + ((f[2] - f[1]) / max * 100) + '%"></i></span></td></tr>'; }).join("") +
      '</tbody><tfoot><tr><th scope="row">Total</th><td>5.000–8.000 €</td><td></td></tr></tfoot></table>' +
      "</div></section>";
  }

  function itil() {
    var grid = "";
    for (var imp = 3; imp >= 1; imp--) for (var pr = 1; pr <= 3; pr++) {
      var here = D.risks.map(function (r, i) { return r[1] === pr && r[2] === imp ? i : -1; }).filter(function (i) { return i > -1; });
      var lvl = pr + imp >= 5 ? "h" : pr + imp >= 4 ? "m" : "l";
      grid += '<div class="rm__c rm__c--' + lvl + '">' + here.map(function (i) { return '<button type="button" data-r="' + i + '">' + esc(D.risks[i][0]) + "</button>"; }).join("") + "</div>";
    }
    return '<section class="cx-sec" id="cxItil" aria-labelledby="cxItilH"><div class="wrap">' + head("cxItil", "08", "Pensado para funcionar después del lanzamiento", "No nos quedamos en la app: con ITIL 4 definimos cómo se gestionaría el servicio una vez implantado, quién hace qué y cómo se mide.") +
      '<ol class="vc" aria-label="Cadena de valor del servicio">' + D.chain.map(function (c) { return "<li><b>" + esc(c[0]) + "</b><span>" + esc(c[1]) + "</span></li>"; }).join("") + "</ol>" +
      '<h3 class="cx-h3">Las cuatro dimensiones</h3><dl class="dims">' + D.dims.map(function (d) { return "<div><dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + '<span class="dims__k">Indicador · ' + esc(d[2]) + "</span></dd></div>"; }).join("") + "</dl>" +
      '<h3 class="cx-h3">Dos tipos de incidencia que no se mezclan</h3><div class="two-inc"><div><p class="cx-k">De la comunidad</p><p><b>El ascensor se para.</b> La reporta un vecino, el administrador la clasifica y la resuelve un proveedor de mantenimiento. Los plazos de reparación dependen de ese proveedor.</p></div><div><p class="cx-k">De la plataforma</p><p><b>La app no deja entrar.</b> Es un fallo de Conexia: entra por soporte y tiene los SLAs de la tabla de abajo.</p></div></div>' +
      '<p class="cx-k cx-k--sp">Proceso de una incidencia de la comunidad</p><ol class="iflow">' + D.flow.map(function (f, i) { return '<li><span class="iflow__n">' + (i + 1) + "</span><b>" + esc(f[0]) + "</b><span>" + esc(f[1]) + "</span></li>"; }).join("") + '</ol><p class="cx-note">Si la resolución necesita revisión, vuelve a asignación; si el vecino no está conforme, puede reabrirla. ' + zoomBtn("proceso-incidencias.webp", "Esquema del proceso de incidencias", "Ver el esquema original") + "</p>" +
      '<div class="cx-two cx-two--sla"><div><h3 class="cx-h3">SLAs del soporte de la plataforma</h3><div class="tscroll"><table class="sla"><thead><tr><th scope="col">Criticidad</th><th scope="col">Ejemplo</th><th scope="col">Respuesta</th><th scope="col">Resolución</th></tr></thead><tbody>' +
      D.sla.map(function (s, i) { return '<tr class="sla--' + i + '"><th scope="row">' + esc(s[0]) + "</th><td>" + esc(s[1]) + "</td><td>" + esc(s[2]) + "</td><td>" + esc(s[3]) + "</td></tr>"; }).join("") + '</tbody></table></div><p class="cx-note">Disponibilidad mensual objetivo: 99,5 %, sin contar el mantenimiento programado.</p></div>' +
      '<div><h3 class="cx-h3">Niveles de soporte</h3><ol class="lv">' + D.support.map(function (s) { return "<li><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></li>"; }).join("") + "</ol></div></div>" +
      '<div class="cx-two cx-two--risk"><div><h3 class="cx-h3">Matriz de riesgos</h3><div class="rm"><span class="rm__y">Impacto</span><div class="rm__g">' + grid + '</div><span class="rm__x">Probabilidad</span></div></div><div class="rm__d" id="rmD" aria-live="polite"></div></div>' +
      '<h3 class="cx-h3">Indicadores</h3><div class="tscroll"><table class="kt"><thead><tr><th scope="col">KPI</th><th scope="col">Cómo se calcula o qué mide</th><th scope="col">Ámbito</th></tr></thead><tbody>' + D.kpis.map(function (k) { return '<tr><th scope="row">' + esc(k[0]) + "</th><td>" + esc(k[1]) + "</td><td>" + esc(k[2]) + "</td></tr>"; }).join("") + "</tbody></table></div>" +
      '<div class="pdca"><p class="cx-k">Mejora continua · PDCA</p><ol><li><b>Planificar</b>Mirar MTTR, cumplimiento de SLA y consultas repetidas.</li><li><b>Hacer</b>Actualizaciones mensuales sin cambios bruscos.</li><li><b>Verificar</b>Volver a medir; objetivo de −40 % en consultas repetidas.</li><li><b>Actuar</b>Consolidar lo que funciona y replantear lo que no.</li></ol><p>Revisión operativa mensual y estratégica trimestral. Roles definidos: propietario del servicio, gestor del servicio, service desk, gestor de problemas, gestor de cambios, equipo técnico, arquitecto y proveedores.</p></div>' +
      "</div></section>";
  }

  function impacto() {
    return '<section class="cx-sec cx-sec--paper" id="cxImpacto" aria-labelledby="cxImpactoH"><div class="wrap">' + head("cxImpacto", "09", "Impacto esperado, todavía sin validar", "Fijamos objetivos y criterios de éxito antes de probar nada. Ninguna de estas cifras es un resultado: son estimaciones pendientes de validar con usuarios.") +
      '<div class="goals"><p class="cx-k">Objetivos de mejora · reducción estimada</p>' + D.goals.map(function (g) { return '<div class="goal"><p><b>' + esc(g[0]) + "</b><span>" + esc(g[3]) + '</span></p><div class="goal__bar" aria-hidden="true"><i style="left:' + g[1] + "%;width:" + (g[2] - g[1]) + '%"></i></div><p class="goal__v">' + g[1] + "–" + g[2] + " %</p></div>"; }).join("") +
      '<div class="goal goal--ax" aria-hidden="true"><p></p><div class="goal__ax"><span>0 %</span><span>50 %</span><span>100 %</span></div><p></p></div></div>' +
      '<h3 class="cx-h3">Hipótesis y criterios de éxito</h3><div class="hyp" role="table" aria-label="Hipótesis"><div class="hyp__r hyp__r--h" role="row"><span role="columnheader">Perfil</span><span role="columnheader">Hipótesis</span><span role="columnheader">Criterio de éxito</span><span role="columnheader">Cómo se probaría</span><span role="columnheader">Estado</span></div>' +
      D.hyp.map(function (h) { return '<div class="hyp__r" role="row"><span role="cell" class="hyp__p">' + esc(h[0]) + '</span><b role="cell">' + esc(h[1]) + '</b><span role="cell" data-l="Criterio">' + esc(h[2]) + '</span><span role="cell" data-l="Método">' + esc(h[3]) + '</span><span role="cell" class="hyp__s">Pendiente</span></div>'; }).join("") + "</div>" +
      '<p class="cx-note">Como métodos de validación planteamos pruebas de usabilidad, entrevistas a administradores, encuestas y un piloto con una comunidad real. No se llegaron a hacer.</p>' +
      "</div></section>";
  }

  function yo() {
    return '<section class="cx-sec" id="cxYo" aria-labelledby="cxYoH"><div class="wrap">' + head("cxYo", "10", "Mi parte y lo que me llevo", "") +
      '<div class="me2"><blockquote><p>' + esc(D.me) + '</p></blockquote><dl>' + D.meAreas.map(function (a) { return "<div><dt>" + esc(a[0]) + "</dt><dd>" + esc(a[1]) + "</dd></div>"; }).join("") + "</dl></div>" +
      '<div class="learn"><p>Este proyecto me hizo ver que diseñar un producto digital va más allá de sus pantallas y funciones. También hay que entender quién lo usa, quién decide contratarlo, cómo se opera y con qué indicadores se sabe si de verdad aporta valor.</p><p>Fue la primera vez que junté en un mismo trabajo diseño de servicios, experiencia de usuario, negocio y gestión tecnológica, partiendo de un problema tan cotidiano como el ascensor que nadie sabe si alguien ha avisado.</p></div>' +
      '<div class="cx-two"><div><p class="cx-k">Limitaciones</p><ul class="plain">' + li(D.limits) + '</ul></div><div><p class="cx-k">Siguientes pasos</p><ul class="plain">' + li(D.next) + "</ul></div></div>" +
      '<div class="skills"><p class="cx-k">Competencias</p><dl>' + D.skills.map(function (s) { return "<div><dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>"; }).join("") + "</dl></div>" +
      "</div></section>";
  }

  window.renderCXCase = function (p, nextHtml) {
    return '<div class="view cx"><article>' + hero(p) + nav() + problema() + personas() + mercado() + experiencia() + producto() + arquitectura() + negocio() + itil() + impacto() + yo() + (nextHtml || "") + "</article></div>";
  };

  function tablist(btns, on) {
    function pick(i) { btns.forEach(function (b, j) { b.setAttribute("aria-selected", String(i === j)); b.tabIndex = i === j ? 0 : -1; }); on(i); }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { pick(i); });
      b.addEventListener("keydown", function (e) { var d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return; e.preventDefault(); var n = (i + d + btns.length) % btns.length; pick(n); btns[n].focus(); });
    });
    return pick;
  }

  window.setupCXCase = function (root) {
    var cx = root.querySelector(".cx"); if (!cx) return;
    var zoom = window.meyZoom || function () {};
    var nv = document.querySelector(".nav"); if (nv) cx.style.setProperty("--navH", nv.offsetHeight + "px");
    cx.addEventListener("click", function (e) { var z = e.target.closest("[data-zoom-src]"); if (z) zoom(z.getAttribute("data-zoom-src"), z.getAttribute("data-zoom-alt")); });

    /* Capítulo visible */
    var links = cx.querySelectorAll(".cx-nav a");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) links.forEach(function (a) { var on = a.getAttribute("data-c") === x.target.id; a.classList.toggle("is-on", on); if (on && a.scrollIntoView && a.parentNode.parentNode.scrollWidth > a.parentNode.parentNode.clientWidth) a.parentNode.parentNode.scrollTo({ left: a.parentNode.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" }); }); }); }, { rootMargin: "-35% 0px -60% 0px" });
      D.chapters.forEach(function (c) { var s = cx.querySelector("#" + c[0]); if (s) io.observe(s); });
    }

    /* CJM */
    var grid = cx.querySelector("#cjmGrid"), who = cx.querySelector("#cjmWho");
    function drawCjm(k) {
      var J = D.cjm[k], n = J.steps.length, W = 600, H = 90;
      var pts = J.steps.map(function (s, i) { return [((i + 0.5) / n * W).toFixed(1), (H - 10 - (s[4] - 1) / 4 * (H - 24)).toFixed(1)]; });
      var svg = '<svg class="cjm__curve" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true"><polyline points="' + pts.map(function (p) { return p.join(","); }).join(" ") + '"/>' + pts.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5"/>'; }).join("") + "</svg>";
      who.textContent = J.who;
      grid.innerHTML = '<div class="cjm__lab">Momento</div>' + J.steps.map(function (s, i) { return '<div class="cjm__m"><span>' + (i + 1) + "</span>" + esc(s[0]) + "</div>"; }).join("") +
        '<div class="cjm__lab">Puntos de contacto</div>' + J.steps.map(function (s) { return '<div class="cjm__t">' + esc(s[1]) + "</div>"; }).join("") +
        '<div class="cjm__lab">Viaje emocional</div><div class="cjm__emo">' + svg + J.steps.map(function (s, i) { return '<div class="cjm__e" style="grid-column:' + (i + 1) + '"><q>' + esc(s[2].replace(/[«»]/g, "")) + "</q><b>" + esc(s[3]) + "</b></div>"; }).join("") + "</div>";
    }
    tablist(Array.prototype.slice.call(cx.querySelectorAll(".cjm [data-j]")), function (i) { drawCjm(i ? "adm" : "vec"); })(0);

    /* App móvil (local) */
    var ph = cx.querySelector("#phApp"), aFrame = null, aPending = null;
    function goApp(v) {
      try {
        var w = aFrame.contentWindow; if (!w || !w.switchTab) return;
        var tabs = ["inicio", "incidencias", "documentos", "avisos"], i = tabs.indexOf(v);
        if (i > -1) w.switchTab(v, w.document.querySelectorAll(".nav-item")[i]);
        else { w.switchTab("inicio", w.document.querySelectorAll(".nav-item")[0]); w.showSubview(v); }
      } catch (e) {}
    }
    function loadApp(v) {
      if (aFrame) { if (v) goApp(v); return; }
      aPending = v; aFrame = document.createElement("iframe"); aFrame.src = APP; aFrame.title = "Prototipo de la app móvil de Conexia para vecinos";
      aFrame.addEventListener("load", function () { if (aPending) goApp(aPending); aPending = null; });
      var sc = ph.querySelector(".ph__screen"); sc.innerHTML = ""; sc.appendChild(aFrame);
    }
    cx.querySelector("#appLoad").addEventListener("click", function () { loadApp(null); });
    cx.querySelectorAll(".tour--app [data-a]").forEach(function (b) { b.addEventListener("click", function () { cx.querySelectorAll(".tour--app [data-a]").forEach(function (x) { x.classList.toggle("is-on", x === b); }); loadApp(b.getAttribute("data-a")); }); });

    /* Panel web (local) */
    var bz = cx.querySelector("#bzWeb"), view = cx.querySelector("#webView"), frame = null, pending = null, maxB = cx.querySelector("#webMax");
    function fit() {
      if (!frame) return; var w = view.clientWidth, base = bz.classList.contains("is-max") ? w : Math.max(1100, w), s = w / base;
      frame.style.width = base + "px"; frame.style.height = (view.clientHeight / s) + "px"; frame.style.transform = s === 1 ? "" : "scale(" + s + ")";
    }
    function go(v) { try { if (frame && frame.contentWindow && frame.contentWindow.switchView) frame.contentWindow.switchView(v); } catch (e) {} }
    function loadWeb(v) {
      if (frame) { go(v); return; }
      pending = v; frame = document.createElement("iframe"); frame.src = WEB; frame.title = "Prototipo del panel web de Conexia para administradores";
      frame.addEventListener("load", function () { if (pending) go(pending); pending = null; });
      view.innerHTML = ""; view.appendChild(frame); view.classList.add("is-live"); fit();
    }
    cx.querySelector("#webLoad").addEventListener("click", function () { loadWeb(null); });
    cx.querySelectorAll(".tour [data-v]").forEach(function (b) { b.addEventListener("click", function () { cx.querySelectorAll(".tour [data-v]").forEach(function (x) { x.classList.toggle("is-on", x === b); }); loadWeb(b.getAttribute("data-v")); }); });
    function setMax(on) { bz.classList.toggle("is-max", on); maxB.setAttribute("aria-pressed", String(on)); maxB.textContent = on ? "Cerrar" : "Ampliar"; document.body.style.overflow = on ? "hidden" : ""; if (on && !frame) loadWeb(null); requestAnimationFrame(fit); }
    maxB.addEventListener("click", function () { setMax(!bz.classList.contains("is-max")); });
    bz.addEventListener("keydown", function (e) { if (e.key === "Escape" && bz.classList.contains("is-max")) { setMax(false); maxB.focus(); } });
    window.addEventListener("resize", fit);

    /* Riesgos */
    var rd = cx.querySelector("#rmD"), rb = cx.querySelectorAll(".rm [data-r]");
    function pickR(i) { var r = D.risks[i], L = ["", "Baja", "Media", "Alta"]; rb.forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-r") === i)); }); rd.innerHTML = '<p class="cx-k">Probabilidad ' + L[r[1]].toLowerCase() + " · impacto " + L[r[2]].toLowerCase() + "</p><h4>" + esc(r[0]) + "</h4><p>" + esc(r[3]) + "</p>"; }
    rb.forEach(function (b) { b.addEventListener("click", function () { pickR(+b.getAttribute("data-r")); }); });
    pickR(0);
  };
})();
