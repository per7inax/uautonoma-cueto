-- =====================================================================
-- Universidad Autónoma Cueto · Esquema de base de datos
-- Diseñado para Supabase (PostgreSQL). Ejecutar en el SQL Editor.
-- Proyecto ficticio de presentación.
-- =====================================================================


-- =====================================================================
-- 1. ACADÉMICO: facultades, carreras, malla curricular y programas
-- =====================================================================

create table facultades (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null unique,
  slug        text not null unique,
  descripcion text,
  orden       int  not null default 0
);

create table carreras (
  id              uuid primary key default gen_random_uuid(),
  facultad_id     uuid references facultades(id) on delete set null,
  nombre          text not null,
  slug            text not null unique,
  tipo            text not null check (tipo in ('pregrado','sube','posgrado','segunda_especialidad')),
  modalidad       text not null default 'presencial'
                  check (modalidad in ('presencial','semipresencial','distancia')),
  grado           text,
  duracion_ciclos int check (duracion_ciclos > 0),
  perfil          text,
  imagen_url      text,
  activa          boolean not null default true,
  creado_at       timestamptz not null default now()
);
create index on carreras (facultad_id);
create index on carreras (tipo);

-- Competencias y campo laboral de cada carrera (se muestran en la ficha)
create table carrera_perfil (
  id         uuid primary key default gen_random_uuid(),
  carrera_id uuid not null references carreras(id) on delete cascade,
  tipo       text not null check (tipo in ('competencia','campo_laboral')),
  texto      text not null,
  orden      int  not null default 0
);
create index on carrera_perfil (carrera_id);

create table ciclos (
  id         uuid primary key default gen_random_uuid(),
  carrera_id uuid not null references carreras(id) on delete cascade,
  numero     int  not null check (numero > 0),
  unique (carrera_id, numero)
);

create table cursos (
  id       uuid primary key default gen_random_uuid(),
  ciclo_id uuid not null references ciclos(id) on delete cascade,
  nombre   text not null,
  creditos int  not null check (creditos > 0),
  orden    int  not null default 0
);
create index on cursos (ciclo_id);

-- Programas que no son carreras: Cueto+, educación continua, Alfa, titulación
create table programas (
  id              uuid primary key default gen_random_uuid(),
  tipo            text not null check (tipo in ('ejecutivo','continua','alfa','titulacion')),
  nombre          text not null,
  slug            text not null unique,
  area            text,
  descripcion     text,
  duracion_semanas int,
  activo          boolean not null default true
);

-- =====================================================================
-- 2. ADMISIÓN: periodos, requisitos, postulantes, postulaciones, pagos
-- =====================================================================

create table periodos_admision (
  id                  uuid primary key default gen_random_uuid(),
  codigo              text not null unique,            -- ej. '2027-I'
  nombre              text not null,
  inicio_postulacion  date not null,
  fin_postulacion     date not null,
  fecha_examen        date,
  activo              boolean not null default false,
  check (fin_postulacion >= inicio_postulacion)
);

-- Requisitos que cambian por periodo (los que muestra la sección Admisión)
create table requisitos_admision (
  id              uuid primary key default gen_random_uuid(),
  periodo_id      uuid not null references periodos_admision(id) on delete cascade,
  tipo_documento  text not null,                       -- 'dni', 'certificado_secundaria', 'foto'...
  descripcion     text not null,
  obligatorio     boolean not null default true,
  orden           int  not null default 0
);
create index on requisitos_admision (periodo_id);

-- Postulantes: el id coincide con el usuario de Supabase Auth (auth.users)
create table postulantes (
  id                uuid primary key references auth.users(id) on delete cascade,
  nombres           text not null,
  apellidos         text not null,
  documento_tipo    text check (documento_tipo in ('dni','carnet_extranjeria','pasaporte')),
  documento_numero  text,
  telefono          text,
  creado_at         timestamptz not null default now(),
  unique (documento_tipo, documento_numero)
);

