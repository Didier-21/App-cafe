import React from "react";
import moment from "moment";

const InventoryList = ({ inventario, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {inventario.length === 0 ? (
        <p className="text-gray-500">No hay lotes registrados.</p>
      ) : (
        inventario.map((lote) => {
          const compras = Array.isArray(lote.compras) ? lote.compras : [];

          return (
            <div
              key={lote.id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg font-semibold">Lote: {lote.nombre}</h2>
                  <p className="text-sm text-gray-600">
                    Fecha de creación:{" "}
                    {moment(lote.fechaCreacion).format("YYYY-MM-DD HH:mm")}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => onEdit(lote)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(lote.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              {compras.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Compras asociadas:</h3>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    {compras.map((compra, index) => (
                      <li key={index}>
                        {moment(compra.fecha).format("YYYY-MM-DD HH:mm")} —{" "}
                        {compra.nombreCliente || compra.clienteNombre} —{" "}
                        {compra.tipoCafe} — {compra.kilos} kg @ ${compra.precioPorKilo}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default InventoryList;
