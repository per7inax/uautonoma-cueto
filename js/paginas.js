/* Contenido ficticio de la Universidad Autónoma Cueto.
   Estructura de menús inspirada en la web de UCV (ucv.edu.pe), con datos inventados
   para este proyecto de presentación. */

window.GRUPOS = [
  {
    nombre: "Carreras y programas",
    paginas: ["pregrado", "posgrado", "sube", "segunda", "cuetomas", "continua", "alfa", "titulacion"]
  },
  {
    nombre: "Sobre Cueto",
    paginas: ["nosotros", "campus", "internacional", "centros", "vicerrectorados", "logros"]
  },
  {
    nombre: "Vida universitaria",
    paginas: ["vibra", "empleabilidad", "movilidad", "doble", "test", "salud", "congreso"]
  },
  {
    nombre: "Institucional",
    paginas: ["politicas", "comunicados", "acreditacion", "convenios", "datos", "emprendimiento", "trabaja"]
  },
  {
    nombre: "Plataformas y recursos",
    paginas: ["plataformas", "biblioteca", "portal", "defensoria", "compliance", "etica", "seguridad", "mesa", "certificados", "reclamos"]
  },
  { nombre: "Noticias y eventos", directo: "noticias", paginas: ["noticias"] },
  { nombre: "Transparencia", directo: "transparencia", paginas: ["transparencia"] }
];