create table postulaciones (
  id                 uuid primary key default gen_random_uuid(),
  postulante_id      uuid not null references postulantes(id) on delete cascade,
  periodo_id         uuid not null references periodos_admision(id),
  carrera_id         uuid not null references carreras(id),
  modalidad_ingreso  text not null default 'examen'
                     check (modalidad_ingreso in ('examen','exoneracion','traslado','titulado')),
  estado             text not null default 'borrador'
                     check (estado in ('borrador','enviada','en_revision','observada','aprobada','rechazada','matriculada')),
  puntaje            numeric(5,2),
  creado_at          timestamptz not null default now(),
  enviada_at         timestamptz,
  unique (postulante_id, periodo_id)
);
create index on postulaciones (carrera_id);
create index on postulaciones (estado);

create table documentos_postulacion (
  id              uuid primary key default gen_random_uuid(),
  postulacion_id  uuid not null references postulaciones(id) on delete cascade,
  requisito_id    uuid references requisitos_admision(id) on delete set null,
  archivo_path    text not null,                       -- ruta en Storage (bucket privado)
  estado          text not null default 'pendiente'
                  check (estado in ('pendiente','valido','observado')),
  observacion     text,
  revisado_por    uuid,                                -- personal que revisó
  subido_at       timestamptz not null default now()
);
create index on documentos_postulacion (postulacion_id);

create table pagos (
  id                   uuid primary key default gen_random_uuid(),
  postulante_id        uuid not null references postulantes(id) on delete cascade,
  postulacion_id       uuid references postulaciones(id) on delete set null,
  concepto             text not null
                       check (concepto in ('derecho_postulacion','matricula','pension','certificado','otro')),
  monto                numeric(10,2) not null check (monto >= 0),
  moneda               text not null default 'PEN',
  estado               text not null default 'pendiente' check (estado in ('pendiente','pagado','anulado')),
  referencia_pasarela  text unique,
  pagado_at            timestamptz
);
create index on pagos (postulante_id);

-- =====================================================================
-- 3. PERSONAL Y AUDITORÍA
-- =====================================================================

-- El id coincide con el usuario de Supabase Auth del personal de la universidad
create table personal (
  id      uuid primary key references auth.users(id) on delete cascade,
  nombre  text not null,
  area    text,
  rol     text not null check (rol in ('admin','admisiones','editor','atencion')),
  activo  boolean not null default true
);

create table auditoria (
  id          uuid primary key default gen_random_uuid(),
  personal_id uuid references personal(id) on delete set null,
  accion      text not null,                           -- 'insert','update','delete'
  tabla       text not null,
  registro_id uuid,
  creado_at   timestamptz not null default now()
);

-- =====================================================================
-- 4. CONTENIDO WEB: menú, páginas, bloques, noticias, eventos, documentos
-- =====================================================================

create table grupos_menu (
  id                 uuid primary key default gen_random_uuid(),
  nombre             text not null,
  orden              int  not null default 0,
  pagina_directa_id  uuid                              -- para grupos que son un enlace directo
);

create table paginas (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,                -- ej. 'pregrado' -> #/pregrado
  titulo          text not null,
  intro           text,
  grupo_menu_id   uuid references grupos_menu(id) on delete set null,
  orden           int  not null default 0,
  publicada       boolean not null default false,
  actualizado_at  timestamptz not null default now()
);
alter table grupos_menu
  add constraint grupos_menu_pagina_fk
  foreign key (pagina_directa_id) references paginas(id) on delete set null;

-- Cada página se compone de bloques (texto, tarjetas, facultades, FAQ, test...)
create table bloques_pagina (
  id         uuid primary key default gen_random_uuid(),
  pagina_id  uuid not null references paginas(id) on delete cascade,
  tipo       text not null check (tipo in ('texto','lista','tarjetas','facultades','faq','stats','cta','test')),
  orden      int  not null default 0,
  contenido  jsonb not null                            -- estructura según el tipo de bloque
);
create index on bloques_pagina (pagina_id);

