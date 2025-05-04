import React from 'react';

export default function CoffeeList({ purchases, onEdit, onDelete }) {
  if (!Array.isArray(purchases) || purchases.length === 0) {
    return <p className="text-center text-gray-500">No hay compras registradas.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Compras Registradas</h2>
      <ul className="space-y-3">
        {purchases.map((p) => (
          <li key={p.id} className="border p-3 rounded flex justify-between items-start">
            <div>
              <p><strong>Productor:</strong> {p.productor}</p>
              <p><strong>Cantidad:</strong> {p.cantidad} kg</p>
              <p><strong>Precio:</strong> ${p.precio}</p>
              <p><strong>Fecha:</strong> {new Date(p.fecha).toLocaleDateString()}</p>
              <p><strong>Ubicación:</strong> {p.ubicacion}</p>
              {p.nota && <p><strong>Nota:</strong> {p.nota}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onEdit(p)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
