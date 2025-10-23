import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemsRouter);

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: '🧀 API Liste de Courses Raclette',
    endpoints: {
      'GET /api/items': 'Récupérer tous les items',
      'POST /api/items': 'Ajouter un item',
      'DELETE /api/items/:id': 'Supprimer un item'
    }
  });
});

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Une erreur est survenue' });
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 API disponible sur http://localhost:${PORT}/api/items`);
});
