(function () {
  "use strict";

  /* ---------- AOS (animaciones de scroll) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }

  /* ---------- Navbar: sombra al hacer scroll ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("open"));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- Formulario de contacto ---------- */
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre;
    const email = form.email;
    const carrera = form.carrera;
    let valid = true;

    [nombre, email, carrera].forEach((field) => field.classList.remove("error"));
    feedback.textContent = "";
    feedback.className = "form-feedback";

    if (!nombre.value.trim()) {
      nombre.classList.add("error");
      valid = false;
    }
    if (!isValidEmail(email.value.trim())) {
      email.classList.add("error");
      valid = false;
    }
    if (!carrera.value) {
      carrera.classList.add("error");
      valid = false;
    }

    if (!valid) {
      feedback.textContent = "Revisa los campos marcados e inténtalo nuevamente.";
      feedback.classList.add("error");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const payload = {
      nombre: nombre.value.trim(),
      email: email.value.trim(),
      carrera: carrera.value,
      mensaje: form.mensaje.value.trim()
    };

    submitBtn.disabled = true;
    feedback.textContent = "Enviando tu consulta...";
    feedback.classList.add("sending");

    fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo enviar");
        feedback.className = "form-feedback success";
        feedback.textContent = "¡Listo! Te enviamos un correo de confirmación a " + payload.email + ".";
        form.reset();
      })
      .catch((err) => {
        feedback.className = "form-feedback error";
        feedback.textContent = err.message || "No pudimos enviar tu consulta. Intenta más tarde.";
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });

  /* ---------- Limpiar error al escribir ---------- */
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("error"));
    field.addEventListener("change", () => field.classList.remove("error"));
  });

  /* ---------- Año dinámico en el footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Detalle de carreras y malla descargable ---------- */
  const modal = document.getElementById("career-modal");
  const careers = window.CARRERAS || {};
  let lastFocused = null;

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const fillList = (listId, items) => {
    const list = document.getElementById(listId);
    list.innerHTML = "";
    items.forEach((item) => list.appendChild(el("li", "", item)));
  };

  const renderMalla = (malla) => {
    const wrap = document.getElementById("modal-malla");
    wrap.innerHTML = "";
    malla.forEach((ciclo) => {
      const block = el("div", "malla-ciclo");
      block.appendChild(el("h4", "", ciclo.ciclo));
      const ul = el("ul", "malla-cursos");
      ciclo.cursos.forEach((curso) => {
        const li = el("li");
        li.appendChild(el("span", "", curso.nombre));
        li.appendChild(el("span", "malla-creditos", curso.creditos + " cr."));
        ul.appendChild(li);
      });
      block.appendChild(ul);
      wrap.appendChild(block);
    });
  };

  const openCareer = (slug, trigger) => {
    const c = careers[slug];
    if (!c) return;

    document.getElementById("modal-duracion").textContent = c.duracion;
    document.getElementById("modal-title").textContent = c.nombre;
    document.getElementById("modal-perfil").textContent = c.perfil;
    fillList("modal-competencias", c.competencias);
    fillList("modal-campo", c.campo);
    renderMalla(c.malla);

    const img = document.getElementById("modal-img");
    const fallback = document.querySelector(".career-modal-hero-fallback");
    if (c.imagen) {
      img.src = c.imagen;
      img.alt = c.imagenAlt || c.nombre;
      img.hidden = false;
      fallback.hidden = true;
    } else {
      img.hidden = true;
      img.removeAttribute("src");
      fallback.hidden = false;
    }
    document.getElementById("modal-icon").setAttribute("d", c.icono);

    const dl = document.getElementById("modal-descargar");
    dl.href = "mallas/malla-" + slug + ".pdf";
    dl.setAttribute("download", "Malla-" + slug + ".pdf");

    lastFocused = trigger || document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".career-modal-close").focus();
  };

  const closeCareer = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-career]");
    if (trigger) openCareer(trigger.getAttribute("data-career"), trigger);
  });

  document.addEventListener("keydown", (e) => {
    const card = e.target.closest ? e.target.closest("[data-career]") : null;
    if (card && card.tagName !== "BUTTON" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openCareer(card.getAttribute("data-career"), card);
    }
  });

  modal.querySelectorAll("[data-close]").forEach((node) => {
    node.addEventListener("click", closeCareer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeCareer();
  });
})();
