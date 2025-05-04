// coffeeActions.js

const STORAGE_KEY = 'coffeePurchases';

// Obtener todas las compras desde localStorage
export const getAllPurchases = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Guardar o actualizar una compra
export const savePurchase = (purchase) => {
  let purchases = getAllPurchases();

  if (purchase.id) {
    // Actualizar si ya existe
    purchases = purchases.map(p => (p.id === purchase.id ? purchase : p));
  } else {
    // Crear nueva
    purchase.id = Date.now();
    purchases.push(purchase);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
};

// Eliminar una compra por ID
export const deletePurchase = (id) => {
  const purchases = getAllPurchases().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
};
