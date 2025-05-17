// src/components/inventory/utils/inventoryUtils.js

/**
 * Calcula kilos totales y precio promedio ponderado desde las compras seleccionadas.
 * @param {Array} compras - Array de objetos compra con {kilos, precioPorKilo}
 * @returns {Object} - { kilosTotales, precioPromedio }
 */
export function calcularDatosDesdeCompras(compras) {
    const kilosTotales = compras.reduce((sum, compra) => sum + (compra.kilos || 0), 0);
    if (kilosTotales === 0) {
      return { kilosTotales: 0, precioPromedio: 0 };
    }
  
    // Precio promedio ponderado
    const precioTotal = compras.reduce(
      (sum, compra) => sum + (compra.kilos || 0) * (compra.precioPorKilo || 0),
      0
    );
  
    const precioPromedio = precioTotal / kilosTotales;
  
    return { kilosTotales, precioPromedio };
  }
  