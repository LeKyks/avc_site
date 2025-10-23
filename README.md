# 🧀 Liste de Courses Raclette

Application web full-stack minimaliste et élégante pour gérer une liste de courses pour raclette.

## ✨ Fonctionnalités

- ➕ Ajouter des articles avec nom et quantité
- 🗑️ Supprimer des articles
- 📱 Interface responsive et accessible
- 🎨 Design chaleureux avec palette de couleurs chaudes
- ⚡ Temps réel avec mise à jour optimiste de l'UI

## 🛠️ Stack Technique

### Frontend
- **Vanilla JavaScript** (ES6+)
- **Tailwind CSS** via CDN
- **Vite** pour le build
- **Google Fonts** (Comfortaa + Nunito)

### Backend
- **Node.js 18+**
- **Express.js**
- **JSON File Database**

## 🚀 Installation Rapide

### Méthode automatique (Windows PowerShell)

```powershell
.\setup.ps1
```

Ce script va :
1. Vérifier Node.js et npm
2. Installer toutes les dépendances
3. Démarrer les serveurs backend et frontend dans des terminaux séparés

### Méthode manuelle

#### Backend
```bash
cd backend
npm install
npm start
# Serveur sur http://localhost:3000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Dev server sur http://localhost:5173
```

## 📁 Structure du Projet

```
📁 .github/
├── workflows/deploy.yml              # CI/CD automatique
├── copilot-instructions.md           # Instructions Copilot globales
└── instructions/
    ├── frontend.instructions.md      # Instructions frontend
    └── backend.instructions.md       # Instructions backend

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

setup.ps1                             # Script d'initialisation
```

## 🎨 Palette de Couleurs

- **Primaire**: `#FFA726` (orange doux)
- **Secondaire**: `#FFD54F` (jaune chaud)
- **Fond**: `#FFF8E1` (crème léger)
- **Texte**: `#5D4037` (brun chaud)
- **Accents**: `#FF7043` (corail)

## 📡 API REST

### GET /api/items
Récupère tous les articles.

**Réponse:**
```json
{
  "items": [
    { "id": 1, "name": "Fromage à raclette", "quantity": "1kg" }
  ]
}
```

### POST /api/items
Ajoute un nouvel article.

**Body:**
```json
{
  "name": "Charcuterie",
  "quantity": "200g"
}
```

**Réponse:**
```json
{
  "item": { "id": 2, "name": "Charcuterie", "quantity": "200g" }
}
```

### DELETE /api/items/:id
Supprime un article.

**Réponse:**
```json
{
  "success": true
}
```

## 🌐 Déploiement

### GitHub Pages (Automatique)

1. Pushez sur la branche `main`
2. GitHub Actions build et déploie automatiquement
3. Site disponible sur `https://<username>.github.io/<repo-name>/`

### Configuration GitHub Pages

1. Settings > Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / root

## 🧪 Développement

### Backend en mode watch
```bash
cd backend
npm run dev
```

### Build production frontend
```bash
cd frontend
npm run build
```

### Preview build production
```bash
cd frontend
npm run preview
```

## 📝 License

MIT

## 🎯 Philosophie

> "Code élégant, simple et fonctionnel. Un site inutile mais magnifiquement réalisé."

---

Fait avec ❤️ et 🧀 pour une raclette parfaite
