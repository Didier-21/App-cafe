import React from "react";
import moment from "moment";
import "moment/locale/es";

export default function AppointmentList({
  appointments,
  onEdit,
  onDelete,
  onChangeStatus,
  onPostpone,
}) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Lista de Citas</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-600">No hay citas registradas.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => {
            // Formatear la fecha y la hora correctamente
            const formattedDate = moment(appt.date).format("DD/MM/YYYY");
            const formattedTime = moment(appt.time, "HH:mm").format("HH:mm");

            return (
              <li
                key={appt.id}
                className="border rounded-xl p-4 shadow flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{appt.nombreCliente}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      appt.estado === "Programada"
                        ? "bg-blue-100 text-blue-800"
                        : appt.estado === "Realizada"
                        ? "bg-green-100 text-green-800"
                        : appt.estado === "Cancelada"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appt.estado}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Tipo de café: <strong>{appt.coffeeType}</strong> - {appt.kilos} kg
                </p>
                <p className="text-sm text-gray-600">
                  Fecha: {formattedDate} - Hora: {formattedTime}
                </p>
                {appt.note && (
                  <p className="text-sm text-gray-500">Nota: {appt.note}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-2 py-1 rounded"
                    onClick={() => onEdit(appt)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-200 hover:bg-red-300 text-red-800 px-2 py-1 rounded"
                    onClick={() => onDelete(appt.id)}
                  >
                    Eliminar
                  </button>
                  {appt.estado !== "Realizada" && (
                    <button
                      className="bg-green-200 hover:bg-green-300 text-green-800 px-2 py-1 rounded"
                      onClick={() => onChangeStatus(appt.id, "Realizada")}
                    >
                      Marcar como Realizada
                    </button>
                  )}
                  {appt.estado !== "Cancelada" && (
                    <button
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                      onClick={() => onChangeStatus(appt.id, "Cancelada")}
                    >
                      Cancelar
                    </button>
                  )}
                  {appt.estado === "Programada" && (
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
                      onClick={() => onPostpone(appt)}
                    >
                      Posponer
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
