import React from "react";

export default function AppointmentList({ appointments, onEdit, onDelete }) {
  if (appointments.length === 0) {
    return <p className="text-gray-500">No hay citas registradas.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <div key={appt.id} className="border p-4 rounded shadow-sm">
          <p><strong>Cliente:</strong> {appt.clientId}</p>
          <p><strong>Tipo:</strong> {appt.coffeeType}</p>
          <p><strong>Kilos:</strong> {appt.kilos}</p>
          <p><strong>Fecha:</strong> {appt.date}</p>
          <p><strong>Hora:</strong> {appt.time}</p>
          {appt.note && <p><strong>Nota:</strong> {appt.note}</p>}

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onEdit(appt)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(appt.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
