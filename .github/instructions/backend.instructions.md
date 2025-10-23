---
applyTo: "backend/**/*.js"
---

# Instructions Backend - Développeur Back-End

Tu travailles sur les fichiers du backend Node.js/Express.

## Architecture Express

### Structure Modulaire Obligatoire
```
backend/
├── server.js          # Point d'entrée, config Express
├── routes/
│   └── items.js       # Routes /api/items
└── data/
    └── items.json     # Base de données
```

### Middleware Stack (ordre important)
```javascript
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());                        // 1. CORS first
app.use(express.json());                // 2. Body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemsRouter);

// Error handler last
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur serveur' });
});
```

## Routes API (Contrat Strict)

### GET /api/items
```javascript
router.get('/', (req, res) => {
  try {
    const data = readData();
    res.json({ items: data.items });  // ALWAYS wrap in { items: [...] }
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
```

### POST /api/items
```javascript
router.post('/', (req, res) => {
  const { name, quantity } = req.body;
  
  // Validation
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
  
  res.status(201).json({ item: newItem });  // 201 Created
});
```

### DELETE /api/items/:id
```javascript
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  
  const index = data.items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item non trouvé' });
  }
  
  data.items.splice(index, 1);
  writeData(data);
  
  res.json({ success: true });
});
```

## Gestion Fichier JSON

### Structure Données
```json
{
  "items": [
    {"id": 1, "name": "Fromage", "quantity": "1kg"}
  ],
  "nextId": 2
}
```

### Helpers Read/Write (Synchrone)
```javascript
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../data/items.json');

const readData = () => {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
};

const writeData = (data) => {
  fs.writeFileSync(
    dataPath, 
    JSON.stringify(data, null, 2), 
    'utf8'
  );
};
```

**Pourquoi synchrone?**
- Volume de données faible
- Simplicité du code
- Pas de race conditions possibles
- Performance OK pour usage prévu

## Validation Inputs

### Obligatoire Sur Chaque Route
```javascript
// Vérifier présence
if (!name) return res.status(400).json({ error: 'Champ requis' });

// Vérifier type
if (typeof name !== 'string') return res.status(400).json({ error: 'Type invalide' });

// Trim et sanitize
const cleanName = name.trim();
if (cleanName === '') return res.status(400).json({ error: 'Champ vide' });
```

## HTTP Status Codes (Strict)

- `200` - OK (GET, DELETE success)
- `201` - Created (POST success)
- `400` - Bad Request (validation échouée)
- `404` - Not Found (ressource inexistante)
- `500` - Server Error (erreur inattendue)

**Jamais** de `204 No Content` pour ce projet.

## Variables d'Environnement

```javascript
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`🚀 Serveur sur http://localhost:${PORT}`);
});
```

## Logging

### Development
```javascript
if (NODE_ENV === 'development') {
  console.log('📝 Request:', req.method, req.path, req.body);
}
```

### Production
- Minimal logging
- Pas de console.log de données sensibles
- Erreurs seulement

## Sécurité Basique

```javascript
// Limiter taille body
app.use(express.json({ limit: '100kb' }));

// Headers basiques
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});
```

## Tests Manuels Recommandés

```bash
# GET
curl http://localhost:3000/api/items

# POST
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","quantity":"1"}'

# DELETE
curl -X DELETE http://localhost:3000/api/items/1
```

## Exemples de Suggestions Valides

✅ "Ajouter validation longueur max pour name"
✅ "Implémenter rate limiting basique"
✅ "Améliorer messages d'erreur"
✅ "Ajouter endpoint GET /api/items/:id"

## Exemples de Suggestions INTERDITES

❌ "Migrer vers MongoDB/PostgreSQL"
❌ "Utiliser Sequelize ORM"
❌ "Ajouter TypeScript"
❌ "Implémenter architecture hexagonale"
❌ "Utiliser async/await pour fs.readFile" (synchrone OK ici)
