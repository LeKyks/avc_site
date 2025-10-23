# Instructions Copilot - Projet Liste de Courses Raclette 🧀

## Vue d'ensemble du projet

Application web frontend minimaliste pour gérer une liste de courses pour raclette. Design chaleureux et élégant, déployée sur GitHub Pages avec stockage localStorage.

## Stack Technique

### Frontend
- **Vanilla JavaScript** (ES6+) - Pas de frameworks lourds
- **Tailwind CSS** - Via CDN, palette de couleurs chaudes
- **Vite** - Build tool pour optimisation
- **Google Fonts** - Comfortaa (titres) + Nunito (corps)
- **localStorage** - Persistance des données côté client

## Structure du Projet

```
📁 .github/
├── workflows/deploy.yml           # CI/CD automatique GitHub Actions
├── copilot-instructions.md        # Ce fichier
└── instructions/
    └── frontend.instructions.md   # Instructions frontend détaillées

📁 frontend/
├── src/
│   ├── index.html                 # Page principale
│   ├── styles/main.css            # Styles personnalisés
│   └── scripts/app.js             # Logique application + localStorage
├── package.json
└── vite.config.js
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

### Gestion des Données

L'application utilise **localStorage** pour persister les données :

```javascript
// Structure des données
{
  items: [
    { id: 1, name: "Fromage à raclette", quantity: "1kg" }
  ],
  nextId: 2
}
```

- Clé localStorage : `raclette-items`
- Auto-incrémentation des IDs
- Validation : `name` requis, `quantity` optionnelle
- Sauvegarde automatique après chaque modification

## Commandes de Build

```bash
cd frontend
npm install
npm run dev      # Dev server (Vite) sur http://localhost:5173
npm run build    # Production build dans dist/
```

## Déploiement

### GitHub Actions Automatique
- **Trigger**: Push sur branche `main`
- **Process**: Build frontend → Deploy sur GitHub Pages
- **URL**: https://lekyks.github.io/avc_site/

## Standards de Code

### JavaScript
- ES6+ obligatoire (async/await, destructuring, arrow functions)
- camelCase pour variables/fonctions
- Pas de `var`, utiliser `const` et `let`
- Commentaires JSDoc pour les fonctions principales

### HTML/CSS
- Sémantique HTML5 stricte
- Tailwind CSS uniquement
- Mobile-first responsive
- Accessibilité WCAG AA (aria-labels, rôles, contraste)

## Ce que Copilot DOIT Suggérer
- Code simple, lisible, maintenable
- Patterns JavaScript modernes
- Améliorations UX intuitives
- Optimisations localStorage (debouncing, compression)
- Accessibilité améliorée

## Ce que Copilot NE DOIT PAS Faire
- Proposer React/Vue/Angular ou frameworks lourds
- Utiliser des couleurs froides (bleu, vert, violet)
- Sur-architecturer (pas besoin de Redux, MobX, etc.)
- Ajouter TypeScript sans justification
- Proposer des bases de données externes (Firebase, etc.) sauf si demandé

## Points d'Évolution Possibles
- Export/Import des listes (JSON, CSV)
- PWA avec Service Workers
- Partage de listes via URL
- Thèmes de couleurs personnalisables
- Mode sombre (avec palette chaude adaptée)

## Philosophie du Projet

> "Code élégant, simple et fonctionnel. Une application minimaliste mais magnifiquement réalisée."

Privilégie toujours :
1. **Simplicité** avant complexité
2. **Lisibilité** avant cleverness  
3. **Performance** sans sur-optimisation
4. **Accessibilité** dès le départ
5. **Design chaleureux** et accueillant
