/*
  Motor de casos de estudio de procesos (BPM).
  Lee window.BPM_CASES[slug]. Incluye un visor BPMN de solo lectura
  (bpmn-js, alojado en assets/vendor y cargado solo cuando hace falta).
  window.renderBPMCase(p, nextHtml) devuelve el HTML; window.setupBPMCase(root) añade la interacción.
*/
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var C = null;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function li(a) { return a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); }

  /* ---------- Carga diferida de bpmn-js ---------- */
  var libP = null;
  function loadLib() {
    if (libP) return libP;
    libP = new Promise(function (ok, ko) {
      ["assets/vendor/bpmn-js/diagram-js.css", "assets/vendor/bpmn-js/bpmn-js.css"].forEach(function (h) {
        var l = document.createElement("link"); l.rel = "stylesheet"; l.href = h; document.head.appendChild(l);
      });
      var s = document.createElement("script"); s.src = "assets/vendor/bpmn-js/bpmn-navigated-viewer.production.min.js";
      s.onload = function () { ok(window.BpmnJS); }; s.onerror = ko; document.head.appendChild(s);
    });
    return libP;
  }
  var xmlCache = {};
  function getXml(url) { if (!xmlCache[url]) xmlCache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }); return xmlCache[url]; }

  /* ---------- Piezas ---------- */
  function sh(id, phase, h, lead) {
    return '<header class="sm-h">' + (phase ? '<p class="sm-h__ph"><span>Fase BPM</span>' + esc(phase) + "</p>" : "") + '<h2 id="' + id + 'H">' + esc(h) + "</h2>" + (lead ? '<p class="sm-h__lead">' + lead + "</p>" : "") + "</header>";
  }

  function cycleSvg(c) {
    var n = c.cycle.length, R = 150, r = 92, cx = 180, cy = 180, gap = 2.2;
    function pt(rad, a) { return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]; }
    var segs = c.cycle.map(function (ph, i) {
      var a0 = (-90 + i * 360 / n + gap) * Math.PI / 180, a1 = (-90 + (i + 1) * 360 / n - gap) * Math.PI / 180, am = (a0 + a1) / 2;
      var p0 = pt(R, a0), p1 = pt(R, a1), p2 = pt(r, a1), p3 = pt(r, a0), lb = pt((R + r) / 2, am), nb = pt(R + 18, am);
      var d = "M" + p0.join(",") + " A" + R + "," + R + " 0 0 1 " + p1.join(",") + " L" + p2.join(",") + " A" + r + "," + r + " 0 0 0 " + p3.join(",") + "Z";
      return '<g class="cy__s" data-i="' + i + '"><path d="' + d + '"/><text class="cy__n" x="' + lb[0].toFixed(1) + '" y="' + (lb[1] + 5).toFixed(1) + '">' + (i + 1) + "</text></g>";
    }).join("");
    return '<svg class="cy" viewBox="0 0 360 360" aria-hidden="true">' + segs +
      '<path class="cy__arrow" d="M' + (cx + 70) + "," + (cy - 22) + " A72,72 0 1 1 " + (cx + 22) + "," + (cy - 70) + '"/>' +
      '<text class="cy__c" x="180" y="176">Ciclo</text><text class="cy__c" x="180" y="198">BPM</text></svg>';
  }

  function hero(p, c) {
    return (
      '<header class="sm-hero"><div class="wrap">' +
      '<a class="back" href="#proyectos"><span aria-hidden="true">←</span> Proyectos</a>' +
      '<p class="eyebrow">' + esc(c.eyebrow) + "</p>" +
      '<h1 class="sm-hero__t">' + esc(c.title) + "</h1>" +
      '<p class="sm-hero__sub">' + esc(c.sub) + "</p>" +
      '<div class="sm-hero__go"><a class="btn btn--small" href="#smRediseno" data-scroll="smRediseno">Ir al comparador AS-IS / TO-BE <span aria-hidden="true">↓</span></a>' +
      '<a class="btn btn--small btn--ghost" href="#smAsis" data-scroll="smAsis">Ver los modelos BPMN</a></div>' +
      '<div class="sm-hero__row"><dl class="sm-meta">' + c.meta.map(function (m) { return "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>"; }).join("") + "</dl>" +
      '<p class="sm-disc"><span class="hand">importante</span>' + esc(c.disclaimer) + "</p></div>" +
      '<section class="cyc" aria-labelledby="cycH"><div class="cyc__wheel">' + cycleSvg(c) + "</div>" +
      '<div class="cyc__side"><h2 id="cycH" class="cyc__t">El caso, fase a fase</h2><p class="cyc__intro">' + esc(c.cycleIntro) + "</p>" +
      '<div class="cyc__list" role="tablist" aria-label="Fases del ciclo BPM">' +
      c.cycle.map(function (ph, i) { return '<button type="button" role="tab" class="cyc__b" data-i="' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + "><span>" + (i + 1) + "</span>" + esc(ph.n) + "</button>"; }).join("") +
      '</div><div class="cyc__d" id="cycD" aria-live="polite"></div></div></section>' +
      "</div></header>"
    );
  }

  function reto(c) {
    var r = c.reto;
    return '<section class="sm-sec" id="smReto" aria-labelledby="smRetoH">' + sh("smReto", "", "El reto académico", esc(r.brief)) +
      '<div class="sm-two"><div><p class="sm-k">Por qué este proceso</p><ul class="sm-list">' + li(r.why) + "</ul></div>" +
      '<div><p class="sm-k">Problemas que planteamos al empezar</p><ul class="sm-list sm-list--warn">' + li(r.issues) + '</ul><p class="sm-note">' + esc(r.issuesNote) + "</p></div></div></section>";
  }

  function org(c) {
    var K = c.canvas, E = c.e3;
    var canvas = '<div class="bmc" role="group" aria-label="Business Model Canvas">' + K.blocks.map(function (b, i) {
      return '<button type="button" class="bmc__b bmc__b--' + b.a + '" data-b="' + i + '" aria-pressed="false"><span class="bmc__n">' + esc(b.n) + '</span><span class="bmc__i">' + b.i.map(esc).join("<br>") + "</span></button>";
    }).join("") + "</div>";
    var A = {}; E.actors.forEach(function (a) { A[a.id] = a; });
    var W = 190, H = 70;
    var lines = E.ex.map(function (x, i) {
      var a = A[x.a], b = A[x.b], ax = a.x + W / 2, ay = a.y + H / 2, bx = b.x + W / 2, by = b.y + H / 2;
      var horiz = Math.abs(bx - ax) > Math.abs(by - ay), o = 7;
      var s1, s2, e1, e2;
      if (horiz) { var sx = ax < bx ? a.x + W : a.x, ex = ax < bx ? b.x : b.x + W; s1 = [sx, ay - o]; e1 = [ex, by - o]; s2 = [ex, by + o]; e2 = [sx, ay + o]; }
      else { var sy = ay < by ? a.y + H : a.y, ey = ay < by ? b.y : b.y + H; var mx = (ax + bx) / 2; s1 = [ax - o + (bx - ax) * 0, sy]; e1 = [bx - o, ey]; s2 = [bx + o, ey]; e2 = [ax + o, sy]; }
      function ln(p, q, lab, side) {
        var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
        return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" marker-end="url(#e3a)"/>' +
          '<text x="' + (mx + (horiz ? 0 : side * 12)) + '" y="' + (my + (horiz ? side * 14 + (side > 0 ? 6 : 0) : 4)) + '" text-anchor="' + (horiz ? "middle" : side > 0 ? "start" : "end") + '">' + esc(lab) + "</text>";
      }
      return '<g class="e3__x" data-a="' + x.a + '" data-b="' + x.b + '">' + ln(s1, e1, x.ab, -1) + ln(s2, e2, x.ba, 1) + "</g>";
    }).join("");
    var boxes = E.actors.map(function (a) {
      return '<g class="e3__a e3__a--' + a.id + '" data-id="' + a.id + '" tabindex="0" role="button" aria-label="' + esc(a.n) + '"><rect x="' + a.x + '" y="' + a.y + '" width="' + W + '" height="' + H + '" rx="' + (a.id === "pac" ? 2 : 6) + '"/>' +
        '<text class="e3__n" x="' + (a.x + W / 2) + '" y="' + (a.y + 32) + '">' + esc(a.n) + '</text><text class="e3__k" x="' + (a.x + W / 2) + '" y="' + (a.y + 52) + '">' + esc(a.k) + "</text></g>";
    }).join("");
    var svg = '<svg class="e3" viewBox="80 0 730 450" role="group" aria-label="Modelo e3value simplificado"><defs><marker id="e3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>' + lines + boxes + "</svg>";
    return '<section class="sm-sec" id="smOrg" aria-labelledby="smOrgH">' + sh("smOrg", "Antes del ciclo", "Comprender la organización", "Antes de tocar el proceso, miramos el SERMAS desde dos ángulos.") +
      '<div class="orgc">' + c.orgCompare.map(function (x) { return "<p><b>" + esc(x[0]) + "</b>" + esc(x[1]) + "</p>"; }).join("") + "</div>" +
      '<h3 class="sm-h3">Business Model Canvas</h3><p class="sm-p">Toca un bloque para ver qué pregunta responde.</p>' + canvas +
      '<div class="bmc__d" id="bmcD" aria-live="polite"></div>' +
      '<button type="button" class="mini-link" data-zoom-src="' + K.img + '" data-zoom-alt="Business Model Canvas original">Ver el Canvas original</button>' +
      '<h3 class="sm-h3">Modelo de valor e3value</h3><p class="sm-p">Elige un actor para ver qué da y qué recibe.</p>' +
      '<div class="e3w"><div class="e3c">' + svg + '</div><div class="e3d" id="e3D" aria-live="polite"></div></div>' +
      '<p class="sm-note">' + esc(E.note) + ' <button type="button" class="mini-link" data-zoom-src="' + E.img + '" data-zoom-alt="Modelo e3value original">Ver el modelo original</button></p>' +
      "</section>";
  }

  function ident(c) {
    var L = c.landscape;
    return '<section class="sm-sec" id="smIdent" aria-labelledby="smIdentH">' + sh("smIdent", "1 · Identificación", "Identificar el proceso", "Clasificamos los procesos del SERMAS en tres niveles y elegimos la gestión de citas médicas.") +
      '<div class="pl">' + L.levels.map(function (lv, i) {
        return '<div class="pl__lv pl__lv--' + i + '"><div class="pl__h"><b>' + esc(lv.n) + "</b><span>" + esc(lv.d) + '</span></div><ul class="pl__p">' +
          lv.p.map(function (x) { return "<li" + (x === lv.sel ? ' class="is-sel"' : "") + ">" + esc(x) + (x === lv.sel ? ' <span class="hand">el elegido</span>' : "") + "</li>"; }).join("") + "</ul></div>";
      }).join("") + "</div>" +
      '<div class="chain"><p class="sm-k">Cómo encaja</p><ol class="chain__o">' + L.chain.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ol><p class="chain__to"><span aria-hidden="true">↳</span> ' + L.chainTo.map(esc).join(" · ") + '</p><p class="sm-note">' + esc(L.chainNote) + "</p>" +
      '<p class="sm-figs">' + L.imgs.map(function (im) { return '<button type="button" class="mini-link" data-zoom-src="' + im[0] + '" data-zoom-alt="' + esc(im[1]) + '">' + esc(im[1]) + "</button>"; }).join("") + "</p></div>" +
      '<div class="sm-two sm-two--ficha"><div><p class="sm-k">Por qué la gestión de citas</p><ul class="sm-list">' + li(L.why) + "</ul></div>" +
      '<div><p class="sm-k">Ficha del proceso</p><dl class="ficha">' + c.ficha.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") + '</dl><p class="sm-note">' + esc(c.fichaScope) + "</p></div></div>" +
      "</section>";
  }

  function viewerHtml(key, opts) {
    return '<div class="bv" data-v="' + key + '">' +
      '<div class="bv__bar">' +
      '<div class="bv__seg" role="group" aria-label="Modelo">' +
      '<button type="button" data-model="asis" aria-pressed="' + (opts.model === "asis") + '">' + (opts.labels ? opts.labels[0] : "AS-IS") + '</button><button type="button" data-model="tobe" aria-pressed="' + (opts.model === "tobe") + '">' + (opts.labels ? opts.labels[1] : "TO-BE") + "</button></div>" +
      (opts.changes ? '<label class="bv__chk"><input type="checkbox" data-changes> Marcar lo nuevo del TO-BE</label>' : "") +
      '<div class="bv__z" role="group" aria-label="Zoom"><button type="button" data-z="out" aria-label="Alejar">−</button><button type="button" data-z="in" aria-label="Acercar">+</button><button type="button" data-z="fit">Ajustar</button><button type="button" data-z="max" aria-pressed="false">Ampliar</button></div>' +
      "</div>" +
      '<div class="bv__c" tabindex="0" role="application" aria-roledescription="visor BPMN" aria-label="Diagrama BPMN. Arrastra para moverte, usa las flechas para desplazarte y los botones para el zoom."><p class="bv__load">Cargando el modelo…</p></div>' +
      '<div class="bv__info" aria-live="polite"><p class="bv__hint">Toca una actividad para ver qué es y quién la hace.</p></div>' +
      "</div>";
  }

  function asis(c) {
    var B = c.bpmn;
    var byActor = {};
    Object.keys(B.els.asis).forEach(function (id) { var e = B.els.asis[id]; if (e[1] === "task") (byActor[e[2]] = byActor[e[2]] || []).push(e[0]); });
    return '<section class="sm-sec sm-sec--wide" id="smAsis" aria-labelledby="smAsisH">' + sh("smAsis", "2 · Descubrimiento", "El proceso tal como lo modelamos: AS-IS", "") +
      '<div class="sm-cols">' + B.asisText.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" +
      viewerHtml("main", { model: "asis", changes: true }) +
      '<div class="bv__more"><details><summary>Las 31 tareas del AS-IS, por actor</summary><div class="acts">' +
      Object.keys(byActor).map(function (a) { return "<div><p class=\"sm-k\">" + esc(a) + "</p><ul>" + li(byActor[a]) + "</ul></div>"; }).join("") + "</div></details>" +
      '<p class="bv__dl">Archivos originales: <a href="' + B.files.asis + '" download>AS-IS (.bpmn)</a> · <a href="' + B.files.tobe + '" download>TO-BE (.bpmn)</a></p></div>' +
      '<div class="cnt"><table><caption class="sm-k">Los dos modelos, elemento a elemento</caption><thead><tr><th scope="col">Elemento</th><th scope="col">AS-IS</th><th scope="col">TO-BE</th></tr></thead><tbody>' +
      B.counts.map(function (r) { var d = r[2] - r[1]; return '<tr><th scope="row">' + esc(r[0]) + "</th><td>" + r[1] + "</td><td>" + r[2] + (d ? ' <span class="cnt__d">+' + d + "</span>" : "") + "</td></tr>"; }).join("") +
      '</tbody></table><p class="sm-note">' + esc(B.countsNote) + "</p></div>" +
      "</section>";
  }

  function analisis(c) {
    return '<section class="sm-sec" id="smAnalisis" aria-labelledby="smAnalisisH">' + sh("smAnalisis", "3 · Análisis", "Dónde podía mejorar", esc(c.analysisNote)) +
      '<div class="an" role="table" aria-label="Análisis por dimensiones"><div class="an__r an__r--h" role="row"><span role="columnheader">Dimensión</span><span role="columnheader">Problema</span><span role="columnheader">A quién afecta</span><span role="columnheader">Oportunidad</span><span role="columnheader">Cómo medirlo</span></div>' +
      c.analysis.map(function (a) {
        return '<div class="an__r" role="row"><b role="rowheader">' + esc(a.n) + '</b><span role="cell" data-l="Problema">' + esc(a.prob) + '</span><span role="cell" data-l="A quién afecta">' + esc(a.who) + '</span><span role="cell" data-l="Oportunidad">' + esc(a.opp) + '</span><span role="cell" data-l="Cómo medirlo" class="an__k">' + esc(a.kpi) + "</span></div>";
      }).join("") + "</div></section>";
  }

  function rediseno(c) {
    var I = c.improvements;
    return '<section class="sm-sec sm-sec--wide" id="smRediseno" aria-labelledby="smRedisenoH">' + sh("smRediseno", "4 · Rediseño", "Cuatro mejoras, del AS-IS al TO-BE", "Elige una mejora: el visor enfoca su fragmento en el modelo real. Cambia entre antes y después para comparar.") +
      '<div class="imx"><div class="imx__tabs" role="tablist" aria-label="Mejoras">' +
      I.map(function (m, i) { return '<button type="button" role="tab" class="imx__t" data-i="' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + "><span>" + (i + 1) + "</span>" + esc(m.n) + "</button>"; }).join("") +
      '</div><div class="imx__body"><div class="imx__txt" id="imxTxt" aria-live="polite"></div>' + viewerHtml("cmp", { model: "tobe", labels: ["Antes (AS-IS)", "Después (TO-BE)"] }) + "</div></div>" +
      '<p class="sm-note">La memoria resume en sus conclusiones «tres mejoras» con otros nombres. Aquí seguimos las cuatro del apartado de rediseño, que son las que aparecen en la presentación y en el modelo TO-BE.</p>' +
      "</section>";
  }

  function sim() {
    var slots = ["Lun 9:00", "Lun 9:20", "Lun 9:40", "Lun 10:00", "Lun 10:20", "Lun 10:40"];
    return '<section class="sm-sec" id="smSim" aria-labelledby="smSimH">' + sh("smSim", "", "Probar las mejoras", "Una demo que hice después para el portfolio; no formaba parte del trabajo. Agenda y personas ficticias, sin conexión con ningún servicio real.") +
      '<div class="sim"><div class="sim__tabs" role="tablist" aria-label="Escenario"><button type="button" role="tab" class="sim__tab" data-sc="0" aria-selected="true">Cancelar una cita</button><button type="button" role="tab" class="sim__tab" data-sc="1" aria-selected="false" tabindex="-1">Llamada sin atender</button></div>' +
      '<div class="sim__ctl"><div class="bv__seg" role="group" aria-label="Modelo"><button type="button" data-sm="asis" aria-pressed="false">AS-IS</button><button type="button" data-sm="tobe" aria-pressed="true">TO-BE</button></div>' +
      '<label class="bv__chk" id="simWaitL"><input type="checkbox" id="simWait" checked> Hay personas en lista de espera</label>' +
      '<button type="button" class="mini-link" id="simReset">Reiniciar</button></div>' +
      '<div class="sim__sc" data-sc="0"><ul class="agenda" id="simAgenda">' + slots.map(function (s, i) {
        return '<li data-i="' + i + '"><span class="agenda__h">' + s + '</span><span class="agenda__s">Reservada · Persona ' + String.fromCharCode(65 + i) + '</span><button type="button" class="agenda__x">Cancelar</button></li>';
      }).join("") + '</ul><div class="wait" id="simWaitList"><p class="sm-k">Lista de espera</p><ol><li>Persona G</li><li>Persona H</li></ol></div></div>' +
      '<div class="sim__sc" data-sc="1" hidden><div class="phone"><p class="phone__s" id="phoneS">El teléfono del centro está saturado: ahora mismo no hay nadie libre.</p><button type="button" class="btn btn--small" id="simCall">Llamar al centro</button></div></div>' +
      '<ol class="log" id="simLog" aria-live="polite"></ol></div></section>';
  }

  function impl(c) {
    var M = c.improvements, X = c.impl;
    function rows(arr, kind) {
      return arr.map(function (r) {
        return '<tr><th scope="row"><span class="rq__k">' + kind + "</span>" + esc(r[0]) + "<small>" + esc(r[1]) + "</small></th>" + M.map(function (_, i) { return '<td>' + (r[2].indexOf(i + 1) > -1 ? '<span class="dot" aria-label="Sí">●</span>' : '<span class="sr">No</span>') + "</td>"; }).join("") + "</tr>";
      }).join("");
    }
    return '<section class="sm-sec" id="smImpl" aria-labelledby="smImplH">' + sh("smImpl", "5 · Implementación", "Qué haría falta para ponerlo en marcha", "Requisitos que propusimos para una implantación futura. No se desarrolló ni se probó nada.") +
      '<div class="rq"><table><thead><tr><th scope="col">Requisito</th>' + M.map(function (m, i) { return '<th scope="col" title="' + esc(m.t) + '"><span>' + (i + 1) + "</span>" + esc(m.n) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows(X.org, "Organizativo") + rows(X.tech, "Tecnológico") + "</tbody></table></div>" +
      '<p class="sm-note">' + esc(X.techNote) + "</p>" +
      '<div class="later"><p class="sm-k">Lo que estudiaría antes de una implantación real <span class="hand">reflexión posterior</span></p><ul>' + li(X.later) + "</ul></div></section>";
  }

  function kpi(c) {
    var srcName = { ficha: "Ficha del proceso", "presentación": "Presentación", "ampliación": "Ampliación posterior" };
    var groups = ["ficha", "presentación", "ampliación"];
    return '<section class="sm-sec" id="smKpi" aria-labelledby="smKpiH">' + sh("smKpi", "6 · Monitorización", "Cómo sabríamos si funciona", "") +
      '<ol class="loop">' + c.monitor.map(function (m) { return "<li><b>" + esc(m[0]) + "</b><span>" + esc(m[1]) + "</span></li>"; }).join("") + '<li class="loop__back"><b>Vuelta al ciclo</b><span>Lo que se aprende inicia una nueva identificación.</span></li></ol>' +
      '<p class="sm-p">' + esc(c.monitorOwner) + "</p>" +
      '<h3 class="sm-h3">Explorador de indicadores</h3>' +
      '<div class="kx"><div class="kx__list" role="tablist" aria-label="Indicadores" aria-orientation="vertical">' +
      groups.map(function (g) {
        return '<p class="kx__g">' + srcName[g] + "</p>" + c.kpis.map(function (k, i) { return k.src !== g ? "" : '<button type="button" role="tab" class="kx__b" data-i="' + i + '" aria-selected="false" tabindex="-1">' + esc(k.n) + "</button>"; }).join("");
      }).join("") +
      '</div><div class="kx__d" id="kxD" role="tabpanel" aria-live="polite"></div></div><p class="sm-note">' + esc(c.kpiNote) + "</p></section>";
  }

  function yo(c) {
    return '<section class="sm-sec" id="smYo" aria-labelledby="smYoH">' + sh("smYo", "", "Resultado, mi parte y lo que me llevo", "") +
      '<div class="sm-two"><div><p class="sm-k">Lo que entregamos</p><ul class="deliv">' + li(c.deliverables) + "</ul></div>" +
      '<div><p class="sm-k">Lo que buscan las mejoras</p><ul class="sm-list">' + li(c.aims) + '</ul><p class="sm-note">' + esc(c.resultNote) + "</p></div></div>" +
      '<blockquote class="me"><p>' + esc(c.me) + "</p></blockquote>" +
      '<p class="sm-k">Lo que me llevo</p><ul class="sm-list">' + li(c.learned) + "</ul></section>";
  }

  window.renderBPMCase = function (p, nextHtml) {
    C = (window.BPM_CASES || {})[p.slug];
    if (!C) return "";
    return '<div class="view sm"><article>' + hero(p, C) +
      '<div class="wrap sm-lay"><nav class="sm-rail" aria-label="Partes del caso"><ol>' +
      C.rail.map(function (r) { return '<li><a href="#' + r[0] + '" data-scroll="' + r[0] + '" data-r="' + r[0] + '">' + esc(r[1]) + "</a></li>"; }).join("") +
      '</ol></nav><div class="sm-main">' + reto(C) + org(C) + ident(C) + asis(C) + analisis(C) + rediseno(C) + sim() + impl(C) + kpi(C) + yo(C) + "</div></div>" +
      (nextHtml || "") + "</article></div>";
  };

  /* ---------- Interacción ---------- */
  function tablist(btns, attr, on) {
    function pick(i) { btns.forEach(function (b, j) { b.setAttribute(attr, String(i === j)); b.tabIndex = i === j ? 0 : -1; }); on(i); }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { pick(i); });
      b.addEventListener("keydown", function (e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d === undefined) return; e.preventDefault();
        var n = (i + d + btns.length) % btns.length; pick(n); btns[n].focus();
      });
    });
    return pick;
  }

  function Viewer(el, cfg) {
    var self = this, canvasEl = el.querySelector(".bv__c"), info = el.querySelector(".bv__info"), viewer = null, model = cfg.model, marks = [], ready = null;
    var els = C.bpmn.els;
    function setModelBtns() { el.querySelectorAll("[data-model]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-model") === model)); }); }
    function load() {
      return loadLib().then(function (BpmnJS) {
        if (!viewer) {
          canvasEl.innerHTML = "";
          viewer = new BpmnJS({ container: canvasEl });
          viewer.get("eventBus").on("element.click", function (e) { show(e.element.id); });
        }
        return getXml(C.bpmn.files[model]).then(function (xml) { return viewer.importXML(xml); }).then(function () {
          marks = []; viewer.get("canvas").zoom("fit-viewport", "auto"); if (cfg.onLoad) cfg.onLoad(self);
        });
      }).catch(function () { canvasEl.innerHTML = '<p class="bv__load">No se ha podido cargar el visor. Puedes descargar los archivos .bpmn más abajo.</p>'; });
    }
    function show(id) {
      var e = els[model][id];
      if (!e) { info.innerHTML = '<p class="bv__hint">Toca una actividad para ver qué es y quién la hace.</p>'; return; }
      var kind = { task: "Tarea", exclusiveGateway: "Compuerta exclusiva", parallelGateway: "Compuerta paralela", startEvent: "Evento de inicio", endEvent: "Evento de fin", dataStoreReference: "Almacén de datos" }[e[1].split("·")[0]] || (/intermediate/.test(e[1]) ? "Evento intermedio" : e[1]);
      if (/·message/.test(e[1])) kind += " de mensaje"; if (/·timer/.test(e[1])) kind += " de temporizador";
      var isNew = model === "tobe" && !els.asis[id];
      info.innerHTML = '<p class="bv__in"><b>' + esc(e[0] || "(sin nombre)") + "</b><span>" + esc(kind) + " · " + esc(e[2]) + "</span>" + (isNew ? '<span class="bv__new">Nuevo en el TO-BE</span>' : "") + '<code>' + esc(id) + "</code></p>";
    }
    function clear() { if (!viewer) return; var cv = viewer.get("canvas"); marks.forEach(function (m) { try { cv.removeMarker(m[0], m[1]); } catch (er) {} }); marks = []; }
    this.mark = function (ids, cls) { if (!viewer) return; var cv = viewer.get("canvas"), reg = viewer.get("elementRegistry"); ids.forEach(function (id) { if (reg.get(id)) { cv.addMarker(id, cls); marks.push([id, cls]); } }); };
    this.clear = clear;
    this.focus = function (ids) {
      if (!viewer) return; var reg = viewer.get("elementRegistry"), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      ids.forEach(function (id) { var s = reg.get(id); if (!s) return; x0 = Math.min(x0, s.x); y0 = Math.min(y0, s.y); x1 = Math.max(x1, s.x + s.width); y1 = Math.max(y1, s.y + s.height); });
      if (x0 === Infinity) return; var pad = 70, w = Math.max(x1 - x0 + pad * 2, 820), h = Math.max(y1 - y0 + pad * 2, 360), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; viewer.get("canvas").viewbox({ x: cx - w / 2, y: cy - h / 2, width: w, height: h });
    };
    this.setModel = function (m) { model = m; setModelBtns(); info.innerHTML = '<p class="bv__hint">Toca una actividad para ver qué es y quién la hace.</p>'; ready = load(); return ready; };
    this.model = function () { return model; };
    this.start = function () { if (!ready) ready = load(); return ready; };
    this.started = function () { return !!ready; };
    el.querySelectorAll("[data-model]").forEach(function (b) { b.addEventListener("click", function () { if (b.getAttribute("data-model") !== model) self.setModel(b.getAttribute("data-model")); }); });
    el.querySelectorAll("[data-z]").forEach(function (b) {
      b.addEventListener("click", function () {
        var z = b.getAttribute("data-z");
        if (z === "max") { var on = !el.classList.contains("is-max"); el.classList.toggle("is-max", on); b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "Cerrar" : "Ampliar"; document.body.style.overflow = on ? "hidden" : ""; if (viewer) { viewer.get("canvas").resized(); viewer.get("canvas").zoom("fit-viewport", "auto"); } return; }
        if (!viewer) return; var cv = viewer.get("canvas");
        if (z === "fit") cv.zoom("fit-viewport", "auto"); else cv.zoom(cv.zoom() * (z === "in" ? 1.25 : 0.8));
      });
    });
    canvasEl.addEventListener("keydown", function (e) {
      if (!viewer) return; var d = { ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60] }[e.key];
      if (d) { e.preventDefault(); viewer.get("canvas").scroll({ dx: d[0], dy: d[1] }); }
      if (e.key === "+" || e.key === "-") { e.preventDefault(); var cv = viewer.get("canvas"); cv.zoom(cv.zoom() * (e.key === "+" ? 1.25 : 0.8)); }
    });
    el.addEventListener("keydown", function (e) { if (e.key === "Escape" && el.classList.contains("is-max")) { el.querySelector('[data-z="max"]').click(); el.querySelector('[data-z="max"]').focus(); } });
    var chk = el.querySelector("[data-changes]");
    if (chk) chk.addEventListener("change", function () {
      var all = []; C.improvements.forEach(function (m) { all = all.concat(m.added); });
      var apply = function () { clear(); if (chk.checked) self.mark(all, "sm-new"); };
      if (chk.checked && model !== "tobe") self.setModel("tobe").then(apply); else apply();
    });
    if (cfg.onModel) el.querySelectorAll("[data-model]").forEach(function (b) { b.addEventListener("click", function () { cfg.onModel(); }); });
  }

  window.setupBPMCase = function (root) {
    var sm = root.querySelector(".sm"); if (!sm || !C) return;
    var zoom = window.meyZoom || function () {};
    var nv = document.querySelector(".nav"); if (nv) sm.style.setProperty("--navH", nv.offsetHeight + "px");
    sm.addEventListener("click", function (e) { var z = e.target.closest("[data-zoom-src]"); if (z) zoom(z.getAttribute("data-zoom-src"), z.getAttribute("data-zoom-alt")); });

    /* Ciclo BPM */
    var cd = sm.querySelector("#cycD"), segs = sm.querySelectorAll(".cy__s");
    var pickPh = tablist(Array.prototype.slice.call(sm.querySelectorAll(".cyc__b")), "aria-selected", function (i) {
      var ph = C.cycle[i]; segs.forEach(function (s) { s.classList.toggle("is-on", +s.getAttribute("data-i") === i); });
      cd.innerHTML = "<p><b>" + (i + 1) + ". " + esc(ph.n) + "</b> " + esc(ph.d) + '</p><a class="cyc__go" href="#' + ph.go + '" data-scroll="' + ph.go + '">Ir a esta fase <span aria-hidden="true">↓</span></a>';
    });
    segs.forEach(function (s) { s.addEventListener("click", function () { pickPh(+s.getAttribute("data-i")); }); });
    pickPh(0);

    /* Raíl: fase visible */
    var links = sm.querySelectorAll(".sm-rail a");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle("is-on", a.getAttribute("data-r") === x.target.id); }); }); }, { rootMargin: "-40% 0px -55% 0px" });
      C.rail.forEach(function (r) { var s = sm.querySelector("#" + r[0]); if (s) io.observe(s); });
    }

    /* Canvas */
    var bd = sm.querySelector("#bmcD"), bb = sm.querySelectorAll(".bmc__b");
    bb.forEach(function (b) {
      b.addEventListener("click", function () {
        var on = b.getAttribute("aria-pressed") !== "true", k = C.canvas.blocks[+b.getAttribute("data-b")];
        bb.forEach(function (x) { x.setAttribute("aria-pressed", String(on && x === b)); });
        sm.querySelector(".bmc").classList.toggle("has-sel", on);
        bd.innerHTML = on ? "<p><b>" + esc(k.n) + "</b> responde a <i>" + esc(k.q) + "</i></p>" : "";
      });
    });

    /* e3value */
    var e3d = sm.querySelector("#e3D"), e3 = sm.querySelector(".e3");
    function pickA(id) {
      var a = C.e3.actors.filter(function (x) { return x.id === id; })[0];
      e3.classList.add("has-sel");
      e3.querySelectorAll(".e3__a").forEach(function (g) { g.classList.toggle("is-sel", g.getAttribute("data-id") === id); });
      var give = [], get = [];
      e3.querySelectorAll(".e3__x").forEach(function (g) { var on = g.getAttribute("data-a") === id || g.getAttribute("data-b") === id; g.classList.toggle("is-on", on); });
      C.e3.ex.forEach(function (x) {
        var A = function (k) { return C.e3.actors.filter(function (y) { return y.id === k; })[0].n; };
        if (x.a === id) { give.push(x.ab + " → " + A(x.b)); get.push(x.ba + " ← " + A(x.b)); }
        if (x.b === id) { give.push(x.ba + " → " + A(x.a)); get.push(x.ab + " ← " + A(x.a)); }
      });
      e3d.innerHTML = '<p class="sm-k">' + esc(a.k) + "</p><h4>" + esc(a.n) + "</h4>" + (a.d ? "<p>" + esc(a.d) + "</p>" : "") +
        '<p class="sm-k">Da</p><ul>' + li(give) + '</ul><p class="sm-k">Recibe</p><ul>' + li(get) + "</ul>";
    }
    e3.querySelectorAll(".e3__a").forEach(function (g) {
      g.addEventListener("click", function () { pickA(g.getAttribute("data-id")); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pickA(g.getAttribute("data-id")); } });
    });
    pickA("ser");

    /* Visores BPMN (se cargan al acercarse) */
    var vMain = new Viewer(sm.querySelector('.bv[data-v="main"]'), { model: "asis" });
    var imI = 0, tI = sm.querySelector("#imxTxt");
    var vCmp = new Viewer(sm.querySelector('.bv[data-v="cmp"]'), { model: "tobe", onLoad: function (v) { focusImp(v); } });
    function focusImp(v) {
      var m = C.improvements[imI], ids = v.model() === "tobe" ? m.tobe : m.asis;
      v.clear(); v.mark(ids, "sm-hl"); if (v.model() === "tobe") v.mark(m.added, "sm-new"); v.focus(ids);
    }
    function names(ids, model) { return ids.map(function (id) { return C.bpmn.els[model][id]; }).filter(function (e) { return e && e[0] && e[1] !== "endEvent"; }).map(function (e) { return e[0]; }); }
    var pickImp = tablist(Array.prototype.slice.call(sm.querySelectorAll(".imx__t")), "aria-selected", function (i) {
      imI = i; var m = C.improvements[i];
      var added = names(m.added, "tobe");
      tI.innerHTML = "<h3>" + esc(m.t) + "</h3>" +
        '<dl class="imx__dl"><div><dt>Problema</dt><dd>' + esc(m.prob) + "</dd></div><div><dt>Propuesta</dt><dd>" + esc(m.prop) + "</dd></div>" +
        "<div><dt>Antes (AS-IS)</dt><dd>" + names(m.asis, "asis").map(esc).join(" → ") + "</dd></div>" +
        '<div><dt>Se añade</dt><dd class="imx__add">' + (added.length ? added.map(function (n) { return "<span>" + esc(n) + "</span>"; }).join("") : "Compuertas de decisión") + "</dd></div>" +
        "<div><dt>Actores</dt><dd>" + m.who.map(esc).join(" · ") + "</dd></div><div><dt>Beneficio esperado</dt><dd>" + esc(m.ben) + "</dd></div>" +
        "<div><dt>Cómo evaluarla</dt><dd>" + m.kpi.map(function (k) { return '<button type="button" class="kpi-link" data-kpi="' + esc(k) + '">' + esc(k) + "</button>"; }).join(" ") + "</dd></div></dl>";
      if (vCmp.started()) vCmp.start().then(function () { focusImp(vCmp); });
    });
    tI.addEventListener("click", function (e) { var b = e.target.closest("[data-kpi]"); if (b) openKpi(b.getAttribute("data-kpi"), true); });
    pickImp(0);
    if ("IntersectionObserver" in window) {
      var lio = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { lio.unobserve(x.target); (x.target.getAttribute("data-v") === "main" ? vMain : vCmp).start(); } }); }, { rootMargin: "300px" });
      sm.querySelectorAll(".bv").forEach(function (b) { lio.observe(b); });
    } else { vMain.start(); vCmp.start(); }

    /* Simulación */
    var simModel = "tobe", sc = 0, busy = false, gen = 0, log = sm.querySelector("#simLog"), ag = sm.querySelector("#simAgenda"), wait = sm.querySelector("#simWait"), waitL = sm.querySelector("#simWaitList");
    function step(lines, done) {
      busy = true; log.innerHTML = ""; var i = 0, g = ++gen;
      (function next() {
        if (g !== gen) return;
        if (i >= lines.length) { busy = false; if (done) done(); return; }
        var l = lines[i++]; log.insertAdjacentHTML("beforeend", '<li class="log__' + (l[2] || "s") + '"><b>' + esc(l[0]) + "</b>" + (l[1] ? "<span>" + esc(l[1]) + "</span>" : "") + "</li>");
        setTimeout(next, reduce ? 0 : 520);
      })();
    }
    function resetSim() {
      gen++; busy = false;
      ag.querySelectorAll("li").forEach(function (x, i) { x.className = ""; x.querySelector(".agenda__s").textContent = "Reservada · Persona " + String.fromCharCode(65 + i); x.querySelector(".agenda__x").disabled = false; });
      waitL.querySelectorAll("li").forEach(function (x) { x.className = ""; });
      log.innerHTML = '<li class="log__i"><b>' + (sc === 0 ? "Cancela cualquier cita para ver qué pasa con el hueco." : "Llama al centro para ver qué pasa cuando nadie puede atender.") + "</b></li>";
      sm.querySelector("#phoneS").textContent = "El teléfono del centro está saturado: ahora mismo no hay nadie libre.";
    }
    function syncWait() { waitL.classList.toggle("is-empty", !wait.checked); }
    wait.addEventListener("change", syncWait);
    ag.addEventListener("click", function (e) {
      var b = e.target.closest(".agenda__x"); if (!b || busy) return; var row = b.closest("li"); b.disabled = true;
      row.className = "is-cancel"; row.querySelector(".agenda__s").textContent = "Cancelada";
      var L = [["Solicitar cancelación de cita", "Paciente"], ["Cancelar cita del paciente", "Sistema SERMAS"], ["Confirmación de cancelación enviada", "Sistema SERMAS → paciente"]];
      if (simModel === "asis") {
        L.push(["Fin del proceso en el AS-IS", "El hueco queda libre. El modelo no incluye ningún aviso a la lista de espera.", "end"]);
        step(L, function () { row.className = "is-free"; row.querySelector(".agenda__s").textContent = "Libre"; });
      } else if (wait.checked) {
        L.push(["Observar lista de espera", "Sistema SERMAS"], ["¿Hay alguien esperando? Sí", "Compuerta del TO-BE"], ["Notificar hueco disponible", "Aviso a la primera persona de la lista (Persona G)", "new"], ["Pendiente de respuesta", "El aviso no confirma la cita: cómo se acepta habría que definirlo.", "end"]);
        step(L, function () { row.className = "is-offer"; row.querySelector(".agenda__s").textContent = "Ofrecida a Persona G · pendiente"; waitL.querySelector("li").className = "is-notified"; });
      } else {
        L.push(["Observar lista de espera", "Sistema SERMAS"], ["¿Hay alguien esperando? No", "Compuerta del TO-BE"], ["Dejar hueco libre", "Sistema SERMAS", "end"]);
        step(L, function () { row.className = "is-free"; row.querySelector(".agenda__s").textContent = "Libre"; });
      }
    });
    sm.querySelector("#simCall").addEventListener("click", function () {
      if (busy) return; var s = sm.querySelector("#phoneS");
      if (simModel === "asis") step([["Llamar por teléfono", "Paciente"], ["Atender llamada", "Personal administrativo"], ["El AS-IS no contempla este caso", "En el modelo la llamada siempre se atiende y se pasa a «Tomar datos del paciente». Lo que ocurre si nadie contesta no está representado.", "end"]], function () { s.textContent = "Sin respuesta: el paciente tendrá que volver a llamar."; });
      else step([["Llamar por teléfono", "Paciente"], ["Atender llamada → ¿se puede atender? No", "Compuerta «Atender»"], ["Reproducir mensaje automático", "Sugiere volver a intentarlo o usar la web", "new"], ["Registrar número", "Personal administrativo", "new"], ["Devolver llamada", "Cuando el personal queda libre", "new"], ["Tomar datos del paciente", "La cita se tramita como siempre", "end"]], function () { s.textContent = "Llamada devuelta: la cita se tramita con normalidad."; });
    });
    sm.querySelector("#simReset").addEventListener("click", resetSim);
    sm.querySelectorAll("[data-sm]").forEach(function (b) {
      b.addEventListener("click", function () { simModel = b.getAttribute("data-sm"); sm.querySelectorAll("[data-sm]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); }); sm.querySelector("#simWaitL").classList.toggle("is-off", simModel === "asis" || sc === 1); resetSim(); });
    });
    tablist(Array.prototype.slice.call(sm.querySelectorAll(".sim__tab")), "aria-selected", function (i) {
      sc = i; sm.querySelectorAll(".sim__sc").forEach(function (x) { x.hidden = +x.getAttribute("data-sc") !== i; });
      sm.querySelector("#simWaitL").classList.toggle("is-off", simModel === "asis" || i === 1); resetSim();
    });
    syncWait(); resetSim();

    /* KPI */
    var kd = sm.querySelector("#kxD"), kb = Array.prototype.slice.call(sm.querySelectorAll(".kx__b"));
    var srcTxt = { ficha: "De la ficha del proceso (trabajo original)", "presentación": "Del dashboard de la presentación (trabajo original)", "ampliación": "Ampliación posterior para el portfolio" };
    var pickK = tablist(kb, "aria-selected", function (j) {
      var k = C.kpis[+kb[j].getAttribute("data-i")];
      kd.innerHTML = '<p class="sm-k">' + srcTxt[k.src] + "</p><h4>" + esc(k.n) + '</h4><p class="kx__q">' + esc(k.q) + "</p>" +
        '<p class="kx__f"><span>Cálculo</span>' + esc(k.f) + "</p>" +
        '<dl class="imx__dl"><div><dt>Datos necesarios</dt><dd>' + esc(k.data) + "</dd></div><div><dt>Decisión que ayuda a tomar</dt><dd>" + esc(k.dec) + "</dd></div>" +
        "<div><dt>Mejoras relacionadas</dt><dd>" + k.imp.map(function (n) { return '<button type="button" class="kpi-link" data-imp="' + (n - 1) + '">' + n + ". " + esc(C.improvements[n - 1].n) + "</button>"; }).join(" ") + "</dd></div>" +
        "<div><dt>Limitación</dt><dd>" + esc(k.lim) + "</dd></div></dl>";
    });
    function openKpi(name, scroll) {
      var j = kb.map(function (b) { return C.kpis[+b.getAttribute("data-i")].n; }).indexOf(name);
      if (j < 0) j = kb.map(function (b) { return C.kpis[+b.getAttribute("data-i")].n.toLowerCase(); }).findIndex(function (n) { return n.indexOf(name.toLowerCase().split(" ")[0]) > -1; });
      if (j < 0) return; pickK(j); if (scroll) sm.querySelector("#smKpi").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
    kd.addEventListener("click", function (e) { var b = e.target.closest("[data-imp]"); if (!b) return; var i = +b.getAttribute("data-imp"); sm.querySelectorAll(".imx__t")[i].click(); sm.querySelector("#smRediseno").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); });
    pickK(0);
  };
})();
