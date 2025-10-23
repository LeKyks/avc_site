---
applyTo: "frontend/**/*.{js,html,css}"
---

# Instructions Frontend - Développeur Front-End

Tu travailles sur les fichiers du frontend de l'application.

## Règles Strictes Design

### Palette de Couleurs (NON NÉGOCIABLE)
```css
--primary: #FFA726;      /* Orange doux */
--secondary: #FFD54F;    /* Jaune chaud */
--background: #FFF8E1;   /* Crème léger */
--text: #5D4037;         /* Brun chaud */
--accent: #FF7043;       /* Corail */
```

❌ **JAMAIS** de bleu, vert, violet, gris froid

### Typographie Google Fonts
- **Titres**: `font-family: 'Comfortaa', cursive;`
- **Corps**: `font-family: 'Nunito', sans-serif;`

### Framework CSS
- Tailwind CSS uniquement (CDN ou build)
- Classes utilitaires, pas de CSS-in-JS
- Transitions: 200-300ms pour smoothness

## Code JavaScript Frontend

### Standards
- Vanilla JS ES6+ uniquement
- `fetch()` pour appels API
- `async/await` pour opérations asynchrones
- Destructuring et spread operator

### Communication API
```javascript
// GET tous les items
const response = await fetch('/api/items');
const { items } = await response.json();

// POST nouvel item
const response = await fetch('/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, quantity })
});
const { item } = await response.json();

// DELETE item
await fetch(`/api/items/${id}`, { method: 'DELETE' });
```

### Gestion d'Erreurs
```javascript
try {
  // Code fetch
} catch (error) {
  console.error('Erreur:', error);
  // Feedback visuel utilisateur (toast, message, etc.)
}
```

### Mise à Jour UI
- Update optimiste: modifier DOM avant confirmation serveur
- Revert si erreur
- Loading states visibles

## HTML Sémantique

```html
<main>
  <header>
    <h1>Liste de Courses Raclette 🧀</h1>
  </header>
  
  <section aria-label="Liste des courses">
    <ul role="list">
      <!-- Items -->
    </ul>
  </section>
  
  <form aria-label="Ajouter un article">
    <!-- Form -->
  </form>
</main>
```

## Responsive Design

- Mobile-first (min-width breakpoints)
- Tailwind breakpoints: `sm:` `md:` `lg:` `xl:`
- Touch-friendly buttons (min 44x44px)
- Grid/Flexbox pour layouts

## Accessibilité Obligatoire

- `aria-labels` sur actions
- `role` attributes quand nécessaire
- Contrast ratio WCAG AA (4.5:1 text, 3:1 UI)
- Focus visible et keyboard navigation
- Alt text sur images

## Performance

- Images optimisées (WebP si possible)
- Lazy loading si nécessaire
- Debounce sur inputs search
- Minification via Vite (auto)
- Code splitting si app > 100kb

## Exemples de Suggestions Valides

✅ "Ajouter une transition douce sur hover des boutons"
✅ "Implémenter un loading spinner pendant fetch"
✅ "Améliorer le contraste du texte pour accessibilité"
✅ "Ajouter debounce sur input recherche"

## Exemples de Suggestions INTERDITES

❌ "Utiliser React pour cette fonctionnalité"
❌ "Changer la couleur primaire en bleu"
❌ "Utiliser styled-components"
❌ "Ajouter Material-UI"