window.PAGINAS = {

  /* ================= CARRERAS Y PROGRAMAS ================= */

  pregrado: {
    titulo: "Pregrado presencial",
    intro: "Carreras profesionales en nuestra sede de Comas, con laboratorios, prácticas y docentes con experiencia en la industria.",
    bloques: [
      { tipo: "facultades", titulo: "Carreras por facultad", grupos: [
        { nombre: "Ciencias Empresariales", carreras: [
          { t: "Administración y Marketing" }, { t: "Contabilidad" }, { t: "Economía y Finanzas" },
          { t: "Negocios Digitales e Innovación", slug: "negocios-digitales" } ] },
        { nombre: "Ingeniería y Tecnología", carreras: [
          { t: "Ingeniería de Inteligencia Artificial y Ciencia de Datos", slug: "ia-ciencia-datos" },
          { t: "Ingeniería de Ciberseguridad y Redes", slug: "ciberseguridad-redes" },
          { t: "Ingeniería Industrial" }, { t: "Ingeniería de Sistemas" } ] },
        { nombre: "Ciencias de la Salud", carreras: [
          { t: "Psicología y Bienestar Mental", slug: "psicologia-bienestar" }, { t: "Enfermería" }, { t: "Nutrición" } ] },
        { nombre: "Humanidades y Comunicación", carreras: [
          { t: "Ciencias de la Comunicación" }, { t: "Educación Inicial" }, { t: "Traducción e Interpretación" } ] },
        { nombre: "Derecho", carreras: [ { t: "Derecho" } ] }
      ] },
      { tipo: "cta", texto: "Revisa los requisitos y postula al proceso de Admisión 2027.", enlace: "#admision", etiqueta: "Ver requisitos" }
    ]
  },

  posgrado: {
    titulo: "Posgrado",
    intro: "Maestrías y doctorados en modalidad semipresencial y a distancia, pensados para profesionales en ejercicio.",
    bloques: [
      { tipo: "facultades", titulo: "Programas por facultad", grupos: [
        { nombre: "Derecho y Ciencias Políticas", carreras: [ { t: "Doctorado en Derecho" }, { t: "Maestría en Derecho Penal" } ] },
        { nombre: "Educación", carreras: [ { t: "Maestría en Educación" }, { t: "Maestría en Docencia Universitaria" }, { t: "Maestría en Neuroeducación" } ] },
        { nombre: "Ingeniería y Tecnología", carreras: [ { t: "Maestría en Inteligencia Artificial" }, { t: "Maestría en Ingeniería de Sistemas" } ] },
        { nombre: "Ciencias de la Salud", carreras: [ { t: "Doctorado en Psicología" }, { t: "Maestría en Salud Pública" }, { t: "Maestría en Psicología Clínica" } ] },
        { nombre: "Ciencias Empresariales", carreras: [ { t: "MBA · Administración de Negocios" }, { t: "Maestría en Marketing Digital" }, { t: "Doctorado en Administración" } ] }
      ] },
      { tipo: "cta", texto: "Solicita información sobre becas y fechas de inicio.", enlace: "#contacto", etiqueta: "Escríbenos" }
    ]
  },

  sube: {
    titulo: "SUBE · Pregrado para trabajadores",
    intro: "Carreras semipresenciales y a distancia para personas que trabajan y quieren iniciar o continuar sus estudios universitarios.",
    bloques: [
      { tipo: "facultades", titulo: "Carreras disponibles", grupos: [
        { nombre: "Ciencias Empresariales", carreras: [ { t: "Administración de Empresas" }, { t: "Contabilidad" } ] },
        { nombre: "Ingeniería y Arquitectura", carreras: [ { t: "Ingeniería de Sistemas" }, { t: "Ingeniería Industrial" } ] },
        { nombre: "Humanidades", carreras: [ { t: "Educación Inicial" }, { t: "Ciencias de la Comunicación" } ] },
        { nombre: "Ciencias de la Salud", carreras: [ { t: "Psicología" } ] },
        { nombre: "Derecho", carreras: [ { t: "Derecho" } ] }
      ] },
      { tipo: "lista", titulo: "¿Cómo funciona?", items: [
        "Clases los fines de semana y en horario nocturno.",
        "Plataforma virtual para tareas, foros y evaluaciones.",
        "Reconocimiento de experiencia laboral según la carrera.",
        "Tutorías personalizadas con docentes de cada área."
      ] }
    ]
  },

  segunda: {
    titulo: "Segunda especialidad",
    intro: "Menciones para profesionales que quieren ampliar su campo de acción sin empezar otra carrera.",
    bloques: [
      { tipo: "tarjetas", titulo: "Menciones en Tecnología", items: [
        { t: "Ciberseguridad", d: "Gestión de incidentes y protección de infraestructuras." },
        { t: "Ingeniería de procesos", d: "Optimización de operaciones con herramientas digitales." },
        { t: "Transformación digital", d: "Modernización de organizaciones y servicios públicos." } ] },
      { tipo: "tarjetas", titulo: "Menciones en Educación", items: [
        { t: "Neuroeducación", d: "Aprendizaje y desarrollo cerebral aplicado al aula." },
        { t: "Entornos virtuales para el aprendizaje", d: "Diseño de cursos y aulas digitales." },
        { t: "Educación inclusiva", d: "Atención a la diversidad en la enseñanza." } ] },
      { tipo: "tarjetas", titulo: "Menciones en Gestión", items: [
        { t: "Psicología organizacional", d: "Clima laboral, selección y desarrollo de talento." },
        { t: "Seguridad, salud ocupacional y medio ambiente", d: "Gestión SSOMA para empresas." },
        { t: "Proyectos públicos", d: "Formulación y evaluación de proyectos de inversión." } ] }
    ]
  },

  cuetomas: {
    titulo: "Cueto+ · Desarrollo ejecutivo",
    intro: "Programas de especialización cortos para profesionales que quieren potenciar su perfil y sus decisiones de negocio.",
    bloques: [
      { tipo: "tarjetas", titulo: "Tecnología e innovación", items: [
        { t: "Analítica y visualización de datos", d: "Dashboards y toma de decisiones con datos." },
        { t: "Gestión de la ciberseguridad", d: "Políticas y respuesta ante amenazas." },
        { t: "IA generativa y automatización", d: "Flujos de trabajo asistidos por modelos de lenguaje." } ] },
      { tipo: "tarjetas", titulo: "Marketing y ventas", items: [
        { t: "Jefatura de marketing", d: "Planificación y gestión de campañas." },
        { t: "Marketing y gestión comercial", d: "Estrategias de ventas y fidelización." } ] },
      { tipo: "tarjetas", titulo: "Talento y liderazgo", items: [
        { t: "Coaching y liderazgo", d: "Herramientas para liderar equipos de alto desempeño." },
        { t: "Gestión del talento humano", d: "Selección, evaluación y desarrollo de personas." } ] }
    ]
  },

  continua: {
    titulo: "Educación continua",
    intro: "Cursos cortos y certificados para actualizar tus conocimientos y adquirir nuevas herramientas.",
    bloques: [
      { tipo: "tarjetas", titulo: "Cursos destacados", items: [
        { t: "Power BI aplicado a finanzas", d: "Reportes financieros interactivos." },
        { t: "IA generativa aplicada al marketing", d: "Creación de contenido con apoyo de IA." },
        { t: "Neuroeducación y atención plena", d: "Estrategias para la primera infancia." },
        { t: "Psicología del deporte", d: "Rendimiento mental para deportistas." },
        { t: "Gestión de proyectos de TI", d: "Metodologías ágiles y planificación." },
        { t: "Seguridad y salud ocupacional", d: "Prevención de riesgos en el trabajo." } ] }
    ]
  },

  alfa: {
    titulo: "Programa Alfa",
    intro: "Prepárate para tu ingreso a la universidad con clases intensivas, simulacros y tutorías.",
    bloques: [
      { tipo: "tarjetas", titulo: "Modalidades", items: [
        { t: "Alfa Ultra", d: "Preparación intensiva para el examen de admisión." },
        { t: "Alfa 5to Secundaria", d: "Acompañamiento durante el último año escolar." },
        { t: "Alfa Pre Médica", d: "Preparación para las carreras de salud." },
        { t: "Alfa Sube", d: "Preparación para estudiantes que combinan estudios y trabajo." } ] }
    ]
  },

  titulacion: {
    titulo: "Programa de titulación",
    intro: "Acompañamiento para que obtengas tu título profesional con un proceso claro y asesorado.",
    bloques: [
      { tipo: "lista", titulo: "Modalidades", items: [
        "Tesis con asesoría personalizada.",
        "Trabajo de suficiencia profesional.",
        "Examen de conocimientos.",
        "Programa de investigación para egresados de posgrado."
      ] },
      { tipo: "cta", texto: "Escríbenos con tu código de estudiante para revisar tu caso.", enlace: "#contacto", etiqueta: "Solicitar asesoría" }
    ]
  },

  /* ================= SOBRE CUETO ================= */

  nosotros: {
    titulo: "Acerca de nosotros",
    intro: "Somos una universidad privada en Comas, Lima, comprometida con la formación tecnológica y humana.",
    bloques: [
      { tipo: "texto", titulo: "Nuestra historia", parrafos: [
        "Cueto nació con la idea de acercar una educación superior de calidad a la zona norte de Lima.",
        "Desde entonces combinamos formación rigurosa, laboratorios modernos y vínculos con la industria para que cada estudiante salga preparado para el mundo real."
      ] },
      { tipo: "stats", items: [
        { v: "1", l: "Sede en Comas" },
        { v: "+20", l: "Carreras y programas" },
        { v: "+50", l: "Docentes especializados" },
        { v: "4", l: "Facultades" } ] },
      { tipo: "faq", titulo: "Preguntas frecuentes", items: [
        { q: "¿En qué modalidades estudiar?", a: "En modalidad presencial en nuestra sede de Comas, y en programas semipresenciales (SUBE) para trabajadores." },
        { q: "¿Cuentan con becas?", a: "Sí. Ofrecemos becas por rendimiento académico y apoyo socioeconómico según evaluación." },
        { q: "¿Dónde queda la sede?", a: "En Comas, Lima, Perú. Consulta la página de Campus para ver cómo llegar." }
      ] }
    ]
  },

  campus: {
    titulo: "Campus Comas",
    intro: "Nuestra sede en Comas reúne aulas, laboratorios y espacios para el trabajo en equipo.",
    bloques: [
      { tipo: "tarjetas", titulo: "Espacios", items: [
        { t: "Laboratorio de IA y datos", d: "Equipos de cómputo con GPU para proyectos de machine learning." },
        { t: "Centro de operaciones de seguridad", d: "Laboratorio didáctico de monitoreo y respuesta a incidentes." },
        { t: "Biblioteca y centro de información", d: "Colección física y digital con salas de estudio." },
        { t: "Espacios de innovación", d: "Cubículos para prototipos y trabajo colaborativo." },
        { t: "Zonas de descanso y comedor", d: "Áreas abiertas para estudiar y socializar." },
        { t: "Área deportiva", d: "Canchas y espacios para actividades físicas." } ] },
      { tipo: "cta", texto: "¿Quieres visitarnos? Escríbenos y coordinamos tu recorrido.", enlace: "#contacto", etiqueta: "Agendar visita" }
    ]
  },

  internacional: {
    titulo: "Internacional",
    intro: "Intercambios, convenios y doble titulación con universidades aliadas.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Intercambio semestral", d: "Estudia un semestre en una universidad aliada." },
        { t: "Doble titulación", d: "Obtén un segundo título con socios internacionales." },
        { t: "Certificaciones de idioma", d: "Preparación para exámenes internacionales de inglés." },
        { t: "Convenios globales", d: "Programas de investigación y prácticas en el extranjero." } ] }
    ]
  },

  centros: {
    titulo: "Centros de Cueto",
    intro: "Unidades de apoyo académico, tecnológico y de innovación.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Centro de Informática y Sistemas (CIS)", d: "Formación en habilidades digitales y herramientas de software." },
        { t: "Centro de Idiomas (CID)", d: "Cursos de inglés y otros idiomas para toda la comunidad." },
        { t: "Centro de Emprendimiento e Innovación", d: "Mentorías, incubación y conexión con inversionistas." },
        { t: "Centro de Excelencia Académica (CEA)", d: "Programas especializados y alianzas académicas." } ] }
    ]
  },

  vicerrectorados: {
    titulo: "Vicerrectorados",
    intro: "Áreas de gestión que acompañan el funcionamiento de la universidad.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Vicerrectorado Académico", d: "Diseño curricular, docencia y calidad educativa." },
        { t: "Vicerrectorado de Investigación", d: "Proyectos científicos, publicaciones e innovación." },
        { t: "Vicerrectorado Administrativo", d: "Finanzas, infraestructura y gestión de recursos." },
        { t: "Vicerrectorado de Bienestar", d: "Salud mental, responsabilidad social y vida estudiantil." } ] }
    ]
  },

  logros: {
    titulo: "Logros",
    intro: "Reconocimientos ilustrativos para la presentación de este proyecto ficticio.",
    bloques: [
      { tipo: "stats", items: [
        { v: "Top 5", l: "Ranking ficticio de innovación educativa 2026" },
        { v: "+300", l: "Publicaciones de docentes y estudiantes" },
        { v: "12", l: "Convenios con empresas de tecnología" },
        { v: "98%", l: "Satisfacción en encuesta interna" } ] }
    ]
  },

  /* ================= VIDA UNIVERSITARIA ================= */

  vibra: {
    titulo: "Vibra Cueto",
    intro: "Actividades culturales, deportivas y de voluntariado para toda la comunidad universitaria.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Torneos deportivos", d: "Fútbol, vóley y eventos interfacultades durante el año." },
        { t: "Festival de arte y música", d: "Presentaciones de estudiantes y artistas invitados." },
        { t: "Voluntariado comunitario", d: "Proyectos de apoyo en colegios y barrios de Comas." },
        { t: "Clubes estudiantiles", d: "Robótica, ciberseguridad, debate y más." },
        { t: "Semana de la innovación", d: "Hackatones, charlas y muestras de proyectos." } ] }
    ]
  },

  empleabilidad: {
    titulo: "Empleabilidad",
    intro: "Asesorías, bolsa de empleo y ferias con empresas aliadas para tu inserción laboral.",
    bloques: [
      { tipo: "lista", titulo: "Servicios", items: [
        "Asesoría de currículum y preparación de entrevistas.",
        "Bolsa de prácticas y empleo para estudiantes y egresados.",
        "Ferias laborales semestrales con empresas aliadas.",
        "Talleres de habilidades blandas y marca personal."
      ] },
      { tipo: "cta", texto: "Regístrate en la bolsa de empleo con tu correo institucional.", enlace: "#contacto", etiqueta: "Quiero registrarme" }
    ]
  },

  movilidad: {
    titulo: "Movilidad académica",
    intro: "Estudia un semestre en otra universidad aliada y convalida tus cursos.",
    bloques: [
      { tipo: "texto", parrafos: [
        "El programa de movilidad permite cursar asignaturas en universidades con convenio vigente, con reconocimiento académico en tu plan de estudios.",
        "Consulta requisitos de promedio, idioma y destinos disponibles con la oficina de relaciones internacionales."
      ] }
    ]
  },

  doble: {
    titulo: "Doble titulación",
    intro: "Obtén un segundo título profesional con universidades aliadas en el extranjero.",
    bloques: [
      { tipo: "texto", parrafos: [
        "Los programas de doble titulación combinan créditos de Cueto con los de la universidad socia, para que obtengas dos títulos en menos tiempo.",
        "Cada convenio define la carrera, la duración y el idioma de estudio."
      ] }
    ]
  },

  test: {
    titulo: "Test vocacional",
    intro: "Responde tres preguntas y descubre qué carrera de Cueto se ajusta mejor a tu perfil.",
    bloques: [
      { tipo: "test", preguntas: [
        { q: "¿Qué actividad disfrutas más?", opciones: [
          { t: "Programar o resolver problemas con datos", slug: "ia-ciencia-datos" },
          { t: "Proteger sistemas y redes", slug: "ciberseguridad-redes" },
          { t: "Crear negocios o proyectos", slug: "negocios-digitales" },
          { t: "Escuchar y acompañar a las personas", slug: "psicologia-bienestar" } ] },
        { q: "¿Qué tipo de entorno te motiva?", opciones: [
          { t: "Un entorno analítico y de investigación", slug: "ia-ciencia-datos" },
          { t: "Un entorno técnico y de precisión", slug: "ciberseguridad-redes" },
          { t: "Un entorno de innovación y emprendimiento", slug: "negocios-digitales" },
          { t: "Un entorno de diálogo y comunidad", slug: "psicologia-bienestar" } ] },
        { q: "¿Qué quieres lograr en cinco años?", opciones: [
          { t: "Diseñar modelos inteligentes", slug: "ia-ciencia-datos" },
          { t: "Proteger organizaciones de ataques", slug: "ciberseguridad-redes" },
          { t: "Liderar proyectos de transformación digital", slug: "negocios-digitales" },
          { t: "Promover el bienestar mental", slug: "psicologia-bienestar" } ] }
      ] }
    ]
  },

  salud: {
    titulo: "Salud mental y bienestar",
    intro: "Acompañamiento psicológico y campañas de bienestar para toda la comunidad estudiantil.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Atención psicológica", d: "Sesiones individuales con psicólogos de la universidad." },
        { t: "Talleres de manejo del estrés", d: "Técnicas prácticas para época de exámenes." },
        { t: "Campaña Cuidar tu mente", d: "Charlas y piezas de sensibilización durante el semestre." },
        { t: "Canal de consulta", d: "Orientación en horario de atención al estudiante." } ] },
      { tipo: "texto", parrafos: [
        "Si estás atravesando una situación difícil, no tienes que enfrentarla solo. En caso de emergencia, acude al servicio de salud más cercano o llama a la línea de emergencias de tu localidad."
      ] }
    ]
  },

  congreso: {
    titulo: "Congreso de comunicación y medios",
    intro: "Encuentro anual con docentes, profesionales y estudiantes del área de comunicación.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Ponencias", d: "Conferencias de profesionales de medios y marketing digital." },
        { t: "Talleres prácticos", d: "Producción audiovisual y redacción para medios digitales." },
        { t: "Concurso de contenido", d: "Premiación a los mejores proyectos audiovisuales de estudiantes." } ] }
    ]
  },

  /* ================= INSTITUCIONAL ================= */

  politicas: {
    titulo: "Políticas institucionales",
    intro: "Marco normativo que orienta la gestión académica, administrativa y de calidad de Cueto.",
    bloques: [
      { tipo: "lista", titulo: "Documentos vigentes", items: [
        "Mapa de procesos institucional.",
        "Gestión de políticas institucionales.",
        "Política de aseguramiento de la calidad.",
        "Política de seguridad y salud en el trabajo."
      ] },
      { tipo: "texto", parrafos: [
        "Las versiones completas de estos documentos están disponibles en Secretaría General. Puedes solicitar una copia escribiendo a nuestro equipo de soporte."
      ] }
    ]
  },

  comunicados: {
    titulo: "Comunicados",
    intro: "Anuncios oficiales de la universidad para estudiantes, docentes y público en general.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Calendario académico 2027", d: "Fechas de inicio de clases, exámenes y vacaciones." },
        { t: "Inicio de postulaciones Admisión 2027", d: "Consulta los requisitos en la sección de admisión." },
        { t: "Horario de atención en periodo de matrícula", d: "Atención extendida en las semanas de matrícula." } ] }
    ]
  },

  acreditacion: {
    titulo: "Acreditación y calidad",
    intro: "Nuestro sistema de aseguramiento de la calidad busca la mejora continua de cada carrera.",
    bloques: [
      { tipo: "texto", parrafos: [
        "Cada programa cuenta con un plan de mejora que se revisa cada semestre, con indicadores de aprendizaje, empleabilidad y satisfacción estudiantil.",
        "Los resultados de estos procesos se publican en la sección de Transparencia."
      ] }
    ]
  },

  convenios: {
    titulo: "Convenios institucionales",
    intro: "Alianzas con empresas, instituciones y universidades que amplían las oportunidades de nuestros estudiantes.",
    bloques: [
      { tipo: "lista", items: [
        "Universidad aliada en Italia para doble titulación.",
        "Empresas de tecnología de Lima para prácticas y proyectos.",
        "Hospitales y clínicas de la zona norte para prácticas de salud.",
        "Colegios de Comas para programas de orientación vocacional."
      ] }
    ]
  },

  datos: {
    titulo: "Protección de datos personales",
    intro: "Tratamos tus datos personales con las medidas de seguridad que exige la normativa peruana.",
    bloques: [
      { tipo: "texto", parrafos: [
        "Los datos que compartes en formularios y postulaciones se usan solo para los fines académicos y administrativos informados al momento de la recolección.",
        "Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiendo a nuestro equipo de soporte."
      ] }
    ]
  },

  emprendimiento: {
    titulo: "Centro de Emprendimiento e Innovación",
    intro: "Programas, mentorías y conexiones para convertir tus ideas en proyectos reales.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Mentorías", d: "Acompañamiento con emprendedores y profesionales de la industria." },
        { t: "Incubadora", d: "Espacio para validar modelos de negocio tecnológicos." },
        { t: "Concurso de ideas", d: "Premios semestrales para proyectos de estudiantes y egresados." } ] }
    ]
  },

  trabaja: {
    titulo: "Trabaja con nosotros",
    intro: "Conoce las convocatorias vigentes para docentes, administrativos y prácticas profesionales.",
    bloques: [
      { tipo: "lista", items: [
        "Convocatoria docente por carrera.",
        "Personal administrativo para áreas de soporte.",
        "Prácticas profesionales en áreas académicas y administrativas."
      ] },
      { tipo: "cta", texto: "Envíanos tu hoja de vida por el formulario de contacto.", enlace: "#contacto", etiqueta: "Enviar hoja de vida" }
    ]
  },

  /* ================= PLATAFORMAS Y RECURSOS ================= */

  plataformas: {
    titulo: "Plataformas",
    intro: "Herramientas digitales para tu vida académica. Accede con tu correo institucional.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Aula virtual Cueto", d: "Cursos, materiales, tareas y foros de cada asignatura." },
        { t: "Sistema académico", d: "Matrícula, notas, horarios y certificados." },
        { t: "Biblioteca digital", d: "Libros electrónicos, revistas y bases de datos." },
        { t: "Correo institucional", d: "Comunicación oficial de la universidad." } ] }
    ]
  },

  biblioteca: {
    titulo: "Centros de información",
    intro: "Espacios de estudio, préstamo de equipos y recursos para investigar.",
    bloques: [
      { tipo: "tarjetas", items: [
        { t: "Biblioteca central", d: "Atención de lunes a sábado con salas de estudio grupal." },
        { t: "Laboratorio de cómputo", d: "Equipos con software especializado para cada carrera." },
        { t: "Préstamo de laptops", d: "Disponible para estudiantes con reserva previa." } ] }
    ]
  },

  portal: {
    titulo: "Portal del estudiante",
    intro: "Todo lo que necesitas durante tu carrera, en un solo lugar.",
    bloques: [
      { tipo: "lista", items: [
        "Matrícula y cronograma de cursos.",
        "Consulta de notas y avance de créditos.",
        "Pagos y estado de cuenta.",
        "Horarios de clases y aulas asignadas."
      ] }
    ]
  },

  defensoria: {
    titulo: "Defensoría universitaria",
    intro: "Espacio independiente para orientar y atender reclamos de la comunidad universitaria.",
    bloques: [
      { tipo: "texto", parrafos: [
        "La Defensoría recibe consultas sobre derechos estudiantiles, procesos académicos y convivencia, y busca soluciones justas y oportunas."
      ] },
      { tipo: "cta", texto: "Escríbenos y el equipo de la Defensoría te responderá.", enlace: "#contacto", etiqueta: "Contactar" }
    ]
  },

  compliance: {
    titulo: "Canal de denuncias",
    intro: "Canal confidencial para reportar conductas contrarias a la ética o a la normativa de la universidad.",
    bloques: [
      { tipo: "texto", parrafos: [
        "Las denuncias se tratan con confidencialidad y sin represalias para quien informa de buena fe.",
        "Puedes reportar situaciones relacionadas con corrupción, acoso o incumplimiento del código de ética."
      ] }
    ]
  },

  etica: {
    titulo: "Código de ética y conducta",
    intro: "Principios que guían el comportamiento de estudiantes, docentes y personal de Cueto.",
    bloques: [
      { tipo: "lista", items: [
        "Integridad académica y respeto por la propiedad intelectual.",
        "Igualdad, inclusión y trato digno para todas las personas.",
        "Responsabilidad social y cuidado del medio ambiente.",
        "Uso responsable de la tecnología y de los datos."
      ] }
    ]
  },

  seguridad: {
    titulo: "Plan de seguridad",
    intro: "Medidas de protección física y de convivencia para el campus de Comas.",
    bloques: [
      { tipo: "texto", parrafos: [
        "El plan incluye control de accesos, cámaras de vigilancia, rutas de evacuación señalizadas y simulacros periódicos con la comunidad."
      ] }
    ]
  },

  mesa: {
    titulo: "Mesa de partes virtual",
    intro: "Presenta tus trámites y documentos sin salir de casa.",
    bloques: [
      { tipo: "lista", titulo: "Pasos", items: [
        "Escribe tu solicitud describiendo el trámite.",
        "Adjunta los documentos necesarios en formato PDF.",
        "Recibirás un número de expediente en tu correo institucional.",
        "Consulta el estado de tu trámite con ese número."
      ] }
    ]
  },

  certificados: {
    titulo: "Certificados y constancias",
    intro: "Solicita tus documentos académicos de forma virtual.",
    bloques: [
      { tipo: "lista", items: [
        "Constancia de matrícula.",
        "Certificado de estudios.",
        "Constancia de egresado.",
        "Constancia de conducta y buena práctica académica."
      ] }
    ]
  },

  reclamos: {
    titulo: "Libro de reclamaciones",
    intro: "Registra tu queja o reclamo sobre el servicio educativo, conforme al Código de Protección y Defensa del Consumidor.",
    bloques: [
      { tipo: "texto", parrafos: [
        "Tu reclamo será registrado y derivado al área responsable, que debe dar respuesta dentro del plazo establecido por la normativa.",
        "Si tu reclamo no fue resuelto, puedes acudir a las instancias de protección del consumidor."
      ] },
      { tipo: "cta", texto: "Escribe tu reclamo por el formulario de contacto indicando el asunto.", enlace: "#contacto", etiqueta: "Registrar reclamo" }
    ]
  },

  /* ================= NOTICIAS Y TRANSPARENCIA ================= */

  noticias: {
    titulo: "Noticias y eventos",
    intro: "Lo más reciente de la vida académica y los eventos de la comunidad Cueto.",
    bloques: [
      { tipo: "tarjetas", titulo: "Noticias recientes", items: [
        { t: "Cueto abre postulaciones para Admisión 2027", d: "Revisa los requisitos y fechas del proceso." },
        { t: "Estudiantes de IA presentan proyectos en la sede Comas", d: "Muestra de modelos aplicados a salud y educación." },
        { t: "Alianza con empresas de ciberseguridad", d: "Nuevas prácticas profesionales para estudiantes." } ] },
      { tipo: "tarjetas", titulo: "Próximos eventos", items: [
        { t: "Open Day Cueto", d: "Visita el campus, conoce las carreras y habla con docentes." },
        { t: "Feria laboral", d: "Conecta con empresas aliadas y postula a prácticas." },
        { t: "Congreso de comunicación y medios", d: "Ponencias, talleres y concurso de contenido." } ] }
    ]
  },

  transparencia: {
    titulo: "Transparencia",
    intro: "Información pública sobre la gestión de la universidad.",
    bloques: [
      { tipo: "lista", items: [
        "Presupuesto institucional y ejecución.",
        "Plana docente y perfiles académicos.",
        "Reglamentos y disposiciones vigentes.",
        "Indicadores de calidad y empleabilidad."
      ] }
    ]
  },

  /* ================= LEGAL ================= */

  terminos: {
    titulo: "Términos y condiciones",
    intro: "Condiciones de uso del sitio web y de los servicios educativos de Cueto.",
    bloques: [
      { tipo: "texto", parrafos: [
        "El uso de este sitio implica la aceptación de estos términos. La información sobre carreras, costos y fechas puede cambiar y se actualizará oportunamente.",
        "Este sitio es un proyecto ficticio de presentación; los datos institucionales son ilustrativos."
      ] }
    ]
  },

  privacidad: {
    titulo: "Política de privacidad",
    intro: "Cómo recogemos y usamos la información que compartes en este sitio.",
    bloques: [
      { tipo: "texto", parrafos: [
        "Los datos del formulario de contacto se usan para responder tu consulta y se tratan con medidas de seguridad razonables.",
        "No compartimos tus datos con terceros con fines comerciales."
      ] }
    ]
  }
};
