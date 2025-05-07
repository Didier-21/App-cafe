import localforage from 'localforage';

const STORAGE_KEY = 'coffeePurchases';

// Obtener todas las compras desde localforage
export const getAllPurchases = async () => {
  const stored = await localforage.getItem(STORAGE_KEY);
  return stored || [];
};

// Guardar o actualizar una compra
export const savePurchase = async (purchase) => {
  let purchases = await getAllPurchases();

  // Calculamos el peso neto basado en el tipo de café
  let pesoNeto = purchase.peso;
  if (
    purchase.tipo === "Café Mojado" ||
    purchase.tipo === "Pasilla Mojada" ||
    purchase.tipo === "Cascota"
  ) {
    pesoNeto = pesoNeto * 0.92;
  }

  // Calculamos el total
  const total = pesoNeto * purchase.precio;

  const newPurchase = {
    ...purchase,
    pesoNeto,
    total
  };

  if (newPurchase.id) {
    purchases = purchases.map(p => (p.id === newPurchase.id ? newPurchase : p));
  } else {
    newPurchase.id = Date.now();
    purchases.push(newPurchase);
  }

  await localforage.setItem(STORAGE_KEY, purchases);
};

// Eliminar una compra por ID
export const deletePurchase = async (id) => {
  let purchases = await getAllPurchases();
  purchases = purchases.filter(p => p.id !== id);
  await localforage.setItem(STORAGE_KEY, purchases);
};
