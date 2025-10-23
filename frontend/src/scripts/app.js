// Mode de stockage : 'api' ou 'localStorage'
const STORAGE_MODE = 'localStorage'; // Change to 'api' pour utiliser le backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const STORAGE_KEY = 'raclette-items';

// Éléments DOM
const form = document.getElementById('add-item-form');
const itemsList = document.getElementById('items-list');
const emptyState = document.getElementById('empty-state');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const itemsCount = document.getElementById('items-count');

// État de l'application
let items = [];
let nextId = 1;

/**
 * Sauvegarde dans localStorage
 */
function saveToLocalStorage() {
  const data = { items, nextId };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Charge depuis localStorage
 */
function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    const parsed = JSON.parse(data);
    items = parsed.items || [];
    nextId = parsed.nextId || 1;
  } else {
    // Données initiales
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

/**
 * Affiche/cache le loader
 */
function toggleLoading(show) {
  loading.classList.toggle('hidden', !show);
}

/**
 * Affiche un message d'erreur
 */
function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}

/**
 * Met à jour le compteur d'items
 */
function updateCount() {
  itemsCount.textContent = `(${items.length})`;
}

/**
 * Met à jour l'affichage de la liste
 */
function renderItems() {
  // Vider la liste
  itemsList.innerHTML = '';
  
  // Afficher/cacher empty state
  emptyState.classList.toggle('hidden', items.length > 0);
  
  // Afficher les items
  items.forEach(item => {
    const li = createItemElement(item);
    itemsList.appendChild(li);
  });
  
  updateCount();
}

/**
 * Crée un élément DOM pour un item
 */
function createItemElement(item) {
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between gap-3 p-4 bg-background/50 rounded-lg border-2 border-transparent hover:border-primary/30 transition-all duration-200 item-enter';
  li.setAttribute('data-id', item.id);
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'flex-1';
  
  const name = document.createElement('span');
  name.className = 'font-semibold text-warm text-lg';
  name.textContent = item.name;
  
  contentDiv.appendChild(name);
  
  if (item.quantity) {
    const quantity = document.createElement('span');
    quantity.className = 'ml-3 text-sm text-warm/60';
    quantity.textContent = item.quantity;
    contentDiv.appendChild(quantity);
  }
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold text-sm';
  deleteBtn.textContent = '🗑️ Supprimer';
  deleteBtn.setAttribute('aria-label', `Supprimer ${item.name}`);
  deleteBtn.onclick = () => deleteItem(item.id);
  
  li.appendChild(contentDiv);
  li.appendChild(deleteBtn);
  
  return li;
}

/**
 * Récupère tous les items
 */
async function fetchItems() {
  try {
    toggleLoading(true);
    
    if (STORAGE_MODE === 'localStorage') {
      // Mode localStorage
      loadFromLocalStorage();
      renderItems();
    } else {
      // Mode API
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
    // Fallback sur localStorage en cas d'erreur API
    loadFromLocalStorage();
    renderItems();
  } finally {
    toggleLoading(false);
  }
}

/**
 * Ajoute un nouvel item
 */
async function addItem(name, quantity) {
  try {
    toggleLoading(true);
    
    if (STORAGE_MODE === 'localStorage') {
      // Mode localStorage
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
      // Mode API
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
      
      // Mise à jour optimiste
      items.push(data.item);
      renderItems();
      
      // Reset form
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
 * Supprime un item
 */
async function deleteItem(id) {
  try {
    if (STORAGE_MODE === 'localStorage') {
      // Mode localStorage
      const itemElement = document.querySelector(`[data-id="${id}"]`);
      if (itemElement) {
        itemElement.classList.add('item-exit');
      }
      
      setTimeout(() => {
        items = items.filter(item => item.id !== id);
        saveToLocalStorage();
        renderItems();
      }, 200);
    } else {
      // Mode API
      // Mise à jour optimiste de l'UI
      const itemElement = document.querySelector(`[data-id="${id}"]`);
      if (itemElement) {
        itemElement.classList.add('item-exit');
      }
      
      const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }
      
      // Attendre la fin de l'animation
      setTimeout(() => {
        items = items.filter(item => item.id !== id);
        renderItems();
      }, 200);
    }
    
  } catch (error) {
    console.error('Erreur suppression item:', error);
    showError('Impossible de supprimer l\'item');
    // Recharger en cas d'erreur
    fetchItems();
  }
}

/**
 * Gestion de la soumission du formulaire
 */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const name = formData.get('name')?.trim();
  const quantity = formData.get('quantity')?.trim();
  
  if (!name) {
    showError('Le nom de l\'article est requis');
    return;
  }
  
  await addItem(name, quantity);
});

/**
 * Initialisation au chargement de la page
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Application démarrée');
  console.log('📡 API URL:', API_URL);
  fetchItems();
});

// Export pour tests éventuels
export { fetchItems, addItem, deleteItem };
