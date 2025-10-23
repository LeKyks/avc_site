import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataPath = path.join(__dirname, '../data/items.json');

// Fonction helper pour lire les données
const readData = () => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

// Fonction helper pour écrire les données
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

// GET /api/items - Récupérer tous les items
router.get('/', (req, res) => {
  try {
    const data = readData();
    res.json({ items: data.items });
  } catch (error) {
    console.error('Erreur lecture items:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/items - Ajouter un item
router.post('/', (req, res) => {
  try {
    const { name, quantity } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Le nom est requis' });
    }

    const data = readData();
    const newItem = {
      id: data.nextId,
      name: name.trim(),
      quantity: quantity?.trim() || ''
    };

    data.items.push(newItem);
    data.nextId += 1;
    writeData(data);

    res.status(201).json({ item: newItem });
  } catch (error) {
    console.error('Erreur ajout item:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/items/:id - Supprimer un item
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = readData();

    const itemIndex = data.items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item non trouvé' });
    }

    data.items.splice(itemIndex, 1);
    writeData(data);

    res.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression item:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
