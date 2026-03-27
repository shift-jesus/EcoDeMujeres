# Eco de Mujeres

> Archivo digital para visibilizar a mujeres líderes comunitarias de Cartagena, Colombia — con historias, audios y documentos de consentimiento.

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

## Módulos

### Catálogo de mujeres

| Sección | Descripción |
|---------|-------------|
| 🌟 Líderes comunitarias | Mujeres con rol activo en juntas, educación o liderazgo social |
| 🎙️ Otras voces | Participantes de entrevistas que aportan perspectivas sobre la realidad del barrio |

Cada perfil incluye:

- Nombre, años en el sector y rol
- Narrativa personal
- Testimonio en audio con reproductor integrado
- Transcripción con formato diálogo (presentadora ↔ respuesta)
- Documento de consentimiento informado (PDF)

### Panel de administración

- Login seguro con **JWT** y tres cuentas predefinidas
- Gestión completa de perfiles: crear, editar, eliminar
- Subida de archivos: imágenes, audios (`mp3`, `mp4`, `m4a`, `aac`), PDFs
- Vista grid/lista con botones de edición y eliminación en las tarjetas
- Modal con formulario completo para todos los campos

### Página de audios

- Lista de todas las mujeres con testimonio de audio
- Reproductor con controles nativos y manejo de errores
- Transcripciones desplegables (mostrar más / menos) con formato de diálogo
- Badge 🌟 de distinción para líderes comunitarias

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
- HTML5 Audio — reproductor nativo con manejo de errores

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

```
eco-de-mujeres/
├── backend/
│   ├── database/
│   │   ├── init.js              # crea tablas e inserta usuarios
│   │   └── database.sqlite      # archivo SQLite (generado automáticamente)
│   ├── routes/
│   │   └── mujeres.js           # rutas CRUD para mujeres
│   ├── auth.js                  # middleware JWT + login
│   ├── server.js                # servidor Express
│   ├── package.json
│   └── uploads/
│       ├── images/
│       ├── audios/
│       └── pdfs/
├── public/
│   └── images/                  # imágenes estáticas
├── src/
│   ├── components/
│   │   ├── MujerCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx           # sección Rutas de Apoyo
│   ├── pages/
│   │   ├── Landing.jsx          # inicio con efecto de partículas
│   │   ├── Mujeres.jsx          # catálogo
│   │   ├── Perfil.jsx           # perfil individual
│   │   ├── Audios.jsx           # reproductor + transcripciones
│   │   └── Admin.jsx            # panel de administración
│   ├── index.jsx
│   └── index.css                # variables globales y estilos base
├── package.json
└── README.md
```

---

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/eco-de-mujeres.git
cd eco-de-mujeres
```

### 2. Configura el backend

```bash
cd backend
npm install
```

Crea el archivo `.env` (opcional):

```
PORT=5000
JWT_SECRET=tu_clave_secreta
```

### 3. Inicializa la base de datos

```bash
node database/init.js    # crea tablas y usuarios admin
node seed.js             # (opcional) inserta datos de ejemplo
```

### 4. Arranca el servidor

```bash
npm run dev
```

```
Servidor corriendo en http://localhost:5000
```

### 5. Arranca el frontend

Desde la raíz del proyecto:

```bash
npm install
npm start
```

```
Aplicación disponible en http://localhost:3000
```

---

## API

### `GET /api/mujeres` — Todas las mujeres

```json
[
  {
    "id": 1,
    "nombre": "Ana Milena Galán",
    "rol": "Líder de Junta de Acción Comunal",
    "audio": "http://localhost:5000/uploads/audios/...",
    "esLider": 1
  }
]
```

### `GET /api/mujeres/:id` — Perfil individual

Devuelve un perfil específico con todos sus campos.

### `POST /api/auth/login` — Autenticación

```json
{
  "email": "admin1@ecodemujeres.com",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "admin1@ecodemujeres.com" }
}
```

### Rutas protegidas

Requieren header: `Authorization: Bearer <token>`

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/mujeres` | Crear perfil (multipart/form-data) |
| `PUT` | `/api/mujeres/:id` | Actualizar perfil |
| `DELETE` | `/api/mujeres/:id` | Eliminar perfil |

### Credenciales predefinidas

| Email | Contraseña |
|-------|------------|
| admin1@ecodemujeres.com | admin123 |
| admin2@ecodemujeres.com | admin456 |
| admin3@ecodemujeres.com | admin789 |

---

## Base de datos

SQLite se crea automáticamente en `backend/database/database.sqlite` al arrancar.

```sql
mujeres    -- perfiles, narrativas, rutas de archivos, color, esLider
usuarios   -- cuentas admin con contraseña hasheada (bcrypt)
```

Explorador visual recomendado: **DB Browser for SQLite** (gratuito).

### Tabla `mujeres` — campos principales

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT |
| `nombre` | TEXT | NOT NULL |
| `rol` | TEXT | — |
| `descripcion_narrativa` | TEXT | — |
| `foto` | TEXT | Ruta del archivo |
| `audio` | TEXT | Ruta del archivo |
| `consentimiento_pdf` | TEXT | Ruta del archivo |
| `transcripcion` | TEXT | — |
| `esLider` | INTEGER | DEFAULT 0 |
| `color_acento` / `color_fondo` | TEXT | Personalización visual |

---

## Changelog

### v1.0
- Frontend completo con React Router y CSS Modules
- Backend con Express, SQLite y autenticación JWT
- Panel de administración con gestión completa de perfiles (CRUD)
- Subida de archivos (fotos, audios, PDFs) con Multer
- Página de inicio con efecto de partículas que siguen el mouse
- Catálogo con vista grid/lista y separación líderes / otras voces
- Página de audios con reproductor y transcripciones colapsables en formato diálogo
- Rutas de Apoyo integradas en el footer global
- Diseño responsivo — paleta naranja, blanco y negro
- API pública para consulta de perfiles sin autenticación
- Base de datos con datos iniciales: 4 líderes + 9 participantes

---

## Licencia

MIT © 2026 **Eco de Mujeres** — Proyecto de Estudiantes de Ingeniería · Universidad UniNúñez
