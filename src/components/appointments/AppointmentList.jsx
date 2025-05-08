import React from "react";
import { updateAppointment } from "./appointmentActions"; // Asegúrate de ajustar la ruta si es necesario

export default function AppointmentList({ appointments, onEdit, onDelete, setAppointments }) {
  if (appointments.length === 0) {
    return <p className="text-gray-500">No hay citas registradas.</p>;
  }

  const handleStatusChange = async (id, nuevoEstado) => {
    const updatedAppointments = appointments.map((appt) => {
      if (appt.id === id) {
        const updated = { ...appt, estado: nuevoEstado };
        updateAppointment(updated); // Persistimos en localForage
        return updated;
      }
      return appt;
    });
    setAppointments(updatedAppointments);
  };

  const getBadgeColor = (estado) => {
    switch (estado) {
      case "Programada":
        return "bg-blue-500";
      case "Realizada":
        return "bg-green-600";
      case "Cancelada":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <div key={appt.id} className="border p-4 rounded shadow-sm">
          <p><strong>Cliente:</strong> {appt.nombreCliente || 'Sin nombre'}</p>
          <p><strong>Tipo:</strong> {appt.coffeeType}</p>
          <p><strong>Kilos:</strong> {appt.kilos}</p>
          <p><strong>Fecha:</strong> {appt.date}</p>
          <p><strong>Hora:</strong> {appt.time}</p>
          {appt.note && <p><strong>Nota:</strong> {appt.note}</p>}

          {/* Badge del estado */}
          <div className="mt-2">
            <span className={`text-white text-sm px-2 py-1 rounded ${getBadgeColor(appt.estado || "Programada")}`}>
              {appt.estado || "Programada"}
            </span>
          </div>

          {/* Cambiar estado */}
          <div className="mt-2">
            <label className="block text-sm font-medium">Cambiar estado:</label>
            <select
              value={appt.estado || "Programada"}
              onChange={(e) => handleStatusChange(appt.id, e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="Programada">Programada</option>
              <option value="Realizada">Realizada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          {/* Botones de acción */}
          <div className="mt-3 flex gap-2">
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
