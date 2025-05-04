// src/components/coffeePurchases/CoffeeList.js
import React from 'react';

export default function CoffeeList({ purchases, onEdit, onDelete }) {
  if (!Array.isArray(purchases) || purchases.length === 0) {
    return <p className="text-center p-4">No hay compras registradas.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Peso</th>
            <th className="px-4 py-2">Peso Neto</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(p => (
            <tr key={p.id} className="border-b">
              <td className="px-4 py-2">{p.nombreCliente}</td>
              <td className="px-4 py-2">{p.tipo}</td>
              <td className="px-4 py-2">{p.peso}</td>
              <td className="px-4 py-2">{p.pesoNeto}</td>
              <td className="px-4 py-2">{p.precio}</td>
              <td className="px-4 py-2">{p.total}</td>
              <td className="px-4 py-2 space-x-1">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
