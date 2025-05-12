import React, { useState, useEffect } from "react";

export default function PostponeModal({ isOpen, onClose, onConfirm, appointment }) {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    if (appointment) {
      setNewDate(appointment.date);
      setNewTime(appointment.time);
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newDate || !newTime) {
      alert("Debes seleccionar una nueva fecha y hora");
      return;
    }

    onConfirm({
      ...appointment,
      date: newDate,
      time: newTime,
      estado: "Programada", // vuelve a estado programado si se pospone
    });

    onClose(); // Cierra el modal después de guardar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Posponer Cita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Nueva Fecha:</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Nueva Hora:</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
