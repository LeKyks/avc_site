/**
 * ===================================================
 *  LISTE DE COURSES RACLETTE - Application JavaScript
 * ===================================================
 * 
 * Application de gestion de liste de courses avec stockage localStorage.
 * Architecture: Vanilla JavaScript ES6+
 * Stockage: localStorage (clé: 'raclette-items')
 * 
 * Structure des données:
 * {
 *   items: [{ id: number, name: string, quantity: string }],
 *   nextId: number
 * }
 */

// ===== CONFIGURATION =====

/**
 * Mode de stockage de l'application
 * - 'localStorage': Stockage local dans le navigateur (mode actuel)
 * - 'api': Backend Express avec JSON (désactivé pour GitHub Pages)
 */
const STORAGE_MODE = 'localStorage';

/**
 * URL de l'API backend (non utilisée en mode localStorage)
 * Peut être configurée via variable d'environnement VITE_API_URL
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Clé de stockage localStorage
 * Toutes les données sont sauvegardées sous cette clé unique
 */
const STORAGE_KEY = 'raclette-items';

// ===== RÉFÉRENCES DOM =====

const form = document.getElementById('add-item-form');
const itemsList = document.getElementById('items-list');
const emptyState = document.getElementById('empty-state');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const itemsCount = document.getElementById('items-count');

// ===== ÉTAT DE L'APPLICATION =====

/**
 * Liste des articles
 * @type {Array<{id: number, name: string, quantity: string}>}
 */
let items = [];

/**
 * ID auto-incrémenté pour les nouveaux articles
 * @type {number}
 */
let nextId = 1;

// ===== FONCTIONS DE STOCKAGE =====

/**
 * Sauvegarde les données dans localStorage
 * Sérialise items et nextId en JSON et persiste dans le navigateur
 * 
 * @returns {void}
 */
function saveToLocalStorage() {
  const data = { items, nextId };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Charge les données depuis localStorage
 * Si aucune donnée n'existe, initialise avec des articles par défaut
 * 
 * @returns {void}
 */
function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  
  if (data) {
    // Données existantes trouvées
    const parsed = JSON.parse(data);
    items = parsed.items || [];
    nextId = parsed.nextId || 1;
  } else {
    // Initialisation avec données par défaut
    items = [
      { id: 1, name: "Fromage à raclette", quantity: "1kg" },
      { id: 2, name: "Pommes de terre", quantity: "2kg" },
      { id: 3, name: "Charcuterie", quantity: "200g" },
      { id: 4, name: "Cornichons", quantity: "1 bocal" }
    ];
    nextId = 5;
    saveToLocalStorage();
  }
}

// ===== GESTION DE L'INTERFACE =====

/**
 * Affiche ou cache le loader de chargement
 * 
 * @param {boolean} show - true pour afficher, false pour cacher
 * @returns {void}
 */
function toggleLoading(show) {
  loading.classList.toggle('hidden', !show);
}

/**
 * Affiche un message d'erreur temporaire (5 secondes)
 * 
 * @param {string} message - Le message d'erreur à afficher
 * @returns {void}
 */
function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}

/**
 * Met à jour le compteur d'articles dans l'en-tête
 * 
 * @returns {void}
 */
function updateCount() {
  itemsCount.textContent = `(${items.length})`;
}

/**
 * Met à jour l'affichage complet de la liste d'articles
 * Vide le conteneur, affiche/cache l'état vide, et recrée tous les éléments
 * 
 * @returns {void}
 */
function renderItems() {
  // Vider la liste actuelle
  itemsList.innerHTML = '';
  
  // Afficher l'état vide si aucun article
  emptyState.classList.toggle('hidden', items.length > 0);
  
  // Créer et afficher chaque article
  items.forEach(item => {
    const li = createItemElement(item);
    itemsList.appendChild(li);
  });
  
  updateCount();
}

/**
 * Crée un élément DOM <li> pour un article
 * Génère la structure HTML complète avec styles Tailwind et bouton de suppression
 * 
 * @param {{id: number, name: string, quantity: string}} item - L'article à afficher
 * @returns {HTMLLIElement} Élément <li> configuré et stylé
 */
function createItemElement(item) {
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between gap-3 p-4 bg-background/50 rounded-lg border-2 border-transparent hover:border-primary/30 transition-all duration-200 item-enter';
  li.setAttribute('data-id', item.id);
  
  // Conteneur du contenu (nom + quantité)
  const contentDiv = document.createElement('div');
  contentDiv.className = 'flex-1';
  
  // Nom de l'article
  const name = document.createElement('span');
  name.className = 'font-semibold text-warm text-lg';
  name.textContent = item.name;
  contentDiv.appendChild(name);
  
  // Quantité (optionnelle)
  if (item.quantity) {
    const quantity = document.createElement('span');
    quantity.className = 'ml-3 text-sm text-warm/60';
    quantity.textContent = item.quantity;
    contentDiv.appendChild(quantity);
  }
  
  // Bouton de suppression
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold text-sm';
  deleteBtn.textContent = '🗑️ Supprimer';
  deleteBtn.setAttribute('aria-label', `Supprimer ${item.name}`);
  deleteBtn.onclick = () => deleteItem(item.id);
  
  li.appendChild(contentDiv);
  li.appendChild(deleteBtn);
  
  return li;
}

