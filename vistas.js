(function () {
  "use strict";

  const PAG = window.PAGINAS || {};
  const GRU = window.GRUPOS || [];
  const CAR = window.CARRERAS || {};
  const TITULO_BASE = document.title;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const el = (tag, cls, html) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  };

  /* ---------- Menú desplegable construido desde GRUPOS ---------- */
  const menu = document.getElementById("nav-menu");
  const chevron =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  const cerrarMenus = () => {
    if (!menu) return;
    menu.querySelectorAll(".nav-item.open").forEach((item) => {
      item.classList.remove("open");
      item.querySelector(".nav-trigger").setAttribute("aria-expanded", "false");
    });
  };

  if (menu) {
    GRU.forEach((grupo) => {
      if (grupo.directo) {
        const a = el("a", "nav-link", esc(grupo.nombre));
        a.href = "#/" + grupo.directo;
        menu.appendChild(a);
        return;
      }

      const item = el("div", "nav-item");
      const btn = el("button", "nav-trigger", esc(grupo.nombre) + chevron);
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");

      const dd = el("div", "nav-dropdown");
      grupo.paginas.forEach((id) => {
        if (!PAG[id]) return;
        const a = el("a", "", esc(PAG[id].titulo));
        a.href = "#/" + id;
        dd.appendChild(a);
      });

      item.append(btn, dd);
      menu.appendChild(item);

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const abrir = !item.classList.contains("open");
        cerrarMenus();
        item.classList.toggle("open", abrir);
        btn.setAttribute("aria-expanded", String(abrir));
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item")) cerrarMenus();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarMenus();
    });
  }

  /* ---------- Renderizado de bloques ---------- */
  const cabecera = (b) => (b.titulo ? `<h2>${esc(b.titulo)}</h2>` : "");

  const bloques = {
    facultades: (b) =>
      `<div class="block">${cabecera(b)}<div class="fac-grid">` +
      b.grupos
        .map(
          (g) =>
            `<div class="fac-card"><h3>${esc(g.nombre)}</h3><div class="chips">` +
            g.carreras
              .map((c) =>
                c.slug
                  ? `<button type="button" class="chip chip-link" data-career="${esc(c.slug)}">${esc(c.t)}</button>`
                  : `<span class="chip">${esc(c.t)}</span>`
              )
              .join("") +
            `</div></div>`
        )
        .join("") +
      `</div></div>`,

    tarjetas: (b) =>
      `<div class="block">${cabecera(b)}<div class="page-cards">` +
      b.items.map((i) => `<article class="card"><h3>${esc(i.t)}</h3><p>${esc(i.d || "")}</p></article>`).join("") +
      `</div></div>`,

    lista: (b) =>
      `<div class="block">${cabecera(b)}<ul class="page-list">` +
      b.items.map((i) => `<li>${esc(i)}</li>`).join("") +
      `</ul></div>`,

    texto: (b) =>
      `<div class="block">${cabecera(b)}` + b.parrafos.map((p) => `<p class="page-text">${esc(p)}</p>`).join("") + `</div>`,

    faq: (b) =>
      `<div class="block">${cabecera(b)}` +
      b.items
        .map((i) => `<details class="faq-item"><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>`)
        .join("") +
      `</div>`,

    stats: (b) =>
      `<div class="block"><div class="stats-grid">` +
      b.items.map((i) => `<div class="stat"><strong>${esc(i.v)}</strong><span>${esc(i.l)}</span></div>`).join("") +
      `</div></div>`,

    cta: (b) =>
      `<div class="block cta-box"><p>${esc(b.texto)}</p><a href="${esc(b.enlace)}" class="btn btn-primary">${esc(b.etiqueta)}</a></div>`,

    test: (b) =>
      `<div class="block test-block">` +
      b.preguntas
        .map(
          (p, idx) =>
            `<div class="test-q" data-idx="${idx}"><h3>${idx + 1}. ${esc(p.q)}</h3><div class="test-opciones">` +
            p.opciones
              .map((o) => `<button type="button" class="test-opt" data-slug="${esc(o.slug)}">${esc(o.t)}</button>`)
              .join("") +
            `</div></div>`
        )
        .join("") +
      `<div class="test-result" hidden></div></div>`
  };

  /* ---------- Test vocacional ---------- */
  const mostrarResultado = (bloque, respuestas) => {
    const conteo = {};
    respuestas.forEach((s) => (conteo[s] = (conteo[s] || 0) + 1));
    const slug = Object.keys(conteo).sort((a, b) => conteo[b] - conteo[a])[0];
    const nombre = CAR[slug] ? CAR[slug].nombre : "";
    const r = bloque.querySelector(".test-result");
    r.hidden = false;
    r.innerHTML =
      `<p>Tu perfil se acerca más a:</p><h3>${esc(nombre)}</h3>` +
      `<button type="button" class="btn btn-primary" data-career="${esc(slug)}">Ver detalle y malla</button>`;
    r.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const activarTest = (root) => {
    root.querySelectorAll(".test-block").forEach((bloque) => {
      const total = bloque.querySelectorAll(".test-q").length;
      const respuestas = [];
      bloque.querySelectorAll(".test-opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          const q = btn.closest(".test-q");
          const idx = Number(q.dataset.idx);
          respuestas[idx] = btn.dataset.slug;
          q.querySelectorAll(".test-opt").forEach((o) => o.classList.toggle("selected", o === btn));
          if (respuestas.filter(Boolean).length === total) mostrarResultado(bloque, respuestas);
        });
      });
    });
  };

  /* ---------- Vistas ---------- */
  const inicio = document.getElementById("vista-inicio");
  const vista = document.getElementById("vista-pagina");

  const paginaHTML = (id, p) => {
    const grupo = GRU.find((g) => g.paginas.includes(id));
    const migas =
      `<a href="#inicio">Inicio</a> / ` +
      (grupo ? `<span>${esc(grupo.nombre)}</span> / ` : "") +
      `<span>${esc(p.titulo)}</span>`;

    return (
      `<header class="page-hero"><div class="container">` +
      `<nav class="breadcrumb" aria-label="Ruta de navegación">${migas}</nav>` +
      `<span class="eyebrow">${esc(grupo ? grupo.nombre : "Universidad Autónoma Cueto")}</span>` +
      `<h1>${esc(p.titulo)}</h1>` +
      (p.intro ? `<p class="page-intro">${esc(p.intro)}</p>` : "") +
      `</div></header>` +
      `<div class="container page-blocks">` +
      (p.bloques || []).map((b) => bloques[b.tipo](b)).join("") +
      `<div class="page-back"><a href="#inicio" class="btn btn-outline-dark">← Volver al inicio</a></div>` +
      `</div>`
    );
  };

  const noEncontrada =
    `<header class="page-hero"><div class="container"><h1>Página no encontrada</h1>` +
    `<p class="page-intro">La sección que buscas no existe o cambió de lugar.</p></div></header>` +
    `<div class="container page-blocks"><a href="#inicio" class="btn btn-primary">Volver al inicio</a></div>`;

  const mostrarInicio = () => {
    inicio.hidden = false;
    vista.hidden = true;
    vista.innerHTML = "";
    document.title = TITULO_BASE;
  };

  const render = () => {
    cerrarMenus();
    const h = location.hash;

    if (h.indexOf("#/") === 0) {
      const id = decodeURIComponent(h.slice(2));
      const p = PAG[id];
      inicio.hidden = true;
      vista.hidden = false;
      vista.innerHTML = p ? paginaHTML(id, p) : noEncontrada;
      activarTest(vista);
      document.title = (p ? p.titulo : "No encontrada") + " | Universidad Autónoma Cueto";
      window.scrollTo(0, 0);
      return;
    }

    mostrarInicio();
    let destino = null;
    if (h.length > 1) {
      try {
        destino = document.querySelector(h);
      } catch (_) {
        destino = null;
      }
    }
    if (destino) destino.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  };

  window.addEventListener("hashchange", render);
  render();
})();
