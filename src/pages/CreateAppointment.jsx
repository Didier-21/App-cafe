import React, { useEffect, useState } from "react";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";
import {
  getAppointments,
  saveAppointment,
  updateAppointment,
  deleteAppointment
} from "../components/appointments/appointmentActions";
import { getClients } from "../components/clients/clientActions"; // Asegúrate de importar getClients

export default function CreateAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [clients, setClients] = useState([]);

  // Cargar citas y clientes al iniciar
  useEffect(() => {
    const loadAppointments = async () => {
      const savedAppointments = await getAppointments();
      setAppointments(savedAppointments);
    };

    const loadClients = async () => {
      const clientList = await getClients();
      setClients(clientList);
    };

    loadAppointments();
    loadClients();
  }, []);

  const handleSave = async (data) => {
    const client = clients.find(
      (client) => client.id.toString() === data.clientId.toString()
    );
    const nombreCliente = client ? client.name : "Sin nombre";

    if (data.id) {
      // Actualizar cita
      await updateAppointment({ ...data, nombreCliente });
    } else {
      // Guardar nueva cita
      const newAppointment = {
        ...data,
        id: Date.now().toString(),
        nombreCliente,
        estado: "Programada" // Estado por defecto
      };
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
        setAppointments={setAppointments} // ✅ necesario para cambiar el estado desde el listado
      />
    </div>
  );
}
