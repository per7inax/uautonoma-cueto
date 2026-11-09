"use strict";

const nodemailer = require("nodemailer");

const CARRERAS_VALIDAS = [
  "Ingeniería de Inteligencia Artificial y Ciencia de Datos",
  "Ingeniería de Ciberseguridad y Redes",
  "Negocios Digitales e Innovación",
  "Psicología y Bienestar Mental"
];

const JSON_HEADERS = { "Content-Type": "application/json" };

const respond = (statusCode, body) => ({
  statusCode,
  headers: JSON_HEADERS,
  body: JSON.stringify(body)
});

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidEmail = (email) =>
  typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const validar = (body) => {
  const data = {
    nombre: String(body.nombre || "").trim(),
    email: String(body.email || "").trim(),
    carrera: String(body.carrera || "").trim(),
    mensaje: String(body.mensaje || "").trim()
  };
  if (!data.nombre || data.nombre.length > 120) return { error: "Revisa tu nombre." };
  if (!isValidEmail(data.email)) return { error: "Revisa tu correo electrónico." };
  if (!CARRERAS_VALIDAS.includes(data.carrera)) return { error: "Selecciona una carrera válida." };
  if (data.mensaje.length > 2000) return { error: "El mensaje es demasiado largo." };
  return { data };
};

const crearTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: String(process.env.SMTP_SECURE || "true") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return respond(405, { ok: false, error: "Método no permitido." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (_) {
    return respond(400, { ok: false, error: "Solicitud no válida." });
  }

  const { data, error } = validar(body || {});
  if (error) return respond(400, { ok: false, error });

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("SMTP no configurado: revisa las variables de entorno en Netlify");
    return respond(503, {
      ok: false,
      error: "El servicio de correo no está disponible en este momento. Escríbenos por WhatsApp."
    });
  }

  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const transporter = crearTransporter();

  const confirmacion = {
    from,
    to: data.email,
    subject: "Hemos recibido tu consulta · Universidad Autónoma Cueto",
    text:
      `Hola ${data.nombre},\n\n` +
      "Gracias por escribirnos. Recibimos tu consulta y nuestro equipo de admisiones te responderá a la brevedad.\n\n" +
      "Si tienes una urgencia, puedes escribirnos por WhatsApp al +51 910 528 126.\n\n" +
      "Universidad Autónoma Cueto\nSede Comas · Lima, Perú",
    html:
      `<p>Hola ${escapeHtml(data.nombre)},</p>` +
      "<p>Gracias por escribirnos. Recibimos tu consulta y nuestro equipo de admisiones te responderá a la brevedad.</p>" +
      "<p>Si tienes una urgencia, puedes escribirnos por WhatsApp al <strong>+51 910 528 126</strong>.</p>" +
      "<p>Universidad Autónoma Cueto<br>Sede Comas · Lima, Perú</p>"
  };

  const aAdmisiones = {
    from,
    to: process.env.ADMISIONES_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `Nueva consulta de ${data.nombre} · ${data.carrera}`,
    text:
      `Nombre: ${data.nombre}\nCorreo: ${data.email}\nCarrera de interés: ${data.carrera}\n\n` +
      `Mensaje:\n${data.mensaje || "(sin mensaje)"}`,
    html:
      `<p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>` +
      `<p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>` +
      `<p><strong>Carrera de interés:</strong> ${escapeHtml(data.carrera)}</p>` +
      `<p><strong>Mensaje:</strong><br>${escapeHtml(data.mensaje || "(sin mensaje)").replace(/\n/g, "<br>")}</p>`
  };

  try {
    await Promise.all([transporter.sendMail(confirmacion), transporter.sendMail(aAdmisiones)]);
    return respond(200, { ok: true });
  } catch (err) {
    console.error("Error al enviar correo:", err.message);
    return respond(502, {
      ok: false,
      error: "No pudimos enviar tu consulta. Intenta más tarde o escríbenos por WhatsApp."
    });
  }
};
