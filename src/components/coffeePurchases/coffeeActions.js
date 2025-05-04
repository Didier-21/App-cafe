// src/components/coffeePurchases/coffeeActions.js

const STORAGE_KEY = 'coffeePurchases';

// Obtener todas las compras desde localStorage
export const getAllPurchases = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Guardar o actualizar una compra
export const savePurchase = (purchase) => {
  let purchases = getAllPurchases();

  // Calculamos el peso neto basado en el tipo de café
  let pesoNeto = purchase.peso; // Iniciamos con el peso original
  if (purchase.tipo === "Café Mojado" || purchase.tipo === "Pasilla Mojada" || purchase.tipo === "Cascota") {
    pesoNeto = pesoNeto * 0.92; // Restar el 8% del peso
  }

  // Calculamos el total
  const total = pesoNeto * purchase.precio;

  // Creamos un nuevo objeto con los datos calculados
  const newPurchase = {
    ...purchase,
    pesoNeto, // Asignamos el peso neto calculado
    total     // Asignamos el total calculado
  };

  if (newPurchase.id) {
    // Si existe el id, actualizamos la compra
    purchases = purchases.map((p) => (p.id === newPurchase.id ? newPurchase : p));
  } else {
    // Si es una compra nueva, le asignamos un nuevo id y la agregamos a la lista
    newPurchase.id = Date.now(); // Usamos Date.now() como ID único
    purchases.push(newPurchase);
  }

  // Guardamos la lista actualizada en localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
};

// Eliminar una compra por ID
export const deletePurchase = (id) => {
  let purchases = getAllPurchases();
  purchases = purchases.filter((purchase) => purchase.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
};
