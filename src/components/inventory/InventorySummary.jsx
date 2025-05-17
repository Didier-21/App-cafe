import React from "react";

const InventorySummary = ({ inventario }) => {
  const lotesManuales = inventario.filter((l) => l.modoCarga === "manual");
  const totalKilos = lotesManuales.reduce((acc, lote) => acc + parseInt(lote.cantidad), 0);
  const cantidadLotes = inventario.length;
  const promedio = lotesManuales.length > 0 ? (totalKilos / lotesManuales.length).toFixed(1) : 0;

  return (
    <div className="bg-white shadow rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-sm text-gray-500">Total de kilos</p>
        <p className="text-xl font-bold text-green-700">{totalKilos} kg</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Cantidad de lotes</p>
        <p className="text-xl font-bold text-blue-700">{cantidadLotes}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Promedio por lote</p>
        <p className="text-xl font-bold text-yellow-600">{promedio} kg</p>
      </div>
    </div>
  );
};

export default InventorySummary;