create table noticias (
  id            uuid primary key default gen_random_uuid(),
  titulo        text not null,
  slug          text not null unique,
  resumen       text,
  contenido     text,
  imagen_url    text,
  autor_id      uuid references personal(id) on delete set null,
  publicada     boolean not null default false,
  publicado_at  timestamptz
);

create table eventos (
  id           uuid primary key default gen_random_uuid(),
  titulo       text not null,
  descripcion  text,
  inicio       timestamptz not null,
  fin          timestamptz,
  lugar        text,
  modalidad    text check (modalidad in ('presencial','virtual','hibrido')),
  imagen_url   text,
  publicado    boolean not null default false
);

create table documentos_publicos (
  id            uuid primary key default gen_random_uuid(),
  categoria     text not null
                check (categoria in ('politicas','transparencia','etica','seguridad','proteccion_datos','otro')),
  titulo        text not null,
  archivo_path  text not null,
  publicado_at  timestamptz not null default now()
);

create table convocatorias (
  id            uuid primary key default gen_random_uuid(),
  puesto        text not null,
  area          text,
  tipo          text check (tipo in ('docente','administrativo','practicas')),
  descripcion   text,
  activa        boolean not null default true,
  publicada_at  timestamptz not null default now()
);

-- =====================================================================
-- 5. ATENCIÓN AL ESTUDIANTE Y TRÁMITES
-- =====================================================================

create table consultas (
  id              uuid primary key default gen_random_uuid(),
  nombre          text not null,
  email           text not null,
  carrera_id      uuid references carreras(id) on delete set null,
  mensaje         text,
  estado          text not null default 'nuevo' check (estado in ('nuevo','en_proceso','respondido')),
  atendido_por    uuid references personal(id) on delete set null,
  correo_enviado  boolean not null default false,
  creado_at       timestamptz not null default now()
);
create index on consultas (estado);

-- Libro de reclamaciones (obligatorio por el Código de Protección al Consumidor)
create table reclamos (
  id           uuid primary key default gen_random_uuid(),
  codigo       text not null unique,                   -- ej. 'REC-2027-000123'
  nombre       text not null,
  documento    text not null,
  email        text not null,
  tipo         text not null check (tipo in ('reclamo','queja')),
  detalle      text not null,
  estado       text not null default 'recibido' check (estado in ('recibido','en_proceso','resuelto')),
  fecha_limite date,
  creado_at    timestamptz not null default now()
);

-- Canal de denuncias: puede ser anónimo
create table denuncias (
  id           uuid primary key default gen_random_uuid(),
  codigo       text not null unique,
  es_anonima   boolean not null default true,
  email        text,
  detalle      text not null,
  estado       text not null default 'recibida' check (estado in ('recibida','en_investigacion','cerrada')),
  creado_at    timestamptz not null default now()
);

-- Mesa de partes virtual y certificados
create table tramites (
  id           uuid primary key default gen_random_uuid(),
  expediente   text not null unique,
  postulante_id uuid references postulantes(id) on delete set null,
  tipo         text not null check (tipo in ('solicitud_general','constancia_matricula','certificado_estudios','constancia_egresado','constancia_conducta')),
  asunto       text not null,
  email        text not null,
  archivo_path text,
  estado       text not null default 'recibido' check (estado in ('recibido','en_proceso','atendido','observado')),
  creado_at    timestamptz not null default now()
);

-- =====================================================================
-- 6. SEGURIDAD: funciones auxiliares y Row Level Security (RLS)
-- =====================================================================

create or replace function es_personal(roles text[] default null)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from personal p
    where p.id = auth.uid()
      and p.activo
      and (roles is null or p.rol = any(roles))
  );
$$;

