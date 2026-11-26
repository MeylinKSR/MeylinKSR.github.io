(function () {
  "use strict";
  var P = window.PROJECTS || [];
  var main = document.getElementById("main");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function bySlug(s) { return P.filter(function (p) { return p.slug === s; })[0]; }
  var ARROW = '<span class="arr" aria-hidden="true">→</span>';
  var EXT = '<span class="arr" aria-hidden="true">↗</span>';

  /* Símbolo de MEY. para detalles puntuales */
  var MARK =
    '<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round">' +
    '<line x1="20" y1="20" x2="20" y2="4"/><line x1="20" y1="20" x2="34" y2="13"/><line x1="20" y1="20" x2="30" y2="33"/><line x1="20" y1="20" x2="9" y2="32"/><line x1="20" y1="20" x2="5" y2="15"/></g>' +
    '<circle cx="20" cy="20" r="4" fill="var(--coral)"/></svg>';

  /* ---------- Experiencia ---------- */
  var JOBS = [
    {
      co: "Cloud Worldwide Services", role: "Product Engineer · prácticas", when: "oct. 2025 – feb. 2026",
      tags: ["Power BI", "DAX", "Modelado de datos", "Azure DevOps", "IA"],
      short: "Producto tecnológico: dashboards en Power BI, documentación funcional y soluciones con IA.",
      more: [
        "Dashboards en Power BI y modelado de datos para seguir el uso de productos de IA, voz y biometría.",
        "Documentación funcional, análisis de requisitos y pruebas de calidad.",
        "Apoyo en diseño de interfaces y seguimiento en Azure DevOps.",
        "Aprendí cómo se conectan las necesidades del negocio, los datos y el producto digital.",
      ],
    },
    {
      co: "PinkStone Advertisement Group", role: "Marketing Operations & Content · prácticas", when: "jul. 2021 – may. 2022",
      tags: ["Google Ads", "Meta Ads", "SEO", "WordPress", "Analítica"],
      short: "Marketing digital: campañas, SEO, contenidos y análisis de resultados.",
      more: [
        "Seguimiento de campañas en Google Ads y Meta Ads para pequeños negocios.",
        "Posicionamiento SEO, creación de contenidos y gestión de webs en WordPress.",
        "Informes de resultados con Google Analytics y Excel.",
        "Mi primer contacto con el mundo profesional y con lo importante que es entender al cliente.",
      ],
    },
  ];

  function chips(list, cls) {
    return '<ul class="chips' + (cls ? " " + cls : "") + '">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }

  function jobs() {
    return (
      '<div class="xjobs">' +
      JOBS.map(function (j) {
        return (
          '<details class="xjob reveal"><summary>' +
          '<span class="xjob__when">' + j.when + "</span>" +
          '<span class="xjob__main"><b>' + j.co + "</b><span>" + j.role + "</span></span>" +
          '<span class="xjob__short">' + j.short + "</span>" +
          '<span class="xjob__plus" aria-hidden="true"></span></summary>' +
          '<div class="xjob__body"><ul>' + j.more.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" + chips(j.tags) + "</div>" +
          "</details>"
        );
      }).join("") +
      "</div>"
    );
  }

  /* ---------- Captura anotada (Conexia): los puntos se abren al pasar o pulsar ---------- */
  function annotated(p) {
    return (
      '<figure class="anno anno--live">' +
      '<div class="anno__shot"><img src="' + p.cover + '" alt="' + esc(p.coverAlt) + '">' +
      p.notes.map(function (n, i) {
        var side = n.x > 60 ? " anno__pin--left" : "";
        return '<button type="button" class="anno__pin' + side + '" style="left:' + n.x + "%;top:" + n.y + '%" aria-label="' + esc(n.t) + '">' + (i + 1) +
          '<span class="anno__tip"><b>' + esc(n.t) + "</b>" + esc(n.d) + "</span></button>";
      }).join("") +
      "</div>" +
      '<figcaption class="anno__hint">Pasa el cursor o toca los puntos para ver cada decisión.</figcaption></figure>'
    );
  }

  function stats(p) {
    return '<div class="stats">' + p.facts.map(function (f) {
      return '<div class="stat"><b data-count="' + esc(f[0]) + '">' + esc(f[0]) + "</b><span>" + esc(f[1]) + "</span></div>";
    }).join("") + "</div>";
  }

  /* ---------- Tarjetas de proyecto ---------- */
  function card(p) {
    var play = p.embed || p.demo;
    return (
      '<article class="pcard reveal" data-disc="' + esc(p.discipline) + '">' +
      '<a class="pcard__media' + (p.coverFit === "contain" ? " pcard__media--contain" : "") + '" href="#p-' + p.slug + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + p.cover + '" alt="" loading="lazy">' +
      '<span class="pcard__over">' + esc(p.summary) + "</span></a>" +
      '<div class="pcard__body">' +
      '<span class="pcard__tag">' + esc(p.discipline) + "</span>" +
      '<h3 class="pcard__t"><a href="#p-' + p.slug + '">' + esc(p.title) + "</a></h3>" +
      '<p class="pcard__k">' + esc(p.kicker) + "</p>" +
      '<div class="pcard__acts">' +
      (play
        ? '<button class="btn btn--small" type="button" data-play="' + p.slug + '"><span aria-hidden="true">▶</span> ' + (p.embed ? "Ver informe" : "Probar") + "</button>"
        : '<span class="pcard__soon">Demo próximamente</span>') +
      '<a class="pcard__more" href="#p-' + p.slug + '">Ver caso ' + ARROW + "</a></div>" +
      "</div></article>"
    );
  }

  function filters() {
    var discs = [];
    P.forEach(function (p) { if (discs.indexOf(p.discipline) < 0) discs.push(p.discipline); });
    return (
      '<div class="filters" role="group" aria-label="Filtrar por disciplina">' +
      '<button class="filter" type="button" data-f="" aria-pressed="true">Todos</button>' +
      discs.map(function (d) { return '<button class="filter" type="button" data-f="' + esc(d) + '" aria-pressed="false">' + esc(d) + "</button>"; }).join("") +
      "</div>"
    );
  }

  function grid() {
    return filters() + '<div class="pgrid" id="allRows">' + P.map(card).join("") + "</div>";
  }

  /* ---------- Vistas ---------- */
  function viewHome() {
    return (
      '<div class="view">' +
      '<section class="hero"><div class="wrap hero__grid">' +
      '<div class="hero__main">' +
      '<p class="eyebrow">Portfolio · Madrid</p>' +
      '<h1 class="hero__name">Meylin<br>Soto Reyes<span class="dot">.</span></h1>' +
      '<p class="hero__role">' + MARK + '<span>Analítica de <span class="rotator" id="rot">producto</span></span></p>' +
      '<p class="hero__bio">De las campañas al producto: datos en Power BI, procesos y prototipos.</p>' +
      '<div class="actions"><a class="btn" href="#trabajo" data-scroll="trabajo">Ver proyectos <span class="arr" aria-hidden="true">↓</span></a>' +
      '<a class="btn btn--ghost" href="#contacto">Contacto</a></div>' +
      "</div>" +
      '<div class="hero__side">' +
      '<div class="hstat"><b data-count="' + P.length + '">' + P.length + '</b><span>proyectos</span></div>' +
      '<div class="hstat"><b data-count="' + P.filter(function (p) { return p.embed || p.demo; }).length + '">' + P.filter(function (p) { return p.embed || p.demo; }).length + '</b><span>demos interactivas</span></div>' +
      '<div class="hstat"><b data-count="2">2</b><span>prácticas</span></div>' +
      chips(["Power BI", "DAX", "Google Analytics", "Google Ads", "Meta Ads", "SQL", "BPMN", "Figma", "Kotlin"], "chips--hero") +
      "</div></div></section>" +

      '<section class="section section--tight" id="trabajo"><div class="wrap">' +
      '<div class="shead"><h2 class="section__title">Proyectos</h2><p class="shead__note">Pulsa <b>▶</b> para probarlos sin salir de la página.</p></div>' +
      grid() +
      "</div></section>" +

      '<section class="section section--paper section--tight"><div class="wrap">' +
      '<div class="shead"><h2 class="section__title">Experiencia</h2><a class="pcard__more" href="#sobre-mi">Trayectoria completa ' + ARROW + "</a></div>" +
      jobs() +
      "</div></section></div>"
    );
  }

  function viewProjects() {
    return (
      '<div class="view"><section class="section section--top"><div class="wrap">' +
      '<div class="shead"><h1 class="page-title">Proyectos</h1><p class="shead__note">Pulsa <b>▶</b> para probarlos sin salir de la página.</p></div>' +
      grid() +
      "</div></section></div>"
    );
  }

  function demoBlock(p) {
    var src = p.embed || p.demo;
    return (
      '<section class="demo demo--compact" id="demo"><div class="wrap">' +
      '<div class="browser"><div class="browser__bar"><span class="browser__dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="browser__url" id="demoT">' + (p.embed ? "Power BI · " : "") + esc(p.title) + "</span>" +
      '<a class="browser__open" href="' + esc(src) + '" target="_blank" rel="noopener">Pantalla completa ' + EXT + "</a></div>" +
      '<div class="facade" id="facade"><img src="' + p.cover + '" alt="">' +
      '<button class="btn btn--lilac facade__btn" type="button" id="loadEmbed" data-src="' + esc(src) + '" data-title="' + esc(p.title) + '" data-bi="' + (p.embed ? "1" : "") + '">' +
      '<span aria-hidden="true">▶</span> ' + (p.embed ? "Cargar el informe" : "Probar aquí") + "</button>" +
      '<p class="facade__hint">' + esc(p.demoLabel || "Filtra por año, cambia de página y elige una canción por su portada.") + "</p></div>" +
      "</div></div></section>"
    );
  }

  function tabs(p) {
    if (!p.sections.length) return "";
    return (
      '<div class="tabs" data-tabs>' +
      '<div class="tabs__list" role="tablist">' +
      p.sections.map(function (s, i) {
        return '<button type="button" role="tab" class="tabs__tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + ">" + esc(s.h) + "</button>";
      }).join("") +
      "</div>" +
      p.sections.map(function (s, i) {
        return '<div class="tabs__panel block__txt" role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? " hidden" : "") + ">" +
          (s.p || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
          (s.list ? "<ul>" + s.list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
          "</div>";
      }).join("") +
      "</div>"
    );
  }

  function viewCase(p) {
    if (p.bi && window.renderBICase && (window.BI_CASES || {})[p.slug]) {
      var nx = P[(P.indexOf(p) + 1) % P.length];
      return window.renderBICase(p, demoBlock(p), '<a class="next" href="#p-' + nx.slug + '"><div class="wrap"><span class="next__l">Siguiente proyecto</span><span class="next__t">' + esc(nx.title) + " " + ARROW + "</span></div></a>");
    }
    var i = P.indexOf(p), next = P[(i + 1) % P.length];
    var hasDemo = p.embed || p.demo;
    var visual = p.notes
      ? '<div class="case-visual">' + annotated(p) + "</div>"
      : hasDemo ? "" : '<div class="case-cover' + (p.coverFit === "contain" ? " case-cover--contain" : "") + '"><img src="' + p.cover + '" alt="' + esc(p.coverAlt) + '"></div>';
    var gallery = p.gallery && p.gallery.length
      ? '<div class="strip">' + p.gallery.map(function (g, k) {
          return '<button type="button" class="strip__item" data-zoom="' + k + '"><img src="' + g[0] + '" alt="' + esc(g[1]) + '" loading="lazy"><span>' + esc(g[1]) + "</span></button>";
        }).join("") + "</div>"
      : "";
    return (
      '<div class="view"><article>' +
      '<header class="case-hero case-hero--compact"><div class="wrap">' +
      '<a class="back" href="#proyectos"><span aria-hidden="true">←</span> Proyectos</a>' +
      '<p class="eyebrow">' + esc(p.kicker) + "</p>" +
      '<h1 class="case-title case-title--compact">' + esc(p.title) + "</h1>" +
      '<p class="case-sum">' + esc(p.summary) + "</p>" +
      '<div class="case-chips">' + chips([p.role].concat(p.tools), "chips--case") + "</div>" +
      "</div></header>" +
      (hasDemo ? demoBlock(p) : "") +
      '<section class="section section--case section--tight"><div class="wrap case-body">' +
      (p.lead ? '<div class="case-q"><p class="q-label">' + esc(p.lead.label) + '</p><p class="q">' + esc(p.lead.text) + "</p></div>" : "") +
      (p.facts ? stats(p) : "") + visual + tabs(p) + gallery +
      "</div></section>" +
      '<a class="next" href="#p-' + next.slug + '"><div class="wrap"><span class="next__l">Siguiente proyecto</span><span class="next__t">' + esc(next.title) + " " + ARROW + "</span></div></a>" +
      "</article></div>"
    );
  }

  /* Trayectoria: escala de 2020 a 2028, un año = 12,5 % del ancho */
  function pos(y, m) { return ((y - 2020) + (m - 1) / 12) * 12.5; }
  function bar(c, y1, m1, y2, m2, open) {
    var s = pos(y1, m1), e = pos(y2, m2);
    return '<span class="tl__bar' + (open ? " tl__bar--open" : "") + '" style="--s:' + s.toFixed(2) + "%;--w:" + (e - s).toFixed(2) + "%;--c:" + c + '"></span>';
  }
  function timeline() {
    var rows = [
      ["FP Superior en Marketing y Publicidad", "IES Luis Buñuel · 2020–2022", bar("var(--coral)", 2020, 9, 2022, 6)],
      ["Marketing Digital (prácticas)", "PinkStone · 2021–2022", bar("var(--lilac-deep)", 2021, 7, 2022, 5)],
      ["Grado en Ciencia, Gestión e Ingeniería de Servicios", "URJC · TFG en abril de 2027", bar("var(--night)", 2022, 9, 2027, 4, true)],
      ["Ingeniera de Producto (prácticas)", "Cloud Worldwide Services · 2025–2026", bar("var(--mint-deep)", 2025, 10, 2026, 2)],
    ];
    var axis = "";
    for (var y = 2020; y < 2028; y++) axis += "<span>" + y + "</span>";
    return (
      '<div class="timeline"><div class="tl" role="img" aria-label="Cronología de formación y prácticas entre 2020 y 2027.">' +
      '<span></span><div class="tl__axis">' + axis + "</div>" +
      rows.map(function (r) { return '<div class="tl__label"><b>' + r[0] + "</b><span>" + r[1] + '</span></div><div class="tl__lane">' + r[2] + "</div>"; }).join("") +
      "</div></div>"
    );
  }

  /* ---------- Sobre mí · "Mi mapa de experiencia" ----------
     Mi historia contada como un customer journey. Fotos en assets/img/meylin-*.webp */
  var PHOTO = "assets/img/meylin-retrato.webp";

  var STAGES = [
    { id: "descubrir", n: "Descubrir", when: "2020 – 2022",
      study: "FP Superior en Marketing y Publicidad, en modalidad dual.",
      did: "Prácticas en PinkStone (Marketing Operations & Content): SEO, contenidos, Google Ads, Facebook Ads, Google Analytics, informes y WordPress.",
      learnt: "Lo importante que es entender lo que necesita cada cliente." },
    { id: "aprender", n: "Aprender", when: "2022 – hoy",
      study: "Grado en Ciencia, Gestión e Ingeniería de Servicios (URJC). Asignaturas terminadas.",
      did: "Proyectos de procesos, datos, producto e innovación: algunos están en este portfolio.",
      learnt: "A conectar la gestión de empresas con la tecnología, los procesos, la analítica y el diseño de servicios." },
    { id: "practicar", n: "Practicar", when: "oct. 2025 – feb. 2026",
      study: "Último tramo del grado.",
      did: "Product Engineer en prácticas en Cloud Worldwide Services: dashboards en Power BI, modelado de datos, DAX y Power Query, documentación funcional, historias de usuario, prototipos de interfaz y proyectos con IA.",
      learnt: "Cómo se conectan las necesidades del negocio, los datos y el desarrollo de un producto digital." },
    { id: "ahora", n: "Ahora", when: "Hoy",
      study: "Terminando el TFG.",
      did: "Proyectos propios y aprendiendo herramientas nuevas.",
      learnt: "Busco mi primera oportunidad para aplicar todo lo anterior y seguir aprendiendo en equipo." },
  ];

  /* Pilares: cuánto tiene cada proyecto de personas (p), tecnología (t) y negocio (n) */
  var PILLARS = { p: "Personas", t: "Tecnología", n: "Negocio" };
  var WEIGHTS = {
    "conexia": [0.45, 0.4, 0.15], "emoi": [0.45, 0.5, 0.05], "sentimix": [0.45, 0.1, 0.45],
    "sermas-citas": [0.3, 0.15, 0.55], "spotify-tendencias": [0.15, 0.45, 0.4], "ventas-vinos": [0.1, 0.35, 0.55],
  };
  var PTOOLS = {
    p: "Figma, Design Thinking, Customer Journey Map, UX/UI, prototipado",
    t: "Power BI, DAX, Power Query, SQL básico, Azure DevOps",
    n: "BPMN, Service Blueprint, análisis de procesos, Google Ads, Google Analytics",
  };
  /* Triángulo: Personas arriba, Tecnología abajo a la izquierda, Negocio abajo a la derecha */
  var TRI = { p: [50, 6], t: [6, 88], n: [94, 88] };

  var WAY = [
    { n: "Entender", d: "El contexto, a quien lo usa y el problema, antes de proponer nada.",
      ex: "En SERMAS empezamos dibujando cómo se pide hoy una cita (AS-IS) antes de proponer ningún cambio.", slug: "sermas-citas" },
    { n: "Analizar", d: "Ordenar la información, buscar patrones y ver dónde se puede mejorar.",
      ex: "En el informe de Spotify uní los rankings global y de España con un calendario común para comparar años.", slug: "spotify-tendencias" },
    { n: "Diseñar", d: "Convertir lo aprendido en algo que funcione, se entienda y esté cuidado.",
      ex: "En Conexia decidí que lo primero al abrir el panel fueran las incidencias urgentes.", slug: "conexia" },
    { n: "Mejorar", d: "Revisar el resultado, aprender de lo que falla y validar cada decisión.",
      ex: "En SERMAS propusimos un cuadro de mando para medir si el rediseño funcionaba de verdad.", slug: "sermas-citas" },
  ];


  /* Mis aficiones: mini tarjetas; cada una abre su apartado (se construye al primer clic) */
  var HOBBIES = [
    { k: "tickets", e: "🎤", t: "Conciertos", n: function (M) { return M.conciertos.length + " conciertos"; } },
    { k: "shelf", e: "📚", t: "Lectura", n: function (M) { return M.libros.length + " libros"; } },
    { k: "tv", e: "📺", t: "Series y juegos", n: function (M) { return (M.series.length + M.juegos.length) + " títulos"; } },
    { k: "trips", e: "✈️", t: "Viajes", n: function (M) { var d = {}; M.viajes.forEach(function (v) { d[v.destino] = 1; }); return Object.keys(d).length + " destinos"; } },
    { k: "recipe", e: "🧁", t: "Repostería", n: function (M) { return M.postres.length + " recetas"; } },
  ];
  function hobbyCards() {
    var M = window.MESA; if (!M) return "";
    return '<div class="hob" role="group" aria-label="Mis aficiones">' +
      HOBBIES.filter(function (h) { return !(h.k === "trips" && M.mostrarViajes === false); }).map(function (h) {
        return '<button type="button" class="hob__c" data-k="' + h.k + '" aria-expanded="false" aria-controls="hobbyPanel">' +
          '<span class="hob__e" aria-hidden="true">' + h.e + '</span><span class="hob__t">' + h.t + '</span><span class="hob__n">' + h.n(M) + "</span></button>";
      }).join("") + "</div>" +
      '<div class="hob__panel" id="hobbyPanel" hidden></div>';
  }

  function viewAbout() {
    var tri = TRI;
    return (
      '<div class="view mx">' +

      /* Presentación: todo lo esencial a la vista */
      '<section class="wrap mx-intro" aria-labelledby="mxT">' +
      (PHOTO ? '<figure class="mx-me"><span class="tape tape--a" aria-hidden="true"></span><img src="' + esc(PHOTO) + '" alt="Meylin Soto Reyes en un autobús de Londres, con chaqueta roja." width="800" height="1000"><figcaption class="hand">yo, en Londres</figcaption></figure>' : "") +
      '<div class="mx-intro__txt">' +
      '<p class="mx-kick"><span class="mey-dot" aria-hidden="true"></span>Sobre mí</p>' +
      '<h1 id="mxT">Me gusta entender cómo funcionan las cosas y descubrir <span>cómo hacerlas mejor.</span></h1>' +
      '<p class="mx-lead">Mi formación y mi experiencia mezclan análisis, creatividad y tecnología. Me interesa mirar un problema desde varios lados y convertir la información en algo útil y pensado para las personas.</p>' +
      '<dl class="mx-facts"><div><dt>Ahora</dt><dd>Terminando el TFG y buscando mi primera oportunidad.</dd></div>' +
      "<div><dt>Me interesa</dt><dd>Producto digital, BI y datos, marketing analítico, experiencia de cliente, procesos y transformación digital.</dd></div></dl>" +
      '<div class="actions"><a class="btn btn--small" href="#proyectos">Ver proyectos</a><a class="btn btn--small btn--ghost" href="#contacto">Contacto</a></div>' +
      '<nav class="mx-jump" aria-label="En esta página"><a href="#mxJourney" data-scroll="mxJourney">Mi recorrido</a><a href="#mxPillars" data-scroll="mxPillars">Personas, tecnología, negocio</a><a href="#mxWay" data-scroll="mxWay">Cómo trabajo</a><a href="#mxLife" data-scroll="mxLife">Fuera del trabajo</a></nav>' +
      "</div></section>" +

      /* 1 · Customer journey */
      '<section class="mx-sec mx-journey" id="mxJourney" aria-labelledby="mxJ"><div class="wrap">' +
      '<div class="mx-head"><h2 id="mxJ">Mi recorrido, como un customer journey</h2><p class="hand">es la herramienta que más he usado en el grado</p></div>' +
      '<div class="jm" data-jm>' +
      '<div class="jm__stages" role="tablist" aria-label="Etapas">' +
      STAGES.map(function (st, i) {
        return '<button type="button" role="tab" class="jm__stage" id="jmS' + i + '" aria-controls="jmP" aria-selected="' + (i === 2) + '" data-i="' + i + '"><span class="jm__dot" aria-hidden="true"></span><b>' + st.n + "</b><small>" + st.when + "</small></button>";
      }).join("") +
      "</div>" +
      '<div class="jm__grid" id="jmP" role="tabpanel" data-sel="2">' +
      ['study', 'did', 'learnt'].map(function (k, r) {
        var lab = ["Estudiaba", "Hacía", "Me llevé"][r];
        return '<div class="jm__lane"><span class="jm__lab">' + lab + "</span>" +
          STAGES.map(function (st, i) { return '<p class="jm__cell" data-col="' + i + '">' + esc(st[k]) + "</p>"; }).join("") + "</div>";
      }).join("") +
      "</div>" +
      '<p class="jm__hint">Toca una etapa para ampliarla.</p>' +
      "</div></div></section>" +

      /* 2 · Pilares */
      '<section class="mx-sec mx-pillars" id="mxPillars" aria-labelledby="mxP"><div class="wrap mx-tri">' +
      '<div class="mx-tri__txt"><h2 id="mxP">Personas, tecnología y negocio</h2>' +
      '<p>Casi todo lo que hago está en algún punto entre los tres. Mueve el punto (arrastrándolo, tocando el triángulo o con las flechas del teclado) y mira qué proyectos quedan más cerca.</p>' +
      "</div>" +
      '<div class="tri" id="tri">' +
      '<svg viewBox="0 0 100 96" class="tri__svg" aria-hidden="true"><polygon points="' + tri.p + " " + tri.t + " " + tri.n + '"/>' +
      '<line x1="50" y1="6" x2="50" y2="60.7"/><line x1="6" y1="88" x2="50" y2="60.7"/><line x1="94" y1="88" x2="50" y2="60.7"/></svg>' +
      '<span class="tri__c tri__c--p">Personas</span><span class="tri__c tri__c--t">Tecnología</span><span class="tri__c tri__c--n">Negocio</span>' +
      '<button type="button" class="tri__dot" id="triDot" aria-label="Punto MEY. Usa las flechas para moverlo por el triángulo."></button>' +
      "</div>" +
      '<div class="tri__presets" role="group" aria-label="Posiciones rápidas"><button type="button" data-w="1,0,0">Personas</button><button type="button" data-w="0,1,0">Tecnología</button><button type="button" data-w="0,0,1">Negocio</button><button type="button" data-w=".34,.33,.33">Los tres</button></div>' +
      '<div class="tri-out" id="triOut" aria-live="polite"></div>' +
      "</div></section>" +

      /* 3 · Cómo trabajo */
      '<section class="mx-sec mx-way" id="mxWay" aria-labelledby="mxW"><div class="wrap">' +
      '<div class="mx-head"><h2 id="mxW">Cómo trabajo</h2><p class="hand">y vuelta a empezar</p></div>' +
      '<div class="way" data-way>' +
      '<div class="way__track" role="tablist" aria-label="Pasos">' +
      '<span class="way__line" aria-hidden="true"></span><span class="way__mey" aria-hidden="true"></span>' +
      WAY.map(function (w, i) { return '<button type="button" role="tab" class="way__stop" aria-selected="' + (i === 0) + '" data-i="' + i + '"><span>0' + (i + 1) + "</span>" + w.n + "</button>"; }).join("") +
      "</div>" +
      '<div class="way__panel" id="wayPanel" aria-live="polite"></div>' +
      "</div></div></section>" +

      /* 4 · Herramientas (siempre visibles) */
      '<section class="mx-sec mx-tools"><div class="wrap">' +
      '<div class="mx-head"><h2>Con qué trabajo</h2><p class="hand">con punto, lo que usé en prácticas</p></div>' +
      '<dl class="tl2">' +
      [["Datos y analítica", "<em>Power BI</em> · <em>DAX</em> · <em>Power Query</em> · Excel · SQL básico"],
       ["Producto y UX", "<em>Figma</em> · <em>prototipado</em> · <em>diseño de interfaces</em> · Design Thinking · UX/UI · Design Systems"],
       ["Procesos y negocio", "BPMN · Customer Journey Map · Service Blueprint · análisis de procesos · diseño de servicios"],
       ["Gestión de producto", "<em>Azure DevOps</em> · <em>historias de usuario</em> · <em>documentación funcional</em> · metodologías ágiles"],
       ["Marketing digital", "<em>Google Ads</em> · <em>Facebook Ads</em> · <em>Google Analytics</em> · <em>SEO</em> · <em>WordPress</em> · SEM"]]
        .map(function (t) { return "<div><dt>" + t[0] + "</dt><dd>" + t[1] + "</dd></div>"; }).join("") +
      "</dl></div></section>" +

      /* 5 · Fuera del trabajo */
      '<section class="mx-sec mx-life" id="mxLife" aria-labelledby="mxL"><div class="wrap">' +
      '<div class="mx-head"><h2 id="mxL">Fuera del trabajo</h2><p class="hand">mis aficiones</p></div>' +
      hobbyCards() +
      '<div class="mx-close"><p>Siempre estoy abierta a conocer proyectos, ideas y oportunidades nuevas.</p>' +
      '<a class="btn btn--small" href="#contacto">Escríbeme</a><a class="btn btn--small btn--ghost" href="https://www.linkedin.com/in/meylinsore" target="_blank" rel="noopener">LinkedIn ↗</a></div>' +
      "</div></section>" +
      "</div>"
    );
  }

  /* ---------- Interacciones de Sobre mí ---------- */
  function setupAbout() {
    var jm = main.querySelector("[data-jm]");
    if (!jm) return;

    /* Recorrido */
    var stages = jm.querySelectorAll(".jm__stage"), grid = jm.querySelector(".jm__grid");
    function pickStage(i) {
      stages.forEach(function (b) { var on = b.getAttribute("data-i") === String(i); b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
      grid.setAttribute("data-sel", i);
      grid.setAttribute("aria-labelledby", "jmS" + i);
      grid.querySelectorAll(".jm__cell").forEach(function (c) { c.classList.toggle("is-on", c.getAttribute("data-col") === String(i)); });
    }
    stages.forEach(function (b, i) {
      b.addEventListener("click", function () { pickStage(i); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return;
        var n = (i + d + stages.length) % stages.length; pickStage(n); stages[n].focus();
      });
    });
    pickStage(2);

    /* Triángulo */
    var box = document.getElementById("tri"), dot = document.getElementById("triDot"), out = document.getElementById("triOut");
    var w = [0.34, 0.33, 0.33];
    function toXY(w) { return [w[0] * TRI.p[0] + w[1] * TRI.t[0] + w[2] * TRI.n[0], w[0] * TRI.p[1] + w[1] * TRI.t[1] + w[2] * TRI.n[1]]; }
    function toW(x, y) {
      var A = TRI.p, B = TRI.t, C = TRI.n;
      var det = (B[1] - C[1]) * (A[0] - C[0]) + (C[0] - B[0]) * (A[1] - C[1]);
      var a = ((B[1] - C[1]) * (x - C[0]) + (C[0] - B[0]) * (y - C[1])) / det;
      var b = ((C[1] - A[1]) * (x - C[0]) + (A[0] - C[0]) * (y - C[1])) / det;
      var c = 1 - a - b;
      a = Math.max(0, a); b = Math.max(0, b); c = Math.max(0, c);
      var s = a + b + c || 1; return [a / s, b / s, c / s];
    }
    function render() {
      var xy = toXY(w);
      dot.style.left = xy[0] + "%"; dot.style.top = (xy[1] / 96 * 100) + "%";
      var ranked = Object.keys(WEIGHTS).map(function (k) {
        var v = WEIGHTS[k], d = Math.pow(v[0] - w[0], 2) + Math.pow(v[1] - w[1], 2) + Math.pow(v[2] - w[2], 2);
        return [k, d];
      }).sort(function (x, y) { return x[1] - y[1]; }).slice(0, 2);
      var keys = ["p", "t", "n"], max = Math.max(w[0], w[1], w[2]);
      var lead = keys.filter(function (k, i) { return w[i] >= max - 0.12; });
      var title = lead.length === 3 ? "Los tres a la vez" : lead.map(function (k) { return PILLARS[k]; }).join(" + ");
      var pct = keys.map(function (k, i) { return '<span style="--v:' + Math.round(w[i] * 100) + '%"><b>' + PILLARS[k] + "</b></span>"; }).join("");
      out.innerHTML =
        '<p class="tri-out__t">' + title + "</p>" +
        '<div class="tri-out__mix" aria-hidden="true">' + pct + "</div>" +
        '<p class="tri-out__l">Proyectos más cerca</p><p class="tri-out__p">' +
        ranked.map(function (r) { var p = bySlug(r[0]); return '<a href="#p-' + p.slug + '">' + esc(p.title) + " →</a>"; }).join("") + "</p>" +
        '<p class="tri-out__l">Herramientas</p><p class="tri-out__tools">' + lead.map(function (k) { return PTOOLS[k]; }).join(" · ") + "</p>";
      dot.setAttribute("aria-valuetext", title);
    }
    function fromEvent(e) {
      var r = box.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width * 100, y = (e.clientY - r.top) / r.height * 96;
      w = toW(x, y); render();
    }
    var dragging = false;
    box.addEventListener("pointerdown", function (e) { dragging = true; box.setPointerCapture(e.pointerId); fromEvent(e); dot.focus({ preventScroll: true }); });
    box.addEventListener("pointermove", function (e) { if (dragging) fromEvent(e); });
    box.addEventListener("pointerup", function () { dragging = false; });
    box.addEventListener("pointercancel", function () { dragging = false; });
    dot.addEventListener("keydown", function (e) {
      var xy = toXY(w), st = 4;
      if (e.key === "ArrowLeft") xy[0] -= st; else if (e.key === "ArrowRight") xy[0] += st;
      else if (e.key === "ArrowUp") xy[1] -= st; else if (e.key === "ArrowDown") xy[1] += st; else return;
      e.preventDefault(); w = toW(xy[0], xy[1]); render();
    });
    main.querySelectorAll("[data-w]").forEach(function (b) {
      b.addEventListener("click", function () { w = b.getAttribute("data-w").split(",").map(Number); render(); });
    });
    render();

    /* Cómo trabajo */
    var way = main.querySelector("[data-way]"), stops = way.querySelectorAll(".way__stop"), panel = document.getElementById("wayPanel");
    function pickWay(i) {
      stops.forEach(function (b) { var on = b.getAttribute("data-i") === String(i); b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
      way.style.setProperty("--step", i);
      var s = WAY[i], p = bySlug(s.slug);
      panel.innerHTML = '<p class="way__d">' + s.d + '</p><p class="way__ex"><span class="hand">ejemplo real</span>' + s.ex + ' <a href="#p-' + p.slug + '">Ver ' + esc(p.title) + " →</a></p>";
    }
    stops.forEach(function (b, i) {
      b.addEventListener("click", function () { pickWay(i); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return;
        var n = (i + d + stops.length) % stops.length; pickWay(n); stops[n].focus();
      });
    });
    pickWay(0);

    /* Mis aficiones */
    var hp = main.querySelector("#hobbyPanel"), hcs = main.querySelectorAll(".hob__c"), built = false;
    hcs.forEach(function (c) {
      c.addEventListener("click", function () {
        var k = c.getAttribute("data-k"), open = c.getAttribute("aria-expanded") !== "true";
        hcs.forEach(function (x) { x.setAttribute("aria-expanded", String(open && x === c)); });
        hp.hidden = !open;
        if (!open) return;
        if (!built && window.renderMesa) {
          built = true; hp.insertAdjacentHTML("beforeend", window.renderMesa());
          if (window.setupMesa) window.setupMesa(hp);
        }
        hp.querySelectorAll(".desk > .obj").forEach(function (o) { o.classList.toggle("is-on", o.classList.contains("obj--" + k)); });
      });
    });
  }

  /* ---------- Router ---------- */
  function route() {
    var h = (location.hash || "").replace(/^#/, "");
    var html, title = "Meylin Soto Reyes · MEY.", current = "", scrollTo = null;
    if (h.indexOf("p-") === 0) {
      var p = bySlug(h.slice(2));
      if (p) { html = viewCase(p); title = p.title + " · Meylin Soto Reyes"; current = "proyectos"; }
    } else if (h === "proyectos") { html = viewProjects(); title = "Proyectos · Meylin Soto Reyes"; current = "proyectos"; }
    else if (h === "sobre-mi") { html = viewAbout(); title = "Sobre mí · Meylin Soto Reyes"; current = "sobre-mi"; }
    else if (h === "contacto") { scrollTo = "contacto"; current = "contacto"; }
    if (!html && !scrollTo) html = viewHome();

    document.querySelectorAll("[data-route]").forEach(function (a) {
      if (a.getAttribute("data-route") === current) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    closeMenu();

    if (scrollTo) {
      if (!main.innerHTML) { main.innerHTML = viewHome(); afterRender(); }
      document.getElementById(scrollTo).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      return;
    }
    var swap = function () {
      main.innerHTML = html;
      document.title = title;
      var md = document.querySelector('meta[name="description"]');
      if (md) { if (!md.getAttribute("data-def")) md.setAttribute("data-def", md.getAttribute("content")); md.setAttribute("content", (h.indexOf("p-") === 0 && P.filter(function (x) { return "p-" + x.slug === h; })[0] || {}).meta || md.getAttribute("data-def")); }
      window.scrollTo(0, 0);
      afterRender();
    };
    if (document.startViewTransition && !reduce && main.innerHTML) document.startViewTransition(swap);
    else swap();
  }

  function afterRender() { setupReveal(); setupFilters(); setupEmbed(); setupTabs(); setupCount(); setupRotator(); setupAbout(); if (window.setupBICase) window.setupBICase(main); }

  /* Aparición suave al hacer scroll: solo para lo que aún no está en pantalla */
  var io = null;
  function setupReveal() {
    if (reduce || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove("is-pending"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    var vh = window.innerHeight;
    main.querySelectorAll(".reveal").forEach(function (el) {
      if (el.getBoundingClientRect().top > vh) { el.classList.add("is-pending"); io.observe(el); }
    });
  }

  function setupFilters() {
    var g = document.getElementById("allRows");
    if (!g) return;
    main.querySelectorAll(".filter").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-f");
        main.querySelectorAll(".filter").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        g.querySelectorAll(".pcard").forEach(function (c) {
          c.classList.toggle("is-hidden", !!f && c.getAttribute("data-disc") !== f);
          c.classList.remove("is-pending");
        });
      });
    });
  }

  /* Pestañas de los casos */
  function setupTabs() {
    main.querySelectorAll("[data-tabs]").forEach(function (box) {
      var tabsEls = box.querySelectorAll('[role="tab"]');
      function select(t) {
        tabsEls.forEach(function (x) {
          var on = x === t;
          x.setAttribute("aria-selected", String(on));
          x.tabIndex = on ? 0 : -1;
          document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
        });
      }
      tabsEls.forEach(function (t, i) {
        t.addEventListener("click", function () { select(t); });
        t.addEventListener("keydown", function (e) {
          var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!d) return;
          var n = tabsEls[(i + d + tabsEls.length) % tabsEls.length];
          select(n); n.focus();
        });
      });
    });
  }

  /* Cifras que cuentan hacia arriba al aparecer */
  function setupCount() {
    if (reduce || !("IntersectionObserver" in window)) return;
    var els = main.querySelectorAll("[data-count]");
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, to = parseInt(el.getAttribute("data-count"), 10), t0 = null;
        if (isNaN(to)) return;
        function step(ts) {
          if (!t0) t0 = ts;
          var k = Math.min(1, (ts - t0) / 900);
          el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        setTimeout(function () { el.textContent = to; }, 1100);
      });
    });
    els.forEach(function (el) { cio.observe(el); });
  }

  /* Palabra que rota en la portada */
  var rotTimer = null;
  function setupRotator() {
    clearInterval(rotTimer);
    var el = document.getElementById("rot");
    if (!el || reduce) return;
    var words = ["producto", "datos", "marketing", "procesos"], i = 0;
    rotTimer = setInterval(function () {
      el.classList.add("is-out");
      setTimeout(function () { i = (i + 1) % words.length; el.textContent = words[i]; el.classList.remove("is-out"); }, 280);
    }, 2200);
  }

  /* ---------- Ventana para probar demos e informes ---------- */
  var dlg = document.createElement("dialog");
  dlg.className = "modal";
  dlg.innerHTML =
    '<div class="modal__bar"><span class="modal__t" id="modalT"></span>' +
    '<a class="browser__open" id="modalOpen" target="_blank" rel="noopener">Pantalla completa ' + EXT + "</a>" +
    '<a class="browser__open" id="modalCase">Ver caso →</a>' +
    '<button type="button" class="modal__x" id="modalX" aria-label="Cerrar">✕</button></div>' +
    '<div class="modal__body" id="modalBody"></div>';
  document.body.appendChild(dlg);
  function openModal(title, inner, openHref, caseHref) {
    document.getElementById("modalT").textContent = title;
    document.getElementById("modalBody").innerHTML = inner;
    var o = document.getElementById("modalOpen"), c = document.getElementById("modalCase");
    o.hidden = !openHref; if (openHref) o.href = openHref;
    c.hidden = !caseHref; if (caseHref) c.href = caseHref;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function closeModal() { if (dlg.open) dlg.close(); }
  window.meyZoom = function (src, alt) { openModal(alt, '<img class="modal__img" src="' + esc(src) + '" alt="' + esc(alt) + '">', null, null); };
  dlg.addEventListener("close", function () { document.getElementById("modalBody").innerHTML = ""; document.body.style.overflow = ""; });
  document.getElementById("modalX").addEventListener("click", closeModal);
  document.getElementById("modalCase").addEventListener("click", closeModal);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeModal(); });

  main.addEventListener("click", function (e) {
    var pb = e.target.closest("[data-play]");
    if (pb) {
      var p = bySlug(pb.getAttribute("data-play")), src = p.embed || p.demo;
      openModal(p.title, '<iframe class="modal__frame' + (p.embed ? " modal__frame--bi" : "") + '" src="' + esc(src) + '" title="' + esc(p.title) + '" allowfullscreen></iframe>', src, "#p-" + p.slug);
      return;
    }
    var z = e.target.closest("[data-zoom]");
    if (z) {
      var img = z.querySelector("img");
      openModal(img.alt, '<img class="modal__img" src="' + img.getAttribute("src") + '" alt="' + esc(img.alt) + '">', null, null);
    }
  });

  /* El informe de Power BI se carga solo cuando se pide */
  function setupEmbed() {
    var b = document.getElementById("loadEmbed");
    if (!b) return;
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.className = "browser__frame" + (b.getAttribute("data-bi") ? " browser__frame--bi" : "");
      f.src = b.getAttribute("data-src");
      f.title = "Versión interactiva: " + b.getAttribute("data-title");
      f.setAttribute("allowfullscreen", "true");
      document.getElementById("facade").replaceWith(f);
      f.focus();
    });
  }

  /* ---------- Menú móvil ---------- */
  var tog = document.getElementById("navToggle"), menu = document.getElementById("navMenu");
  function closeMenu() { menu.classList.remove("is-open"); tog.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
  tog.addEventListener("click", function () {
    var open = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", open);
    tog.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });

  /* ---------- Copiar correo ---------- */
  var cp = document.getElementById("copyMail");
  cp.addEventListener("click", function () {
    var v = cp.getAttribute("data-copy");
    var done = function () { cp.textContent = "Copiado"; setTimeout(function () { cp.textContent = "Copiar"; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(v).then(done, selectMail);
    else selectMail();
  });
  function selectMail() {
    var el = cp.parentElement.querySelector(".close__value");
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  var nav = document.querySelector(".nav");
  window.addEventListener("scroll", function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); }, { passive: true });

  document.querySelector(".skip").addEventListener("click", function (e) { e.preventDefault(); main.focus(); });
  main.addEventListener("click", function (e) {
    var a = e.target.closest("[data-scroll]");
    if (!a) return;
    e.preventDefault();
    var t = document.getElementById(a.getAttribute("data-scroll"));
    if (t) t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  });

  window.addEventListener("hashchange", route);
  route();
})();