// ===== OPÉRATIONS CRUD =====

/**
 * Récupère tous les articles (mode localStorage ou API)
 * En mode localStorage: charge depuis le stockage local
 * En mode API: effectue une requête fetch au backend
 * 
 * Fallback automatique sur localStorage si l'API échoue
 * 
 * @async
 * @returns {Promise<void>}
 */
async function fetchItems() {
  try {
    toggleLoading(true);
    
    if (STORAGE_MODE === 'localStorage') {
      // Mode localStorage: chargement synchrone depuis le navigateur
      loadFromLocalStorage();
      renderItems();
    } else {
      // Mode API: requête HTTP vers le backend
      const response = await fetch(`${API_URL}/api/items`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des items');
      }
      
      const data = await response.json();
      items = data.items;
      renderItems();
    }
    
  } catch (error) {
    console.error('Erreur fetch items:', error);
    showError('Impossible de charger la liste. Mode hors ligne activé.');
    // Fallback: utiliser localStorage si l'API est indisponible
    loadFromLocalStorage();
    renderItems();
  } finally {
    toggleLoading(false);
  }
}

/**
 * Ajoute un nouvel article à la liste
 * Valide les données, crée l'objet avec ID auto-incrémenté, sauvegarde et rafraîchit l'affichage
 * 
 * @async
 * @param {string} name - Nom de l'article (requis)
 * @param {string} quantity - Quantité (optionnelle)
 * @returns {Promise<void>}
 */
async function addItem(name, quantity) {
  try {
    toggleLoading(true);
    
    if (STORAGE_MODE === 'localStorage') {
      // Mode localStorage: ajout direct dans le tableau
      const newItem = {
        id: nextId++,
        name: name.trim(),
        quantity: quantity?.trim() || ''
      };
      
      items.push(newItem);
      saveToLocalStorage();
      renderItems();
      form.reset();
    } else {
      // Mode API: requête POST vers le backend
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, quantity })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'ajout');
      }
      
      const data = await response.json();
      
      // Mise à jour optimiste de l'interface
      items.push(data.item);
      renderItems();
      form.reset();
    }
    
  } catch (error) {
    console.error('Erreur ajout item:', error);
    showError(error.message);
  } finally {
    toggleLoading(false);
  }
}

/**
 * Supprime un article de la liste
 * Applique une animation de sortie avant la suppression effective
 * 
 * @async
 * @param {number} id - ID de l'article à supprimer
 * @returns {Promise<void>}
 */
async function deleteItem(id) {
  try {
    // Animation de sortie (200ms) avant suppression
    const itemElement = document.querySelector(`[data-id="${id}"]`);
    if (itemElement) {
      itemElement.classList.add('item-exit');
    }
    
    if (STORAGE_MODE === 'localStorage') {
      // Mode localStorage: suppression immédiate après animation
      setTimeout(() => {
        items = items.filter(item => item.id !== id);
        saveToLocalStorage();
        renderItems();
      }, 200);
    } else {
      // Mode API: requête DELETE vers le backend
      const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }
      
      // Attendre la fin de l'animation avant mise à jour
      setTimeout(() => {
        items = items.filter(item => item.id !== id);
        renderItems();
      }, 200);
    }
    
  } catch (error) {
    console.error('Erreur suppression item:', error);
    showError('Impossible de supprimer l\'item');
    // Recharger la liste en cas d'erreur pour resynchroniser
    fetchItems();
  }
}

// ===== ÉVÉNEMENTS =====

/**
 * Gestion de la soumission du formulaire d'ajout
 * Valide les données et appelle addItem()
 */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const name = formData.get('name')?.trim();
  const quantity = formData.get('quantity')?.trim();
  
  // Validation: le nom est obligatoire
  if (!name) {
    showError('Le nom de l\'article est requis');
    return;
  }
  
  await addItem(name, quantity);
});

// ===== INITIALISATION =====

/**
 * Point d'entrée de l'application
 * Se déclenche au chargement complet du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🧀 Application Liste de Courses Raclette démarrée');
  console.log('💾 Mode de stockage:', STORAGE_MODE);
  console.log('📡 API URL:', API_URL);
  fetchItems();
});

// ===== EXPORTS =====

/**
 * Export des fonctions pour tests unitaires éventuels
 */
export { fetchItems, addItem, deleteItem };
