import React from 'react';

export default function CoffeeList({ purchases, onDelete, onEdit }) {
  const formatMoney = (value) =>
    value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full bg-white border shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border">Cliente</th>
            <th className="py-2 px-4 border">Tipo</th>
            <th className="py-2 px-4 border">Peso (Kg)</th>
            <th className="py-2 px-4 border">Peso Neto</th>
            <th className="py-2 px-4 border">Precio/Kg</th>
            <th className="py-2 px-4 border">Total</th>
            <th className="py-2 px-4 border">Ubicación</th>
            <th className="py-2 px-4 border">Nota</th>
            <th className="py-2 px-4 border">Fecha</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p.id}>
              <td className="py-2 px-4 border">{p.nombreCliente}</td>
              <td className="py-2 px-4 border">{p.tipo}</td>
              <td className="py-2 px-4 border">{p.peso}</td>
              <td className="py-2 px-4 border">{p.pesoNeto}</td>
              <td className="py-2 px-4 border">{formatMoney(p.precio)}</td>
              <td className="py-2 px-4 border">{formatMoney(p.total)}</td>
              <td className="py-2 px-4 border">{p.ubicacion}</td>
              <td className="py-2 px-4 border">{p.nota}</td>
              <td className="py-2 px-4 border">{formatDate(p.fecha)}</td>
              <td className="py-2 px-4 border space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
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
