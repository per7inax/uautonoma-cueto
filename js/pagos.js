"use strict";

/* Crea una sesión de pago en Stripe Checkout.
   Los montos se definen aquí, en el servidor: el navegador no puede cambiarlos.
   Variable requerida en Netlify: STRIPE_SECRET_KEY (sk_test_... para pruebas). */

const PRECIOS = {
  matricula: { nombre: "Matrícula", monto: 35000, periodo: /^\d{4}-(I|II)$/, ejemplo: "2027-I" },
  mensualidad: { nombre: "Mensualidad", monto: 42000, periodo: /^\d{4}-(0[1-9]|1[0-2])$/, ejemplo: "2027-03" }
};

const JSON_HEADERS = { "Content-Type": "application/json" };
const respond = (statusCode, body) => ({ statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) });
const isEmail = (e) => typeof e === "string" && e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

const validar = (b) => {
  const concepto = String(b.concepto || "");
  const cfg = PRECIOS[concepto];
  if (!cfg) return { error: "Selecciona un concepto válido." };

  const periodo = String(b.periodo || "").trim();
  if (!cfg.periodo.test(periodo)) return { error: `Periodo no válido. Ejemplo: ${cfg.ejemplo}.` };

  const codigo = String(b.codigo || "").trim();
  if (!/^\d{6,10}$/.test(codigo)) return { error: "El código de estudiante debe tener entre 6 y 10 dígitos." };

  const nombre = String(b.nombre || "").trim();
  if (nombre.length < 3 || nombre.length > 120) return { error: "Revisa tu nombre." };

  const email = String(b.email || "").trim();
  if (!isEmail(email)) return { error: "Revisa tu correo electrónico." };

  return { data: { concepto, cfg, periodo, codigo, nombre, email } };
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return respond(405, { ok: false, error: "Método no permitido." });

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (_) {
    return respond(400, { ok: false, error: "Solicitud no válida." });
  }

  const { data, error } = validar(body || {});
  if (error) return respond(400, { ok: false, error });

  const clave = process.env.STRIPE_SECRET_KEY;
  if (!clave) {
    console.error("STRIPE_SECRET_KEY no configurada en Netlify");
    return respond(503, { ok: false, error: "Los pagos en línea no están disponibles en este momento." });
  }

  const base = process.env.URL || `https://${(event.headers && event.headers.host) || "localhost"}`;
  const descripcion = `${data.cfg.nombre} · ${data.periodo}`;

  const params = new URLSearchParams();
  params.append("mode", "payment");
  params.append("payment_method_types[0]", "card");
  params.append("line_items[0][quantity]", "1");
  params.append("line_items[0][price_data][currency]", "pen");
  params.append("line_items[0][price_data][unit_amount]", String(data.cfg.monto));
  params.append("line_items[0][price_data][product_data][name]", `Universidad Autónoma Cueto · ${descripcion}`);
  params.append("customer_email", data.email);
  params.append("success_url", `${base}/#/pago-exitoso`);
  params.append("cancel_url", `${base}/#/pago-cancelado`);
  params.append("metadata[concepto]", data.concepto);
  params.append("metadata[periodo]", data.periodo);
  params.append("metadata[codigo_estudiante]", data.codigo);
  params.append("metadata[nombre]", data.nombre);

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });
    const session = await res.json().catch(() => ({}));
    if (!res.ok || !session.url) {
      console.error("Stripe rechazó la sesión:", res.status, session.error && session.error.message);
      return respond(502, { ok: false, error: "No pudimos iniciar el pago. Intenta más tarde." });
    }
    return respond(200, { ok: true, url: session.url });
  } catch (err) {
    console.error("Error de red con Stripe:", err.message);
    return respond(502, { ok: false, error: "No pudimos iniciar el pago. Intenta más tarde." });
  }
};
