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


  /* ---------- Fotos por página (Pexels, licencia gratuita) ---------- */
  const FOTOS = {
    pregrado: "4778621", posgrado: "6550111", sube: "7973036", segunda: "3688761",
    cuetomas: "15141493", continua: "1666471", alfa: "37812749", titulacion: "7973103",
    nosotros: "7972974", campus: "7972494", internacional: "7973026", centros: "17489163",
    vicerrectorados: "240223", logros: "7972710",
    vibra: "7973200", empleabilidad: "3688761", movilidad: "7973205", doble: "4778636",
    test: "4778402", salud: "7973027", congreso: "7972533",
    politicas: "1061130", comunicados: "7972546", acreditacion: "3471028", convenios: "3688761",
    datos: "6550111", emprendimiento: "1666471", trabaja: "240223",
    plataformas: "1666471", biblioteca: "1061130", portal: "3471028", defensoria: "7972543",
    compliance: "240223", etica: "7973024", seguridad: "7972503", mesa: "7973024",
    certificados: "7972488", reclamos: "7973027", noticias: "7973200", transparencia: "15141493",
    terminos: "1061130", privacidad: "6550111",
    pagos: "3688761", "pago-exitoso": "7973103", "pago-cancelado": "240223"
  };
  const fotoURL = (id, ancho) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${ancho || 1400}`;


  /* ---------- Secciones del menú: foto e introducción ---------- */
  const SECCIONES = {
    "Carreras y programas": { foto: "4778627", intro: "Carreras profesionales, posgrado, programas para trabajadores, actualización y preparación para el ingreso." },
    "Sobre Cueto": { foto: "7972976", intro: "Conoce nuestra historia, el campus de Comas, nuestros centros y la organización de la universidad." },
    "Vida universitaria": { foto: "7972489", intro: "Actividades, bienestar, empleabilidad y experiencias que acompañan tu paso por Cueto." },
    "Institucional": { foto: "4778401", intro: "Políticas, normas, convenios y comunicados oficiales de la universidad." },
    "Plataformas y recursos": { foto: "36460462", intro: "Herramientas digitales, biblioteca, servicios al estudiante y canales de atención." },
    "Noticias y eventos": { foto: "7972495", intro: "Lo más reciente de la comunidad Cueto y la agenda de eventos." },
    "Transparencia": { foto: "14493661", intro: "Información pública sobre la gestión de la universidad." }
  };
  const slugOf = (t) =>
    t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");

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
      const todo = el("a", "nav-ver-todo", "Ver toda la sección →");
      todo.href = "#/grupo/" + slugOf(grupo.nombre);
      dd.appendChild(todo);
      grupo.paginas.forEach((id) => {
        if (!PAG[id]) return;
        const a = el("a", "", `<img class="nav-thumb" src="${esc(fotoURL(FOTOS[id] || "240223", 160))}" alt="" loading="lazy"><span>${esc(PAG[id].titulo)}</span>`);
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

    pago: () =>
      `<div class="block pago-block"><div class="pago-grid">` +
      `<div class="pago-info"><h2>Conceptos de pago</h2>` +
      `<ul class="page-list"><li>Matrícula 2027 · S/ 350.00 (periodo 2027-I o 2027-II)</li>` +
      `<li>Mensualidad · S/ 420.00 (indica el mes, por ejemplo 2027-03)</li></ul>` +
      `<p class="page-text">Los montos son referenciales y de este proyecto de presentación. El pago se procesa en una pantalla segura del procesador de tarjetas; Cueto no guarda los datos de tu tarjeta.</p>` +
      `</div>` +
      `<form class="contact-form pago-form" novalidate>` +
      `<div class="form-group"><label for="pago-concepto">Concepto</label>` +
      `<select id="pago-concepto" name="concepto" required><option value="">Selecciona una opción</option>` +
      `<option value="matricula">Matrícula</option><option value="mensualidad">Mensualidad</option></select></div>` +
      `<div class="form-group"><label for="pago-periodo">Periodo</label>` +
      `<input id="pago-periodo" name="periodo" type="text" placeholder="Ej. 2027-03" required></div>` +
      `<div class="form-group"><label for="pago-codigo">Código de estudiante</label>` +
      `<input id="pago-codigo" name="codigo" type="text" inputmode="numeric" placeholder="Solo números" required></div>` +
      `<div class="form-group"><label for="pago-nombre">Nombre completo</label>` +
      `<input id="pago-nombre" name="nombre" type="text" autocomplete="name" required></div>` +
      `<div class="form-group"><label for="pago-email">Correo electrónico</label>` +
      `<input id="pago-email" name="email" type="email" autocomplete="email" required></div>` +
      `<button type="submit" class="btn btn-primary btn-block">Pagar con tarjeta</button>` +
      `<p class="form-feedback" role="status" aria-live="polite"></p>` +
      `</form></div></div>`,
    cta: (b, foto) =>
      `<div class="block cta-box${foto ? " with-img" : ""}"${foto ? ` style="--cta-img:url('${esc(foto)}')"` : ""}>` +
      `<p>${esc(b.texto)}</p><a href="${esc(b.enlace)}" class="btn btn-primary">${esc(b.etiqueta)}</a></div>`,

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

  /* ---------- Formulario de pagos ---------- */
  const activarPagos = (root) => {
    const form = root.querySelector(".pago-form");
    if (!form) return;
    const feedback = form.querySelector(".form-feedback");
    const concepto = form.querySelector('[name="concepto"]');
    const periodo = form.querySelector('[name="periodo"]');

    concepto.addEventListener("change", () => {
      periodo.placeholder = concepto.value === "matricula" ? "Ej. 2027-I" : "Ej. 2027-03";
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const boton = form.querySelector('button[type="submit"]');
      const datos = {};
      new FormData(form).forEach((v, k) => (datos[k] = String(v).trim()));

      boton.disabled = true;
      feedback.className = "form-feedback sending";
      feedback.textContent = "Preparando el pago seguro...";

      try {
        const res = await fetch("/api/pagos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo iniciar el pago.");
        window.location.href = data.url;
      } catch (err) {
        feedback.className = "form-feedback error";
        feedback.textContent = err.message;
        boton.disabled = false;
      }
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

    const foto = fotoURL(FOTOS[id] || "240223");

    return (
      `<header class="page-hero"><div class="container page-hero-grid">` +
      `<div class="page-hero-text">` +
      `<nav class="breadcrumb" aria-label="Ruta de navegación">${migas}</nav>` +
      `<span class="eyebrow">${esc(grupo ? grupo.nombre : "Universidad Autónoma Cueto")}</span>` +
      `<h1>${esc(p.titulo)}</h1>` +
      (p.intro ? `<p class="page-intro">${esc(p.intro)}</p>` : "") +
      `</div>` +
      `<figure class="page-hero-media"><img src="${esc(foto)}" alt="${esc(p.titulo)}" loading="eager"></figure>` +
      `</div></header>` +
      `<div class="container page-blocks">` +
      (p.bloques || []).map((b) => bloques[b.tipo](b, foto)).join("") +
      `<div class="page-back"><a href="#inicio" class="btn btn-outline-dark">← Volver al inicio</a></div>` +
      `</div>`
    );
  };


  const seccionHTML = (g) => {
    const info = SECCIONES[g.nombre] || { foto: "240223", intro: "" };
    const paginas = g.paginas.filter((id) => PAG[id]);
    return (
      `<header class="page-hero"><div class="container page-hero-grid">` +
      `<div class="page-hero-text">` +
      `<nav class="breadcrumb" aria-label="Ruta de navegación"><a href="#inicio">Inicio</a> / <span>${esc(g.nombre)}</span></nav>` +
      `<span class="eyebrow">Sección</span>` +
      `<h1>${esc(g.nombre)}</h1>` +
      `<p class="page-intro">${esc(info.intro)}</p>` +
      `</div>` +
      `<figure class="page-hero-media"><img src="${esc(fotoURL(info.foto))}" alt="${esc(g.nombre)}" loading="eager"></figure>` +
      `</div></header>` +
      `<div class="container page-blocks">` +
      `<div class="block"><h2>Páginas de esta sección</h2><div class="grupo-grid">` +
      paginas
        .map((id) => {
          const p = PAG[id];
          return (
            `<a class="grupo-card" href="#/${esc(id)}">` +
            `<img src="${esc(fotoURL(FOTOS[id] || "240223", 800))}" alt="" loading="lazy">` +
            `<div class="grupo-card-body"><h3>${esc(p.titulo)}</h3><span>${esc(p.intro || "")}</span></div></a>`
          );
        })
        .join("") +
      `</div></div>` +
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

    if (h.indexOf("#/grupo/") === 0) {
      const slug = decodeURIComponent(h.slice(8));
      const g = GRU.find((x) => slugOf(x.nombre) === slug);
      inicio.hidden = true;
      vista.hidden = false;
      vista.innerHTML = g ? seccionHTML(g) : noEncontrada;
      document.title = (g ? g.nombre : "No encontrada") + " | Universidad Autónoma Cueto";
      window.scrollTo(0, 0);
      return;
    }

    if (h.indexOf("#/") === 0) {
      const id = decodeURIComponent(h.slice(2));
      const p = PAG[id];
      inicio.hidden = true;
      vista.hidden = false;
      vista.innerHTML = p ? paginaHTML(id, p) : noEncontrada;
      activarTest(vista);
      activarPagos(vista);
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
