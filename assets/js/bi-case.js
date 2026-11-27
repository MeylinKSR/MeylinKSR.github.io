/*
  Motor de casos de estudio de Business Intelligence.
  Lee window.BI_CASES[slug] y pinta: reto, explorador de datos, ETL,
  modelo relacional, explorador DAX, informe, análisis y mejoras.
  window.renderBICase(p, demoHtml) devuelve el HTML; window.setupBICase(root) añade la interacción.
*/
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function num(v) {
    if (typeof v !== "number") return esc(v);
    var s = String(v).split("."), i = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return s[1] ? i + "," + s[1] : i;
  }
  var C = null;

  /* ---------- Resaltado DAX ---------- */
  function hl(code) {
    var out = "", src = code, eq = src.indexOf("="), m, prevTbl = false;
    if (eq > 0 && !/\[/.test(src.slice(0, eq)) && src.slice(0, eq).trim()) { out += '<span class="dx-name">' + esc(src.slice(0, eq).replace(/\s+$/, "")) + '</span> <span class="dx-op">=</span>'; src = src.slice(eq + 1); }
    var re = /([A-Za-zÁÉÍÓÚáéíóúñÑ_][A-Za-zÁÉÍÓÚáéíóúñÑ0-9_]*)|(\[[^\]]+\])|(\d+(?:\.\d+)?)|(\s+)|([^\sA-Za-z0-9\[])/g;
    while ((m = re.exec(src))) {
      var rest = src.slice(re.lastIndex);
      if (m[1]) {
        if (/^\s*\(/.test(rest) && m[1] === m[1].toUpperCase()) { out += '<span class="dx-fn">' + esc(m[1]) + "</span>"; prevTbl = false; }
        else if (rest.charAt(0) === "[") { out += '<span class="dx-tbl">' + esc(m[1]) + "</span>"; prevTbl = true; continue; }
        else out += esc(m[1]);
      } else if (m[2]) out += '<span class="' + (prevTbl ? "dx-col" : "dx-ref") + '">' + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="dx-num">' + esc(m[3]) + "</span>";
      else if (m[4]) out += esc(m[4]);
      else out += '<span class="dx-op">' + esc(m[5]) + "</span>";
      prevTbl = false;
    }
    return out;
  }
  function codeBlock(code, label) {
    var lines = code.split("\n");
    return '<div class="code"' + (label ? ' aria-label="' + esc(label) + '"' : "") + '><ol class="code__ln" aria-hidden="true">' + lines.map(function () { return "<li></li>"; }).join("") + "</ol><pre><code>" + lines.map(hl).join("\n") + "</code></pre></div>";
  }
  function deps(m) { var r = [], re = /\[([^\]]+)\]/g, x, src = m.f.slice(m.f.indexOf("=") + 1); while ((x = re.exec(src))) { var full = src.slice(0, x.index); if (!/[A-Za-zÁÉÍÓÚáéíóúñ]$/.test(full)) r.push(x[1]); } return r; }
  function funcs(m) { var r = [], re = /\b([A-Z][A-Z]+)\s*\(/g, x; while ((x = re.exec(m.f))) if (r.indexOf(x[1]) < 0) r.push(x[1]); return r; }

  /* ---------- Bloques ---------- */
  function head(id, n, h, lead) {
    return '<header class="bi-h"><p class="bi-h__n">' + n + '</p><h2 id="' + id + 'H">' + esc(h) + "</h2>" + (lead ? '<p class="bi-h__lead">' + lead + "</p>" : "") + "</header>";
  }

  function hero(p, c) {
    return (
      '<header class="bi-hero"><div class="wrap">' +
      '<a class="back" href="#proyectos"><span aria-hidden="true">←</span> Proyectos</a>' +
      '<p class="eyebrow">' + esc(c.eyebrow) + "</p>" +
      '<h1 class="bi-hero__t">' + esc(c.title) + "</h1>" +
      '<p class="bi-hero__sub">' + esc(c.sub) + "</p>" +
      '<p class="bi-hero__ctx">' + esc(c.context) + "</p>" +
      (c.finding ? '<p class="bi-find"><span class="bi-find__k">Un hallazgo del análisis</span>' + esc(c.finding) + ' <a class="mini-link" href="#biHallazgos" data-scroll="biHallazgos">Ver el análisis</a></p>' : "") +
      '<div class="bi-hero__go"><a class="btn btn--small" href="#demo" data-scroll="demo">Ir al informe <span aria-hidden="true">↓</span></a>' +
      '<a class="btn btn--small btn--ghost" href="#biReto" data-scroll="biReto">Cómo lo construí</a></div>' +
      '<dl class="bi-ledger">' + c.ledger.map(function (l) { return "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>"; }).join("") + "</dl>" +
      "</div></header>" +
      '<nav class="bi-nav" aria-label="Fases del caso de estudio"><div class="wrap"><ol>' +
      c.phases.map(function (ph, i) { return '<li><a href="#' + ph[0] + '" data-scroll="' + ph[0] + '" data-ph="' + ph[0] + '"><span aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" + esc(ph[1]) + "</a></li>"; }).join("") +
      "</ol></div></nav>"
    );
  }

  function reto(c) {
    var r = c.reto;
    return (
      '<section class="bi-sec bi-reto" id="biReto" aria-labelledby="biRetoH"><div class="wrap">' +
      head("biReto", "01", "El reto", "Replicar un informe de Power BI sabiendo solo cómo tenía que quedar.") +
      '<div class="bi-reto__g">' +
      '<div><p class="bi-k">Me dieron</p><ul class="bi-given">' + r.given.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul>" +
      '<p class="bi-reto__miss">' + esc(r.missing) + "</p></div>" +
      '<div><p class="bi-k">Lo que hice</p><ol class="bi-did">' + r.did.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ol>" +
      '<p class="bi-reto__note"><span class="hand">aclaración</span>' + esc(r.note) + "</p></div>" +
      "</div></div></section>"
    );
  }

  function datos(c) {
    return (
      '<section class="bi-sec bi-datos" id="biDatos" aria-labelledby="biDatosH"><div class="wrap">' +
      head("biDatos", "02", "Los datos de partida", "Abre cada archivo y cada hoja. Los nombres de las personas están anonimizados y he quitado los enlaces a sus fotos.") +
      '<div class="sheet" id="sheet">' +
      '<div class="sheet__files" role="tablist" aria-label="Archivo">' +
      c.files.map(function (f, i) { return '<button type="button" role="tab" class="sheet__file" data-file="' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + ">" + esc(f.name) + "</button>"; }).join("") +
      "</div>" +
      '<div class="sheet__bar"><p class="sheet__purpose" id="sheetPurpose" aria-live="polite"></p><div class="sheet__view" id="sheetView" role="group" aria-label="Vista"></div></div>' +
      '<div class="sheet__grid" id="sheetGrid" tabindex="0" role="region" aria-label="Muestra de datos"></div>' +
      '<div class="sheet__foot"><div class="sheet__tabs" id="sheetTabs" role="tablist" aria-label="Hoja"></div><p class="sheet__count" id="sheetCount"></p></div>' +
      "</div>" +
      '<div class="bi-checks"><p class="bi-k">Comprobaciones sobre las 162.083 filas</p><ul>' + c.checks.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      "</div></section>"
    );
  }

  function etl(c) {
    var e = c.etl;
    return (
      '<section class="bi-sec bi-etl" id="biEtl" aria-labelledby="biEtlH"><div class="wrap">' +
      head("biEtl", "03", "Preparación en Power Query", "Extracción, transformación y carga. Elige una consulta y recorre sus pasos aplicados: son los reales, en el mismo orden.") +
      '<ol class="flow" aria-label="Recorrido de los datos">' +
      '<li><b>Extraer</b><span>Facturas.xlsx · Maestras.xlsx</span></li>' +
      '<li><b>Transformar</b><span>6 consultas</span></li>' +
      '<li><b>Cargar</b><span>Modelo de Power BI</span></li>' +
      '<li class="flow__add"><b>Añadido en el modelo</b><span>Calendario · Medidas</span></li></ol>' +
      '<div class="pq" id="pq">' +
      '<div class="pq__q"><p class="pq__lbl">Consultas [' + e.queries.length + "]</p>" +
      '<div role="tablist" aria-label="Consulta" aria-orientation="vertical">' +
      e.queries.map(function (q, i) { return '<button type="button" role="tab" class="pq__qb" data-q="' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + "><span>" + esc(q.name) + "</span><small>" + esc(q.file) + "</small></button>"; }).join("") +
      "</div></div>" +
      '<div class="pq__main"><div class="pq__prev" id="pqPrev" tabindex="0" role="region" aria-label="Vista previa del paso"></div><p class="pq__desc" id="pqDesc" aria-live="polite"></p></div>' +
      '<div class="pq__s"><p class="pq__lbl">Pasos aplicados</p><ol id="pqSteps"></ol>' +
      '<button type="button" class="pq__shot" id="pqShot">Ver la captura real</button></div>' +
      "</div>" +
      '<div class="bi-etl__foot"><p>' + esc(e.load) + "</p>" +
      '<p class="bi-pend"><b>Revisión pendiente.</b> ' + esc(e.pending) + "</p></div>" +
      "</div></section>"
    );
  }

  /* Modelo: SVG */
  var ROWH = 21, HEADH = 34;
  function tbox(t) { var keys = t.f.filter(function (f) { return f[1]; }), shown = t.kind === "med" ? [] : (keys.length ? keys : t.f).slice(0, 4); return { shown: shown, h: HEADH + 10 + shown.length * ROWH + (t.f.length > shown.length ? ROWH : 0) + 6 }; }
  function edge(a, b) {
    var ax = a.x + a.w / 2, ay = a.y + a.h / 2, bx = b.x + b.w / 2, by = b.y + b.h / 2;
    function clip(r, x0, y0, x1, y1) {
      var dx = x1 - x0, dy = y1 - y0, tx = dx ? (r.w / 2) / Math.abs(dx) : Infinity, ty = dy ? (r.h / 2) / Math.abs(dy) : Infinity, t = Math.min(tx, ty);
      return [x0 + dx * t, y0 + dy * t];
    }
    return { a: clip(a, ax, ay, bx, by), b: clip(b, bx, by, ax, ay) };
  }
  function modelSvg(c) {
    var M = c.model, T = {};
    M.tables.forEach(function (t) { var b = tbox(t); T[t.id] = { x: t.x, y: t.y, w: t.w, h: b.h, t: t, shown: b.shown }; });
    var lines = M.rels.map(function (r, i) {
      var e = edge(T[r.from], T[r.to]), mx = (e.a[0] + e.b[0]) / 2, my = (e.a[1] + e.b[1]) / 2;
      var ang = Math.atan2(e.b[1] - e.a[1], e.b[0] - e.a[0]) * 180 / Math.PI;
      function lab(pt, other, s) { var dx = other[0] - pt[0], dy = other[1] - pt[1], L = Math.hypot(dx, dy) || 1; return '<text class="rel__card" x="' + (pt[0] + dx / L * 14 + (Math.abs(dy) > Math.abs(dx) ? 9 : 0)).toFixed(1) + '" y="' + (pt[1] + dy / L * 14 + (Math.abs(dy) > Math.abs(dx) ? 0 : -6) + 4).toFixed(1) + '">' + s + "</text>"; }
      return '<g class="rel" data-rel="' + i + '" data-from="' + esc(r.from) + '" data-to="' + esc(r.to) + '">' +
        '<line x1="' + e.a[0].toFixed(1) + '" y1="' + e.a[1].toFixed(1) + '" x2="' + e.b[0].toFixed(1) + '" y2="' + e.b[1].toFixed(1) + '"/>' +
        '<path class="rel__arrow" d="M-6,-5 L6,0 L-6,5 Z" transform="translate(' + mx.toFixed(1) + "," + my.toFixed(1) + ") rotate(" + ang.toFixed(1) + ')"/>' +
        lab(e.a, e.b, "1") + lab(e.b, e.a, "*") + "</g>";
    }).join("");
    var boxes = M.tables.map(function (t) {
      var b = T[t.id], rows = b.shown.map(function (f, j) {
        return '<text class="tb__f' + (f[1] ? " is-" + f[1] : "") + '" x="' + (t.x + 14) + '" y="' + (t.y + HEADH + 22 + j * ROWH) + '">' + (f[1] === "pk" ? "◆ " : f[1] === "fk" ? "→ " : "") + esc(f[0]) + "</text>";
      }).join("");
      var more = t.kind === "med" ? '<text class="tb__more" x="' + (t.x + 14) + '" y="' + (t.y + HEADH + 22) + '">' + t.f.length + " medidas</text>"
        : t.f.length > b.shown.length ? '<text class="tb__more" x="' + (t.x + 14) + '" y="' + (t.y + HEADH + 22 + b.shown.length * ROWH) + '">+ ' + (t.f.length - b.shown.length) + (t.f.length - b.shown.length === 1 ? " campo" : " campos") + "</text>" : "";
      return '<g class="tb tb--' + t.kind + '" data-t="' + esc(t.id) + '" tabindex="0" role="button" aria-label="' + esc("Tabla " + t.id) + '">' +
        '<rect class="tb__box" x="' + t.x + '" y="' + t.y + '" width="' + t.w + '" height="' + (t.kind === "med" ? HEADH + 34 : b.h) + '" rx="8"/>' +
        '<rect class="tb__head" x="' + t.x + '" y="' + t.y + '" width="' + t.w + '" height="' + HEADH + '" rx="8"/><rect class="tb__head" x="' + t.x + '" y="' + (t.y + HEADH - 8) + '" width="' + t.w + '" height="8"/>' +
        '<text class="tb__t" x="' + (t.x + 14) + '" y="' + (t.y + 22) + '">' + esc(t.id) + "</text>" + rows + more + "</g>";
    }).join("");
    return '<svg class="er" viewBox="0 0 960 580" role="group" aria-label="Diagrama del modelo de datos">' + lines + boxes + "</svg>";
  }

  function modelo(c) {
    var M = c.model;
    return (
      '<section class="bi-sec bi-modelo" id="biModelo" aria-labelledby="biModeloH"><div class="wrap">' +
      head("biModelo", "04", "El modelo de datos", esc(M.summary)) +
      '<div class="er-wrap">' +
      '<div class="er-pick" role="group" aria-label="Elegir tabla">' + M.tables.map(function (t) { return '<button type="button" class="er-pick__b er-pick__b--' + t.kind + '" data-t="' + esc(t.id) + '" aria-pressed="false">' + esc(t.id) + "</button>"; }).join("") + "</div>" +
      '<div class="er-canvas" tabindex="0" role="region" aria-label="Diagrama del modelo; se puede desplazar en horizontal">' + modelSvg(c) + "</div>" +
      '<div class="er-legend" aria-hidden="true"><span class="lg lg--hechos">Hechos</span><span class="lg lg--dim">Dimensión</span><span class="lg lg--cal">Calendario (DAX)</span><span class="lg lg--med">Medidas</span><span class="lg lg--arrow">Dirección del filtro</span></div>' +
      '<div class="er-info" id="erInfo" aria-live="polite"></div>' +
      '<button type="button" class="mini-link" id="erShot">Ver la captura original de la vista Modelo</button>' +
      "</div></div></section>"
    );
  }

  function dax(c) {
    var D = c.dax;
    return (
      '<section class="bi-sec bi-dax" id="biDax" aria-labelledby="biDaxH"><div class="wrap">' +
      head("biDax", "05", "Medidas DAX", "Las nueve medidas, con su fórmula original. Las marcadas con ● son las que tienen más miga.") +
      '<div class="dx">' +
      '<div class="dx__list" role="tablist" aria-label="Medidas" aria-orientation="vertical">' +
      D.groups.map(function (g) {
        return '<p class="dx__g">' + esc(g) + "</p>" + D.measures.map(function (m, i) {
          return m.g !== g ? "" : '<button type="button" role="tab" class="dx__m" data-m="' + i + '" aria-selected="false" tabindex="-1">' + esc(m.n) + (m.star ? '<i aria-label="destacada">●</i>' : "") + "</button>";
        }).join("");
      }).join("") +
      "</div>" +
      '<div class="dx__panel" id="dxPanel" role="tabpanel" aria-live="polite"></div>' +
      "</div>" +
      '<div class="cal"><div class="cal__l"><p class="bi-k">Tabla calculada, no medida</p><h3>Calendario</h3>' + codeBlock(D.calendar.f) + "<p>" + esc(D.calendar.d) + "</p></div>" +
      '<div class="cal__r"><dl>' + D.calendar.facts.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") + "</dl><p>" + esc(D.calendar.why) + "</p></div></div>" +
      "</div></section>"
    );
  }

  function informe(c, demoHtml) {
    var P = c.report.pages;
    return (
      '<section class="bi-sec bi-informe" id="biInforme" aria-labelledby="biInformeH"><div class="wrap">' +
      head("biInforme", "06", "El informe", "Seis páginas y un tooltip. Los nombres y el contenido están sacados del propio archivo de Power BI.") +
      '<div class="pages"><div class="pages__d" id="pageD" aria-live="polite"></div>' +
      '<div class="pages__tabs" role="tablist" aria-label="Páginas del informe">' +
      P.map(function (pg, i) { return '<button type="button" role="tab" class="pages__t' + (pg.tip ? " pages__t--tip" : "") + '" data-pg="' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + ">" + esc(pg.n) + "</button>"; }).join("") +
      "</div></div>" +
      "</div></section>" + demoHtml
    );
  }

  function bars(list, max, fmt, hi) {
    return '<ul class="hb">' + list.map(function (r) {
      return '<li' + (hi && hi.indexOf(r[0]) > -1 ? ' class="is-hi"' : "") + '><span class="hb__l">' + esc(r[0]) + '</span><span class="hb__b"><i style="width:' + (r[1] / max * 100).toFixed(1) + '%"></i></span><span class="hb__v">' + fmt(r[1]) + "</span></li>";
    }).join("") + "</ul>";
  }
  function fx(v, d) { return v.toFixed(d).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function fmtM(v) { return fx(v, 2) + " M"; }
  function fmtP(v) { return fx(v, 2) + " %"; }

  function hallazgos(c) {
    var F = c.findings, maxY = Math.max.apply(null, F.years.map(function (y) { return y[1]; }));
    var tot = F.paises.reduce(function (s, r) { return s + r[1]; }, 0);
    var vis = {
      y: '<div class="yb" role="img" aria-label="Facturación por año en millones: ' + F.years.map(function (y) { return y[0] + ", " + num(y[1]); }).join("; ") + '">' +
        F.years.map(function (y) { return '<div class="yb__c' + (y[0] >= 2023 ? " is-hi" : "") + '"><span class="yb__v">' + num(y[1]) + '</span><i style="height:' + (y[1] / maxY * 100).toFixed(1) + '%"></i><span class="yb__y">' + y[0] + "</span></div>"; }).join("") + "</div>",
      p: bars(F.paises, F.paises[0][1], function (v) { return fx(v / tot * 100, 1) + " %"; }, ["España"]),
      s: '<div class="stack" aria-hidden="true">' + F.sectores.map(function (r, i) { return '<span class="stack__i stack__i--' + i + '" style="flex:' + r[1] + '"></span>'; }).join("") + "</div>" +
        '<p class="stack__k"><b>57,2 %</b> bares y restaurantes</p>' +
        bars(F.sectores, F.sectores[0][1], function (v) { return fx(v / tot * 100, 1) + " %"; }, ["Bares", "Restaurantes"]),
      v: '<div class="cmp"><div class="cmp__sw" role="radiogroup" aria-label="Indicador">' +
        [["1", "Facturación"], ["2", "Unidades"], ["3", "Beneficios"], ["4", "Margen"]].map(function (o, i) { return '<button type="button" role="radio" class="cmp__o" data-k="' + o[0] + '" aria-checked="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + ">" + o[1] + "</button>"; }).join("") +
        '</div><div id="cmpBars"></div></div>',
    };
    return (
      '<section class="bi-sec bi-hall" id="biHallazgos" aria-labelledby="biHallazgosH"><div class="wrap">' +
      head("biHallazgos", "07", "Lo que cuentan los datos", "Esto ya no formaba parte del ejercicio: es una ampliación que hice después para el portfolio. Todas las cifras están recalculadas con los Excel originales.") +
      '<dl class="bi-tot">' + F.totals.map(function (t) { return "<div><dt>" + esc(t[0]) + "</dt><dd>" + esc(t[1]) + "</dd></div>"; }).join("") + "</dl>" +
      '<div class="finds">' + F.items.map(function (it, i) {
        return '<article class="find find--' + it.id + '"><div class="find__txt"><p class="find__n">' + (i + 1) + "/" + F.items.length + "</p><h3>" + esc(it.h) + "</h3>" +
          '<dl class="find__dl"><div><dt>Dato</dt><dd>' + esc(it.obs) + "</dd></div><div><dt>Lectura</dt><dd>" + esc(it.read) + "</dd></div><div><dt>Qué miraría después</dt><dd>" + esc(it.use) + "</dd></div></dl></div>" +
          '<div class="find__vis">' + vis[it.id] + "</div></article>";
      }).join("") + "</div>" +
      '<p class="bi-small">' + esc(F.note) + "</p>" +
      "</div></section>"
    );
  }

  function mejoras(c) {
    return (
      '<section class="bi-sec bi-mej" id="biMejoras" aria-labelledby="biMejorasH"><div class="wrap">' +
      head("biMejoras", "08", "Cómo lo mejoraría hoy", "Una revisión posterior. Las fórmulas de «Hoy probaría» no formaban parte del trabajo original y no las he validado en el modelo.") +
      '<div class="imp">' + c.improve.map(function (m) {
        return '<article class="imp__i"><h3>' + esc(m.h) + "</h3>" +
          (m.a ? '<div class="imp__ab"><div><p class="bi-k">Original</p>' + codeBlock(m.a) + '</div><div><p class="bi-k">Hoy probaría</p>' + codeBlock(m.b) + "</div></div>" : "") +
          "<p>" + esc(m.d) + "</p></article>";
      }).join("") + "</div>" +
      '<div class="learn"><h3>Lo que me llevo</h3><ul>' + c.learned.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="skills"><h3>Dónde se ve cada competencia</h3><table><tbody>' + c.skills.map(function (s) {
        return '<tr><th scope="row">' + esc(s[0]) + "</th><td>" + esc(s[1]) + '</td><td><a href="#' + s[2] + '" data-scroll="' + s[2] + '">Ver <span aria-hidden="true">↑</span></a></td></tr>';
      }).join("") + "</tbody></table></div>" +
      "</div></section>"
    );
  }

  window.renderBICase = function (p, demoHtml, nextHtml) {
    C = (window.BI_CASES || {})[p.slug];
    if (!C) return "";
    return '<div class="view bi"><article>' + hero(p, C) + reto(C) + datos(C) + etl(C) + modelo(C) + dax(C) + informe(C, demoHtml) + hallazgos(C) + mejoras(C) + (nextHtml || "") + "</article></div>";
  };

  /* ---------- Interacción ---------- */
  function tablist(btns, attr, on) {
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { pick(i); });
      b.addEventListener("keydown", function (e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (e.key === "Home") d = -i; if (e.key === "End") d = btns.length - 1 - i;
        if (d === undefined) return; e.preventDefault();
        var n = (i + d + btns.length) % btns.length; pick(n); btns[n].focus();
      });
    });
    function pick(i) { btns.forEach(function (b, j) { b.setAttribute(attr, String(i === j)); b.tabIndex = i === j ? 0 : -1; }); on(i); }
    return pick;
  }
  function gridHtml(cols, rows, opt) {
    opt = opt || {};
    var letters = cols.map(function (_, i) { return String.fromCharCode(65 + i); });
    return '<table class="grid"><thead>' +
      (opt.letters ? '<tr class="grid__let"><th class="grid__rn" scope="col"><span class="sr">Fila</span></th>' + letters.map(function (l) { return '<th scope="col">' + l + "</th>"; }).join("") + "</tr>" :
      '<tr><th class="grid__rn" scope="col"><span class="sr">Fila</span></th>' + cols.map(function (h, i) {
        var t = opt.types && opt.types[i];
        return '<th scope="col">' + (t ? '<span class="ty" title="Tipo de dato">' + esc(t) + "</span>" : "") + esc(h) + "</th>";
      }).join("") + "</tr>") + "</thead><tbody>" +
      rows.map(function (r, k) {
        return '<tr><th class="grid__rn" scope="row">' + (opt.rowStart ? opt.rowStart + k : k + 1) + "</th>" + r.map(function (v) {
          return "<td" + (typeof v === "number" ? ' class="n"' : v == null || v === "" ? ' class="e"' : "") + ">" + (v == null ? "" : num(v)) + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody></table>";
  }

  window.setupBICase = function (root) {
    var bi = root.querySelector(".bi"); if (!bi || !C) return;
    var zoom = window.meyZoom || function () {};
    var nv = document.querySelector(".nav"); if (nv) bi.style.setProperty("--navH", nv.offsetHeight + "px");

    /* Navegación por fases: marca la fase visible */
    var links = bi.querySelectorAll(".bi-nav a");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (x) { if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle("is-on", a.getAttribute("data-ph") === x.target.id); }); });
      }, { rootMargin: "-45% 0px -50% 0px" });
      C.phases.forEach(function (ph) { var s = bi.querySelector("#" + ph[0]); if (s) io.observe(s); });
    }

    /* Explorador de datos */
    var fileI = 0, sheetI = 0, view = "prep";
    var gEl = bi.querySelector("#sheetGrid"), tabsEl = bi.querySelector("#sheetTabs"), pur = bi.querySelector("#sheetPurpose"), cnt = bi.querySelector("#sheetCount"), vEl = bi.querySelector("#sheetView");
    function paintSheet() {
      var f = C.files[fileI], s = f.sheets[sheetI];
      pur.innerHTML = '<span class="kind kind--' + (s.kind === "Transaccional" ? "t" : "d") + '">' + esc(s.kind) + "</span>" + esc(s.purpose);
      vEl.innerHTML = s.raw ? ['prep', 'raw'].map(function (v) { return '<button type="button" class="seg' + '" data-v="' + v + '" aria-pressed="' + (view === v) + '">' + (v === "prep" ? "Muestra preparada" : "Así llega el archivo") + "</button>"; }).join("") : "";
      var useRaw = s.raw && view === "raw";
      gEl.innerHTML = useRaw
        ? gridHtml(s.raw[0], s.raw, { letters: true })
        : gridHtml(s.cols, s.rows, {});
      cnt.innerHTML = useRaw ? "Primeras " + s.raw.length + " filas del Excel original" :
        (s.rows.length < s.total ? "Mostrando " + s.rows.length + " de " + num(s.total) + " filas · " + esc(s.sampleNote || "") : num(s.total) + " filas · todas") + (s.anon ? " · anonimizada" : "");
      gEl.scrollLeft = 0; gEl.scrollTop = 0;
    }
    vEl.addEventListener("click", function (e) { var b = e.target.closest("[data-v]"); if (!b) return; view = b.getAttribute("data-v"); paintSheet(); vEl.querySelector('[data-v="' + view + '"]').focus(); });
    function paintTabs() {
      var f = C.files[fileI];
      tabsEl.innerHTML = f.sheets.map(function (s, i) { return '<button type="button" role="tab" class="sheet__tab" aria-selected="' + (i === sheetI) + '"' + (i === sheetI ? "" : ' tabindex="-1"') + ">" + esc(s.name) + "</button>"; }).join("");
      tablist(Array.prototype.slice.call(tabsEl.querySelectorAll(".sheet__tab")), "aria-selected", function (i) { sheetI = i; paintSheet(); });
    }
    tablist(Array.prototype.slice.call(bi.querySelectorAll(".sheet__file")), "aria-selected", function (i) { fileI = i; sheetI = 0; view = "prep"; paintTabs(); paintSheet(); });
    paintTabs(); paintSheet();

    /* ETL */
    var E = C.etl, raw = C.files[0].sheets[0].raw, qI = 0, stI = 0;
    var prev = bi.querySelector("#pqPrev"), desc = bi.querySelector("#pqDesc"), stEl = bi.querySelector("#pqSteps");
    function stepsOf(q) { return q.steps || E.masterSteps(q); }
    function masterSheet(q) { for (var i = 0; i < C.files[1].sheets.length; i++) if (C.files[1].sheets[i].name === q.sheet) return C.files[1].sheets[i]; }
    function preview(q, v) {
      if (v.nav) return '<table class="grid grid--nav"><thead><tr><th scope="col">Name</th><th scope="col">Kind</th></tr></thead><tbody>' + v.nav.map(function (n) { return "<tr" + ((v.pick || "Factura") === n ? ' class="is-pick"' : "") + "><td>" + esc(n) + "</td><td>Sheet</td></tr>"; }).join("") + "</tbody></table>";
      var rows, cols;
      if (v.raw) { rows = raw.map(function (r) { return r.slice(); }); }
      else { var s = masterSheet(q); rows = [s.cols.slice()].concat(s.rows.slice(0, 6)); }
      if (v.dropFirst) rows = rows.map(function (r) { return r.slice(1); });
      if (v.skip) rows = rows.slice(v.skip);
      if (v.promote) { cols = rows[0]; rows = rows.slice(1); }
      else cols = rows[0].map(function (_, i) { return "Column" + (i + 1); });
      return gridHtml(cols, rows.slice(0, 6), { types: v.types });
    }
    function paintStep() {
      var q = E.queries[qI], S = stepsOf(q), s = S[stI];
      stEl.querySelectorAll("button").forEach(function (b, i) { b.setAttribute("aria-current", i === stI ? "step" : "false"); b.classList.toggle("is-done", i < stI); });
      prev.innerHTML = preview(q, s.v);
      desc.innerHTML = '<b>' + (stI + 1) + "/" + S.length + " · " + esc(s.n) + "</b> " + esc(s.d);
    }
    function paintQuery() {
      var q = E.queries[qI], S = stepsOf(q);
      stEl.innerHTML = S.map(function (s, i) { return '<li><button type="button" data-s="' + i + '">' + esc(s.n) + "</button></li>"; }).join("");
      stI = S.length - 1; paintStep();
    }
    stEl.addEventListener("click", function (e) { var b = e.target.closest("[data-s]"); if (!b) return; stI = +b.getAttribute("data-s"); paintStep(); });
    stEl.addEventListener("keydown", function (e) {
      var d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault();
      var n = stepsOf(E.queries[qI]).length; stI = Math.max(0, Math.min(n - 1, stI + d)); paintStep(); stEl.querySelectorAll("button")[stI].focus();
    });
    tablist(Array.prototype.slice.call(bi.querySelectorAll(".pq__qb")), "aria-selected", function (i) { qI = i; paintQuery(); });
    paintQuery();
    bi.querySelector("#pqShot").addEventListener("click", function () {
      var q = E.queries[qI]; zoom(q.shot, "Power Query · consulta " + q.name + (q.blurred ? " (nombres y enlaces difuminados)" : ""));
    });

    /* Modelo */
    var M = C.model, info = bi.querySelector("#erInfo"), svg = bi.querySelector(".er");
    var usedIn = {};
    C.dax.measures.forEach(function (m) { M.tables.forEach(function (t) { if (m.f.indexOf(t.id + "[") > -1) (usedIn[t.id] = usedIn[t.id] || []).push(m.n); }); });
    function downstream(id) { var out = [], q = [id]; while (q.length) { var x = q.shift(); M.rels.forEach(function (r, i) { if (r.from === x && out.indexOf(i) < 0) { out.push(i); q.push(r.to); } }); } return out; }
    function pickT(id) {
      var t = M.tables.filter(function (x) { return x.id === id; })[0];
      var path = id === "Factura" ? M.rels.map(function (_, i) { return i; }) : downstream(id);
      var direct = M.rels.map(function (r, i) { return r.from === id || r.to === id ? i : -1; }).filter(function (i) { return i > -1; });
      var lit = {}; lit[id] = 1; path.concat(direct).forEach(function (i) { lit[M.rels[i].from] = 1; lit[M.rels[i].to] = 1; });
      svg.classList.add("has-sel");
      svg.querySelectorAll(".rel").forEach(function (g, i) { g.classList.toggle("is-on", path.indexOf(i) > -1 || direct.indexOf(i) > -1); g.classList.toggle("is-flow", path.indexOf(i) > -1 && !reduce); });
      svg.querySelectorAll(".tb").forEach(function (g) { var k = g.getAttribute("data-t"); g.classList.toggle("is-sel", k === id); g.classList.toggle("is-lit", !!lit[k] && k !== id); });
      bi.querySelectorAll(".er-pick__b").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-t") === id)); });
      var kind = { hechos: "Tabla de hechos", dim: "Dimensión", cal: "Tabla calculada con DAX", med: "Tabla de medidas" }[t.kind];
      var rel = direct.map(function (i) { var r = M.rels[i]; return "<li><b>" + esc(r.from) + "</b> (1) → <b>" + esc(r.to) + "</b> (N) · " + esc(r.key) + "</li>"; }).join("");
      var flow = t.kind === "med" ? "No filtra ni recibe filtros: sus medidas se evalúan con los filtros de las demás tablas."
        : id === "Factura" ? "Recibe el filtro de las seis dimensiones. No filtra a ninguna otra tabla."
        : "Un filtro en " + esc(id) + " recorre: " + [id].concat(path.map(function (i) { return M.rels[i].to; })).filter(function (x, k, a) { return a.indexOf(x) === k; }).join(" → ") + ".";
      info.innerHTML =
        '<div class="er-info__h"><p class="bi-k">' + kind + "</p><h3>" + esc(id) + "</h3><p>" + esc(t.d) + "</p></div>" +
        '<div><p class="bi-k">' + (t.kind === "med" ? "Medidas" : "Campos") + '</p><ul class="fl">' + t.f.map(function (f) {
          return "<li" + (f[1] ? ' class="is-' + f[1] + '"' : "") + ">" + esc(f[0]) + (f[1] === "pk" ? ' <span class="fl__k">clave</span>' : f[1] === "fk" ? ' <span class="fl__k">clave externa</span>' : "") + (f[2] ? ' <span class="fl__n">' + esc(f[2]) + "</span>" : "") + "</li>";
        }).join("") + "</ul></div>" +
        '<div><p class="bi-k">Relaciones</p>' + (rel ? '<ul class="rl">' + rel + "</ul>" : "<p>Ninguna.</p>") +
        '<p class="bi-k">Cómo llegan los filtros</p><p>' + flow + "</p>" +
        (usedIn[id] ? '<p class="bi-k">En las medidas</p><p>' + usedIn[id].map(esc).join(", ") + "</p>" : "") + "</div>";
    }
    svg.querySelectorAll(".tb").forEach(function (g) {
      g.addEventListener("click", function () { pickT(g.getAttribute("data-t")); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pickT(g.getAttribute("data-t")); } });
    });
    bi.querySelectorAll(".er-pick__b").forEach(function (b) { b.addEventListener("click", function () { pickT(b.getAttribute("data-t")); }); });
    pickT("Factura");
    bi.querySelector("#erShot").addEventListener("click", function () { zoom(M.shot, "Vista Modelo de Power BI (captura original)"); });

    /* DAX */
    var D = C.dax, panel = bi.querySelector("#dxPanel"), mBtns = Array.prototype.slice.call(bi.querySelectorAll(".dx__m"));
    var byName = {}; D.measures.forEach(function (m, i) { byName[m.n] = i; });
    function paintM(i) {
      var m = D.measures[i], uses = deps(m), usedBy = D.measures.filter(function (x) { return deps(x).indexOf(m.n) > -1; }).map(function (x) { return x.n; });
      if (/Calendario\[/.test(m.f)) uses = uses.concat(["Calendario"]);
      function chipL(arr) { return arr.map(function (n) { return byName[n] !== undefined ? '<button type="button" class="dep" data-go="' + byName[n] + '">' + esc(n) + "</button>" : '<span class="dep dep--t">' + esc(n) + "</span>"; }).join(""); }
      panel.innerHTML =
        '<div class="dx__top"><h3>' + esc(m.n) + '</h3><button type="button" class="dx__copy" data-copy="' + i + '">Copiar fórmula</button></div>' +
        codeBlock(m.f, "Fórmula DAX de " + m.n) +
        '<dl class="dx__dl"><div><dt>Qué hace</dt><dd>' + esc(m.plain) + "</dd></div><div><dt>Por qué importa</dt><dd>" + esc(m.why) + "</dd></div>" +
        '<div><dt>Funciones</dt><dd>' + (funcs(m).length ? funcs(m).map(function (f) { return "<code>" + f + "</code>"; }).join(" ") : "Solo referencias a otras medidas") + "</dd></div>" +
        '<div><dt>Resultado</dt><dd>' + esc(m.val) + "</dd></div>" +
        (m.used ? '<div><dt>En el informe</dt><dd>' + esc(m.used) + "</dd></div>" : "") + "</dl>" +
        '<div class="dx__deps">' + (uses.length ? '<p><span class="bi-k">Depende de</span>' + chipL(uses) + "</p>" : "") + (usedBy.length ? '<p><span class="bi-k">La usan</span>' + chipL(usedBy) + "</p>" : "") + "</div>";
    }
    var pickM = tablist(mBtns, "aria-selected", function (k) { paintM(+mBtns[k].getAttribute("data-m")); });
    panel.addEventListener("click", function (e) {
      var go = e.target.closest("[data-go]");
      if (go) { var k = mBtns.map(function (b) { return b.getAttribute("data-m"); }).indexOf(go.getAttribute("data-go")); pickM(k); mBtns[k].focus(); return; }
      var cp = e.target.closest("[data-copy]");
      if (cp) {
        var txt = D.measures[+cp.getAttribute("data-copy")].f;
        var done = function () { cp.textContent = "Copiada"; setTimeout(function () { cp.textContent = "Copiar fórmula"; }, 1600); };
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { cp.textContent = "No se pudo copiar"; });
        else { var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (er) {} ta.remove(); }
      }
    });
    pickM(mBtns.map(function (b) { return b.getAttribute("data-m"); }).indexOf(String(byName["Ingresos"])));

    /* Páginas del informe */
    var pD = bi.querySelector("#pageD");
    tablist(Array.prototype.slice.call(bi.querySelectorAll(".pages__t")), "aria-selected", function (i) {
      var pg = C.report.pages[i];
      pD.innerHTML = '<p class="bi-k">' + (pg.tip ? "Página auxiliar · tooltip" : "Página " + (i + 1) + " de 6") + "</p><h3>" + esc(pg.n) + "</h3><p>" + esc(pg.d) + "</p>";
    })(0);

    /* Comparador de vinos */
    var V = C.findings.vinos, cb = bi.querySelector("#cmpBars"), hiV = ["Capellanes", "Doix Costers", "Gran Muralles"];
    var paintCmp = function (k) {
      var L = V.map(function (v) { return [v[0], v[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
      cb.innerHTML = bars(L, L[0][1], k === 4 ? fmtP : k === 2 ? function (v) { return fx(v, 2) + " M ud."; } : fmtM, hiV);
    };
    var cmpBtns = Array.prototype.slice.call(bi.querySelectorAll(".cmp__o"));
    tablist(cmpBtns, "aria-checked", function (i) { paintCmp(+cmpBtns[i].getAttribute("data-k")); })(0);
  };
})();
