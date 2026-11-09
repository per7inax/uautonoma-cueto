/* Datos de las carreras. Cada carrera incluye su malla curricular (5 ciclos).
   Para cambiar la imagen de una carrera, pega una URL de Unsplash en "imagen". */
window.CARRERAS = {
  "ia-ciencia-datos": {
    "nombre": "Ingeniería de Inteligencia Artificial y Ciencia de Datos",
    "corta": "Modelos predictivos, machine learning y análisis de datos para la toma de decisiones.",
    "imagen": "https://images.pexels.com/photos/17489163/pexels-photo-17489163.jpeg?auto=compress&cs=tinysrgb&w=1260",
    "imagenAlt": "Laboratorio de inteligencia artificial",
    "icono": "M4 4h16v16H4z",
    "duracion": "5 años (10 semestres)",
    "grado": "Ingeniero/a de Inteligencia Artificial y Ciencia de Datos",
    "perfil": "Formación para diseñar, entrenar y poner en producción modelos de inteligencia artificial, así como para extraer conocimiento accionable de grandes volúmenes de datos con rigor matemático y ético.",
    "competencias": [
      "Desarrollar modelos de machine learning y deep learning",
      "Procesar, limpiar y visualizar grandes volúmenes de datos",
      "Implementar soluciones de IA en entornos productivos",
      "Evaluar el impacto ético y social de los sistemas inteligentes"
    ],
    "campo": [
      "Empresas de tecnología y startups de datos",
      "Banca, fintech y seguros",
      "Salud, retail y logística",
      "Consultoría en analítica avanzada"
    ],
    "malla": [
      { "ciclo": "Ciclo I", "cursos": [
        { "nombre": "Matemática Básica", "creditos": 4 },
        { "nombre": "Introducción a la Programación", "creditos": 4 },
        { "nombre": "Comunicación Académica", "creditos": 3 },
        { "nombre": "Fundamentos de Tecnología Digital", "creditos": 3 } ] },
      { "ciclo": "Ciclo II", "cursos": [
        { "nombre": "Cálculo Diferencial", "creditos": 4 },
        { "nombre": "Programación Orientada a Objetos", "creditos": 4 },
        { "nombre": "Estadística Descriptiva", "creditos": 4 },
        { "nombre": "Pensamiento Crítico", "creditos": 2 } ] },
      { "ciclo": "Ciclo III", "cursos": [
        { "nombre": "Cálculo Integral", "creditos": 4 },
        { "nombre": "Estructuras de Datos", "creditos": 4 },
        { "nombre": "Álgebra Lineal", "creditos": 4 },
        { "nombre": "Probabilidad Aplicada", "creditos": 3 } ] },
      { "ciclo": "Ciclo IV", "cursos": [
        { "nombre": "Bases de Datos", "creditos": 4 },
        { "nombre": "Inferencia Estadística", "creditos": 4 },
        { "nombre": "Introducción al Machine Learning", "creditos": 4 },
        { "nombre": "Ética y Sociedad Digital", "creditos": 2 } ] },
      { "ciclo": "Ciclo V", "cursos": [
        { "nombre": "Aprendizaje Profundo", "creditos": 4 },
        { "nombre": "Minería de Datos", "creditos": 4 },
        { "nombre": "Procesamiento de Lenguaje Natural", "creditos": 3 },
        { "nombre": "Ingeniería de Datos y Big Data", "creditos": 4 } ] }
    ]
  },
  "ciberseguridad-redes": {
    "nombre": "Ingeniería de Ciberseguridad y Redes",
    "corta": "Protección de infraestructuras, administración de redes y respuesta ante incidentes.",
    "imagen": "https://images.pexels.com/photos/5380607/pexels-photo-5380607.jpeg?auto=compress&cs=tinysrgb&w=1260",
    "imagenAlt": "Centro de operaciones de seguridad",
    "icono": "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
    "duracion": "5 años (10 semestres)",
    "grado": "Ingeniero/a en Ciberseguridad y Redes",
    "perfil": "Formación para diseñar, administrar y proteger redes y sistemas, identificar vulnerabilidades, responder a incidentes de seguridad y aplicar buenas prácticas de gestión del riesgo digital.",
    "competencias": [
      "Diseñar e implementar redes seguras y escalables",
      "Detectar y mitigar vulnerabilidades en sistemas",
      "Responder y analizar incidentes de seguridad informática",
      "Aplicar marcos de gobierno y cumplimiento de seguridad"
    ],
    "campo": [
      "Centros de operaciones de seguridad (SOC)",
      "Administración de infraestructura y nube",
      "Entidades públicas y sector financiero",
      "Auditoría y consultoría en seguridad informática"
    ],
    "malla": [
      { "ciclo": "Ciclo I", "cursos": [
        { "nombre": "Matemática Básica", "creditos": 4 },
        { "nombre": "Introducción a la Computación", "creditos": 4 },
        { "nombre": "Comunicación Académica", "creditos": 3 },
        { "nombre": "Fundamentos de Tecnología Digital", "creditos": 3 } ] },
      { "ciclo": "Ciclo II", "cursos": [
        { "nombre": "Fundamentos de Redes", "creditos": 4 },
        { "nombre": "Programación Estructurada", "creditos": 4 },
        { "nombre": "Sistemas Operativos", "creditos": 4 },
        { "nombre": "Pensamiento Crítico", "creditos": 2 } ] },
      { "ciclo": "Ciclo III", "cursos": [
        { "nombre": "Redes de Computadoras", "creditos": 4 },
        { "nombre": "Administración de Servidores Linux", "creditos": 4 },
        { "nombre": "Criptografía Aplicada", "creditos": 4 },
        { "nombre": "Matemática Discreta", "creditos": 3 } ] },
      { "ciclo": "Ciclo IV", "cursos": [
        { "nombre": "Seguridad de Redes", "creditos": 4 },
        { "nombre": "Bases de Datos", "creditos": 4 },
        { "nombre": "Seguridad en Aplicaciones Web", "creditos": 4 },
        { "nombre": "Ética y Sociedad Digital", "creditos": 2 } ] },
      { "ciclo": "Ciclo V", "cursos": [
        { "nombre": "Análisis Forense Digital", "creditos": 4 },
        { "nombre": "Pruebas de Penetración", "creditos": 4 },
        { "nombre": "Seguridad en la Nube", "creditos": 3 },
        { "nombre": "Gestión de Riesgos de Seguridad", "creditos": 4 } ] }
    ]
  },
  "negocios-digitales": {
    "nombre": "Negocios Digitales e Innovación",
    "corta": "Emprendimiento, transformación digital y estrategias de crecimiento en mercados tecnológicos.",
    "imagen": "https://images.pexels.com/photos/7972537/pexels-photo-7972537.jpeg?auto=compress&cs=tinysrgb&w=1260",
    "imagenAlt": "Equipo de innovación trabajando en una estrategia digital",
    "icono": "M3 17l6-6 4 4 8-8",
    "duracion": "5 años (10 semestres)",
    "grado": "Licenciado/a en Negocios Digitales e Innovación",
    "perfil": "Formación para liderar la transformación digital de organizaciones, diseñar modelos de negocio basados en tecnología y gestionar proyectos de innovación en mercados globales.",
    "competencias": [
      "Diseñar modelos de negocio digitales",
      "Liderar proyectos de transformación digital",
      "Analizar datos para la toma de decisiones comerciales",
      "Crear y gestionar emprendimientos de base tecnológica"
    ],
    "campo": [
      "Emprendimiento y startups tecnológicas",
      "Áreas de innovación y transformación digital",
      "Marketing digital y e-commerce",
      "Gestión de productos digitales"
    ],
    "malla": [
      { "ciclo": "Ciclo I", "cursos": [
        { "nombre": "Matemática para los Negocios", "creditos": 4 },
        { "nombre": "Introducción a la Economía", "creditos": 4 },
        { "nombre": "Comunicación Académica", "creditos": 3 },
        { "nombre": "Fundamentos de Tecnología Digital", "creditos": 3 } ] },
      { "ciclo": "Ciclo II", "cursos": [
        { "nombre": "Contabilidad General", "creditos": 4 },
        { "nombre": "Microeconomía", "creditos": 4 },
        { "nombre": "Estadística para los Negocios", "creditos": 4 },
        { "nombre": "Pensamiento Crítico", "creditos": 2 } ] },
      { "ciclo": "Ciclo III", "cursos": [
        { "nombre": "Finanzas Corporativas", "creditos": 4 },
        { "nombre": "Marketing Digital", "creditos": 4 },
        { "nombre": "Gestión de Operaciones", "creditos": 4 },
        { "nombre": "Derecho Empresarial", "creditos": 3 } ] },
      { "ciclo": "Ciclo IV", "cursos": [
        { "nombre": "Analítica de Negocios", "creditos": 4 },
        { "nombre": "Comercio Electrónico", "creditos": 4 },
        { "nombre": "Gestión de Proyectos Ágiles", "creditos": 4 },
        { "nombre": "Ética y Sociedad Digital", "creditos": 2 } ] },
      { "ciclo": "Ciclo V", "cursos": [
        { "nombre": "Modelos de Negocio Digitales", "creditos": 4 },
        { "nombre": "Emprendimiento e Innovación", "creditos": 4 },
        { "nombre": "Transformación Digital Organizacional", "creditos": 4 },
        { "nombre": "Estrategia de Crecimiento", "creditos": 3 } ] }
    ]
  },
  "psicologia-bienestar": {
    "nombre": "Psicología y Bienestar Mental",
    "corta": "Evaluación, acompañamiento y promoción de la salud mental en contextos educativos y organizacionales.",
    "imagen": "https://images.pexels.com/photos/7973030/pexels-photo-7973030.jpeg?auto=compress&cs=tinysrgb&w=1260",
    "imagenAlt": "Sesión de acompañamiento psicológico",
    "icono": "M12 21a9 9 0 1 0-9-9c0 1.6.4 3.1 1.2 4.4L3 21l4.6-1.2A9 9 0 0 0 12 21z",
    "duracion": "5 años (10 semestres)",
    "grado": "Licenciado/a en Psicología",
    "perfil": "Formación integral en psicología con enfoque en la evaluación y el acompañamiento de personas, la promoción del bienestar mental y la aplicación de la psicología en entornos educativos, clínicos y organizacionales.",
    "competencias": [
      "Evaluar y comprender procesos psicológicos",
      "Brindar acompañamiento y orientación psicológica",
      "Diseñar programas de promoción de la salud mental",
      "Aplicar la psicología en contextos educativos y laborales"
    ],
    "campo": [
      "Centros educativos y programas de bienestar estudiantil",
      "Recursos humanos y salud ocupacional",
      "Servicios de salud mental comunitaria",
      "Investigación en psicología aplicada"
    ],
    "malla": [
      { "ciclo": "Ciclo I", "cursos": [
        { "nombre": "Introducción a la Psicología", "creditos": 4 },
        { "nombre": "Comunicación Académica", "creditos": 3 },
        { "nombre": "Estadística Descriptiva", "creditos": 4 },
        { "nombre": "Fundamentos de Tecnología Digital", "creditos": 3 } ] },
      { "ciclo": "Ciclo II", "cursos": [
        { "nombre": "Psicología del Desarrollo", "creditos": 4 },
        { "nombre": "Psicología Social", "creditos": 4 },
        { "nombre": "Estadística Inferencial", "creditos": 4 },
        { "nombre": "Pensamiento Crítico", "creditos": 2 } ] },
      { "ciclo": "Ciclo III", "cursos": [
        { "nombre": "Psicología de la Personalidad", "creditos": 4 },
        { "nombre": "Psicometría", "creditos": 4 },
        { "nombre": "Neurociencia del Comportamiento", "creditos": 4 },
        { "nombre": "Teorías Psicológicas", "creditos": 3 } ] },
      { "ciclo": "Ciclo IV", "cursos": [
        { "nombre": "Evaluación Psicológica", "creditos": 4 },
        { "nombre": "Psicología Clínica", "creditos": 4 },
        { "nombre": "Investigación Cuantitativa", "creditos": 4 },
        { "nombre": "Ética y Sociedad Digital", "creditos": 2 } ] },
      { "ciclo": "Ciclo V", "cursos": [
        { "nombre": "Intervención Psicológica", "creditos": 4 },
        { "nombre": "Salud Mental Comunitaria", "creditos": 4 },
        { "nombre": "Psicología Organizacional", "creditos": 3 },
        { "nombre": "Promoción del Bienestar Mental", "creditos": 4 } ] }
    ]
  }
};
