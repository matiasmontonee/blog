require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de auth (registro/login)
app.use('/auth', authRoutes);

// Protegemos CRUD de posts: sólo usuarios logueados
app.use('/posts', protect, postRoutes);

// handler de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`API corriendo en http://localhost:${PORT}`)
);