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

  /* ---------- Experiencia (texto real del CV) ---------- */
  var JOBS = [
    {
      co: "Cloud Worldwide Services",
      role: "Ingeniera de Producto · prácticas",
      when: "oct. 2025 – feb. 2026",
      short:
        "Construí dashboards en Power BI, con medidas DAX, para seguir el uso de productos de inteligencia artificial, análisis de voz y biometría: dónde caía el uso y cómo era la actividad de cada empresa. Los dashboards son internos y no se pueden compartir.",
      long: [
        "Cloud Worldwide Services desarrolla productos de inteligencia artificial, análisis de voz y biometría. Allí construí dashboards en Power BI, con medidas DAX, para seguir indicadores de uso y de negocio, entre ellos la detección de caídas de uso y la actividad de cada empresa.",
        "También seguí funcionalidades, tareas e hitos en Azure DevOps, participé en la documentación funcional y de producto, en el análisis de requisitos y en las pruebas funcionales y de calidad, y coordiné información entre equipos.",
        "Los dashboards son internos de la empresa, así que no aparecen en esta web.",
      ],
    },
    {
      co: "PinkStone Advertisement Group",
      role: "Marketing Digital · formación dual",
      when: "jul. 2021 – may. 2022",
      short:
        "Seguí entre 5 y 10 campañas de Google Ads y Meta Ads a la vez para clientes de restauración, calzado y eventos deportivos, y preparé los informes de resultados con Google Analytics y Excel.",
      long: [
        "En esta agencia seguí entre 5 y 10 campañas de Google Ads y Meta Ads a la vez, para clientes de restauración, calzado y eventos deportivos, dentro de la estrategia que definía el equipo.",
        "Apoyé la gestión de cuentas de pequeños clientes de hostelería, moda y comercio, analicé los resultados con Google Analytics y Excel para preparar informes, y redacté contenidos optimizados para SEO en WordPress.",
      ],
    },
  ];

  function jobs(full) {
    return (
      '<div class="jobs">' +
      JOBS.map(function (j) {
        return (
          '<article class="job reveal"><header class="job__head"><h3>' + j.co + "</h3>" +
          '<p class="job__role">' + j.role + '</p><p class="job__when">' + j.when + "</p></header>" +
          '<div class="job__txt">' + (full ? j.long : [j.short]).map(function (t) { return "<p>" + t + "</p>"; }).join("") + "</div></article>"
        );
      }).join("") +
      "</div>"
    );
  }

  /* ---------- Captura anotada (Conexia) ---------- */
  function annotated(p) {
    return (
      '<figure class="anno">' +
      '<div class="anno__shot"><img src="' + p.cover + '" alt="' + esc(p.coverAlt) + '">' +
      p.notes.map(function (n, i) {
        return '<span class="anno__pin" style="left:' + n.x + "%;top:" + n.y + '%" aria-hidden="true">' + (i + 1) + "</span>";
      }).join("") +
      "</div>" +
      '<figcaption><ol class="anno__list">' +
      p.notes.map(function (n) { return "<li><b>" + esc(n.t) + "</b><span>" + esc(n.d) + "</span></li>"; }).join("") +
      "</ol></figcaption></figure>"
    );
  }

  function facts(p) {
    return (
      '<dl class="facts">' +
      p.facts.map(function (f) { return '<div class="facts__row"><dt>' + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") +
      "</dl>"
    );
  }

  /* ---------- Filas de proyecto (galería secundaria y página Proyectos) ---------- */
  function row(p) {
    return (
      '<a class="prow reveal" href="#p-' + p.slug + '" data-disc="' + esc(p.discipline) + '">' +
      '<span class="prow__title">' + esc(p.title) + "</span>" +
      '<span class="prow__txt"><span class="prow__kicker">' + esc(p.kicker) + (p.year ? " · " + esc(p.year) : "") + "</span>" +
      '<span class="prow__sum">' + esc(p.summary) + "</span></span>" +
      '<span class="prow__thumb' + (p.coverFit === "contain" ? " prow__thumb--contain" : "") + '"><img src="' + p.cover + '" alt="" loading="lazy"></span>' +
      '<span class="prow__go" aria-hidden="true">→</span></a>'
    );
  }

  /* ---------- Vistas ---------- */
  function viewHome() {
    var sp = bySlug("spotify-tendencias"), cx = bySlug("conexia");
    var rest = P.filter(function (p) { return !p.featured; });
    return (
      '<div class="view">' +
      /* Presentación */
      '<section class="intro"><div class="wrap intro__grid">' +
      '<div class="intro__main">' +
      '<p class="eyebrow">Selección de trabajo</p>' +
      '<h1 class="intro__name">Meylin<br>Soto Reyes</h1>' +
      '<p class="intro__role">' + MARK + "Analítica de producto y marketing digital</p>" +
      '<div class="intro__bio"><p>He hecho dashboards en Power BI para seguir el uso de productos de inteligencia artificial y he analizado campañas de Google Ads y Meta Ads. Empecé en marketing digital, en una agencia, y después pasé a producto.</p>' +
      "<p>Estudio Ciencia, Gestión e Ingeniería de Servicios en la Universidad Rey Juan Carlos. Vivo en Madrid.</p></div>" +
      "</div>" +
      '<nav class="intro__index" aria-label="Proyectos de esta selección"><p class="intro__index-t">En esta selección</p><ul>' +
      P.map(function (p) {
        return '<li><a href="#p-' + p.slug + '"><span>' + esc(p.title) + '</span><small>' + esc(p.discipline) + "</small></a></li>";
      }).join("") +
      '</ul><p class="intro__facts">Power BI · DAX · Google Analytics · Google Ads · Meta Ads · SQL básico<br>Español nativo · Inglés B2</p></nav>' +
      "</div></section>" +

      /* Spotify: parte de una pregunta */
      '<section class="feat feat--spotify"><div class="wrap feat__grid">' +
      '<div class="feat__copy">' +
      '<p class="eyebrow">' + esc(sp.kicker) + "</p>" +
      '<p class="q-label">' + esc(sp.lead.label) + "</p>" +
      '<h2 class="q">' + esc(sp.lead.text) + "</h2>" +
      '<p class="feat__sum">' + esc(sp.summary) + "</p>" + facts(sp) +
      '<div class="actions"><a class="btn" href="#p-spotify-tendencias">Ver el caso ' + ARROW + "</a>" +
      '<a class="btn btn--ghost" href="' + esc(sp.embed) + '" target="_blank" rel="noopener">Abrir el informe ' + EXT + "</a></div>" +
      "</div>" +
      '<a class="feat__visual" href="#p-spotify-tendencias" aria-label="Ver el caso de Spotify"><img src="' + sp.cover + '" alt="' + esc(sp.coverAlt) + '"><span class="feat__tag">Informe en vivo en el caso</span></a>' +
      "</div></section>" +

      /* Conexia: parte de una decisión */
      '<section class="feat feat--conexia"><div class="wrap">' +
      '<div class="feat__top"><div><p class="eyebrow eyebrow--light">' + esc(cx.title) + " · " + esc(cx.kicker) + "</p>" +
      '<p class="q-label q-label--light">' + esc(cx.lead.label) + "</p>" +
      '<h2 class="q q--light">' + esc(cx.lead.text) + "</h2></div>" +
      '<p class="feat__sum feat__sum--light">' + esc(cx.summary) + "</p></div>" +
      annotated(cx) +
      '<div class="actions"><a class="btn btn--lilac" href="#p-conexia">Ver el caso ' + ARROW + "</a>" +
      '<a class="btn btn--ghost-light" href="' + esc(cx.demo) + '" target="_blank" rel="noopener">Probar el panel ' + EXT + "</a></div>" +
      "</div></section>" +

      /* Galería secundaria */
      '<section class="section"><div class="wrap">' +
      '<div class="section__head"><h2 class="section__title">Más proyectos</h2>' +
      '<p class="section__intro">Innovación, procesos y una app propia. Sentimix y SERMAS se pueden recorrer dentro de su caso.</p></div>' +
      '<div class="prows">' + rest.map(row).join("") + "</div>" +
      "</div></section>" +

      /* Experiencia */
      '<section class="section section--paper"><div class="wrap">' +
      '<div class="section__head"><h2 class="section__title">Experiencia</h2>' +
      '<p class="section__intro">Dos prácticas: una en producto tecnológico y otra en una agencia de publicidad.</p></div>' +
      jobs(false) +
      '<p class="more"><a class="btn btn--ghost" href="#sobre-mi">Formación y trayectoria completa ' + ARROW + "</a></p>" +
      "</div></section></div>"
    );
  }

  function viewProjects() {
    var discs = [];
    P.forEach(function (p) { if (discs.indexOf(p.discipline) < 0) discs.push(p.discipline); });
    return (
      '<div class="view"><section class="section section--top"><div class="wrap">' +
      '<div class="section__head"><h1 class="page-title">Proyectos</h1>' +
      '<p class="section__intro">' + P.length + " proyectos de datos, producto, procesos e innovación. Entra en cualquiera para ver el caso completo.</p></div>" +
      '<div class="filters" role="group" aria-label="Filtrar por disciplina">' +
      '<button class="filter" type="button" id="f-all" data-f="" aria-pressed="true">Todos</button>' +
      discs.map(function (d, i) { return '<button class="filter" type="button" id="f-' + i + '" data-f="' + esc(d) + '" aria-pressed="false">' + esc(d) + "</button>"; }).join("") +
      "</div>" +
      '<div class="prows prows--all" id="allRows">' + P.map(row).join("") + "</div>" +
      "</div></section></div>"
    );
  }

  function embedBlock(p) {
    return (
      '<section class="demo" id="demo"><div class="wrap">' +
      '<div class="demo__head"><h2 class="demo__t" id="demoT">El informe, en vivo</h2>' +
      '<p class="demo__intro">Filtra por año, cambia de página y elige una canción por su portada. El informe se carga desde Power BI.</p></div>' +
      '<div class="browser"><div class="browser__bar"><span class="browser__dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="browser__url">Power BI · ' + esc(p.title) + "</span>" +
      '<a class="browser__open" href="' + esc(p.embed) + '" target="_blank" rel="noopener">Abrir en Power BI ' + EXT + "</a></div>" +
      '<div class="facade" id="facade"><img src="' + p.cover + '" alt="">' +
      '<button class="btn btn--lilac facade__btn" type="button" id="loadEmbed" data-src="' + esc(p.embed) + '" data-title="' + esc(p.title) + '">Cargar el informe interactivo</button></div>' +
      "</div></div></section>"
    );
  }

  function demoBlock(p) {
    return (
      '<section class="demo" id="demo"><div class="wrap">' +
      '<div class="demo__head"><h2 class="demo__t" id="demoT">Pruébalo aquí</h2>' +
      '<p class="demo__intro">' + esc(p.demoLabel) + "</p></div>" +
      '<div class="browser"><div class="browser__bar"><span class="browser__dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="browser__url">' + esc(p.title) + "</span>" +
      '<a class="browser__open" href="' + esc(p.demo) + '" target="_blank" rel="noopener">Pantalla completa ' + EXT + "</a></div>" +
      '<iframe class="browser__frame" src="' + esc(p.demo) + '" title="Versión interactiva de ' + esc(p.title) + '" loading="lazy"></iframe></div>' +
      '<p class="demo__mobile"><a class="btn btn--lilac" href="' + esc(p.demo) + '" target="_blank" rel="noopener">Abrir a pantalla completa ' + EXT + "</a></p>" +
      "</div></section>"
    );
  }

  function viewCase(p) {
    var i = P.indexOf(p), next = P[(i + 1) % P.length];
    var visual = p.notes
      ? '<div class="case-visual">' + annotated(p) + "</div>"
      : p.embed
        ? ""
        : '<div class="case-cover' + (p.coverFit === "contain" ? " case-cover--contain" : "") + '"><img src="' + p.cover + '" alt="' + esc(p.coverAlt) + '"></div>';
    var blocks = p.sections.map(function (s) {
      return (
        '<div class="block reveal"><h2>' + esc(s.h) + '</h2><div class="block__txt">' +
        (s.p || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        (s.list ? "<ul>" + s.list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
        "</div></div>"
      );
    }).join("");
    var gallery = p.gallery && p.gallery.length
      ? '<section class="section section--paper"><div class="wrap"><h2 class="sub-title">Más pantallas</h2><div class="shots">' +
        p.gallery.map(function (g) { return '<figure class="reveal"><img src="' + g[0] + '" alt="' + esc(g[1]) + '" loading="lazy"><figcaption>' + esc(g[1]) + "</figcaption></figure>"; }).join("") +
        "</div></div></section>"
      : "";
    var pending = p.pending && p.pending.length
      ? '<div class="pending" role="note"><b>Pendiente de completar</b><ul>' + p.pending.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>"
      : "";
    var jump = p.embed || p.demo
      ? '<p><a class="btn" href="#demoT" data-scroll="demoT">' + (p.embed ? "Ir al informe interactivo" : "Probar la versión interactiva") + ' <span class="arr" aria-hidden="true">↓</span></a></p>'
      : "";
    return (
      '<div class="view"><article>' +
      '<header class="case-hero"><div class="wrap">' +
      '<a class="back" href="#proyectos"><span aria-hidden="true">←</span> Proyectos</a>' +
      '<p class="eyebrow">' + esc(p.kicker) + "</p>" +
      '<h1 class="case-title">' + esc(p.title) + "</h1>" +
      '<dl class="case-meta">' +
      (p.year ? "<div><dt>Año</dt><dd>" + esc(p.year) + "</dd></div>" : "") +
      "<div><dt>Mi papel</dt><dd>" + esc(p.role) + "</dd></div>" +
      "<div><dt>Herramientas</dt><dd>" + esc(p.tools.join(", ")) + "</dd></div>" +
      "</dl></div></header>" +
      '<section class="section section--case"><div class="wrap case-body">' +
      (p.lead
        ? '<div class="case-lead"><p class="q-label">' + esc(p.lead.label) + '</p><p class="q">' + esc(p.lead.text) + '</p><p class="case-sum">' + esc(p.summary) + "</p>" + jump + "</div>"
        : '<div class="case-lead"><p class="case-sum case-sum--big">' + esc(p.summary) + "</p>" + jump + "</div>") +
      visual + (p.facts ? facts(p) : "") + blocks + pending +
      "</div></section>" +
      (p.embed ? embedBlock(p) : p.demo ? demoBlock(p) : "") + gallery +
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
      ["Técnico Superior en Marketing y Publicidad", "IES Luis Buñuel, Alcorcón · 2020–2022", bar("var(--coral)", 2020, 9, 2022, 6)],
      ["Marketing Digital (prácticas)", "PinkStone · jul. 2021 – may. 2022", bar("var(--lilac-deep)", 2021, 7, 2022, 5)],
      ["Grado en Ciencia, Gestión e Ingeniería de Servicios", "URJC · desde 2022, TFG en abril de 2027", bar("var(--night)", 2022, 9, 2027, 4, true)],
      ["Ingeniera de Producto (prácticas)", "Cloud Worldwide Services · oct. 2025 – feb. 2026", bar("var(--mint-deep)", 2025, 10, 2026, 2)],
    ];
    var axis = "";
    for (var y = 2020; y < 2028; y++) axis += "<span>" + y + "</span>";
    return (
      '<div class="timeline"><div class="tl" role="img" aria-label="Cronología de formación y prácticas entre 2020 y 2027.">' +
      '<span></span><div class="tl__axis">' + axis + "</div>" +
      rows.map(function (r) { return '<div class="tl__label"><b>' + r[0] + "</b><span>" + r[1] + '</span></div><div class="tl__lane">' + r[2] + "</div>"; }).join("") +
      "</div></div>" +
      '<p class="tl__note">Cada barra va del mes de inicio al de fin. El grado se extiende hasta la defensa del TFG, prevista en abril de 2027.</p>'
    );
  }

  function viewAbout() {
    return (
      '<div class="view">' +
      '<section class="section--top"><div class="wrap about-hero">' +
      '<div><h1 class="page-title">Sobre mí</h1>' +
      '<div class="about-lead">' +
      "<p>Soy Meylin Soto Reyes. Empecé en el marketing digital, siguiendo campañas para pequeños negocios en una agencia, y ahí vi que lo que más me interesaba era entender qué funcionaba y por qué.</p>" +
      "<p>Eso me llevó al grado en Ciencia, Gestión e Ingeniería de Servicios en la URJC y a unas prácticas como ingeniera de producto, donde hice dashboards en Power BI para seguir el uso de productos de inteligencia artificial.</p>" +
      "</div></div>" +
      '<div class="portrait" aria-hidden="true">' + MARK + '<span class="portrait__note">Aquí irá tu foto</span></div>' +
      "</div></section>" +
      '<section class="section"><div class="wrap">' +
      '<div class="section__head"><h2 class="section__title">Experiencia</h2></div>' + jobs(true) +
      "</div></section>" +
      '<section class="section section--paper"><div class="wrap">' +
      '<div class="section__head"><h2 class="section__title">Formación</h2>' +
      '<p class="section__intro">Grado en Ciencia, Gestión e Ingeniería de Servicios en la URJC, con las asignaturas completadas. Antes, Técnico Superior en Marketing y Publicidad en formación dual.</p></div>' +
      timeline() + "</div></section>" +
      '<section class="section"><div class="wrap">' +
      '<div class="section__head"><h2 class="section__title">Herramientas</h2></div>' +
      '<div class="cols">' +
      '<div class="toolset"><h3>Analítica y medición</h3><p>Power BI con DAX, Google Analytics, Excel (tablas dinámicas, búsquedas, filtros) y SQL básico.</p></div>' +
      '<div class="toolset"><h3>Marketing digital</h3><p>Google Ads, Meta Ads, SEO, WordPress y Canva.</p></div>' +
      '<div class="toolset"><h3>Producto y procesos</h3><p>Azure DevOps, documentación funcional, Figma, BPMN y Kotlin para Android.</p></div>' +
      '<div class="toolset"><h3>Idiomas</h3><p>Español nativo. Inglés B2.</p></div>' +
      "</div>" +
      '<div class="pending" role="note" style="margin-top:3rem"><b>Pendiente de completar</b><ul><li>Tu foto.</li><li>Dos o tres detalles personales: aficiones, lo último que aprendiste por tu cuenta, algo que te haga reír.</li></ul></div>' +
      "</div></section></div>"
    );
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
      window.scrollTo(0, 0);
      afterRender();
    };
    if (document.startViewTransition && !reduce && main.innerHTML) document.startViewTransition(swap);
    else swap();
  }

  function afterRender() { setupReveal(); setupFilters(); setupEmbed(); }

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
    document.querySelectorAll(".filter").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-f");
        document.querySelectorAll(".filter").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        g.querySelectorAll(".prow").forEach(function (c) {
          c.classList.toggle("is-hidden", !!f && c.getAttribute("data-disc") !== f);
          c.classList.remove("is-pending");
        });
      });
    });
  }

  /* El informe de Power BI se carga solo cuando se pide */
  function setupEmbed() {
    var b = document.getElementById("loadEmbed");
    if (!b) return;
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.className = "browser__frame browser__frame--bi";
      f.src = b.getAttribute("data-src");
      f.title = "Informe interactivo: " + b.getAttribute("data-title");
      f.setAttribute("allowfullscreen", "true");
      var box = document.getElementById("facade");
      box.replaceWith(f);
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
