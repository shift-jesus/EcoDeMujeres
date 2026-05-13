

```
markdown
```
# 🌸 Eco de Mujeres

> Plataforma digital para visibilizar a mujeres líderes comunitarias de Cartagena, Colombia — con historias, audios, documentos de consentimiento y asistente virtual interactivo.

![Version](https://img.shields.io/badge/version-1.1-ff8c00?style=flat-square)
![Node](https://img.shields.io/badge/node-18+-green?style=flat-square)
![React](https://img.shields.io/badge/react-18.2-61dafb?style=flat-square)
![SQLite](https://img.shields.io/badge/sqlite-3-003b57?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## 📖 ¿Qué es Eco de Mujeres?

**Eco de Mujeres** es una plataforma digital que documenta y difunde las historias de mujeres líderes comunitarias en Cartagena de Indias. A través de perfiles individuales, testimonios en audio, transcripciones y documentos de consentimiento informado, buscamos preservar la memoria y dar visibilidad a mujeres que transforman sus barrios desde adentro.

El proyecto incluye:
* **Panel de administración** con autenticación JWT
* **Chatbot interactivo** con preguntas frecuentes y redirección a secciones
* **Dashboard de KPIs** con indicadores extraídos de testimonios reales
* **Reproducción única de audios** (solo un audio a la vez)
* **Sistema de seudónimos** para proteger la identidad de las entrevistadas

---

## ✨ Novedades (v1.1)

| Característica | Descripción |
|---|---|
| 🤖 **Chatbot inteligente** | Asistente virtual con 8 preguntas frecuentes y redirección automática a secciones como Audios y Mujeres |
| 🔗 **Redirección automática** | Al hacer clic en "¿Cómo escuchar testimonios?" el chatbot redirige a la página de Audios |
| 🎨 **Diseño mejorado** | Chatbot con scroll independiente y mejor organización visual |
| 📊 **KPIs actualizados** | Indicadores basados en testimonios reales de las entrevistadas |

---

## 🗂️ Módulos

### Catálogo de mujeres

| Sección | Descripción |
|---|---|
| 🌟 **Líderes comunitarias** | Mujeres con rol activo en juntas, educación o liderazgo social (nombres reales) |
| 🎙️ **Otras voces** | Participantes con seudónimo (etiqueta "Pseudonimo") |

Cada perfil incluye:
* Nombre, años en el sector y rol
* Narrativa personal
* Testimonio en audio con reproductor integrado
* Transcripción con formato diálogo (presentadora ↔ respuesta)
* Documento de consentimiento informado (PDF)
* (Opcional) indicador de seudónimo
### 🤖 Chatbot interactivo

| Función | Descripción |
|---|---|
| **Preguntas frecuentes** | 8 preguntas predefinidas sobre el proyecto |
| **Redirección automática** | Al hacer clic en "¿Cómo escuchar testimonios?" → redirige a `/audios` |
| **Redirección a líderes** | Al hacer clic en "¿Quiénes son las mujeres líderes?" → redirige a `/mujeres` |
| **Copia de correo** | Botón para copiar el correo de contacto al portapapeles |
| **Modo oscuro/claro** | Se adapta al tema del sistema |

### 📊 Dashboard de KPIs

La página de inicio incluye indicadores clave extraídos de los testimonios:

| Indicador | Porcentaje |
|---|---|
| Madres cabeza de hogar | 70% |
| No completaron estudios superiores | 85% |
| Desean emprender negocio propio | 65% |
| Mencionan machismo como obstáculo | 40% |
| Reciben apoyo familiar | 60% |
| Trabajan en oficios informales | 75% |
| Creen que la educación influye mucho | 90% |
| Abandonaron estudios por hijos | 50% |

### Panel de administración

* Login seguro con **JWT** y cuentas predefinidas
* Gestión completa de perfiles: crear, editar, eliminar
* Subida de archivos: imágenes, audios (`mp3`, `mp4`, `m4a`, `aac`), PDFs
* Vista grid/lista con botones de edición y eliminación
* Modal con formulario completo, incluyendo:
  * `Pseudonimo` (checkbox)
  * `Nombre real (opcional)`

### Página de audios

* Lista de todas las mujeres con testimonio de audio
* **Reproducción única**: al iniciar un audio se detiene automáticamente cualquier otro
* Transcripciones desplegables (mostrar más / menos) con formato de diálogo
* Badge 🌟 de distinción para líderes comunitarias
``
### Rutas de Apoyo

* Sección integrada en el footer global
* Recursos para mujeres y familias en Cartagena: salud mental, apoyo social, asesoría legal
* Líneas de ayuda inmediata (123, 155, Defensoría del Pueblo)
``

## 🛠️ Stack tecnológico


**Frontend**
* React 18 + React Router DOM — navegación SPA
* CSS Modules — estilos por componente
* Fetch API — comunicación con el backend
* HTML5 Audio — reproductor nativo con manejo de errores y control de reproducción única
* Lucide React — iconos

**Backend**
* Node.js + Express
* SQLite3 — base de datos local
* Multer — subida de archivos (imágenes, audios, PDFs)
* JSON Web Token (JWT) — autenticación
* bcrypt — hashing de contraseñas
* CORS — habilitado para el frontend


`
## 📁 Estructura del proyecto
```
```text
Eco de Mujeres.Offi/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Chatbot.jsx # Asistente virtual
│ │ │ ├── ChatbotButton.jsx # Botón flotante
│ │ │ ├── KpiDashboard.jsx # Gráficas de indicadores
│ │ │ ├── MujerCard.jsx # Tarjeta de perfil
│ │ │ └── ... (otros componentes)
│ │ ├── pages/
│ │ │ ├── Landing.jsx # Página principal
│ │ │ ├── Mujeres.jsx # Catálogo
│ │ │ ├── Perfil.jsx # Perfil individual
│ │ │ ├── Audios.jsx # Reproductor de testimonios
│ │ │ └── Admin.jsx # Panel de administración
│ │ ├── data/
│ │ │ └── mujeres.js # Datos de ejemplo
│ │ └── index.jsx
│ └── package.json
├── backend/
│ ├── database/
│ │ ├── init.js
│ │ └── database.sqlite
│ ├── routes/
│ │ └── mujeres.js
│ ├── uploads/
│ ├── auth.js
│ ├── server.js
│ └── package.json
├── .gitignore
├── README.md
└── vercel.json

```

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone [https://github.com/shift-jesus/EcoDeMujeres.git](https://github.com/shift-jesus/EcoDeMujeres.git)
cd EcoDeMujeres

```

### 2. Configurar el backend

```bash
cd backend
npm install
node database/init.js   # Crea la base de datos y usuarios
npm run dev

```

*El servidor correrá en `http://localhost:5000*`

### 3. Configurar el frontend

```bash
cd ../frontend
npm install
npm start

```

*La aplicación correrá en `http://localhost:3000*`

---

## 🔐 Credenciales de administrador

| Email | Contraseña |
| --- | --- |
| admin1@ecodemujeres.com | admin123 |
| admin2@ecodemujeres.com | admin456 |
| admin3@ecodemujeres.com | admin789 |

---

## 📡 API Endpoints

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/mujeres` | Obtener todas las mujeres |
| GET | `/api/mujeres/:id` | Obtener una mujer por ID |
| POST | `/api/auth/login` | Autenticación de administrador |
| POST | `/api/mujeres` | Crear nuevo perfil (requiere token) |
| PUT | `/api/mujeres/:id` | Actualizar perfil (requiere token) |
| DELETE | `/api/mujeres/:id` | Eliminar perfil (requiere token) |

---

## 🤖 Uso del Chatbot

El chatbot está disponible en la esquina inferior derecha de todas las páginas. Incluye:

* 8 preguntas frecuentes sobre el proyecto
* Redirección automática a secciones como `/audios` y `/mujeres`
* Copia de correo electrónico para contacto
* Diseño responsivo que se adapta al tema oscuro/claro

---

## 📊 KPIs incluidos

La página de inicio muestra un dashboard con indicadores basados en testimonios reales:

* Madres cabeza de hogar: 70%
* No completaron estudios superiores: 85%
* Desean emprender: 65%
* Machismo como obstáculo: 40%
* Apoyo familiar: 60%
* Trabajo informal: 75%
* Educación como prioridad: 90%
* Abandono de estudios por hijos: 50%

---

## 📄 Licencia

MIT © 2026 Eco de Mujeres — Proyecto de Estudiantes de Ingeniería · Universidad UniNúñez

---

## 📞 Contacto

* **Correo electrónico:** jcampoy21@campusuninunez.edu.co
* **GitHub:** [shift-jesus/EcoDeMujeres](https://www.google.com/search?q=https://github.com/shift-jesus/EcoDeMujeres)

