# Universidad Autónoma Cueto · Landing page

Sitio estático desplegado en **Netlify**, con una función serverless para enviar los correos del formulario de soporte.

## Estructura
- Las secciones del menú (inspiradas en la web de UCV) están en `js/paginas.js` (contenido) y `js/vistas.js` (menú y renderizado).
- Cada página se abre con un enlace tipo `#/pregrado`, `#/test`, `#/reclamos`, etc.
- Todo el contenido de las páginas es ficticio, para presentación.
- `index.html`, `css/`, `js/` : la página.
- `mallas/` : PDF de la malla curricular de cada carrera.
- `netlify/functions/contacto.js` : función que envía los correos (ruta `/api/contacto`).
- `netlify.toml` : configuración de publicación y redirección de la función.
- `package.json` : dependencias de la función (nodemailer).

## Despliegue en Netlify
1. Sube esta carpeta a un repositorio de GitHub (o usa "Deploy manually" arrastrando la carpeta).
2. En Netlify: **Add new site → Import an existing project** y selecciona el repositorio.
   No hace falta comando de build; Netlify usa `netlify.toml`.
3. En **Site configuration → Environment variables** agrega:

| Variable | Ejemplo |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `tu-correo@gmail.com` |
| `SMTP_PASS` | contraseña de aplicación (no tu contraseña normal) |
| `MAIL_FROM` | `Universidad Autónoma Cueto <tu-correo@gmail.com>` |
| `ADMISIONES_EMAIL` | `admisiones@tu-dominio.edu.pe` |

4. Vuelve a desplegar el sitio (**Deploys → Trigger deploy**) para que tome las variables.

Proveedores SMTP alternativos: Brevo, SendGrid, Mailgun o Amazon SES. Solo cambia `SMTP_HOST`, `SMTP_PORT` y las credenciales.

## Qué hace el formulario
- Envía un correo de confirmación genérico al correo que la persona ingresó.
- Envía una copia de la consulta a `ADMISIONES_EMAIL`, con el correo del postulante como destinatario de respuesta.

## Imágenes
Las fotos son de Pexels (licencia gratuita de Pexels, sin atribución obligatoria). Revisa las condiciones en https://www.pexels.com/es-es/license/ antes de publicar.