-- Activar RLS en todas las tablas
alter table facultades            enable row level security;
alter table carreras              enable row level security;
alter table carrera_perfil        enable row level security;
alter table ciclos                enable row level security;
alter table cursos                enable row level security;
alter table programas             enable row level security;
alter table periodos_admision     enable row level security;
alter table requisitos_admision   enable row level security;
alter table postulantes           enable row level security;
alter table postulaciones         enable row level security;
alter table documentos_postulacion enable row level security;
alter table pagos                 enable row level security;
alter table personal              enable row level security;
alter table auditoria             enable row level security;
alter table grupos_menu           enable row level security;
alter table paginas               enable row level security;
alter table bloques_pagina        enable row level security;
alter table noticias              enable row level security;
alter table eventos               enable row level security;
alter table documentos_publicos   enable row level security;
alter table convocatorias         enable row level security;
alter table consultas             enable row level security;
alter table reclamos              enable row level security;
alter table denuncias             enable row level security;
alter table tramites              enable row level security;

-- Contenido público: cualquiera puede leer lo publicado
create policy "publico lee facultades"    on facultades    for select using (true);
create policy "publico lee carreras"      on carreras      for select using (activa or es_personal());
create policy "publico lee perfil"        on carrera_perfil for select using (true);
create policy "publico lee ciclos"        on ciclos        for select using (true);
create policy "publico lee cursos"        on cursos        for select using (true);
create policy "publico lee programas"     on programas     for select using (activo or es_personal());
create policy "publico lee periodos"      on periodos_admision for select using (true);
create policy "publico lee requisitos"    on requisitos_admision for select using (true);
create policy "publico lee menu"          on grupos_menu   for select using (true);
create policy "publico lee paginas"       on paginas       for select using (publicada or es_personal());
create policy "publico lee bloques"       on bloques_pagina for select using (
  exists (select 1 from paginas p where p.id = pagina_id and (p.publicada or es_personal()))
);
create policy "publico lee noticias"      on noticias      for select using (publicada or es_personal());
create policy "publico lee eventos"       on eventos       for select using (publicado or es_personal());
create policy "publico lee documentos"    on documentos_publicos for select using (true);
create policy "publico lee convocatorias" on convocatorias for select using (activa or es_personal());

-- Edición del contenido: solo admin y editor
create policy "editor escribe facultades" on facultades for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe carreras"   on carreras   for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe perfil"     on carrera_perfil for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe ciclos"     on ciclos      for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe cursos"     on cursos      for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe programas"  on programas   for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe paginas"    on paginas     for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe bloques"    on bloques_pagina for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe menu"       on grupos_menu for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe noticias"   on noticias    for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe eventos"    on eventos     for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe documentos" on documentos_publicos for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "editor escribe convocatorias" on convocatorias for all using (es_personal(array['admin','editor'])) with check (es_personal(array['admin','editor']));
create policy "admin escribe periodos"    on periodos_admision for all using (es_personal(array['admin','admisiones'])) with check (es_personal(array['admin','admisiones']));
create policy "admin escribe requisitos"  on requisitos_admision for all using (es_personal(array['admin','admisiones'])) with check (es_personal(array['admin','admisiones']));

-- Postulantes: cada persona ve y edita solo sus datos y sus postulaciones
create policy "postulante ve su perfil"   on postulantes for select using (id = auth.uid() or es_personal(array['admin','admisiones']));
create policy "postulante crea su perfil" on postulantes for insert with check (id = auth.uid());
create policy "postulante edita su perfil" on postulantes for update using (id = auth.uid()) with check (id = auth.uid());

create policy "postulante gestiona sus postulaciones" on postulaciones for all
  using (postulante_id = auth.uid() or es_personal(array['admin','admisiones']))
  with check (postulante_id = auth.uid());

