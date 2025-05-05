// src/components/coffeePurchases/CoffeeList.js
import React from 'react';

export default function CoffeeList({ purchases, onDelete, onEdit }) {
  const formatCurrency = (value) =>
    value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Compras Registradas</h2>
      {purchases.length === 0 ? (
        <p className="text-gray-500">No hay compras registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Fecha</th>
                <th className="py-2 px-4 border-b">Cliente</th>
                <th className="py-2 px-4 border-b">Tipo</th>
                <th className="py-2 px-4 border-b">Peso (Kg)</th>
                <th className="py-2 px-4 border-b">Peso Neto</th>
                <th className="py-2 px-4 border-b">Precio/Kg</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Ubicación</th>
                <th className="py-2 px-4 border-b">Nota</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{purchase.fecha || '-'}</td>
                  <td className="py-2 px-4 border-b">{purchase.nombreCliente}</td>
                  <td className="py-2 px-4 border-b">{purchase.tipo}</td>
                  <td className="py-2 px-4 border-b">{purchase.peso}</td>
                  <td>{parseFloat(purchase.pesoNeto).toFixed(1).replace(/\.0$/, '')}</td>
                  <td className="py-2 px-4 border-b">{formatCurrency(purchase.precio)}</td>
                  <td className="py-2 px-4 border-b">{formatCurrency(purchase.total)}</td>
                  <td className="py-2 px-4 border-b">{purchase.ubicacion}</td>
                  <td className="py-2 px-4 border-b">{purchase.nota || '-'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => onEdit(purchase)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(purchase.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
