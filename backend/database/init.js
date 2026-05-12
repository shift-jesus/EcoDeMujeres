// backend/database/init.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error al conectar:', err.message);
    else console.log('Conectado a SQLite en', dbPath);
});

// Crear tabla mujeres
db.run(`
    CREATE TABLE IF NOT EXISTS mujeres (
                                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           nombre TEXT NOT NULL,
                                           años_en_sector INTEGER,
                                           años_texto TEXT,
                                           rol TEXT,
                                           por_que_conocida TEXT,
                                           que_ha_hecho TEXT,
                                           descripcion_narrativa TEXT,
                                           color_acento TEXT,
                                           color_fondo TEXT,
                                           foto TEXT,
                                           consentimiento_pdf TEXT,
                                           audio TEXT,
                                           transcripcion TEXT,
                                           esLider INTEGER DEFAULT 0,
                                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) console.error('Error creando tabla mujeres:', err.message);
    else console.log('Tabla "mujeres" lista');
});

// Crear tabla usuarios
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
                                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                                            email TEXT UNIQUE NOT NULL,
                                            password TEXT NOT NULL,
                                            role TEXT DEFAULT 'admin',
                                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) console.error('Error creando tabla usuarios:', err.message);
    else console.log('Tabla "usuarios" lista');
});

// Insertar tres cuentas fijas (si no existen)
const usuariosPredefinidos = [
    { email: 'admin1@ecodemujeres.com', password: 'admin123' },
    { email: 'admin2@ecodemujeres.com', password: 'admin456' },
    { email: 'admin3@ecodemujeres.com', password: 'admin789' }
];

usuariosPredefinidos.forEach(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    db.run(
        `INSERT OR IGNORE INTO usuarios (email, password) VALUES (?, ?)`,
        [user.email, hashedPassword],
        function(err) {
            if (err) console.error('Error insertando usuario:', err.message);
            else if (this.changes > 0) console.log(`Usuario ${user.email} creado`);
        }
    );
});

module.exports = db;