create policy "postulante gestiona sus documentos" on documentos_postulacion for all
  using (
    exists (select 1 from postulaciones p where p.id = postulacion_id and p.postulante_id = auth.uid())
    or es_personal(array['admin','admisiones'])
  )
  with check (
    exists (select 1 from postulaciones p where p.id = postulacion_id and p.postulante_id = auth.uid())
  );

create policy "postulante ve sus pagos" on pagos for select
  using (postulante_id = auth.uid() or es_personal(array['admin']));

-- Atención: el público puede enviar; solo el personal lee y responde
create policy "publico envia consultas"   on consultas for insert with check (true);
create policy "atencion lee consultas"    on consultas for select using (es_personal(array['admin','atencion']));
create policy "atencion actualiza consultas" on consultas for update using (es_personal(array['admin','atencion'])) with check (es_personal(array['admin','atencion']));

create policy "publico envia reclamos"    on reclamos for insert with check (true);
create policy "atencion gestiona reclamos" on reclamos for all using (es_personal(array['admin','atencion'])) with check (es_personal(array['admin','atencion']));

create policy "publico envia denuncias"   on denuncias for insert with check (true);
create policy "admin lee denuncias"       on denuncias for select using (es_personal(array['admin']));
create policy "admin gestiona denuncias"  on denuncias for update using (es_personal(array['admin'])) with check (es_personal(array['admin']));

create policy "publico envia tramites"    on tramites for insert with check (true);
create policy "atencion gestiona tramites" on tramites for all using (es_personal(array['admin','atencion'])) with check (es_personal(array['admin','atencion']));

-- Personal: cada persona ve su ficha; el admin gestiona al personal
create policy "personal ve su ficha"      on personal for select using (id = auth.uid() or es_personal(array['admin']));
create policy "admin gestiona personal"   on personal for all using (es_personal(array['admin'])) with check (es_personal(array['admin']));

-- Auditoría: solo lectura para el admin (las escrituras las hace el servidor)
create policy "admin lee auditoria"       on auditoria for select using (es_personal(array['admin']));

-- =====================================================================
-- 7. DATOS DE EJEMPLO (opcional, para probar la web)
-- =====================================================================

insert into facultades (nombre, slug, orden) values
  ('Ingeniería y Tecnología', 'ingenieria-tecnologia', 1),
  ('Ciencias de la Salud', 'ciencias-salud', 2),
  ('Ciencias Empresariales', 'ciencias-empresariales', 3);

insert into carreras (facultad_id, nombre, slug, tipo, grado, duracion_ciclos, perfil)
select f.id, c.nombre, c.slug, 'pregrado', c.grado, 10, c.perfil
from (values
  ('ingenieria-tecnologia', 'Ingeniería de Inteligencia Artificial y Ciencia de Datos', 'ia-ciencia-datos', 'Ingeniero/a de Inteligencia Artificial y Ciencia de Datos', 'Formación para diseñar y poner en producción modelos de inteligencia artificial.'),
  ('ingenieria-tecnologia', 'Ingeniería de Ciberseguridad y Redes', 'ciberseguridad-redes', 'Ingeniero/a en Ciberseguridad y Redes', 'Formación para proteger redes y sistemas frente a amenazas.'),
  ('ciencias-empresariales', 'Negocios Digitales e Innovación', 'negocios-digitales', 'Licenciado/a en Negocios Digitales e Innovación', 'Formación para liderar la transformación digital de organizaciones.'),
  ('ciencias-salud', 'Psicología y Bienestar Mental', 'psicologia-bienestar', 'Licenciado/a en Psicología', 'Formación en evaluación, acompañamiento y promoción del bienestar mental.')
) as c(fslug, nombre, slug, grado, perfil)
join facultades f on f.slug = c.fslug;

insert into periodos_admision (codigo, nombre, inicio_postulacion, fin_postulacion, activo)
values ('2027-I', 'Admisión 2027 · Primer periodo', '2026-11-01', '2027-01-31', true);
