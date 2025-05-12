import React, { useEffect, useState } from "react";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";
import PostponeModal from "../components/appointments/PostponeModal";
import {
  getAppointments,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
} from "../components/appointments/appointmentActions";
import { getClients } from "../components/clients/clientActions";
import NotificationBell from "../components/NotificationBell";
import localforage from "localforage";
import moment from "moment";

// Utilidades para notificaciones
const NOTIF_KEY = "notificaciones";

const saveNotifications = async (notifications) => {
  await localforage.setItem(NOTIF_KEY, notifications);
};

const loadNotifications = async () => {
  const saved = await localforage.getItem(NOTIF_KEY);
  return saved || [];
};

const clearNotifications = async () => {
  await localforage.removeItem(NOTIF_KEY);
};

// ✅ función separada para evitar cierres de useEffect
const checkForNotifications = (appointments, setNotifications) => {
  const now = moment();
  const nuevasNotificaciones = [];

  appointments.forEach((appt) => {
    if (appt.estado !== "Programada") return;

    const fechaHora = moment(`${appt.date} ${appt.time}`, "YYYY-MM-DD HH:mm");
    const diffMin = fechaHora.diff(now, "minutes");

    // 🔔 Recordatorio entre 29–30 minutos antes
    if (diffMin <= 30 && diffMin >= 29) {
      nuevasNotificaciones.push({
        id: `${appt.id}-30min`,
        mensaje: `📅 Recuerda tu cita con ${appt.nombreCliente} a las ${appt.time}`,
      });
    }

    // ⚠️ Advertencia exactamente 1 hora después
    if (diffMin === -60) {
      nuevasNotificaciones.push({
        id: `${appt.id}-atrasada`,
        mensaje: `⚠️ No se marcó como realizada la cita de ${appt.nombreCliente} a las ${appt.time}`,
      });
    }
  });

  setNotifications((prev) => {
    const idsExistentes = prev.map((n) => n.id);
    const nuevasUnicas = nuevasNotificaciones.filter(
      (n) => !idsExistentes.includes(n.id)
    );

    const actualizadas = [...prev, ...nuevasUnicas];

    // 🔁 Eliminar notificaciones de citas eliminadas o con estado ≠ Programada
    const citasProgramadasIds = appointments
      .filter((a) => a.estado === "Programada")
      .map((a) => a.id);

    const filtradas = actualizadas.filter((n) => {
      const [baseId] = n.id.split("-");
      return citasProgramadasIds.includes(baseId);
    });

    saveNotifications(filtradas);
    return filtradas;
  });
};






export default function CreateAppointment() {
  const [notifications, setNotifications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [clients, setClients] = useState([]);
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [appointmentToPostpone, setAppointmentToPostpone] = useState(null);

  // 🔁 Intervalo para verificar notificaciones
  useEffect(() => {
    const interval = setInterval(() => {
      checkForNotifications(appointments, setNotifications);
    }, 60000); // cada minuto

    return () => clearInterval(interval);
  }, [appointments]);

  // 🚀 Cargar datos iniciales
  useEffect(() => {
    const loadAppointments = async () => {
      const savedAppointments = await getAppointments();
      setAppointments(savedAppointments);
    };

    const loadClients = async () => {
      const clientList = await getClients();
      setClients(clientList);
    };

    const loadNotificationsFromStorage = async () => {
      const savedNotifs = await loadNotifications();
      setNotifications(savedNotifs);
    };

    loadAppointments();
    loadClients();
    loadNotificationsFromStorage();
  }, []);

  const handleSave = async (data) => {
    const client = clients.find(
      (client) => client.id.toString() === data.clientId.toString()
    );
    const nombreCliente = client ? client.name : "Sin nombre";

    if (data.id) {
      await updateAppointment({ ...data, nombreCliente });
    } else {
      const newAppointment = {
        ...data,
        id: Date.now().toString(),
        nombreCliente,
        estado: "Programada",
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

  const handleChangeStatus = async (id, nuevoEstado) => {
    const updatedList = appointments.map((appt) =>
      appt.id === id ? { ...appt, estado: nuevoEstado } : appt
    );
    setAppointments(updatedList);

    const updated = updatedList.find((a) => a.id === id);
    await updateAppointment(updated);
  };

  const handleOpenPostponeModal = (appt) => {
    setAppointmentToPostpone(appt);
    setShowPostponeModal(true);
  };

  const handlePostpone = async (updatedData) => {
    await updateAppointment(updatedData);
    const updated = await getAppointments();
    setAppointments(updated);
    setShowPostponeModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Citas</h1>
      <NotificationBell
        notifications={notifications}
        onClear={() => {
          setNotifications([]);
          clearNotifications();
        }}
      />
      <AppointmentForm
        initialData={editingAppointment}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
      <AppointmentList
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
        onPostpone={handleOpenPostponeModal}
      />
      <PostponeModal
        isOpen={showPostponeModal}
        onClose={() => setShowPostponeModal(false)}
        onConfirm={handlePostpone}
        appointment={appointmentToPostpone}
      />
    </div>
  );
}
