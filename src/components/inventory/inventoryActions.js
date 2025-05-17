import localforage from "localforage";
import { markPurchasesAsConverted } from "../coffeePurchases/coffeeActions";

// Clave de almacenamiento para el inventario
const INVENTORY_KEY = "inventario_cafe";

/**
 * Obtiene todos los lotes almacenados en el inventario.
 * @returns {Promise<Array>} Lista de lotes.
 */
export const getInventario = async () => {
  const data = await localforage.getItem(INVENTORY_KEY);
  return data || [];
};

/**
 * Guarda un nuevo lote en el inventario.
 * @param {Object} nuevoLote - Lote a agregar.
 */
export const saveInventario = async (nuevoLote) => {
  const inventario = await getInventario();
  inventario.push(nuevoLote);
  await localforage.setItem(INVENTORY_KEY, inventario);
};

/**
 * Elimina un lote del inventario por su ID.
 * @param {string} id - ID del lote a eliminar.
 */
export const deleteInventario = async (id) => {
  const inventario = await getInventario();
  const actualizado = inventario.filter((item) => item.id !== id);
  await localforage.setItem(INVENTORY_KEY, actualizado);
};

/**
 * Actualiza un lote existente en el inventario.
 * @param {Object} loteActualizado - Lote con los datos actualizados.
 */
export const updateInventario = async (loteActualizado) => {
  const inventario = await getInventario();
  const actualizado = inventario.map((item) =>
    item.id === loteActualizado.id ? loteActualizado : item
  );
  await localforage.setItem(INVENTORY_KEY, actualizado);
};

/**
 * Elimina todos los datos del inventario.
 */
export const clearInventario = async () => {
  await localforage.removeItem(INVENTORY_KEY);
};

/**
 * Guarda un lote de inventario a partir de compras seleccionadas.
 * @param {Object} loteBase - Datos generales del lote (ubicación, fecha, observaciones, etc.)
 * @param {Array} comprasSeleccionadas - Lista de objetos compra.
 */
export const saveInventarioFromPurchases = async (loteBase, comprasSeleccionadas) => {
  const inventario = await getInventario();

  // Calcular total de kilos netos y promedio del precio
  const totalKilos = comprasSeleccionadas.reduce((sum, compra) => sum + compra.pesoNeto, 0);
  const precioPromedio = comprasSeleccionadas.reduce((sum, compra) => sum + (compra.precio * compra.pesoNeto), 0) / totalKilos;

  const nuevoLote = {
    ...loteBase,
    id: Date.now(),
    tipo: comprasSeleccionadas[0]?.tipo || "Desconocido",
    kilos: totalKilos,
    precio: Number(precioPromedio.toFixed(2)),
    compras: comprasSeleccionadas.map(c => c.id),
  };

  inventario.push(nuevoLote);
  await localforage.setItem(INVENTORY_KEY, inventario);

  // Marcar las compras como convertidas
  const comprasIds = comprasSeleccionadas.map(c => c.id);
  await markPurchasesAsConverted(comprasIds, nuevoLote.id);
};
