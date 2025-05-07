import React, { useEffect, useState } from "react";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";
import { getAppointments, saveAppointment, updateAppointment, deleteAppointment } from "../components/appointments/appointmentActions";

export default function CreateAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Cargar citas al iniciar
  useEffect(() => {
    const loadAppointments = async () => {
      const saved = await getAppointments();
      setAppointments(saved);
    };
    loadAppointments();
  }, []);

  const handleSave = async (data) => {
    if (data.id) {
      // Actualizar
      await updateAppointment(data);
    } else {
      // Guardar nuevo
      const newAppointment = { ...data, id: Date.now().toString() };
      await saveAppointment(newAppointment);
    }

    const updated = await getAppointments();
    setAppointments(updated);
    setEditingAppointment(null);
  };

  const handleEdit = (appt) => {
    setEditingAppointment(appt);
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    const updated = await getAppointments();
    setAppointments(updated);
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Citas</h1>
      <AppointmentForm
        initialData={editingAppointment}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
      <AppointmentList
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
