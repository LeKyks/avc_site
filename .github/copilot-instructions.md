# Instructions Copilot - Projet Liste de Courses Raclette 🧀

## Vue d'ensemble du projet

Application web full-stack minimaliste pour gérer une liste de courses pour raclette. Design chaleureux et élégant, déployée gratuitement sur GitHub Pages.

## Stack Technique

### Frontend
- **Vanilla JavaScript** (ES6+) - Pas de React/Vue/Angular
- **Tailwind CSS** - Via CDN, palette de couleurs chaudes obligatoire
- **Vite** - Build tool pour optimisation
- **Google Fonts** - Comfortaa (titres) + Nunito (corps)

### Backend  
- **Node.js 18+** avec Express.js
- **JSON File Database** - `backend/data/items.json`
- **CORS** activé pour compatibilité GitHub Pages

## Structure du Projet

```
📁 .github/
├── workflows/deploy.yml           # CI/CD automatique
├── copilot-instructions.md        # Ce fichier
└── instructions/
    ├── frontend.instructions.md    # Instructions frontend
    └── backend.instructions.md     # Instructions backend

📁 frontend/
├── src/
│   ├── index.html
│   ├── styles/main.css
│   └── scripts/app.js
├── package.json
└── vite.config.js

📁 backend/
├── server.js
├── routes/items.js
├── data/items.json
└── package.json
```

## Règles Globales de Code

### Design & Palette de Couleurs (STRICT)
- **Primaire**: `#FFA726` (orange doux)
- **Secondaire**: `#FFD54F` (jaune chaud)  
- **Fond**: `#FFF8E1` (crème léger)
- **Texte**: `#5D4037` (brun chaud)
- **Accents**: `#FF7043` (corail)
- ❌ **INTERDIT**: Couleurs froides (bleu, vert, violet, gris froid)

### Typographie
- Titres: `Comfortaa` (Google Fonts)
- Corps: `Nunito` (Google Fonts)
- Design épuré, minimaliste, professionnel mais chaleureux

### API REST Format

Toutes les routes suivent ce format strict:

```javascript
// GET /api/items
{ items: [{id, name, quantity}] }

// POST /api/items (body: {name, quantity})
{ item: {id, name, quantity} }

// DELETE /api/items/:id
{ success: true }
```

## Commandes de Build

### Frontend
```bash
cd frontend
npm install
npm run dev      # Dev server (Vite)
npm run build    # Production build
```

### Backend  
```bash
cd backend
npm install
npm start        # Serveur sur http://localhost:3000
npm run dev      # Mode watch (--watch flag)
```

## Déploiement

### GitHub Actions Automatique
- **Trigger**: Push sur branche `main`
- **Process**: Build frontend → Deploy sur `gh-pages`
- **Configuration**: Déjà configurée dans `.github/workflows/deploy.yml`

### GitHub Pages
- URL: `https://<username>.github.io/<repo-name>/`
- Source: Branche `gh-pages` / root
- Configuration automatique via workflow

## Standards de Code

### JavaScript
- ES6+ obligatoire (async/await, destructuring, arrow functions)
- camelCase pour variables/fonctions
- Gestion d'erreurs avec try/catch systématique
- Pas de `var`, utiliser `const` et `let`

### HTML/CSS
- Sémantique HTML5 stricte
- Tailwind CSS uniquement (pas de CSS-in-JS)
- Mobile-first responsive
- Accessibilité WCAG AA minimum (aria-labels, rôles)

### Backend Express
- Routes modulaires dans `routes/`
- Middleware: express.json(), cors()
- Validation des inputs obligatoire
- HTTP status codes appropriés (200, 201, 400, 404, 500)

## Gestion de la Base de Données JSON

Structure du fichier `backend/data/items.json`:
```json
{
  "items": [
    {"id": 1, "name": "Fromage à raclette", "quantity": "1kg"}
  ],
  "nextId": 2
}
```

- Auto-incrémentation des IDs
- Lecture/écriture synchrone (fs.readFileSync/writeFileSync)
- Validation: `name` requis, `quantity` optionnelle

## Ce que Copilot DOIT Suggérer
- Code simple, lisible, maintenable
- Patterns JavaScript modernes
- Améliorations UX intuitives
- Optimisations de performance justifiées
- Accessibilité améliorée

## Ce que Copilot NE DOIT PAS Faire
- Proposer React/Vue/Angular ou frameworks lourds
- Utiliser des couleurs froides (bleu, vert, violet)
- Sur-architecturer (microservices, DDD, patterns complexes)
- Ignorer les contraintes de déploiement gratuit GitHub Pages
- Ajouter TypeScript sans justification
- Proposer SQLite ou autres DB lourdes

## Points d'Évolution Possibles
- Migration vers Firebase/Supabase pour persistance cloud
- PWA avec Service Workers pour mode offline
- Tests automatisés (Vitest frontend, Jest backend)
- WebSockets pour sync real-time multi-utilisateurs
- Authentication basique (JWT)

## Philosophie du Projet

> "Code élégant, simple et fonctionnel. Un site inutile mais magnifiquement réalisé."

Privilégie toujours :
1. **Simplicité** avant complexité
2. **Lisibilité** avant cleverness  
3. **Performance** sans sur-optimisation
4. **Accessibilité** dès le départ
5. **Design chaleureux** et accueillant
