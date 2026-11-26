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
      co: "Cloud Worldwide Services", role: "Ingeniera de Producto · prácticas", when: "oct. 2025 – feb. 2026",
      tags: ["Power BI", "DAX", "Azure DevOps", "QA"],
      short: "Dashboards en Power BI para seguir el uso de productos de IA, voz y biometría.",
      more: [
        "Medidas DAX para detectar caídas de uso y ver la actividad de cada empresa.",
        "Seguimiento de funcionalidades e hitos en Azure DevOps.",
        "Documentación funcional, análisis de requisitos y pruebas de calidad.",
        "Los dashboards son internos, por eso no aparecen aquí.",
      ],
    },
    {
      co: "PinkStone Advertisement Group", role: "Marketing Digital · formación dual", when: "jul. 2021 – may. 2022",
      tags: ["Google Ads", "Meta Ads", "Google Analytics", "SEO"],
      short: "Entre 5 y 10 campañas de Google Ads y Meta Ads a la vez para pequeños negocios.",
      more: [
        "Clientes de restauración, calzado, moda y eventos deportivos.",
        "Informes de resultados con Google Analytics y Excel.",
        "Contenidos SEO en WordPress.",
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
      ["Técnico Superior en Marketing y Publicidad", "IES Luis Buñuel · 2020–2022", bar("var(--coral)", 2020, 9, 2022, 6)],
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

  function viewAbout() {
    var tools = [
      ["Analítica", ["Power BI", "DAX", "Google Analytics", "Excel", "SQL básico"]],
      ["Marketing", ["Google Ads", "Meta Ads", "SEO", "WordPress", "Canva"]],
      ["Producto y procesos", ["Azure DevOps", "Figma", "BPMN", "Kotlin"]],
      ["Idiomas", ["Español nativo", "Inglés B2"]],
    ];
    return (
      '<div class="view">' +
      '<section class="section--top"><div class="wrap">' +
      '<h1 class="page-title">Sobre mí</h1>' +
      '<p class="about-one">Empecé en marketing digital y descubrí que lo que más me gustaba era entender <em>qué funciona y por qué</em>. Eso me llevó a producto y a los datos.</p>' +
      "</div></section>" +
      '<section class="section section--tight"><div class="wrap">' +
      '<div class="shead"><h2 class="section__title">Trayectoria</h2></div>' + timeline() +
      "</div></section>" +
      '<section class="section section--paper section--tight"><div class="wrap">' +
      '<div class="shead"><h2 class="section__title">Experiencia</h2><p class="shead__note">Pulsa cada una para ver el detalle.</p></div>' + jobs() +
      "</div></section>" +
      '<section class="section section--tight"><div class="wrap">' +
      '<div class="shead"><h2 class="section__title">Herramientas</h2></div>' +
      '<div class="toolgrid">' + tools.map(function (t) { return '<div class="toolset"><h3>' + t[0] + "</h3>" + chips(t[1]) + "</div>"; }).join("") + "</div>" +
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

  function afterRender() { setupReveal(); setupFilters(); setupEmbed(); setupTabs(); setupCount(); setupRotator(); }

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
