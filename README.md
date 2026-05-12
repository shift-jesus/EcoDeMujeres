markdown
# Eco de Mujeres

> Archivo digital para visibilizar a mujeres líderes comunitarias de Cartagena, Colombia — con historias, audios, documentos de consentimiento y seudónimos para proteger la identidad de las entrevistadas.

![Version](https://img.shields.io/badge/version-1.0-ff8c00?style=flat-square)
![Node](https://img.shields.io/badge/node-18+-green?style=flat-square)
![React](https://img.shields.io/badge/react-18.2-61dafb?style=flat-square)
![SQLite](https://img.shields.io/badge/sqlite-3-003b57?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## ¿Qué es Eco de Mujeres?

**Eco de Mujeres** es una plataforma digital que documenta y difunde las historias de mujeres líderes comunitarias en Cartagena de Indias. A través de perfiles individuales, testimonios en audio, transcripciones y documentos de consentimiento informado, se busca preservar la memoria y dar visibilidad a mujeres que transforman sus barrios desde adentro.

El proyecto incluye un **panel de administración** con autenticación JWT para gestionar perfiles, subir archivos (fotos, audios, PDFs) y editar contenido. Todos los datos se almacenan en SQLite y el frontend consume una API REST desarrollada con Express.

---

## Novedades (última versión)

- **Seudónimos**: las participantes pueden aparecer con un nombre ficticio. En el formulario de admin se marca la casilla `Pseudonimo` y se guarda su nombre real (opcional). La etiqueta `Pseudonimo` se muestra en la tarjeta y en el perfil.
- **Dashboard de KPIs**: en la página de inicio se ha añadido una sección tipo dashboard con indicadores clave extraídos de las transcripciones (porcentajes con animación circular y barras).
- **Reproducción única de audios**: en la página `/audios` solo se permite un audio activo a la vez.
- **Nuevos campos en la base de datos**: `es_seudonimo` (INTEGER, 0/1) y `seudonimo` (TEXT) para almacenar el nombre real opcional.

---

## Módulos

### Catálogo de mujeres

| Sección | Descripción |
|---------|-------------|
| 🌟 Líderes comunitarias | Mujeres con rol activo en juntas, educación o liderazgo social (nombres reales) |
| 🎙️ Otras voces | Participantes con seudónimo (etiqueta "Pseudonimo") |

Cada perfil incluye:

- Nombre, años en el sector y rol
- Narrativa personal
- Testimonio en audio con reproductor integrado
- Transcripción con formato diálogo (presentadora ↔ respuesta)
- Documento de consentimiento informado (PDF)
- (Opcional) indicador de seudónimo

### Panel de administración

- Login seguro con **JWT** y tres cuentas predefinidas
- Gestión completa de perfiles: crear, editar, eliminar
- Subida de archivos: imágenes, audios (`mp3`, `mp4`, `m4a`, `aac`), PDFs
- Vista grid/lista con botones de edición y eliminación en las tarjetas
- Modal con formulario completo para todos los campos, incluyendo:
    - `Pseudonimo` (checkbox)
    - `Nombre real (opcional)` (solo si se marca el checkbox)

### Página de audios

- Lista de todas las mujeres con testimonio de audio
- Reproductor con controles nativos y manejo de errores
- **Reproducción única**: al iniciar un audio se detiene automáticamente cualquier otro
- Transcripciones desplegables (mostrar más / menos) con formato de diálogo
- Badge 🌟 de distinción para líderes comunitarias

### Página de inicio (Landing)

- Hero con efecto de partículas interactivas (siguen al mouse)
- Slider de frases de seudónimos
- Muestra las 4 líderes comunitarias (con nombres reales)
- **Sección Dashboard de KPIs**: tarjetas con porcentajes, iconos y gráficos circulares que resumen la realidad de las mujeres entrevistadas (madres cabeza de hogar, educación, empleo, machismo, etc.)

### Rutas de Apoyo

- Sección integrada en el footer global
- Recursos para mujeres y familias en Cartagena: salud mental, apoyo social, asesoría legal
- Líneas de ayuda inmediata

---

## Stack

**Frontend**
- React 18 + React Router DOM — navegación SPA
- CSS Modules — estilos por componente
- Fetch API — comunicación con el backend
- HTML5 Audio — reproductor nativo con manejo de errores y control de reproducción única
- Gráficos circulares con SVG (nativo)

**Backend**
- Node.js + Express
- SQLite3 — base de datos local
- Multer — subida de archivos (imágenes, audios, PDFs)
- JSON Web Token (JWT) — autenticación
- bcrypt — hashing de contraseñas
- CORS — habilitado para el frontend

**Datos**
- Archivos subidos en `backend/uploads/`
- Base de datos SQLite con tablas `mujeres` y `usuarios`
- API pública GET para consulta sin autenticación

---

## Estructura del proyecto
eco-de-mujeres/
├── backend/
│ ├── database/
│ │ ├── init.js # crea tablas e inserta usuarios
│ │ └── database.sqlite # archivo SQLite (generado automáticamente)
│ ├── routes/
│ │ └── mujeres.js # rutas CRUD para mujeres
│ ├── auth.js # middleware JWT + login
│ ├── server.js # servidor Express
│ ├── package.json
│ └── uploads/
│ ├── images/
│ ├── audios/
│ └── pdfs/
├── public/
│ └── images/ # imágenes estáticas
├── src/
│ ├── components/
│ │ ├── MujerCard.jsx # tarjeta de perfil (muestra "Pseudonimo" si aplica)
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx # sección Rutas de Apoyo
│ │ └── KpiDashboard.jsx # nuevo componente con gráficos circulares (KPIs)
│ ├── pages/
│ │ ├── Landing.jsx # inicio con efecto de partículas y KpiDashboard
│ │ ├── Mujeres.jsx # catálogo
│ │ ├── Perfil.jsx # perfil individual (campo "Pseudonimo")
│ │ ├── Audios.jsx # reproductor con reproducción única
│ │ └── Admin.jsx # panel de administración (soporta seudónimos)
│ ├── index.jsx
│ └── index.css # variables globales y estilos base
├── package.json
└── README.md

text

---

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/eco-de-mujeres.git
cd eco-de-mujeres
2. Configura el backend
bash
cd backend
npm install
Crea el archivo .env (opcional):

text
PORT=5000
JWT_SECRET=tu_clave_secreta
3. Inicializa la base de datos
bash
node database/init.js    # crea tablas y usuarios admin
node seed.js             # (opcional) inserta datos de ejemplo
Para agregar las columnas de seudónimo, ejecuta:

bash
node add-seudonimo-columns.js   # (proporcionado en la documentación)
4. Arranca el servidor
bash
npm run dev
text
Servidor corriendo en http://localhost:5000
5. Arranca el frontend
Desde la raíz del proyecto:

bash
npm install
npm start
text
Aplicación disponible en http://localhost:3000
API
GET /api/mujeres — Todas las mujeres
json
[
  {
    "id": 1,
    "nombre": "Ana Milena Galán",
    "rol": "Líder de Junta de Acción Comunal",
    "audio": "http://localhost:5000/uploads/audios/...",
    "esLider": 1,
    "es_seudonimo": 0,
    "seudonimo": null
  }
]
GET /api/mujeres/:id — Perfil individual
Devuelve un perfil específico con todos sus campos (incluyendo es_seudonimo, seudonimo).

POST /api/auth/login — Autenticación
json
{
  "email": "admin1@ecodemujeres.com",
  "password": "admin123"
}
Respuesta:

json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "admin1@ecodemujeres.com" }
}
Rutas protegidas
Requieren header: Authorization: Bearer <token>

Método	Ruta	Descripción
POST	/api/mujeres	Crear perfil (multipart/form-data)
PUT	/api/mujeres/:id	Actualizar perfil
DELETE	/api/mujeres/:id	Eliminar perfil
Credenciales predefinidas
Email	Contraseña
admin1@ecodemujeres.com	admin123
admin2@ecodemujeres.com	admin456
admin3@ecodemujeres.com	admin789
Base de datos
SQLite se crea automáticamente en backend/database/database.sqlite al arrancar.

sql
mujeres    -- perfiles, narrativas, rutas de archivos, color, esLider, es_seudonimo, seudonimo
usuarios   -- cuentas admin con contraseña hasheada (bcrypt)
Explorador visual recomendado: DB Browser for SQLite (gratuito).

Tabla mujeres — campos actualizados
Campo	Tipo	Notas
id	INTEGER	PRIMARY KEY AUTOINCREMENT
nombre	TEXT	NOT NULL
rol	TEXT	—
descripcion_narrativa	TEXT	—
foto	TEXT	Ruta del archivo
audio	TEXT	Ruta del archivo
consentimiento_pdf	TEXT	Ruta del archivo
transcripcion	TEXT	—
esLider	INTEGER	DEFAULT 0
color_acento / color_fondo	TEXT	Personalización visual
es_seudonimo	INTEGER	DEFAULT 0 (1 = es nombre ficticio)
seudonimo	TEXT	Almacena el nombre real (opcional)
Changelog
v1.1 (actual)
Seudónimos: soporte completo en backend y frontend, etiqueta visible en tarjetas y perfil.

Dashboard de KPIs: nueva sección en el Landing con gráficos circulares (datos extraídos de transcripciones).

Reproducción única en audios: mejora de la experiencia al escuchar testimonios.

Formulario de administración: checkbox Pseudonimo y campo Nombre real (opcional).

Corrección de estilos: etiqueta "Pseudonimo" con color naranja y cursiva.

v1.0
Frontend completo con React Router y CSS Modules

Backend con Express, SQLite y autenticación JWT

Panel de administración con gestión completa de perfiles (CRUD)

Subida de archivos (fotos, audios, PDFs) con Multer

Página de inicio con efecto de partículas que siguen el mouse

Catálogo con vista grid/lista y separación líderes / otras voces

Página de audios con reproductor y transcripciones colapsables en formato diálogo

Rutas de Apoyo integradas en el footer global

Diseño responsivo — paleta naranja, blanco y negro

API pública para consulta de perfiles sin autenticación

Base de datos con datos iniciales: 4 líderes + 9 participantes

Licencia
MIT © 2026 Eco de Mujeres — Proyecto de Estudiantes de Ingeniería · Universidad UniNúñez