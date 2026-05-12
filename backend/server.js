const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mujeresRoutes = require('./routes/mujeres');
const { login, verifyToken } = require('./auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta de login (pública)
app.post('/api/auth/login', login);

// Rutas protegidas de mujeres (solo con token válido)
app.use('/api/mujeres', mujeresRoutes);   // sin verifyToken

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});