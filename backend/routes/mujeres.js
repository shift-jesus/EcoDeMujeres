const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database/init');
const { verifyToken } = require('../auth');

const router = express.Router();

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = 'uploads/';
        if (file.fieldname === 'foto') folder += 'images/';
        else if (file.fieldname === 'audio') folder += 'audios/';
        else if (file.fieldname === 'consentimiento_pdf') folder += 'pdfs/';
        else folder += 'misc/';
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });

// ============ RUTAS PÚBLICAS (GET) ============
// Obtener todas las mujeres
router.get('/', (req, res) => {
    db.all('SELECT * FROM mujeres ORDER BY id', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Obtener una mujer por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM mujeres WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Mujer no encontrada' });
        res.json(row);
    });
});

// ============ RUTAS PROTEGIDAS (requieren token) ============
// Crear nueva mujer (con archivos)
router.post('/', verifyToken, upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'consentimiento_pdf', maxCount: 1 }
]), (req, res) => {
    const { body, files } = req;
    const foto = files.foto ? '/uploads/images/' + files.foto[0].filename : null;
    const audio = files.audio ? '/uploads/audios/' + files.audio[0].filename : null;
    const consentimiento_pdf = files.consentimiento_pdf ? '/uploads/pdfs/' + files.consentimiento_pdf[0].filename : null;

    const {
        nombre,
        años_en_sector,
        años_texto,
        rol,
        por_que_conocida,
        que_ha_hecho,
        descripcion_narrativa,
        color_acento,
        color_fondo,
        transcripcion,
        esLider
    } = body;

    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    db.run(
        `INSERT INTO mujeres (
            nombre, años_en_sector, años_texto, rol, por_que_conocida,
            que_ha_hecho, descripcion_narrativa, color_acento, color_fondo,
            foto, consentimiento_pdf, audio, transcripcion, esLider
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nombre, años_en_sector, años_texto, rol, por_que_conocida,
            que_ha_hecho, descripcion_narrativa, color_acento, color_fondo,
            foto, consentimiento_pdf, audio, transcripcion, esLider || 0
        ],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            db.get('SELECT * FROM mujeres WHERE id = ?', [this.lastID], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(row);
            });
        }
    );
});

// Actualizar mujer existente
router.put('/:id', verifyToken, upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'consentimiento_pdf', maxCount: 1 }
]), (req, res) => {
    const { id } = req.params;
    const { body, files } = req;

    // Obtener la mujer actual para eliminar archivos viejos
    db.get('SELECT * FROM mujeres WHERE id = ?', [id], (err, current) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!current) return res.status(404).json({ error: 'Mujer no encontrada' });

        const foto = files.foto ? '/uploads/images/' + files.foto[0].filename : current.foto;
        const audio = files.audio ? '/uploads/audios/' + files.audio[0].filename : current.audio;
        const consentimiento_pdf = files.consentimiento_pdf ? '/uploads/pdfs/' + files.consentimiento_pdf[0].filename : current.consentimiento_pdf;

        // Eliminar archivos antiguos si se reemplazan
        if (files.foto && current.foto) fs.unlink(path.join(__dirname, '..', current.foto), () => {});
        if (files.audio && current.audio) fs.unlink(path.join(__dirname, '..', current.audio), () => {});
        if (files.consentimiento_pdf && current.consentimiento_pdf) fs.unlink(path.join(__dirname, '..', current.consentimiento_pdf), () => {});

        const {
            nombre,
            años_en_sector,
            años_texto,
            rol,
            por_que_conocida,
            que_ha_hecho,
            descripcion_narrativa,
            color_acento,
            color_fondo,
            transcripcion,
            esLider
        } = body;

        db.run(
            `UPDATE mujeres SET
                                nombre = ?, años_en_sector = ?, años_texto = ?, rol = ?,
                                por_que_conocida = ?, que_ha_hecho = ?, descripcion_narrativa = ?,
                                color_acento = ?, color_fondo = ?, foto = ?, consentimiento_pdf = ?,
                                audio = ?, transcripcion = ?, esLider = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [
                nombre, años_en_sector, años_texto, rol, por_que_conocida,
                que_ha_hecho, descripcion_narrativa, color_acento, color_fondo,
                foto, consentimiento_pdf, audio, transcripcion, esLider, id
            ],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                db.get('SELECT * FROM mujeres WHERE id = ?', [id], (err, row) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json(row);
                });
            }
        );
    });
});

// Eliminar mujer
router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM mujeres WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Mujer no encontrada' });

        // Eliminar archivos asociados
        [row.foto, row.audio, row.consentimiento_pdf].forEach(filePath => {
            if (filePath) fs.unlink(path.join(__dirname, '..', filePath), () => {});
        });

        db.run('DELETE FROM mujeres WHERE id = ?', [id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Mujer eliminada correctamente' });
        });
    });
});

module.exports = router;