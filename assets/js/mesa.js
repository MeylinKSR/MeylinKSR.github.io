/* ==========================================================
   MI MESA · "Fuera del trabajo"
   Cada objeto de la mesa es una afición con su propia interacción.
   Los datos están en mesa-data.js; aquí solo se dibujan y se animan.
   ========================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Dibujos a línea del recetario (trazo simple, sin relleno) */
  var DRAW = {
    flan: '<ellipse cx="40" cy="50" rx="28" ry="5"/><path d="M23 48c0-8 3-14 8-16h18c5 2 8 8 8 16"/><ellipse cx="40" cy="32" rx="9" ry="2.4" style="fill:var(--coral)"/><path d="M33 33v4M40 34v6M46 33v3"/>',
    bizcocho: '<path d="M14 44h52v8H14zM16 44c0-12 10-20 24-20s24 8 24 20M30 30l2-6M40 28v-6M50 30l-2-6"/><path d="M10 56h60"/>',
    magdalena: '<path d="M24 38h32l-4 18H28zM22 38c0-10 8-16 18-16s18 6 18 16M32 38l2 18M40 38v18M48 38l-2 18"/><circle cx="40" cy="20" r="2"/>',
    tortitas: '<ellipse cx="40" cy="48" rx="24" ry="5"/><path d="M16 48v-5c0 3 48 3 48 0v5M18 43v-5c0 3 44 3 44 0v5M20 38v-4c0 3 40 3 40 0v4"/><path d="M36 30c0 4 8 4 8 0"/>',
    tarta: '<path d="M14 50l26-20 26 20zM14 50v6h52v-6M40 30v26"/><path d="M22 44c4 2 8 2 12 0M46 44c4 2 8 2 12 0"/>',
  };

  /* ---------- Render ---------- */
  function tickets(M) {
    var list = M.conciertos.slice().sort(function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0); });
    return (
      '<div class="obj obj--tickets" style="grid-area:tick">' +
      '<p class="obj__tag hand">conciertos</p>' +
      '<div class="tbox"><div class="tbox__slots" role="tablist" aria-label="Conciertos en los que he estado">' +
      list.map(function (c, i) {
        var idx = M.conciertos.indexOf(c);
        return '<button type="button" role="tab" class="tk' + (c.destacado ? " tk--fav" : "") + '" style="--c:' + (c.color || "var(--ivory)") + ';--h:' + (c.destacado ? 13 - i * 0.4 : 10 + (i % 3) * 0.5) + 'rem" data-c="' + idx + '" aria-selected="false"><span>' + esc(c.corto || c.artista) + "</span></button>";
      }).join("") +
      '</div><div class="tbox__front" aria-hidden="true"><span>MEY · recuerdos</span></div></div>' +
      '<div class="memo" id="memo" aria-live="polite"><p class="memo__hint">Saca una entrada.</p></div>' +
      "</div>"
    );
  }

  function shelf(M) {
    var tones = ["var(--night)", "var(--lilac)", "var(--coral)", "var(--mint)", "var(--paper)", "var(--lilac-deep)", "var(--ivory)", "var(--coral-deep)", "var(--mint-deep)"];
    return (
      '<div class="obj obj--shelf" style="grid-area:shelf">' +
      '<p class="obj__tag hand">lo que he leído</p>' +
      '<div class="shelf"><div class="shelf__row" role="list">' +
      M.libros.map(function (b, i) {
        var t = tones[i % tones.length], dark = /night|deep/.test(t);
        return '<button type="button" role="listitem" class="spine' + (dark ? " spine--dark" : "") + '" style="--c:' + t + ";--h:" + (8.4 + ((i * 7) % 5) * 0.55) + "rem;--w:" + (1.75 + ((i * 3) % 4) * 0.22) + 'rem" data-b="' + i + '" aria-label="' + esc(b.titulo + ", de " + b.autor) + '"><span>' + esc(b.titulo) + "</span></button>";
      }).join("") +
      '<button type="button" class="spine spine--next" data-b="next" aria-label="' + esc("Próxima lectura: " + M.proximoLibro.titulo + ", de " + M.proximoLibro.autor) + '"><span>' + esc(M.proximoLibro.titulo) + '</span><i class="hand" aria-hidden="true">la siguiente</i></button>' +
      '</div><span class="shelf__board" aria-hidden="true"></span></div>' +
      '<div class="book" id="book" aria-live="polite"><p class="memo__hint">Saca un libro de la balda.</p></div>' +
      "</div>"
    );
  }

  function tv() {
    return (
      '<div class="obj obj--tv" style="grid-area:tv">' +
      '<p class="obj__tag hand">series y videojuegos</p>' +
      '<div class="tv"><div class="tv__screen" id="tvScreen" tabindex="0" role="region" aria-roledescription="pantalla" aria-label="Pantalla. Usa las flechas o el mando para cambiar de canal." aria-live="polite"></div></div>' +
      '<div class="remote" role="group" aria-label="Mando">' +
      '<button type="button" class="remote__b" data-tv="prev" aria-label="Canal anterior">CH −</button>' +
      '<button type="button" class="remote__b" data-tv="next" aria-label="Canal siguiente">CH +</button>' +
      '<button type="button" class="remote__mode" data-tv="mode" aria-pressed="false"><span>Series</span><span>Juegos</span></button>' +
      '<button type="button" class="remote__b remote__b--pw" data-tv="power" aria-label="Encender o apagar">⏻</button>' +
      "</div></div>"
    );
  }

  function trips(M) {
    return (
      '<div class="obj obj--trips" style="grid-area:trip">' +
      '<p class="obj__tag hand">viajes</p>' +
      '<div class="pile" id="pile">' +
      M.viajes.map(function (v, i) {
        return '<button type="button" class="pic" data-v="' + i + '" style="--x:' + Math.round(2 + i * 64 / Math.max(1, M.viajes.length - 1)) + "%;--y:" + (4 + (i % 3) * 13) + "%;--r:" + ((i % 2 ? 1 : -1) * (2 + (i % 4) * 2)) + 'deg" aria-label="' + esc(v.destino + ". Pulsa para ampliar; flechas para mover.") + '">' +
          '<img src="' + esc(v.foto) + '" alt="' + esc(v.alt || v.destino) + '" draggable="false" loading="lazy"><span class="hand">' + esc(v.destino) + "</span></button>";
      }).join("") +
      "</div>" +
      '<button type="button" class="mini-btn" id="shuffle">Barajar fotos</button>' +
      "</div>"
    );
  }

  function recipes(M) {
    return (
      '<div class="obj obj--recipe" style="grid-area:rec">' +
      '<p class="obj__tag hand">lo que suelo preparar</p>' +
      '<div class="rcard"><div class="rcard__list" role="tablist" aria-label="Postres">' +
      M.postres.map(function (p, i) {
        return '<button type="button" role="tab" class="rcard__it" aria-selected="' + (i === 0) + '" data-p="' + i + '">' + esc(p.nombre) + "</button>";
      }).join("") +
      '</div><svg class="rcard__draw" id="rDraw" viewBox="0 0 80 64" role="img" aria-label=""></svg></div>' +
      "</div>"
    );
  }

  window.renderMesa = function () {
    var M = window.MESA;
    if (!M) return "";
    return (
      '<div class="desk" id="desk">' +
      tickets(M) + shelf(M) + tv() + trips(M) + recipes(M) +
      "</div>"
    );
  };

  /* ---------- Interacciones ---------- */
  window.setupMesa = function (root) {
    var M = window.MESA, desk = root.querySelector("#desk");
    if (!M || !desk) return;
    var zoom = window.meyZoom || function () {};

    /* Música: entradas */
    var memo = desk.querySelector("#memo"), tks = desk.querySelectorAll(".tk");
    function openTicket(btn) {
      var c = M.conciertos[+btn.getAttribute("data-c")];
      tks.forEach(function (t) { t.setAttribute("aria-selected", String(t === btn)); });
      var media = (c.fotos || []).map(function (f) {
        return '<button type="button" class="memo__pic" data-zoom-src="' + esc(f) + '" data-zoom-alt="' + esc(c.artista) + '"><img src="' + esc(f) + '" alt="' + esc("Concierto de " + c.artista) + '" loading="lazy"></button>';
      }).join("") + (c.videos || []).map(function (v) {
        return '<video class="memo__vid" src="' + esc(v) + '" controls muted playsinline preload="metadata"></video>';
      }).join("");
      memo.innerHTML = '<p class="memo__t" style="--c:' + (c.color || "var(--night)") + '">' + esc(c.artista) + "</p>" +
        (media ? '<div class="memo__media">' + media + "</div>" : '<p class="memo__hint">Lo vi en directo.</p>');
    }
    tks.forEach(function (t) { t.addEventListener("click", function () { openTicket(t); }); });
    memo.addEventListener("click", function (e) {
      var z = e.target.closest("[data-zoom-src]");
      if (z) zoom(z.getAttribute("data-zoom-src"), z.getAttribute("data-zoom-alt"));
    });
    var firstWithPics = Array.prototype.filter.call(tks, function (t) { return (M.conciertos[+t.getAttribute("data-c")].fotos || []).length; })[0];
    if (firstWithPics) openTicket(firstWithPics);

    /* Lectura: balda */
    var bookBox = desk.querySelector("#book"), spines = desk.querySelectorAll(".spine");
    /* Portadas: se prueban las ediciones de Open Library una a una; si ninguna carga, búsqueda por título; si no, cubierta tipográfica. */
    var OLC = "https://covers.openlibrary.org/b/";
    function loadImg(urls, ok, ko) {
      if (!urls.length) return ko();
      var im = new Image();
      im.onload = function () { im.naturalWidth > 20 ? ok(urls[0]) : loadImg(urls.slice(1), ok, ko); };
      im.onerror = function () { loadImg(urls.slice(1), ok, ko); };
      im.src = urls[0];
    }
    function findCover(b, done) {
      if (b._src !== undefined) return done(b._src);
      var urls = (b.portada ? [b.portada] : []).concat((b.ol || []).map(function (id) { return OLC + "olid/" + id + "-M.jpg?default=false"; }));
      loadImg(urls, function (u) { b._src = u; done(u); }, function () {
        if (!window.fetch) { b._src = ""; return done(""); }
        fetch("https://openlibrary.org/search.json?limit=5&fields=cover_i&title=" + encodeURIComponent(b.buscar || b.titulo) + "&author=" + encodeURIComponent(b.autor))
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var c = (j.docs || []).filter(function (d) { return d.cover_i; }).map(function (d) { return OLC + "id/" + d.cover_i + "-M.jpg?default=false"; });
            loadImg(c, function (u) { b._src = u; done(u); }, function () { b._src = ""; done(""); });
          })
          .catch(function () { b._src = ""; done(""); });
      });
    }
    var bookTok = 0;
    function openBook(sp) {
      var k = sp.getAttribute("data-b"), b = k === "next" ? M.proximoLibro : M.libros[+k], tok = ++bookTok;
      spines.forEach(function (s) { s.classList.toggle("is-out", s === sp); s.setAttribute("aria-pressed", String(s === sp)); });
      bookBox.innerHTML =
        '<div class="book__type' + (sp.classList.contains("spine--dark") ? " book__type--dark" : "") + '" style="--c:' + (sp.style.getPropertyValue("--c") || "var(--ivory)") + '"><b>' + esc(b.titulo) + "</b><span>" + esc(b.autor) + "</span></div>" +
        '<div class="book__info"><p class="book__t">' + esc(b.titulo) + '</p><p class="book__a">' + esc(b.autor) + "</p>" +
        '<p class="book__s">' + (k === "next" ? "Mi próxima lectura" : "Leído") + "</p></div>";
      findCover(b, function (u) {
        if (!u || tok !== bookTok) return;
        var t = bookBox.querySelector(".book__type");
        if (t) t.outerHTML = '<img class="book__cover" src="' + esc(u) + '" alt="' + esc("Portada de " + b.titulo) + '">';
      });
    }
    spines.forEach(function (s) { s.addEventListener("click", function () { openBook(s); }); });
    /* Precarga de portadas en segundo plano, para que al tocar un lomo ya estén listas */
    M.libros.concat([M.proximoLibro]).forEach(function (b, i) { setTimeout(function () { findCover(b, function () {}); }, 150 * i); });

    /* Pantalla y mando */
    var scr = desk.querySelector("#tvScreen"), modeBtn = desk.querySelector('[data-tv="mode"]');
    var tvState = { mode: "series", i: 0, on: true };
    function list() { return tvState.mode === "series" ? M.series : M.juegos; }
    /* Imágenes de la pantalla: una sola consulta a Wikipedia (póster o portada); si falla, solo texto. */
    var tvImg = null;
    function loadTv() {
      if (tvImg || !window.fetch) return; tvImg = {};
      var all = M.series.concat(M.juegos);
      fetch("https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=480&pilicense=any&redirects=1&titles=" +
        encodeURIComponent(all.map(function (x) { return x.wiki; }).join("|")))
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var q = j.query || {}, map = {};
          (q.normalized || []).concat(q.redirects || []).forEach(function (n) { map[n.from] = n.to; });
          var src = {};
          (q.pages || []).forEach(function (pg) { if (pg.thumbnail) src[pg.title] = pg.thumbnail.source; });
          all.forEach(function (x) { var t = x.wiki; for (var g = 0; g < 3 && map[t]; g++) t = map[t]; if (src[t]) tvImg[x.wiki] = src[t]; });
          if (tvState.on) paint(true);
        })
        .catch(function () {});
    }
    function paint(quiet) {
      if (!tvState.on) { scr.innerHTML = '<p class="tv__off">Fuera de emisión.</p>'; scr.classList.add("is-off"); scr.classList.remove("has-img"); return; }
      scr.classList.remove("is-off");
      var L = list(), it = L[tvState.i], img = tvImg && tvImg[it.wiki];
      if (!quiet) { scr.classList.remove("is-zap"); void scr.offsetWidth; if (!reduce) scr.classList.add("is-zap"); }
      scr.classList.toggle("has-img", !!img);
      scr.innerHTML = (img ? '<img class="tv__img" src="' + esc(img) + '" alt="" onerror="this.parentNode.classList.remove(\'has-img\');this.remove()">' : "") +
        '<div class="tv__txt"><span class="tv__ch">CH ' + String(tvState.i + 1).padStart(2, "0") + " · " + (tvState.mode === "series" ? "Serie" : "Videojuego") + "</span>" +
        '<p class="tv__t">' + esc(it.t) + "</p>" +
        '<span class="tv__dots" aria-hidden="true">' + L.map(function (_, j) { return "<i" + (j === tvState.i ? ' class="on"' : "") + "></i>"; }).join("") + "</span></div>";
    }
    function zap(d) { if (!tvState.on) return; var L = list(); tvState.i = (tvState.i + d + L.length) % L.length; paint(); }
    desk.querySelectorAll("[data-tv]").forEach(function (b) {
      b.addEventListener("click", function () {
        var a = b.getAttribute("data-tv");
        if (a === "prev") zap(-1);
        else if (a === "next") zap(1);
        else if (a === "mode") { tvState.mode = tvState.mode === "series" ? "juegos" : "series"; tvState.i = 0; modeBtn.setAttribute("aria-pressed", String(tvState.mode === "juegos")); tvState.on = true; paint(); }
        else if (a === "power") { tvState.on = !tvState.on; paint(); }
      });
    });
    scr.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); zap(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); zap(-1); }
      else if (/^[1-9]$/.test(e.key) && +e.key <= list().length) { tvState.i = +e.key - 1; paint(); }
    });
    var sx = null;
    scr.addEventListener("pointerdown", function (e) { sx = e.clientX; });
    scr.addEventListener("pointerup", function (e) { if (sx == null) return; var dx = e.clientX - sx; if (Math.abs(dx) > 30) zap(dx < 0 ? 1 : -1); sx = null; });
    paint(); loadTv();

    /* Viajes: fotos arrastrables */
    var pile = desk.querySelector("#pile"), z = 10;
    pile.querySelectorAll(".pic").forEach(function (p) {
      var drag = null, moved = false;
      p.addEventListener("pointerdown", function (e) {
        var r = pile.getBoundingClientRect(), pr = p.getBoundingClientRect();
        drag = { dx: e.clientX - pr.left, dy: e.clientY - pr.top, w: r.width, h: r.height, l: r.left, t: r.top };
        moved = false; p.style.zIndex = ++z; p.setPointerCapture(e.pointerId); p.classList.add("is-drag");
      });
      p.addEventListener("pointermove", function (e) {
        if (!drag) return;
        var x = (e.clientX - drag.l - drag.dx) / drag.w * 100, y = (e.clientY - drag.t - drag.dy) / drag.h * 100;
        if (Math.abs(e.movementX) + Math.abs(e.movementY) > 0) moved = true;
        p.style.setProperty("--x", Math.max(-5, Math.min(75, x)) + "%"); p.style.setProperty("--y", Math.max(-5, Math.min(60, y)) + "%");
      });
      function end(e) {
        if (!drag) return; drag = null; p.classList.remove("is-drag");
      }
      p.addEventListener("pointerup", end); p.addEventListener("pointercancel", end);
      p.addEventListener("click", function (e) {
        if (moved) { e.preventDefault(); moved = false; return; }
        var img = p.querySelector("img"); zoom(img.getAttribute("src"), M.viajes[+p.getAttribute("data-v")].destino);
      });
      p.addEventListener("keydown", function (e) {
        var k = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, -4], ArrowDown: [0, 4] }[e.key];
        if (!k) return; e.preventDefault();
        var x = parseFloat(p.style.getPropertyValue("--x")) || 0, y = parseFloat(p.style.getPropertyValue("--y")) || 0;
        p.style.setProperty("--x", Math.max(-5, Math.min(75, x + k[0])) + "%"); p.style.setProperty("--y", Math.max(-5, Math.min(60, y + k[1])) + "%"); p.style.zIndex = ++z;
      });
    });
    desk.querySelector("#shuffle").addEventListener("click", function () {
      pile.querySelectorAll(".pic").forEach(function (p) {
        p.style.setProperty("--x", Math.round(Math.random() * 60) + "%"); p.style.setProperty("--y", Math.round(Math.random() * 40) + "%");
        p.style.setProperty("--r", Math.round(Math.random() * 14 - 7) + "deg"); p.style.zIndex = ++z;
      });
    });

    /* Recetario */
    var rd = desk.querySelector("#rDraw"), rits = desk.querySelectorAll(".rcard__it");
    function pickRec(i) {
      rits.forEach(function (b, j) { b.setAttribute("aria-selected", String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      rd.innerHTML = DRAW[M.postres[i].dibujo] || "";
      rd.setAttribute("aria-label", "Dibujo: " + M.postres[i].nombre);
      rd.classList.remove("is-draw"); void rd.offsetWidth; if (!reduce) rd.classList.add("is-draw");
    }
    rits.forEach(function (b, i) {
      b.addEventListener("click", function () { pickRec(i); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0; if (!d) return;
        e.preventDefault(); var n = (i + d + rits.length) % rits.length; pickRec(n); rits[n].focus();
      });
    });
    pickRec(0);

  };
})();
